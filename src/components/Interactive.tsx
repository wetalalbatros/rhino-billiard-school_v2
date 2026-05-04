import { useMemo, useState, Fragment } from 'react';
import { Icon } from './Icon';

type ScheduleProps = { onBook: (when?: string) => void };

export function Schedule({ onBook }: ScheduleProps) {
  const days = ['Понеділок', 'Вівторок', 'Середа', 'Четвер', 'П’ятниця', 'Субота', 'Неділя'];
  const hours = ['10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21'];
  const busyMap = useMemo(() => {
    const m: Record<string, boolean> = {};
    days.forEach((_d, di) => hours.forEach((_h, hi) => {
      const seed = (di * 31 + hi * 17) % 7;
      m[`${di}-${hi}`] = seed === 0 || seed === 3;
    }));
    return m;
  }, []);
  const [sel, setSel] = useState<string | null>(null);
  return (
    <section className="section" id="schedule">
      <div className="container-x">
        <div data-anim="fade-up" style={{ marginBottom: 48, display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', gap: 32, flexWrap: 'wrap' }}>
          <div>
            <span className="eyebrow">розклад · live</span>
            <h2 className="display display-lg" style={{ marginTop: 16 }}>Оберіть слот.<br/>Запишемо одразу.</h2>
          </div>
          <div style={{ display: 'flex', gap: 18, fontFamily: 'var(--f-mono)', fontSize: 11, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--ink-3)' }}>
            <span style={{ display: 'inline-flex', alignItems: 'center', gap: 8 }}><span style={{ width: 12, height: 12, borderRadius: 4, background: 'oklch(0.21 0.014 150)', border: '1px solid var(--line-soft)' }}/> вільно</span>
            <span style={{ display: 'inline-flex', alignItems: 'center', gap: 8 }}><span style={{ width: 12, height: 12, borderRadius: 4, background: 'var(--felt)' }}/> обрано</span>
            <span style={{ display: 'inline-flex', alignItems: 'center', gap: 8 }}><span style={{ width: 12, height: 12, borderRadius: 4, background: 'oklch(0.18 0.014 150)' }}/> зайнято</span>
          </div>
        </div>
        <div className="card card-pad" data-anim="fade-up">
          <div className="sched">
            <div className="t"></div>
            {days.map((d, i) => <div key={i} className="h">{d}</div>)}
            {hours.map((h, hi) => (
              <Fragment key={hi}>
                <div className="t">{h}:00</div>
                {days.map((_d, di) => {
                  const k = `${di}-${hi}`;
                  const busy = busyMap[k];
                  const selected = sel === k;
                  return (
                    <div key={k} className={`c ${busy ? 'busy' : ''} ${selected ? 'sel' : ''}`} onClick={() => !busy && setSel(k)}>
                      {selected ? '✓' : busy ? '×' : ''}
                    </div>
                  );
                })}
              </Fragment>
            ))}
          </div>
          <div style={{ marginTop: 24, display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 16, flexWrap: 'wrap' }}>
            <div style={{ color: 'var(--ink-2)', fontSize: 14 }}>
              {sel ? <>Обрано: <strong style={{ color: 'var(--felt-2)' }}>{days[+sel.split('-')[0]]}, {hours[+sel.split('-')[1]]}:00</strong> — клацніть «Підтвердити»</> : 'Виберіть будь-який вільний слот, або зателефонуйте — підлаштуємось.'}
            </div>
            <button className="btn btn-felt" disabled={!sel} onClick={() => {
              if (sel) {
                const [di, hi] = sel.split('-').map(Number);
                onBook(`${days[di].toLowerCase()} ${hours[hi]}:00`);
              } else {
                onBook();
              }
            }} style={{ opacity: sel ? 1 : 0.4 }}>
              Підтвердити запис <Icon.Arrow/>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

export function Features() {
  const items = [
    { i: '01', t: 'Авторська 30-денна методика', d: 'Покрокова програма від першого хвату кия до перших серій з 3+ куль. Без води — щоденник прогресу включено.' },
    { i: '02', t: 'Столи Brunswick · преміум', d: 'Професійні турнірні столи з італійським сукном Simonis. Те саме, на чому грають фінали Кубка України.' },
    { i: '03', t: 'Відеоаналіз кожного заняття', d: 'Камера фіксує стійку та траєкторію. Після занять — ваш особистий розбір ударів у спільному Telegram-чаті.' },
    { i: '04', t: 'Малі групи · до 6 осіб', d: 'Тренер встигає підійти до кожного, а ви знаходите спаринг-партнерів свого рівня. Без черг до столу.' },
    { i: '05', t: 'Внутрішні турніри школи', d: 'Кожні 6 тижнів — рейтинговий турнір серед учнів. Призи від партнерів, фото, кубки. Адреналін без виїзду.' },
    { i: '06', t: 'Психологічна підготовка', d: 'Окремі сесії з контролю тиску, ритуалів удару, дихання. Те, що відрізняє хорошого гравця від переможця.' },
  ];
  return (
    <section className="section" style={{ background: 'var(--bg-2)' }}>
      <div className="container-x">
        <div data-anim="fade-up" style={{ marginBottom: 56 }}>
          <span className="eyebrow">переваги · 06</span>
          <h2 className="display display-lg" style={{ marginTop: 16 }}>Що відрізняє нас<br/>від «просто більярдної».</h2>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 1, background: 'var(--line-soft)', border: '1px solid var(--line-soft)', borderRadius: 'var(--r-lg)', overflow: 'hidden' }}>
          {items.map((x, i) => (
            <div key={i} data-anim="fade-up" style={{ padding: 32, background: 'var(--surface)', minHeight: 220, display: 'flex', flexDirection: 'column', gap: 14 }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <span style={{ fontFamily: 'var(--f-mono)', fontSize: 11, letterSpacing: '0.16em', color: 'var(--ink-4)' }}>{x.i}</span>
                <span style={{ width: 8, height: 8, borderRadius: 999, background: 'var(--felt)' }}/>
              </div>
              <h3 style={{ fontFamily: 'var(--f-display)', fontSize: 22, fontWeight: 600, letterSpacing: '-0.015em', margin: 0 }}>{x.t}</h3>
              <p style={{ color: 'var(--ink-3)', margin: 0, lineHeight: 1.55, fontSize: 14 }}>{x.d}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function Glossary() {
  const terms = [
    { t: 'Накат', d: 'Удар з верхнім ефектом — біла куля продовжує рух уперед після зіткнення.' },
    { t: 'Відкат', d: 'Удар з нижнім ефектом — біла куля повертається назад після контакту.' },
    { t: 'Маса', d: 'Удар вертикально-піднятим києм для обходу куль-перешкод по дузі.' },
    { t: 'Snooker', d: 'Захисна гра — залишити суперникові позицію без можливості прицілитись.' },
    { t: 'Брейк', d: 'Перший удар, який розбиває піраміду на старті партії.' },
    { t: 'Кломб', d: 'Удар, де біла куля обкочує об’єктну, не торкаючись борту.' },
  ];
  const [active, setActive] = useState(0);
  return (
    <section className="section">
      <div className="container-x">
        <div data-anim="fade-up" style={{ marginBottom: 48 }}>
          <span className="eyebrow">словник гравця</span>
          <h2 className="display display-lg" style={{ marginTop: 16 }}>Шість термінів,<br/>які ви розумітимете після місяця.</h2>
        </div>
        <div data-anim="fade-up" className="gloss-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1.2fr', gap: 32, alignItems: 'stretch' }}>
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            {terms.map((t, i) => (
              <button key={i} onClick={() => setActive(i)} style={{
                textAlign: 'left', padding: '22px 24px',
                background: active === i ? 'oklch(0.55 0.12 155 / 0.12)' : 'transparent',
                border: 0, borderTop: '1px solid var(--line-soft)',
                color: active === i ? 'var(--ink)' : 'var(--ink-2)', cursor: 'pointer',
                fontFamily: 'var(--f-display)', fontSize: 22, fontWeight: 500, letterSpacing: '-0.015em',
                display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                transition: 'background .2s, color .2s',
              }}>
                <span>{t.t}</span>
                <span style={{ fontFamily: 'var(--f-mono)', fontSize: 11, color: active === i ? 'var(--felt-2)' : 'var(--ink-4)', letterSpacing: '0.16em' }}>0{i+1}</span>
              </button>
            ))}
            <div style={{ borderTop: '1px solid var(--line-soft)' }}/>
          </div>
          <div className="card card-pad" style={{ display: 'flex', flexDirection: 'column', gap: 18, justifyContent: 'center', minHeight: 300 }}>
            <span className="tape tape-brass" style={{ alignSelf: 'flex-start' }}>термін {String(active+1).padStart(2,'0')} / 06</span>
            <h3 className="display display-md" style={{ margin: 0 }}>{terms[active].t}</h3>
            <p style={{ color: 'var(--ink-2)', fontSize: 18, lineHeight: 1.55, margin: 0 }}>{terms[active].d}</p>
            <div style={{ marginTop: 12, display: 'flex', gap: 12, flexWrap: 'wrap', fontFamily: 'var(--f-mono)', fontSize: 11, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--ink-3)' }}>
              <span>опануємо на рівні · 02</span><span>·</span><span>~ 4 заняття</span>
            </div>
          </div>
        </div>
        <style>{`@media (max-width: 880px) { .gloss-grid { grid-template-columns: 1fr !important; } }`}</style>
      </div>
    </section>
  );
}
