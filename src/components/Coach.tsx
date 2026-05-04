import { Icon } from './Icon';

export function Coach() {
  return (
    <section className="section" id="coach" style={{ background: 'var(--bg-2)' }}>
      <div className="container-x">
        <div data-anim="fade-up" style={{ marginBottom: 48 }}>
          <span className="eyebrow">тренер</span>
          <h2 className="display display-lg" style={{ marginTop: 16 }}>
            Ваш наставник —<br/><span style={{ color: 'var(--brass-2)' }}>Валерій Ковтун</span>.
          </h2>
        </div>
        <div className="coach-card" data-anim="fade-up">
          <div className="coach-img placeholder-img">
            <span style={{ position: 'absolute', top: 18, left: 18 }} className="tape tape-brass">portrait · drop here</span>
            <span>фото тренера 4:5 · 1200×1500</span>
          </div>
          <div className="coach-info">
            <div className="tape" style={{ alignSelf: 'flex-start' }}>Майстер спорту України</div>
            <h3 className="display display-md" style={{ margin: 0 }}>«Хороший удар — це не сила. Це завчена тиша.»</h3>
            <p style={{ color: 'var(--ink-2)', lineHeight: 1.6, margin: 0 }}>
              15 років особистої практики у пулі, російській піраміді та снукері. Тренує дітей з 8 років і дорослих, які тільки беруть кий уперше. Розробив авторську 30-денну методику входу в гру.
            </p>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16, padding: '20px 0', borderTop: '1px solid var(--line-soft)', borderBottom: '1px solid var(--line-soft)' }}>
              {[
                { n: '15', l: 'років тренує' },
                { n: '23', l: 'призи на турнірах' },
                { n: '200+', l: 'випускників' },
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
