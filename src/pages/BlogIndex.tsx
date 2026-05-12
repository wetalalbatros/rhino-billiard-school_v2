import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Icon } from '../components/Icon';
import { BlogNav, BlogFooter } from '../components/BlogChrome';
import { BLOG_POSTS, BLOG_VIDEOS } from '../data/blog';

function tabBtnStyle(active: boolean): React.CSSProperties {
  return {
    display: 'inline-flex', alignItems: 'center', gap: 8, padding: '10px 18px',
    border: 0, borderRadius: 999,
    background: active ? 'var(--felt)' : 'transparent',
    color: active ? 'oklch(0.18 0.04 155)' : 'var(--ink-2)',
    fontFamily: 'var(--f-body)', fontSize: 13, fontWeight: 600,
    cursor: 'pointer', transition: 'background .2s, color .2s',
  };
}

export default function BlogIndex() {
  const cats = ['Усі', ...Array.from(new Set(BLOG_POSTS.map(p => p.cat)))];
  const [activeCat, setActiveCat] = useState('Усі');
  const [tab, setTab] = useState<'articles' | 'videos'>('articles');
  const filtered = activeCat === 'Усі' ? BLOG_POSTS : BLOG_POSTS.filter(p => p.cat === activeCat);
  const featured = BLOG_POSTS[0];

  useEffect(() => {
    const els = document.querySelectorAll('[data-anim="fade-up"]');
    const io = new IntersectionObserver((entries) => {
      entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); } });
    }, { threshold: 0.12 });
    els.forEach(el => io.observe(el));
    return () => io.disconnect();
  }, [tab, activeCat]);

  return (
    <>
      <BlogNav/>
      <main>
        <section style={{ paddingTop: 140, paddingBottom: 60, position: 'relative', zIndex: 1 }}>
          <div className="container-x">
            <div data-anim="fade-up" style={{ display: 'grid', gridTemplateColumns: '1fr auto', alignItems: 'flex-end', gap: 40, marginBottom: 24, flexWrap: 'wrap' }}>
              <div>
                <span className="eyebrow">блог · корисні матеріали</span>
                <h1 className="display display-xl" style={{ marginTop: 18, marginBottom: 16 }}>
                  Корисно про<br/><span style={{ color: 'var(--felt-2)', fontStyle: 'italic' }}>більярд</span>.
                </h1>
                <p className="lede" style={{ fontSize: 18 }}>
                  Збірка статей і відео для тих, хто хоче розібратися в грі — від техніки удару до психології змагань.
                </p>
              </div>
              <div style={{ display: 'inline-flex', padding: 4, background: 'var(--surface)', border: '1px solid var(--line-soft)', borderRadius: 999 }}>
                <button onClick={() => setTab('articles')} style={tabBtnStyle(tab === 'articles')}>
                  <Icon.Article/> Статті · {BLOG_POSTS.length}
                </button>
                <button onClick={() => setTab('videos')} style={tabBtnStyle(tab === 'videos')}>
                  <Icon.Play/> Відео · {BLOG_VIDEOS.length}
                </button>
              </div>
            </div>
          </div>
        </section>

        {tab === 'articles' && (
          <>
            <section style={{ paddingBottom: 30 }}>
              <div className="container-x">
                <div data-anim="fade-up" style={{ display: 'flex', gap: 8, flexWrap: 'wrap', borderTop: '1px solid var(--line-soft)', paddingTop: 22 }}>
                  {cats.map(c => (
                    <button key={c} className={`chip ${activeCat === c ? 'active' : ''}`} onClick={() => setActiveCat(c)}>{c}</button>
                  ))}
                </div>
              </div>
            </section>
            {featured && activeCat === 'Усі' && (
              <section style={{ paddingBottom: 60 }}>
                <div className="container-x">
                  <Link data-anim="fade-up" to={`/blog/${featured.slug}`} className="card featured-blog-card" style={{ display: 'grid', gridTemplateColumns: '1.1fr 1fr', gap: 0, textDecoration: 'none', color: 'inherit', overflow: 'hidden', minHeight: 360 }}>
                    <div style={{ minHeight: 360, backgroundImage: `linear-gradient(120deg, oklch(0.16 0.013 150 / 0.4) 0%, transparent 60%), url(${featured.cover})`, backgroundSize: 'cover', backgroundPosition: 'center', position: 'relative' }}>
                      <span style={{ position: 'absolute', top: 18, left: 18 }} className="tape tape-brass">★ Головна стаття</span>
                    </div>
                    <div style={{ padding: '40px 36px', display: 'flex', flexDirection: 'column', gap: 16, justifyContent: 'center' }}>
                      <div style={{ display: 'flex', gap: 10, fontFamily: 'var(--f-mono)', fontSize: 11, letterSpacing: '0.14em', color: 'var(--ink-3)', textTransform: 'uppercase' }}>
                        <span style={{ color: 'var(--felt-2)' }}>{featured.cat}</span><span>·</span><span>{featured.date}</span><span>·</span><span>{featured.read}</span>
                      </div>
                      <h2 className="display display-md" style={{ margin: 0 }}>{featured.title}</h2>
                      <p style={{ color: 'var(--ink-2)', margin: 0, lineHeight: 1.55, fontSize: 16 }}>{featured.excerpt}</p>
                      <div style={{ marginTop: 8, display: 'inline-flex', alignItems: 'center', gap: 8, color: 'var(--felt-2)', fontSize: 14, fontWeight: 600 }}>Читати статтю <Icon.Arrow/></div>
                    </div>
                  </Link>
                </div>
                <style>{`@media (max-width: 880px) { .featured-blog-card { grid-template-columns: 1fr !important; } }`}</style>
              </section>
            )}
            <section style={{ paddingBottom: 100 }}>
              <div className="container-x">
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 18 }}>
                  {(activeCat === 'Усі' ? filtered.slice(1) : filtered).map((a) => (
                    <Link key={a.slug} data-anim="fade-up" to={`/blog/${a.slug}`} className="card" style={{ textDecoration: 'none', color: 'inherit', display: 'flex', flexDirection: 'column' }}>
                      <div style={{ aspectRatio: '16/10', borderTopLeftRadius: 'var(--r-lg)', borderTopRightRadius: 'var(--r-lg)', position: 'relative', backgroundImage: `linear-gradient(180deg, transparent 50%, oklch(0.16 0.013 150 / 0.85)), url(${a.cover})`, backgroundSize: 'cover', backgroundPosition: 'center' }}>
                        <span style={{ position: 'absolute', top: 12, left: 12 }} className="tape">{a.cat}</span>
                      </div>
                      <div style={{ padding: 22, display: 'flex', flexDirection: 'column', gap: 8, flex: 1 }}>
                        <div style={{ display: 'flex', gap: 10, fontFamily: 'var(--f-mono)', fontSize: 11, letterSpacing: '0.12em', color: 'var(--ink-4)', textTransform: 'uppercase' }}>
                          <span>{a.date}</span><span>·</span><span>{a.read}</span>
                        </div>
                        <h3 style={{ fontFamily: 'var(--f-display)', fontSize: 21, fontWeight: 600, letterSpacing: '-0.015em', margin: 0, lineHeight: 1.2 }}>{a.title}</h3>
                        <p style={{ color: 'var(--ink-3)', margin: 0, lineHeight: 1.5, fontSize: 14 }}>{a.excerpt}</p>
                        <div style={{ marginTop: 'auto', paddingTop: 12, display: 'inline-flex', alignItems: 'center', gap: 6, color: 'var(--felt-2)', fontSize: 13, fontWeight: 600 }}>Читати <Icon.Arrow/></div>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            </section>
          </>
        )}

        {tab === 'videos' && (
          <section style={{ paddingBottom: 100 }}>
            <div className="container-x">
              <div data-anim="fade-up" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: 18 }}>
                {BLOG_VIDEOS.map((v) => (
                  <a key={v.id} href={`https://www.youtube.com/watch?v=${v.youtubeId}`} target="_blank" rel="noreferrer" className="card" style={{ textDecoration: 'none', color: 'inherit', display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
                    <div style={{ aspectRatio: '16/9', position: 'relative', overflow: 'hidden' }}>
                      <img src={`https://img.youtube.com/vi/${v.youtubeId}/hqdefault.jpg`} alt={v.t} style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}/>
                      <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <div style={{ width: 72, height: 72, borderRadius: 999, background: 'oklch(0 0 0 / 0.6)', backdropFilter: 'blur(6px)', display: 'flex', alignItems: 'center', justifyContent: 'center', border: '1px solid rgba(255,255,255,0.18)', color: '#fff' }}>
                          <Icon.Play style={{ width: 26, height: 26, transform: 'translateX(2px)' }}/>
                        </div>
                      </div>
                      <span style={{ position: 'absolute', top: 12, left: 12 }} className="tape">{v.cat}</span>
                      <span style={{ position: 'absolute', bottom: 12, right: 12, fontFamily: 'var(--f-mono)', fontSize: 11, padding: '4px 10px', background: 'rgba(0,0,0,0.6)', borderRadius: 999, color: '#fff', letterSpacing: '0.04em' }}>{v.dur}</span>
                    </div>
                    <div style={{ padding: 22, display: 'flex', flexDirection: 'column', gap: 8 }}>
                      <h3 style={{ fontFamily: 'var(--f-display)', fontSize: 20, fontWeight: 600, letterSpacing: '-0.015em', margin: 0, lineHeight: 1.2 }}>{v.t}</h3>
                      <p style={{ color: 'var(--ink-3)', margin: 0, lineHeight: 1.5, fontSize: 14 }}>{v.d}</p>
                    </div>
                  </a>
                ))}
              </div>
            </div>
          </section>
        )}

        <section style={{ padding: '80px 0', borderTop: '1px solid var(--line-soft)', background: 'var(--bg-2)' }}>
          <div className="container-x" style={{ textAlign: 'center', maxWidth: 720 }}>
            <span className="eyebrow" style={{ justifyContent: 'center' }}>від теорії — до практики</span>
            <h2 className="display display-lg" style={{ margin: '20px 0' }}>Прочитали? Час<br/>взяти кий до рук.</h2>
            <p className="lede" style={{ margin: '0 auto 28px' }}>
              Жодна стаття не замінить хвилину з тренером біля столу. Запишіться на пробне за 150 ₴.
            </p>
            <Link to="/#schedule" className="btn btn-felt btn-lg">Записатись на пробне <Icon.Arrow/></Link>
          </div>
        </section>
      </main>
      <BlogFooter/>
    </>
  );
}
