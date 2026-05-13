import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { Icon } from './Icon';

type Props = { open: boolean; onClose: () => void; prefillWhen?: string };

const API = import.meta.env.VITE_API_URL ?? '';

// Formats 9 subscriber digits into +380 (XX) XXX-XX-XX
function fmtDisplay(d: string): string {
  if (!d) return '+380 (';
  let out = '+380 (';
  out += d.slice(0, Math.min(2, d.length));
  if (d.length >= 2) out += ') ';
  if (d.length > 2) out += d.slice(2, Math.min(5, d.length));
  if (d.length >= 5) out += '-';
  if (d.length > 5) out += d.slice(5, Math.min(7, d.length));
  if (d.length >= 7) out += '-';
  if (d.length > 7) out += d.slice(7, 9);
  return out;
}

type Errors = { name?: string; phone?: string };

function validate(name: string, phoneDigits: string): Errors {
  const e: Errors = {};
  if (name.trim().length < 2) e.name = "Мінімум 2 символи";
  if (phoneDigits.length < 9) e.phone = 'Введіть повний номер';
  return e;
}

export function BookingModal({ open, onClose, prefillWhen }: Props) {
  const [step, setStep]     = useState(1);
  const [data, setData]     = useState({ format: 'Пробне', level: 'Новачок', name: '', phone: '', when: '' });
  const [phoneDigits, setPhoneDigits] = useState(''); // 9 subscriber digits after +380
  const [errors, setErrors] = useState<Errors>({});
  const [touched, setTouched] = useState<{ name?: boolean; phone?: boolean }>({});
  const [status, setStatus] = useState<'idle' | 'loading' | 'done' | 'error'>('idle');
  const [honeypot, setHoneypot] = useState('');
  const phoneRef = useRef<HTMLInputElement>(null);

  // Keep cursor at end of phone input after every re-render while focused
  useLayoutEffect(() => {
    const el = phoneRef.current;
    if (el && document.activeElement === el) {
      const len = el.value.length;
      el.setSelectionRange(len, len);
    }
  });

  useEffect(() => {
    if (open) {
      setStep(1); setStatus('idle'); setErrors({}); setTouched({});
      setPhoneDigits('');
      setData({ format: 'Пробне', level: 'Новачок', name: '', phone: '', when: prefillWhen ?? '' });
    }
  }, [open, prefillWhen]);

  if (!open) return null;

  const updatePhoneDigits = (d9: string) => {
    setPhoneDigits(d9);
    setData(prev => ({ ...prev, phone: '+380' + d9 }));
    if (touched.phone) {
      setErrors(prev => ({ ...prev, phone: validate(data.name, d9).phone }));
    }
  };

  const handlePhoneKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Backspace' || e.key === 'Delete') {
      e.preventDefault();
      updatePhoneDigits(phoneDigits.slice(0, -1));
    }
  };

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const rawDigits = e.target.value.replace(/\D/g, '');
    if (!rawDigits.startsWith('380')) return;
    const d9 = rawDigits.slice(3, 12);
    if (d9 !== phoneDigits) updatePhoneDigits(d9);
  };

  const handleNameChange = (val: string) => {
    setData(d => ({ ...d, name: val }));
    if (touched.name) setErrors(prev => ({ ...prev, name: validate(val, phoneDigits).name }));
  };

  const handleBlur = (field: 'name' | 'phone') => {
    setTouched(t => ({ ...t, [field]: true }));
    const e = validate(data.name, phoneDigits);
    setErrors(prev => ({ ...prev, [field]: e[field] }));
  };

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setTouched({ name: true, phone: true });
    const e2 = validate(data.name, phoneDigits);
    setErrors(e2);
    if (Object.keys(e2).length > 0) return;

    if (honeypot) { setStatus('done'); return; }

    setStatus('loading');
    try {
      const res = await fetch(`${API}/api/booking`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error();
      setStatus('done');
    } catch {
      setStatus('error');
    }
  };

  const fieldError = (field: 'name' | 'phone') =>
    touched[field] && errors[field]
      ? <span style={{ fontSize: 12, color: '#c8332a', marginTop: 4, display: 'block' }}>{errors[field]}</span>
      : null;

  if (status === 'done') {
    return (
      <div
        className="modal-backdrop"
        onClick={onClose}
        style={{ backdropFilter: 'blur(14px)', WebkitBackdropFilter: 'blur(14px)', background: 'rgba(0,0,0,0.72)' }}
      >
        <div
          onClick={e => e.stopPropagation()}
          style={{
            background: 'var(--surface)',
            border: '1px solid var(--border)',
            borderRadius: 24,
            padding: '48px 40px',
            maxWidth: 400,
            width: 'calc(100% - 40px)',
            textAlign: 'center',
            animation: 'bm-success-pop 0.45s cubic-bezier(0.34,1.56,0.64,1) both',
          }}
        >
          <div style={{
            width: 88, height: 88, margin: '0 auto 26px', borderRadius: 999,
            background: 'var(--felt)', display: 'flex', alignItems: 'center', justifyContent: 'center',
            animation: 'bm-success-icon 0.5s 0.18s cubic-bezier(0.34,1.56,0.64,1) both',
            opacity: 0,
          }}>
            <Icon.Check style={{ width: 44, height: 44, color: 'oklch(0.18 0.04 155)' }}/>
          </div>
          <h3 className="display display-md" style={{ margin: '0 0 10px' }}>Заявку прийнято.</h3>
          <p style={{ color: 'var(--ink-2)', margin: '0 0 28px', fontSize: 15 }}>
            Зателефонуємо протягом години у робочий час.
          </p>
          <div style={{ padding: '14px 18px', background: 'var(--bg)', borderRadius: 12, marginBottom: 28, textAlign: 'left', fontSize: 13, fontFamily: 'var(--f-mono)', letterSpacing: '0.04em', color: 'var(--ink-2)', lineHeight: 1.9 }}>
            <div>format · {data.format}</div>
            <div>level &nbsp;· {data.level}</div>
            <div>name &nbsp;· {data.name}</div>
            <div>phone · {data.phone}</div>
            {data.when && <div>when &nbsp;· {data.when}</div>}
          </div>
          <button className="btn btn-felt" style={{ width: '100%' }} onClick={onClose}>
            Готово <Icon.Arrow/>
          </button>
        </div>
        <style>{`
          @keyframes bm-success-pop {
            from { opacity: 0; transform: scale(0.86) translateY(32px); }
            to   { opacity: 1; transform: scale(1) translateY(0); }
          }
          @keyframes bm-success-icon {
            from { opacity: 0; transform: scale(0.4); }
            to   { opacity: 1; transform: scale(1); }
          }
        `}</style>
      </div>
    );
  }

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal" onClick={e => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose}><Icon.Close/></button>

        <div style={{ marginBottom: 20 }}>
          <span className="eyebrow">крок {step} / 2</span>
          <h3 className="display display-md" style={{ margin: '12px 0 4px' }}>{step === 1 ? 'Який формат вам ближче?' : 'Залиште контакт'}</h3>
          <p style={{ color: 'var(--ink-3)', margin: 0, fontSize: 14 }}>{step === 1 ? 'Підберемо тренера та зручний час.' : 'Зателефонуємо протягом години.'}</p>
        </div>

        {step === 1 ? (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
            <div className="field">
              <label>Формат</label>
              <div className="chips">
                {['Пробне', 'Індивідуальні', 'Групові', 'Майстер-клас'].map(o => (
                  <span key={o} className={`chip ${data.format === o ? 'active' : ''}`} onClick={() => setData({ ...data, format: o })}>{o}</span>
                ))}
              </div>
            </div>
            <div className="field">
              <label>Ваш рівень</label>
              <div className="chips">
                {['Новачок', 'Граю іноді', 'Граю регулярно', 'Турнірний'].map(o => (
                  <span key={o} className={`chip ${data.level === o ? 'active' : ''}`} onClick={() => setData({ ...data, level: o })}>{o}</span>
                ))}
              </div>
            </div>
            <button className="btn btn-felt" onClick={() => setStep(2)}>Далі <Icon.Arrow/></button>
          </div>
        ) : (
          <form onSubmit={submit} noValidate style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
            <input
              type="text"
              name="website"
              value={honeypot}
              onChange={e => setHoneypot(e.target.value)}
              tabIndex={-1}
              autoComplete="off"
              aria-hidden="true"
              style={{ position: 'absolute', left: '-9999px', width: 1, height: 1, opacity: 0 }}
            />
            <div className="field">
              <label>Ім'я</label>
              <input
                className={`input${touched.name && errors.name ? ' input-error' : ''}`}
                value={data.name}
                onChange={e => handleNameChange(e.target.value)}
                onBlur={() => handleBlur('name')}
                placeholder="Як до вас звертатись"
                autoComplete="name"
              />
              {fieldError('name')}
            </div>

            <div className="field">
              <label>Телефон</label>
              <input
                ref={phoneRef}
                className={`input${touched.phone && errors.phone ? ' input-error' : ''}`}
                type="tel"
                inputMode="numeric"
                value={fmtDisplay(phoneDigits)}
                onChange={handlePhoneChange}
                onKeyDown={handlePhoneKeyDown}
                onBlur={() => handleBlur('phone')}
                onClick={() => { const el = phoneRef.current; if (el) { const l = el.value.length; el.setSelectionRange(l, l); } }}
                onFocus={() => { const el = phoneRef.current; if (el) { const l = el.value.length; el.setSelectionRange(l, l); } }}
                autoComplete="tel"
              />
              {fieldError('phone')}
            </div>

            <div className="field">
              <label>Коли зручно (необов'язково)</label>
              <input
                className="input"
                value={data.when}
                onChange={e => setData({ ...data, when: e.target.value })}
                placeholder="напр. суботи після 18:00"
              />
            </div>

            {status === 'error' && (
              <p style={{ fontSize: 13, color: '#c8332a', margin: 0, padding: '10px 14px', background: 'oklch(0.62 0.20 25 / 0.1)', borderRadius: 8, border: '1px solid oklch(0.62 0.20 25 / 0.3)' }}>
                Щось пішло не так. Спробуйте ще раз або зателефонуйте: +38 063 434 96 23
              </p>
            )}

            <div style={{ display: 'flex', gap: 8, marginTop: 8 }}>
              <button type="button" className="btn btn-ghost" onClick={() => setStep(1)} style={{ flex: '0 0 auto' }} disabled={status === 'loading'}>← Назад</button>
              <button type="submit" className="btn btn-felt" style={{ flex: 1 }} disabled={status === 'loading'}>
                {status === 'loading' ? 'Відправляємо…' : <>Записатись <Icon.Arrow/></>}
              </button>
            </div>
            <p style={{ fontSize: 12, color: 'var(--ink-4)', margin: '4px 0 0', textAlign: 'center' }}>Натискаючи, ви погоджуєтесь з обробкою контактних даних.</p>
          </form>
        )}
      </div>
    </div>
  );
}
