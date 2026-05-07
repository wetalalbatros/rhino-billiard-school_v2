import { Icon } from './Icon';

export function Coach() {
  return (
    <section className="section" id="coach" style={{ background: 'var(--bg-2)' }}>
      <div className="container-x">
        <div data-anim="fade-up" style={{ marginBottom: 48 }}>
          <span className="eyebrow">тренер</span>
          <h2 className="display display-lg" style={{ marginTop: 16 }}>
            Ваш наставник —<br/><span style={{ color: 'var(--brass-2)' }}>Ковтун Валерій Васильович</span>.
          </h2>
        </div>
        <div className="coach-card" data-anim="fade-up">
          <div className="coach-img">
            <img
              src={`${import.meta.env.BASE_URL}coach.jpg`}
              alt="Ковтун Валерій Васильович — професійний тренер з більярду"
              style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
            />
          </div>
          <div className="coach-info">
            <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
              <div className="tape tape-brass" style={{ alignSelf: 'flex-start' }}>Майстер спорту України</div>
              <div className="tape" style={{ alignSelf: 'flex-start' }}>Екс-тренер збірної України</div>
            </div>
            <h3 className="display display-md" style={{ margin: 0 }}>«Мій підхід — це поєднання техніки, тактики та психології гри.»</h3>
            <p style={{ color: 'var(--ink-2)', lineHeight: 1.6, margin: 0 }}>
              Більше 20 років тренерської практики (з 2000 року). Підготував 16 майстрів спорту та виховав чемпіонів України, Європи і світу. Навчає дітей від 8 років і дорослих — від новачків до спортсменів високого рівня.
            </p>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16, padding: '20px 0', borderTop: '1px solid var(--line-soft)', borderBottom: '1px solid var(--line-soft)' }}>
              {[
                { n: '20+', l: 'років тренує' },
                { n: '16', l: 'майстрів спорту' },
                { n: '1000+', l: 'учнів' },
              ].map((s, i) => (
                <div key={i}>
                  <div style={{ fontFamily: 'var(--f-display)', fontSize: 32, fontWeight: 700, letterSpacing: '-0.03em' }}>{s.n}</div>
                  <div style={{ fontFamily: 'var(--f-mono)', fontSize: 10, letterSpacing: '0.16em', textTransform: 'uppercase', color: 'var(--ink-3)' }}>{s.l}</div>
                </div>
              ))}
            </div>
            <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
              <a href="https://www.instagram.com/billiard_rhino_school/" target="_blank" rel="noreferrer" className="btn btn-ghost btn-sm"><Icon.IG/> @billiard_rhino_school</a>
              <a href="https://t.me/billiard_rhino_school" target="_blank" rel="noreferrer" className="btn btn-ghost btn-sm"><Icon.Tg/> Telegram-канал</a>
              <a href="tel:+380634349623" className="btn btn-ghost btn-sm"><Icon.Phone/> +38 063 434 96 23</a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
