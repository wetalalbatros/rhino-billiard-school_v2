import { Icon } from './Icon';

type Props = { onBook: () => void };

export function Pricing({ onBook }: Props) {
  const tiers = [
    { name: 'Пробне', tagline: 'Знайомство · 30 хв', price: '150', per: 'разове',
      bullets: ['Оцінка вашого рівня тренером', 'Перші удари під супроводом', 'Огляд програми та залу', 'Без зобов’язань — повертайтесь, якщо сподобалось'],
      cta: 'Записатись на пробне', tag: null as string | null },
    { name: 'Індивідуальні', tagline: 'Найшвидший прогрес', price: '350', per: 'за 60 хв',
      bullets: ['1-на-1 з тренером, без розмиття уваги', 'Гнучкий графік: будь-який вільний час', 'Особистий план з відеорозбором', 'Абонемент 8 занять — 2 400 ₴ (–15%)'],
      cta: 'Записатись на індивідуальне', tag: null },
    { name: 'Групові', tagline: 'Малі групи до 6 осіб', price: '200', per: 'за 90 хв',
      bullets: ['Постійний склад групи — є з ким спарингувати', 'Фіксований розклад, тренування 2–3 рази на тиждень', 'Внутрішні турніри школи', 'Абонемент 8 занять — 1 400 ₴ (–12%)'],
      cta: 'Записатись у групу', tag: 'Популярний вибір' },
  ];
  return (
    <section className="section" id="pricing">
      <div className="container-x">
        <div data-anim="fade-up" style={{ marginBottom: 56, display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', gap: 32, flexWrap: 'wrap' }}>
          <div>
            <span className="eyebrow">ціни / 2026</span>
            <h2 className="display display-lg" style={{ marginTop: 16 }}>Чесний цінник.<br/>Жодних прихованих ставок.</h2>
          </div>
          <p className="lede" style={{ maxWidth: 360 }}>Усе обладнання — кії, крейда, столи преміум-класу — входить у вартість. Купувати свій інвентар не треба.</p>
        </div>
        <div className="price-grid">
          {tiers.map((t, i) => (
            <div key={i} className={`price-card ${t.tag ? 'popular' : ''}`} data-anim="fade-up">
              {t.tag && <div className="pop-tag"><span className="tape tape-brass">★ {t.tag}</span></div>}
              <div className="head">
                <span className="eyebrow">пакет {String(i+1).padStart(2,'0')}</span>
                <h3>{t.name}</h3>
                <p>{t.tagline}</p>
              </div>
              <div className="price-amount">
                <span className="num">{t.price}</span>
                <span className="cur">₴</span>
                <span className="per">/ {t.per}</span>
              </div>
              <ul className="price-list">
                {t.bullets.map((b, j) => (<li key={j}><Icon.Check/> <span>{b}</span></li>))}
              </ul>
              <button className={`btn ${t.tag ? 'btn-felt' : 'btn-ghost'}`} onClick={onBook} style={{ marginTop: 'auto' }}>
                {t.cta} <Icon.Arrow/>
              </button>
            </div>
          ))}
        </div>
        <div data-anim="fade-up" style={{ marginTop: 32, padding: 28, border: '1px solid var(--line-soft)', borderRadius: 'var(--r-lg)', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 24, background: 'var(--surface)' }}>
          {[
            { t: 'Майстер-клас', p: '500 ₴ / 2 год', d: 'Інтенсив на конкретну техніку' },
            { t: 'Підготовка до турнірів', p: 'Індивідуально', d: 'Цільова програма під дату змагань' },
            { t: 'Корпоративні', p: 'Від 3 000 ₴', d: 'Тімбілдинг, івенти для команд' },
            { t: 'Сертифікат у подарунок', p: 'від 350 ₴', d: 'Заняття як подарунок коханій людині' },
          ].map((x, i) => (
            <div key={i}>
              <div style={{ fontFamily: 'var(--f-display)', fontSize: 18, fontWeight: 600, marginBottom: 4 }}>{x.t}</div>
              <div style={{ color: 'var(--felt-2)', fontFamily: 'var(--f-mono)', fontSize: 12, marginBottom: 6, letterSpacing: '0.04em' }}>{x.p}</div>
              <div style={{ color: 'var(--ink-3)', fontSize: 14 }}>{x.d}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
