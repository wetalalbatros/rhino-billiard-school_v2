import { Icon } from './Icon';
import { PoolTableHero } from './PoolTableHero';

type Props = { onBook: () => void };

export function Hero({ onBook }: Props) {
  return (
    <section className="hero" id="top">
      <div className="container-x">
        <div className="hero-grid">
          <div data-anim="fade-up">
            <div className="tape" style={{ marginBottom: 26, maxWidth: '100%', whiteSpace: 'normal', textAlign: 'left', lineHeight: 1.5 }}>
              <span style={{ width: 6, height: 6, borderRadius: 999, background: 'var(--felt)', boxShadow: '0 0 8px var(--felt)', flexShrink: 0 }}/>
              <span>Школа працює · Xpark, Київ · 10:00–22:00</span>
            </div>
            <h1 className="display display-xl" style={{ marginBottom: 24 }}>
              Покладіть<br/>
              <span style={{ color: 'var(--felt-2)', fontStyle: 'italic', fontWeight: 700 }}>чорну</span> у кутову.
            </h1>
            <p className="lede" style={{ marginBottom: 36, fontSize: 18 }}>
              Школа більярду <strong style={{ color: 'var(--ink)' }}>Rhino</strong> — це 15 років авторської методики від майстра спорту <span className="mark">Валерія Ковтуна</span>. Від першого хвату кия до турнірної психології.
            </p>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12, marginBottom: 40 }}>
              <button className="btn btn-felt btn-lg" onClick={onBook}>
                Пробне за 150 ₴ <Icon.Arrow/>
              </button>
              <a href="#program" className="btn btn-ghost btn-lg">Як проходить навчання</a>
            </div>
            <div style={{ display: 'flex', gap: 28, flexWrap: 'wrap', alignItems: 'center' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <div style={{ display: 'flex' }}>
                  {[1,2,3,4].map(i => (
                    <div key={i} style={{ width: 32, height: 32, borderRadius: 999, background: ['#efc44a','#2962a8','#c8332a','#1f6b3a'][i-1], border: '2px solid var(--bg)', marginLeft: i > 1 ? -10 : 0, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontSize: 11, fontWeight: 700, fontFamily: 'var(--f-display)' }}>{i}</div>
                  ))}
                </div>
                <div>
                  <div style={{ display: 'flex', gap: 2, color: 'var(--brass)' }}>
                    {[...Array(5)].map((_,i)=><Icon.Star key={i}/>)}
                  </div>
                  <div style={{ fontFamily: 'var(--f-mono)', fontSize: 11, color: 'var(--ink-3)', letterSpacing: '0.1em' }}>200+ учнів · 4.9/5</div>
                </div>
              </div>
            </div>
          </div>
          <div data-anim="fade-up">
            <PoolTableHero onBook={onBook}/>
          </div>
        </div>
      </div>
      <div className="scroll-cue"><Icon.ArrowDown/> прокрутіть</div>
    </section>
  );
}
