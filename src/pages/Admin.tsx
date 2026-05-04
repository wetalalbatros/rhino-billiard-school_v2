import { useCallback, useEffect, useState } from 'react';

const API = import.meta.env.VITE_API_URL ?? '';
const SESSION_KEY = 'rhino_admin_token';

type Status = 'new' | 'confirmed' | 'cancelled' | 'done';

type Booking = {
  id: number;
  format: string;
  level: string;
  name: string;
  phone: string;
  preferred_time: string | null;
  status: Status;
  created_at: string;
};

const STATUS_META: Record<Status, { label: string; color: string }> = {
  new:       { label: 'Нова',          color: '#efc44a' },
  confirmed: { label: 'Підтверджена',  color: '#5fb87a' },
  done:      { label: 'Виконана',      color: '#2962a8' },
  cancelled: { label: 'Скасована',     color: '#c8332a' },
};

const ACTIONS: Record<Status, { label: string; next: Status; primary: boolean }[]> = {
  new:       [{ label: 'Підтвердити', next: 'confirmed', primary: true  }, { label: 'Скасувати', next: 'cancelled', primary: false }],
  confirmed: [{ label: 'Виконано',    next: 'done',      primary: true  }, { label: 'Скасувати', next: 'cancelled', primary: false }],
  done:      [],
  cancelled: [{ label: 'Відновити',   next: 'new',       primary: false }],
};

export default function Admin() {
  const [token, setToken]       = useState(() => sessionStorage.getItem(SESSION_KEY) ?? '');
  const [passInput, setPassInput] = useState('');
  const [loginError, setLoginError] = useState(false);
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading]   = useState(false);
  const [filter, setFilter]     = useState<Status | 'all'>('all');
  const [updating, setUpdating] = useState<number | null>(null);
  const [updateError, setUpdateError] = useState<number | null>(null);

  const fetchBookings = useCallback(async (t: string) => {
    setLoading(true);
    try {
      const res = await fetch(`${API}/api/bookings`, {
        headers: { Authorization: `Bearer ${t}` },
      });
      if (res.status === 401) { setToken(''); sessionStorage.removeItem(SESSION_KEY); return; }
      setBookings(await res.json());
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { if (token) fetchBookings(token); }, [token, fetchBookings]);

  const login = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await fetch(`${API}/api/auth`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ password: passInput }),
    });
    if (res.ok) {
      const { token } = await res.json();
      sessionStorage.setItem(SESSION_KEY, token);
      setToken(token);
      setLoginError(false);
    } else {
      setLoginError(true);
    }
  };

  const updateStatus = async (id: number, status: Status) => {
    setUpdating(id);
    setUpdateError(null);
    try {
      const res = await fetch(`${API}/api/bookings/${id}/status`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
        body: JSON.stringify({ status }),
      });
      if (!res.ok) throw new Error();
      setBookings(prev => prev.map(b => b.id === id ? { ...b, status } : b));
    } catch {
      setUpdateError(id);
    } finally {
      setUpdating(null);
    }
  };

  const logout = () => { sessionStorage.removeItem(SESSION_KEY); setToken(''); setPassInput(''); setBookings([]); };

  const count = (s: Status | 'all') => s === 'all' ? bookings.length : bookings.filter(b => b.status === s).length;
  const visible = filter === 'all' ? bookings : bookings.filter(b => b.status === filter);

  // ── Login screen ──────────────────────────────────────────────────
  if (!token) {
    return (
      <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 24 }}>
        <div style={{ width: '100%', maxWidth: 340 }}>
          <div style={{ textAlign: 'center', marginBottom: 32 }}>
            <div style={{ fontFamily: 'var(--f-display)', fontSize: 26, fontWeight: 700, letterSpacing: '-0.02em' }}>Rhino · Admin</div>
            <div style={{ color: 'var(--ink-3)', fontSize: 14, marginTop: 6 }}>Введіть пароль для доступу</div>
          </div>
          <form onSubmit={login} style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            <input
              className={`input${loginError ? ' input-error' : ''}`}
              type="password"
              value={passInput}
              onChange={e => { setPassInput(e.target.value); setLoginError(false); }}
              placeholder="Пароль"
              autoFocus
            />
            {loginError && (
              <span style={{ fontSize: 13, color: '#c8332a' }}>Невірний пароль</span>
            )}
            <button className="btn btn-felt" type="submit">Увійти</button>
          </form>
        </div>
      </div>
    );
  }

  // ── Dashboard ─────────────────────────────────────────────────────
  return (
    <div style={{ minHeight: '100vh', padding: '28px 20px', maxWidth: 1120, margin: '0 auto' }}>

      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 32, flexWrap: 'wrap', gap: 12 }}>
        <div>
          <div style={{ fontFamily: 'var(--f-display)', fontSize: 24, fontWeight: 700, letterSpacing: '-0.02em' }}>Rhino · Admin</div>
          <div style={{ fontFamily: 'var(--f-mono)', fontSize: 11, color: 'var(--ink-3)', letterSpacing: '0.12em', textTransform: 'uppercase', marginTop: 4 }}>Управління заявками</div>
        </div>
        <div style={{ display: 'flex', gap: 8 }}>
          <button className="btn btn-ghost btn-sm" onClick={() => fetchBookings(token)} disabled={loading}>
            {loading ? '…' : '↻ Оновити'}
          </button>
          <button className="btn btn-ghost btn-sm" onClick={logout}>Вийти</button>
        </div>
      </div>

      {/* Stats */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(130px, 1fr))', gap: 12, marginBottom: 28 }}>
        {(['all', 'new', 'confirmed', 'done', 'cancelled'] as const).map(s => {
          const meta = s === 'all' ? { label: 'Всього', color: 'var(--ink)' } : { label: STATUS_META[s].label, color: STATUS_META[s].color };
          return (
            <div key={s} className="card card-pad" style={{ padding: '16px 20px', cursor: 'pointer', outline: filter === s ? `2px solid ${meta.color}` : 'none', outlineOffset: 2 }} onClick={() => setFilter(s)}>
              <div style={{ fontFamily: 'var(--f-display)', fontSize: 32, fontWeight: 700, color: meta.color, lineHeight: 1 }}>{count(s)}</div>
              <div style={{ fontFamily: 'var(--f-mono)', fontSize: 10, color: 'var(--ink-3)', letterSpacing: '0.12em', textTransform: 'uppercase', marginTop: 6 }}>{meta.label}</div>
            </div>
          );
        })}
      </div>

      {/* Filter pills */}
      <div style={{ display: 'flex', gap: 6, marginBottom: 20, flexWrap: 'wrap' }}>
        {(['all', 'new', 'confirmed', 'done', 'cancelled'] as const).map(s => {
          const label = s === 'all' ? 'Всі' : STATUS_META[s].label;
          return (
            <button key={s} onClick={() => setFilter(s)} className={`btn btn-sm ${filter === s ? 'btn-felt' : 'btn-ghost'}`}>
              {label} · {count(s)}
            </button>
          );
        })}
      </div>

      {/* Bookings list */}
      {visible.length === 0 ? (
        <div className="card card-pad" style={{ textAlign: 'center', color: 'var(--ink-3)', padding: '56px 24px' }}>
          Заявок не знайдено
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          {visible.map(b => {
            const meta = STATUS_META[b.status];
            return (
              <div key={b.id} className="card card-pad" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr auto', gap: 20, alignItems: 'center' }}>

                {/* Client */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: 5, minWidth: 0 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexWrap: 'wrap' }}>
                    <span style={{ fontFamily: 'var(--f-display)', fontWeight: 600, fontSize: 16 }}>{b.name}</span>
                    <span style={{ fontFamily: 'var(--f-mono)', fontSize: 10, letterSpacing: '0.1em', textTransform: 'uppercase', padding: '3px 8px', borderRadius: 999, background: `${meta.color}22`, color: meta.color, border: `1px solid ${meta.color}44`, whiteSpace: 'nowrap' }}>
                      {meta.label}
                    </span>
                  </div>
                  <a href={`tel:${b.phone.replace(/\D/g, '')}`} style={{ color: 'var(--felt-2)', fontFamily: 'var(--f-mono)', fontSize: 13, textDecoration: 'none', letterSpacing: '0.04em' }}>
                    {b.phone}
                  </a>
                  <div style={{ fontFamily: 'var(--f-mono)', fontSize: 11, color: 'var(--ink-4)', letterSpacing: '0.1em' }}>
                    #{b.id} · {new Date(b.created_at).toLocaleString('uk-UA', { day: '2-digit', month: '2-digit', year: '2-digit', hour: '2-digit', minute: '2-digit' })}
                  </div>
                </div>

                {/* Details */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                  <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
                    <span className="tape">{b.format}</span>
                    <span className="tape">{b.level}</span>
                  </div>
                  {b.preferred_time && (
                    <div style={{ fontSize: 13, color: 'var(--ink-2)' }}>🕐 {b.preferred_time}</div>
                  )}
                </div>

                {/* Actions */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: 6, alignItems: 'flex-end' }}>
                  {ACTIONS[b.status].map(a => (
                    <button
                      key={a.next}
                      className={`btn btn-sm ${a.primary ? 'btn-felt' : 'btn-ghost'}`}
                      style={{ whiteSpace: 'nowrap', opacity: updating === b.id ? 0.5 : 1 }}
                      disabled={updating === b.id}
                      onClick={() => updateStatus(b.id, a.next)}
                    >
                      {a.label}
                    </button>
                  ))}
                  {updateError === b.id && (
                    <span style={{ fontSize: 11, color: '#c8332a', fontFamily: 'var(--f-mono)' }}>Помилка — спробуйте ще</span>
                  )}
                </div>

              </div>
            );
          })}
        </div>
      )}

      <style>{`
        @media (max-width: 640px) {
          .admin-row { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </div>
  );
}
