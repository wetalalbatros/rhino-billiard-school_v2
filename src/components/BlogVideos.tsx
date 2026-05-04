import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Icon } from './Icon';
import { BLOG_POSTS, BLOG_VIDEOS } from '../data/blog';

function tabBtn(active: boolean): React.CSSProperties {
  return {
    display: 'inline-flex', alignItems: 'center', gap: 8, padding: '10px 18px',
    border: 0, borderRadius: 999,
    background: active ? 'var(--felt)' : 'transparent',
    color: active ? 'oklch(0.18 0.04 155)' : 'var(--ink-2)',
    fontFamily: 'var(--f-body)', fontSize: 13, fontWeight: 600,
    cursor: 'pointer', transition: 'background .2s, color .2s',
  };
}

export function BlogVideos() {
  const [tab, setTab] = useState<'articles' | 'videos'>('articles');
  const articles = BLOG_POSTS.slice(0, 3);
  const videos = BLOG_VIDEOS.slice(0, 4);

  return (
    <section className="section" id="blog">
      <div className="container-x">
        <div data-anim="fade-up" style={{ marginBottom: 40, display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', gap: 32, flexWrap: 'wrap' }}>
          <div>
            <span className="eyebrow">матеріали від тренера</span>
            <h2 className="display display-lg" style={{ marginTop: 16 }}>Знання<br/>поза столом.</h2>
            <p className="lede" style={{ marginTop: 16, fontSize: 17 }}>
              Авторські статті та відео від Валерія — те, що зазвичай тренери розповідають лише на платних заняттях.
            </p>
          </div>
          <div style={{ display: 'inline-flex', padding: 4, background: 'var(--surface)', border: '1px solid var(--line-soft)', borderRadius: 999 }}>
            <button onClick={() => setTab('articles')} style={tabBtn(tab === 'articles')}>
              <Icon.Article/> Статті · {BLOG_POSTS.length}
            </button>
            <button onClick={() => setTab('videos')} style={tabBtn(tab === 'videos')}>
              <Icon.Play/> Відео · {BLOG_VIDEOS.length}
            </button>
          </div>
        </div>
        {tab === 'articles' ? (
          <div data-anim="fade-up" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 18 }}>
            {articles.map((a) => (
              <Link key={a.slug} to={`/blog/${a.slug}`} className="card" style={{ textDecoration: 'none', color: 'inherit', display: 'flex', flexDirection: 'column', gap: 14 }}>
                <div style={{ aspectRatio: '16/10', borderTopLeftRadius: 'var(--r-lg)', borderTopRightRadius: 'var(--r-lg)', position: 'relative', backgroundImage: `linear-gradient(180deg, transparent 40%, oklch(0.16 0.013 150 / 0.85)), url(${a.cover})`, backgroundSize: 'cover', backgroundPosition: 'center' }}>
                  <span style={{ position: 'absolute', top: 12, left: 12 }} className="tape">{a.cat}</span>
                </div>
                <div style={{ padding: '0 22px 22px', display: 'flex', flexDirection: 'column', gap: 8 }}>
                  <div style={{ display: 'flex', gap: 10, fontFamily: 'var(--f-mono)', fontSize: 11, letterSpacing: '0.12em', color: 'var(--ink-4)', textTransform: 'uppercase' }}>
                    <span>{a.date}</span><span>·</span><span>{a.read}</span>
                  </div>
                  <h3 style={{ fontFamily: 'var(--f-display)', fontSize: 21, fontWeight: 600, letterSpacing: '-0.015em', margin: 0, lineHeight: 1.2 }}>{a.title}</h3>
                  <p style={{ color: 'var(--ink-3)', margin: 0, lineHeight: 1.5, fontSize: 14 }}>{a.excerpt}</p>
                  <div style={{ marginTop: 8, display: 'inline-flex', alignItems: 'center', gap: 6, color: 'var(--felt-2)', fontSize: 13, fontWeight: 600 }}>Читати <Icon.Arrow/></div>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <div data-anim="fade-up" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 18 }}>
            {videos.map((v) => (
              <a key={v.id} href="#" className="card" style={{ textDecoration: 'none', color: 'inherit', display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
                <div className="placeholder-img" style={{ aspectRatio: '16/9', position: 'relative' }}>
                  <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <div style={{ width: 64, height: 64, borderRadius: 999, background: 'oklch(0 0 0 / 0.6)', backdropFilter: 'blur(6px)', display: 'flex', alignItems: 'center', justifyContent: 'center', border: '1px solid rgba(255,255,255,0.18)', color: '#fff' }}>
                      <Icon.Play style={{ width: 22, height: 22, transform: 'translateX(2px)' }}/>
                    </div>
                  </div>
                  <span style={{ position: 'absolute', top: 12, left: 12 }} className="tape">{v.cat}</span>
                  <span style={{ position: 'absolute', bottom: 12, right: 12, fontFamily: 'var(--f-mono)', fontSize: 11, padding: '4px 10px', background: 'rgba(0,0,0,0.6)', borderRadius: 999, color: '#fff', letterSpacing: '0.04em' }}>{v.dur}</span>
                </div>
                <div style={{ padding: 22, display: 'flex', flexDirection: 'column', gap: 8 }}>
                  <h3 style={{ fontFamily: 'var(--f-display)', fontSize: 19, fontWeight: 600, letterSpacing: '-0.015em', margin: 0, lineHeight: 1.2 }}>{v.t}</h3>
                  <p style={{ color: 'var(--ink-3)', margin: 0, lineHeight: 1.5, fontSize: 14 }}>{v.d}</p>
                </div>
              </a>
            ))}
          </div>
        )}
        <div data-anim="fade-up" style={{ textAlign: 'center', marginTop: 32 }}>
          <Link to="/blog" className="btn btn-ghost">Усі матеріали школи <Icon.Arrow/></Link>
        </div>
      </div>
    </section>
  );
}
