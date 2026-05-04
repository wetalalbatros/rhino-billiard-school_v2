import { Link } from 'react-router-dom';
import { Icon } from './Icon';

export function BlogNav() {
  return (
    <nav className="nav">
      <div className="nav-inner">
        <Link to="/" className="nav-logo">
          <Icon.Logo style={{ color: 'var(--felt-2)' }}/>
          <span>Rhino<span style={{ color: 'var(--ink-3)', fontWeight: 400 }}>·school</span></span>
        </Link>
        <div className="nav-links">
          <a href="/#program">Програма</a>
          <a href="/#pricing">Ціни</a>
          <a href="/#coach">Тренер</a>
          <Link to="/blog" style={{ color: 'var(--felt-2)' }}>Блог</Link>
          <a href="/#contact">Контакти</a>
        </div>
        <div className="nav-cta">
          <a href="tel:+380634349623" title="+38 063 434 96 23" aria-label="Подзвонити" style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', width: 38, height: 38, borderRadius: 999, color: 'var(--ink-2)', textDecoration: 'none', background: 'oklch(1 0 0 / 0.04)', border: '1px solid var(--line-soft)' }}><Icon.Phone style={{ width: 15, height: 15 }}/></a>
          <a href="https://t.me/billiard_rhino_school" target="_blank" rel="noreferrer" className="btn btn-ghost btn-sm" style={{ padding: 10 }} title="Telegram"><Icon.Tg/></a>
          <a href="/#schedule" className="btn btn-felt btn-sm">
            <Icon.Phone style={{ width: 14, height: 14 }}/> <span className="callback-label">Записатись</span>
          </a>
        </div>
      </div>
      <style>{`@media (max-width: 560px) { .callback-label { display: none; } }`}</style>
    </nav>
  );
}

export function BlogFooter() {
  return (
    <footer className="footer">
      <div className="container-x" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 16 }}>
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: 12 }}>
          <Icon.Logo style={{ color: 'var(--felt-2)', width: 32, height: 32 }}/>
          <span style={{ fontFamily: 'var(--f-display)', fontWeight: 700, fontSize: 18 }}>Rhino<span style={{ color: 'var(--ink-3)', fontWeight: 400 }}>·school</span></span>
        </div>
        <div style={{ display: 'flex', gap: 18, fontSize: 14 }}>
          <Link to="/">Головна</Link>
          <Link to="/blog">Блог</Link>
          <a href="/#contact">Контакти</a>
          <a href="https://www.instagram.com/billiard_rhino_school/" target="_blank" rel="noreferrer">Instagram</a>
          <a href="https://t.me/billiard_rhino_school" target="_blank" rel="noreferrer">Telegram</a>
        </div>
        <span style={{ fontFamily: 'var(--f-mono)', fontSize: 11, color: 'var(--ink-4)', letterSpacing: '0.12em', textTransform: 'uppercase' }}>© 2026 Rhino · Київ</span>
      </div>
    </footer>
  );
}
