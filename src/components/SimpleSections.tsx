export function Ticker() {
  const items = ['POOL', 'СНУКЕР', 'ПІРАМІДА', 'КАРАМБОЛЬ', '8-BALL', '9-BALL', 'СТРАЙК',
    'POOL', 'СНУКЕР', 'ПІРАМІДА', 'КАРАМБОЛЬ', '8-BALL', '9-BALL', 'СТРАЙК'];
  return (
    <div className="ticker">
      <div className="ticker-track">
        {items.map((t, i) => (<span key={i}>{t}<span className="dot"/></span>))}
      </div>
    </div>
  );
}

export function Stats() {
  const data = [
    { n: '23', s: '+', l: 'років досвіду тренера' },
    { n: '1000', s: '+', l: 'учнів школи' },
    { n: '16', s: '', l: 'майстрів спорту підготовлено' },
    { n: '4.9', s: '/5', l: 'середній рейтинг учнів' },
  ];
  return (
    <section style={{ padding: '60px 0', position: 'relative', zIndex: 1 }}>
      <div className="container-x">
        <div className="stats" data-anim="fade-up">
          {data.map((d, i) => (
            <div key={i} className="stat">
              <div className="num">{d.n}<small>{d.s}</small></div>
              <div className="lab">{d.l}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function Program() {
  const rows = [
    { idx: '01', title: 'Початківець', dur: '1–2 міс', tag: 'базова техніка', desc: 'Стійка, баланс, хват кия, прицілювання, перші впевнені прямі удари. До кінця циклу ви забиватимете кулю в лузу свідомо, а не на удачу.' },
    { idx: '02', title: 'Середній', dur: '3–6 міс', tag: 'позиційна гра', desc: 'Ефекти (верх/низ/правий/лівий), накати, відкати, серії з 3–5 куль, основи захисної гри, snooker-логіка.' },
    { idx: '03', title: 'Просунутий', dur: '6–12 міс', tag: 'турнірний рівень', desc: 'Складні комбінації, маси, аналіз гри, психологія тиску. Підготовка до обласних та всеукраїнських змагань.' },
    { idx: '04', title: 'Майстерність', dur: '12+ міс', tag: 'персональний коучинг', desc: 'Робота з відеоаналізом, індивідуальна стратегія, тренування на витривалість концентрації, спаринги з тренером.' },
  ];
  return (
    <section className="section" id="program">
      <div className="container-x">
        <div data-anim="fade-up" style={{ marginBottom: 56 }}>
          <span className="eyebrow">програма / 04 рівні</span>
          <h2 className="display display-lg" style={{ marginTop: 16 }}>Шлях від першого<br/>хвату кия — до турніру.</h2>
        </div>
        <div>
          {rows.map((r, i) => (
            <div key={i} className="prog-row" data-anim="fade-up">
              <div className="idx">{r.idx}</div>
              <div>
                <h3>{r.title}</h3>
                <p>{r.desc}</p>
              </div>
              <div className="meta">
                <span style={{ color: 'var(--felt-2)' }}>{r.dur}</span>
                <span style={{ color: 'var(--ink-4)' }}>·</span>
                <span>{r.tag}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
