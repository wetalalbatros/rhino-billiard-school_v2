import { useState } from 'react';
import { Icon } from './Icon';

type Props = { onBook: () => void };

export function Reviews() {
  const list = [
    { n: 'Олександр П.', t: 'За 3 місяці перейшов з повного нуля до серій по 3-4 кулі. Валерій бачить кожну дрібницю в стійці. Рекомендую.', r: 5, age: 34 },
    { n: 'Марія І.', t: 'Прийшла раз на пробне «спробувати». Тепер з нетерпінням чекаю кожного четверга. Атмосфера — як у клубі, а не школі.', r: 5, age: 28 },
    { n: 'Дмитро К.', t: 'Через рік потрапив у фінал обласного турніру. Без школи Rhino цього б не сталось — ні технічно, ні психологічно.', r: 5, age: 41 },
    { n: 'Анна С.', t: 'Привела сина 11 років. Тренер знаходить підхід — син сам просить ще заняття. Дисципліна та концентрація різко виросли.', r: 5, age: 38 },
  ];
  return (
    <section className="section" id="reviews" style={{ background: 'var(--bg-2)' }}>
      <div className="container-x">
        <div data-anim="fade-up" style={{ marginBottom: 48, display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', gap: 32, flexWrap: 'wrap' }}>
          <div>
            <span className="eyebrow">відгуки · 200+ учнів</span>
            <h2 className="display display-lg" style={{ marginTop: 16 }}>Не наші слова.<br/>Слова тих, хто грає.</h2>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
            <div style={{ fontFamily: 'var(--f-display)', fontSize: 56, fontWeight: 700, letterSpacing: '-0.04em', lineHeight: 1 }}>4.9</div>
            <div>
              <div style={{ display: 'flex', gap: 2, color: 'var(--brass)' }}>
                {[...Array(5)].map((_,i)=><Icon.Star key={i}/>)}
              </div>
              <div style={{ fontFamily: 'var(--f-mono)', fontSize: 11, color: 'var(--ink-3)', letterSpacing: '0.12em', marginTop: 4 }}>97 відгуків · Google + IG</div>
            </div>
          </div>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 18 }}>
          {list.map((r, i) => (
            <div key={i} className="review-card" data-anim="fade-up">
              <div className="stars">{[...Array(r.r)].map((_,j)=><Icon.Star key={j}/>)}</div>
              <p style={{ margin: 0, color: 'var(--ink-2)', lineHeight: 1.55, fontSize: 15, flex: 1 }}>«{r.t}»</p>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderTop: '1px solid var(--line-soft)', paddingTop: 16 }}>
                <div>
                  <div style={{ fontFamily: 'var(--f-display)', fontWeight: 600, fontSize: 16 }}>{r.n}</div>
                  <div style={{ fontFamily: 'var(--f-mono)', fontSize: 10, color: 'var(--ink-4)', letterSpacing: '0.14em', marginTop: 2 }}>УЧЕНЬ · {r.age} р.</div>
                </div>
                <div className="ball" style={{ ['--c' as any]: ['#efc44a','#2962a8','#c8332a','#1f6b3a'][i % 4], width: 32, height: 32, fontSize: 13 } as React.CSSProperties}>{i+1}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function FAQ() {
  const items = [
    { q: 'Чи потрібен досвід для початку?', a: 'Ні. Ми приймаємо учнів з повного нуля — більшість починає, ніколи не тримавши кий професійно. Перше пробне заняття допоможе тренеру оцінити ваш рівень і скласти план.' },
    { q: 'Яке спорядження потрібно мати?', a: 'Жодного. Кії, крейда, столи — все надається школою. Якщо згодом захочете свій кий — Валерій допоможе підібрати під вашу стійку та хват.' },
    { q: 'Скільки часу до перших результатів?', a: 'Перший контрольований удар — на 1-му занятті. Перша серія з 2-3 куль — 4–6 занять. Турнірний рівень — від 6 місяців регулярних тренувань.' },
    { q: 'Чи займаються діти?', a: 'Так, з 8 років. Для дітей ми складаємо індивідуальну програму з акцентом на координацію, концентрацію та ігровий формат. Це й гра, і дисципліна.' },
    { q: 'Де саме знаходиться школа?', a: 'Xpark, парк Дружби Народів, вул. Юр’ївська 29, Київ. 5 хв пішки від ст. м. «Лівобережна», є безкоштовний паркінг.' },
    { q: 'Як скасувати або перенести заняття?', a: 'Без проблем за 4 години до початку — просто напишіть нам у Telegram або зателефонуйте. Заняття не згоряє і повертається в абонемент.' },
    { q: 'Як записатись на пробне?', a: 'Натисніть «Записатись» у будь-якій кнопці на сайті, заповніть форму — і протягом години ми зателефонуємо. Або одразу: +38 063 434 96 23.' },
  ];
  const [open, setOpen] = useState(0);
  return (
    <section className="section">
      <div className="container-x" style={{ maxWidth: 920 }}>
        <div data-anim="fade-up" style={{ marginBottom: 48, textAlign: 'center' }}>
          <span className="eyebrow">часті питання</span>
          <h2 className="display display-lg" style={{ marginTop: 16 }}>Перш ніж запитаєте —<br/>можливо, ми вже відповіли.</h2>
        </div>
        <div data-anim="fade-up">
          {items.map((it, i) => (
            <div key={i} className={`faq-item ${open === i ? 'open' : ''}`} onClick={() => setOpen(open === i ? -1 : i)}>
              <div className="faq-q">
                <span>{it.q}</span>
                <span className="faq-toggle"><Icon.Plus/></span>
              </div>
              <div className="faq-a">{it.a}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function Contact({ onBook }: Props) {
  const [active, setActive] = useState(0);
  const locs = [
    {
      name: ‘Rhino’, sub: ‘X park’, showLogo: true, bookable: true,
      tag: ‘Xpark’, coords: ‘50.4979° N · 30.5469° E’,
      mapsLink: ‘https://maps.app.goo.gl/xBvPu7u91r6JtG3dA’,
      mapEmbed: ‘https://maps.google.com/maps?q=50.4979361,30.5469284&hl=uk&z=17&output=embed’,
      heading: <>Xpark · парк Дружби<br/>Народів · Юр’ївська 29.</>,
      rows: [
        { i: <Icon.Map/>, t: ‘Адреса’, v: "вул. Юр’ївська, 29\nXpark, Парк Дружби Народів\nКиїв, 02000", href: undefined as string | undefined },
        { i: <Icon.Phone/>, t: ‘Телефон’, v: ‘+38 063 434 96 23’, href: ‘tel:+380634349623’ },
        { i: <Icon.Clock/>, t: ‘Графік’, v: ‘Щодня · 10:00 – 22:00\nБез вихідних та святкових’, href: undefined },
        { i: <Icon.IG/>, t: ‘Instagram’, v: ‘@billiard_rhino_school’, href: ‘https://www.instagram.com/billiard_rhino_school/’ },
        { i: <Icon.Tg/>, t: ‘Telegram’, v: ‘@billiard_rhino_school’, href: ‘https://t.me/billiard_rhino_school’ },
      ],
    },
    {
      name: ‘Billiard’, sub: ‘News Club’, showLogo: false, bookable: false,
      tag: ‘Snooker’, coords: ‘50.5174° N · 30.4640° E’,
      mapsLink: ‘https://maps.app.goo.gl/JL4QYXkmHUsRLutg6’,
      mapEmbed: ‘https://maps.google.com/maps?q=50.5174121,30.4639913&hl=uk&z=17&output=embed’,
      heading: <>Snooker Club<br/>Billiard News Club · Київ.</>,
      rows: [
        { i: <Icon.Map/>, t: ‘Клуб’, v: "Snooker Club · Billiard News Club\nКиїв", href: undefined as string | undefined },
      ],
    },
    {
      name: ‘Mercury’, sub: ‘Billiard Club’, showLogo: false, bookable: false,
      tag: ‘Mercury’, coords: ‘50.4684° N · 30.6368° E’,
      mapsLink: ‘https://maps.app.goo.gl/DR96N7yKSVmRMW9KA’,
      mapEmbed: ‘https://maps.google.com/maps?q=50.4684327,30.6368482&hl=uk&z=17&output=embed’,
      heading: <>Більярдний клуб<br/>Mercury · Київ.</>,
      rows: [
        { i: <Icon.Map/>, t: ‘Клуб’, v: "Більярдний клуб ‘Mercury’\nКиїв", href: undefined as string | undefined },
      ],
    },
  ];
  const loc = locs[active];
  return (
    <section className="section" id="contact" style={{ background: ‘var(--bg-2)’ }}>
      <div className="container-x">
        <div data-anim="fade-up" style={{ marginBottom: 48 }}>
          <span className="eyebrow">локації · київ</span>
          <h2 className="display display-lg" style={{ marginTop: 16 }}>{loc.heading}</h2>
        </div>
        <div className="contact-grid" data-anim="fade-up">
          <div className="card" style={{ display: ‘flex’, overflow: ‘hidden’, padding: 0 }}>
            <div style={{ borderRight: ‘1px solid var(--line-soft)’, display: ‘flex’, flexDirection: ‘column’ }}>
              {locs.map((l, i) => (
                <button key={i} onClick={() => setActive(i)} style={{
                  padding: ‘20px 14px’, background: active === i ? ‘oklch(0.55 0.12 155 / 0.12)’ : ‘transparent’,
                  border: 0, borderBottom: i < locs.length - 1 ? ‘1px solid var(--line-soft)’ : ‘0’,
                  cursor: ‘pointer’, display: ‘flex’, flexDirection: ‘column’, alignItems: ‘center’, gap: 8,
                  minWidth: 80, flex: 1, color: active === i ? ‘var(--felt-2)’ : ‘var(--ink-3)’,
                  transition: ‘background .2s, color .2s’,
                }}>
                  {l.showLogo && <Icon.Logo style={{ width: 26, height: 26, color: active === i ? ‘var(--felt-2)’ : ‘var(--ink-4)’ } as React.CSSProperties}/>}
                  <span style={{ fontFamily: ‘var(--f-mono)’, fontSize: 9, letterSpacing: ‘0.1em’, textTransform: ‘uppercase’, textAlign: ‘center’, lineHeight: 1.5 }}>{l.name}<br/>{l.sub}</span>
                </button>
              ))}
            </div>
            <div style={{ flex: 1, padding: ‘32px’, display: ‘flex’, flexDirection: ‘column’, gap: 22 }}>
              {loc.rows.map((r, i) => (
                <div key={i} style={{ display: ‘flex’, gap: 16, alignItems: ‘flex-start’, paddingBottom: 22, borderBottom: i < loc.rows.length - 1 ? ‘1px solid var(--line-soft)’ : ‘0’ }}>
                  <div style={{ width: 44, height: 44, borderRadius: 12, background: ‘oklch(0.55 0.12 155 / 0.12)’, color: ‘var(--felt-2)’, display: ‘flex’, alignItems: ‘center’, justifyContent: ‘center’, flexShrink: 0 }}>{r.i}</div>
                  <div>
                    <div style={{ fontFamily: ‘var(--f-mono)’, fontSize: 11, letterSpacing: ‘0.16em’, textTransform: ‘uppercase’, color: ‘var(--ink-3)’, marginBottom: 4 }}>{r.t}</div>
                    {r.href ? (
                      <a href={r.href} target={r.href.startsWith(‘http’) ? ‘_blank’ : undefined} rel="noreferrer" style={{ color: ‘var(--ink)’, fontSize: 17, textDecoration: ‘none’, whiteSpace: ‘pre-line’, fontWeight: 500 }}>{r.v}</a>
                    ) : (
                      <div style={{ color: ‘var(--ink)’, fontSize: 17, whiteSpace: ‘pre-line’, lineHeight: 1.5, fontWeight: 500 }}>{r.v}</div>
                    )}
                  </div>
                </div>
              ))}
              <div style={{ display: ‘flex’, gap: 10, flexWrap: ‘wrap’, marginTop: ‘auto’ }}>
                {loc.bookable && <button className="btn btn-felt" onClick={onBook} style={{ flex: 1 }}>Записатись <Icon.Arrow/></button>}
                <a href={loc.mapsLink} target="_blank" rel="noreferrer" className="btn btn-ghost"><Icon.Map/> Maps</a>
              </div>
            </div>
          </div>
          <div style={{ borderRadius: ‘var(--r-lg)’, overflow: ‘hidden’, border: ‘1px solid var(--line-soft)’, minHeight: 480, position: ‘relative’, background: ‘var(--surface)’ }}>
            <iframe
              key={active}
              src={loc.mapEmbed}
              style={{ border: 0, width: ‘100%’, height: ‘100%’, minHeight: 480, filter: ‘invert(0.92) hue-rotate(180deg) saturate(0.7) brightness(0.95)’ }}
              loading="lazy" referrerPolicy="no-referrer-when-downgrade" title={loc.name}
            />
            <div style={{ position: ‘absolute’, top: 16, left: 16, right: 16, display: ‘flex’, justifyContent: ‘space-between’ }}>
              <span className="tape">{loc.coords}</span>
              <span className="tape tape-brass">{loc.tag}</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export function FinalCTA({ onBook }: Props) {
  return (
    <section className="section" style={{ position: 'relative', overflow: 'hidden' }}>
      <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(60% 80% at 50% 50%, oklch(0.55 0.12 155 / 0.18), transparent 70%)', pointerEvents: 'none' }}/>
      <div className="container-x" style={{ textAlign: 'center', maxWidth: 880 }}>
        <div data-anim="fade-up">
          <span className="eyebrow" style={{ justifyContent: 'center' }}>пробне · 150 ₴ · 30 хв</span>
          <h2 className="display display-xl" style={{ margin: '24px 0 20px' }}>
            Перший<br/><span style={{ color: 'var(--felt-2)', fontStyle: 'italic' }}>удар</span> — за вами.
          </h2>
          <p className="lede" style={{ margin: '0 auto 36px', textAlign: 'center', fontSize: 19 }}>
            Прийдіть на 30 хвилин — без зобов’язань. Якщо не сподобається, просто підете додому. Якщо сподобається — продовжимо разом.
          </p>
          <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
            <button className="btn btn-felt btn-lg" onClick={onBook}>Записатись на пробне <Icon.Arrow/></button>
            <a href="tel:+380634349623" className="btn btn-ghost btn-lg"><Icon.Phone/> +38 063 434 96 23</a>
          </div>
        </div>
      </div>
    </section>
  );
}

export function Footer() {
  return (
    <footer className="footer">
      <div className="container-x">
        <div className="footer-grid">
          <div>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: 12, marginBottom: 16 }}>
              <Icon.Logo style={{ color: 'var(--felt-2)', width: 36, height: 36 }}/>
              <span style={{ fontFamily: 'var(--f-display)', fontWeight: 700, fontSize: 20, letterSpacing: '-0.02em' }}>Rhino<span style={{ color: 'var(--ink-3)', fontWeight: 400 }}>·school</span></span>
            </div>
            <p style={{ color: 'var(--ink-3)', maxWidth: 320, lineHeight: 1.55, fontSize: 14 }}>
              Школа більярду в Києві. Авторська методика, тренер — майстер спорту України.
            </p>
            <div style={{ display: 'flex', gap: 8, marginTop: 18 }}>
              <a href="https://www.instagram.com/billiard_rhino_school/" target="_blank" rel="noreferrer" className="btn btn-ghost btn-sm" style={{ padding: 10 }}><Icon.IG/></a>
              <a href="tel:+380634349623" className="btn btn-ghost btn-sm" style={{ padding: 10 }}><Icon.Phone/></a>
            </div>
          </div>
          <div>
            <h5>Розділи</h5>
            <a href="/#program">Програма</a>
            <a href="/#pricing">Ціни</a>
            <a href="/#coach">Тренер</a>
            <a href="/#schedule">Розклад</a>
            <a href="/blog">Блог та відео</a>
          </div>
          <div>
            <h5>Школа</h5>
            <a href="/#reviews">Відгуки</a>
            <a href="/#contact">Локація</a>
            <a href="#">Корпоративні</a>
            <a href="#">Сертифікати</a>
          </div>
          <div>
            <h5>Зв’язок</h5>
            <a href="tel:+380634349623">+38 063 434 96 23</a>
            <a href="mailto:hello@rhino.school">hello@rhino.school</a>
            <a href="https://maps.app.goo.gl/xBvPu7u91r6JtG3dA" target="_blank" rel="noreferrer">Юр’ївська 29 · Xpark</a>
          </div>
        </div>
        <div style={{ borderTop: '1px solid var(--line-soft)', marginTop: 56, paddingTop: 24, display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 16, flexWrap: 'wrap', fontFamily: 'var(--f-mono)', fontSize: 11, color: 'var(--ink-4)', letterSpacing: '0.12em', textTransform: 'uppercase' }}>
          <span>© 2026 Rhino Billiard School · Київ</span>
          <span>зроблено з кием у руці · v2.0</span>
        </div>
      </div>
    </footer>
  );
}
