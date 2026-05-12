import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Icon } from './Icon';

type Props = { onBook: () => void };

const NAV_LINKS = [
  ['/#program', 'Програма'],
  ['/#pricing', 'Ціни'],
  ['/#coach', 'Тренер'],
  ['/#schedule', 'Розклад'],
  ['/blog', 'Блог'],
  ['/#reviews', 'Відгуки'],
  ['/#contact', 'Контакти'],
] as const;

export function Nav({ onBook }: Props) {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="nav">
      <div className="nav-inner">
        <a href="/" className="nav-logo">
          <Icon.Logo style={{ color: 'var(--felt-2)' }}/>
          <span>Rhino<span style={{ color: 'var(--ink-3)', fontWeight: 400 }}>·school</span></span>
        </a>
        <div className="nav-links">
          {NAV_LINKS.map(([href, label]) =>
            href.includes('#')
              ? <a key={href} href={href}>{label}</a>
              : <Link key={href} to={href}>{label}</Link>
          )}
        </div>
        <div className="nav-cta">
          <a href="https://t.me/billiard_rhino_school" target="_blank" rel="noreferrer" className="btn btn-ghost btn-sm" style={{ padding: 10 }} title="Telegram"><Icon.Tg/></a>
          <button className="btn btn-felt btn-sm callback-btn" onClick={onBook}>
            <Icon.Phone style={{ width: 14, height: 14 }}/> <span className="callback-label">Зворотний дзвінок</span>
          </button>
          <button
            className="nav-burger"
            onClick={() => setMenuOpen(o => !o)}
            aria-label={menuOpen ? 'Закрити меню' : 'Відкрити меню'}
            aria-expanded={menuOpen}
          >
            {menuOpen
              ? <Icon.Close style={{ width: 20, height: 20 }}/>
              : <svg width="20" height="16" viewBox="0 0 20 16" fill="currentColor"><rect width="20" height="2" rx="1"/><rect y="7" width="20" height="2" rx="1"/><rect y="14" width="20" height="2" rx="1"/></svg>
            }
          </button>
        </div>
      </div>

      {menuOpen && (
        <div className="nav-mobile-menu">
          {NAV_LINKS.map(([href, label]) =>
            href.includes('#')
              ? <a key={href} href={href} onClick={() => setMenuOpen(false)}>{label}</a>
              : <Link key={href} to={href} onClick={() => setMenuOpen(false)}>{label}</Link>
          )}
          <button
            className="btn btn-felt"
            style={{ marginTop: 8, width: '100%', justifyContent: 'center' }}
            onClick={() => { setMenuOpen(false); onBook(); }}
          >
            <Icon.Phone style={{ width: 14, height: 14 }}/> Зворотний дзвінок
          </button>
        </div>
      )}

      <style>{`
        @media (max-width: 1100px) { .nav-phone { display: none !important; } }
        @media (max-width: 560px) { .callback-label { display: none; } }

        .nav-burger {
          display: none;
          align-items: center;
          justify-content: center;
          width: 38px;
          height: 38px;
          padding: 0;
          border-radius: 999px;
          background: oklch(1 0 0 / 0.04);
          border: 1px solid var(--line-soft);
          color: var(--ink-2);
          cursor: pointer;
          flex-shrink: 0;
        }
        .nav-burger:hover {
          background: oklch(1 0 0 / 0.08);
          color: var(--ink);
        }
        @media (max-width: 1099px) {
          .nav-burger { display: flex; }
        }

        .nav-mobile-menu {
          display: flex;
          flex-direction: column;
          gap: 2px;
          padding: 10px 16px 18px;
          border-top: 1px solid var(--line-soft);
          background: oklch(0.12 0.012 150 / 0.98);
          backdrop-filter: blur(14px);
        }
        .nav-mobile-menu a {
          display: block;
          padding: 11px 10px;
          color: var(--ink-2);
          text-decoration: none;
          font-size: 15px;
          font-family: var(--f-body);
          font-weight: 500;
          border-radius: 8px;
          transition: background 0.15s, color 0.15s;
        }
        .nav-mobile-menu a:hover {
          background: oklch(1 0 0 / 0.06);
          color: var(--ink);
        }
      `}</style>
    </nav>
  );
}
