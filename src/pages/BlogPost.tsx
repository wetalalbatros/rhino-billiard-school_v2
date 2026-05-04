import { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Icon } from '../components/Icon';
import { BlogNav, BlogFooter } from '../components/BlogChrome';
import { BLOG_POSTS } from '../data/blog';

export default function BlogPost() {
  const { slug } = useParams<{ slug: string }>();
  const post = BLOG_POSTS.find(p => p.slug === slug) || BLOG_POSTS[0];
  const idx = BLOG_POSTS.findIndex(p => p.slug === post.slug);
  const prev = idx > 0 ? BLOG_POSTS[idx - 1] : null;
  const next = idx < BLOG_POSTS.length - 1 ? BLOG_POSTS[idx + 1] : null;
  const related = BLOG_POSTS.filter(p => p.slug !== post.slug && p.cat === post.cat).slice(0, 3);
  const fallback = BLOG_POSTS.filter(p => p.slug !== post.slug).slice(0, 3);
  const recommended = related.length >= 2 ? related : fallback;

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior });
    const els = document.querySelectorAll('[data-anim="fade-up"]');
    const io = new IntersectionObserver((entries) => {
      entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); } });
    }, { threshold: 0.12 });
    els.forEach(el => io.observe(el));
    return () => io.disconnect();
  }, [post.slug]);

  return (
    <>
      <BlogNav/>
      <main>
        <section style={{ paddingTop: 120, paddingBottom: 0, position: 'relative', zIndex: 1 }}>
          <div className="container-x" style={{ maxWidth: 920 }}>
            <div data-anim="fade-up" style={{ display: 'flex', gap: 8, fontFamily: 'var(--f-mono)', fontSize: 11, letterSpacing: '0.14em', color: 'var(--ink-3)', textTransform: 'uppercase', marginBottom: 28, alignItems: 'center', flexWrap: 'wrap' }}>
              <Link to="/" style={{ color: 'var(--ink-3)', textDecoration: 'none' }}>Головна</Link>
              <span>/</span>
              <Link to="/blog" style={{ color: 'var(--ink-3)', textDecoration: 'none' }}>Блог</Link>
              <span>/</span>
              <span style={{ color: 'var(--felt-2)' }}>{post.cat}</span>
            </div>
            <div data-anim="fade-up" style={{ display: 'flex', gap: 12, fontFamily: 'var(--f-mono)', fontSize: 11, letterSpacing: '0.14em', color: 'var(--ink-3)', textTransform: 'uppercase', marginBottom: 18 }}>
              <span style={{ color: 'var(--felt-2)' }}>{post.cat}</span><span>·</span><span>{post.date}</span><span>·</span><span>{post.read}</span>
            </div>
            <h1 data-anim="fade-up" className="display display-xl" style={{ marginBottom: 20, lineHeight: 0.98 }}>{post.title}</h1>
            <p data-anim="fade-up" className="lede" style={{ fontSize: 19, marginBottom: 36 }}>{post.excerpt}</p>
            <div data-anim="fade-up" style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 40, paddingBottom: 32, borderBottom: '1px solid var(--line-soft)' }}>
              <div style={{ width: 48, height: 48, borderRadius: 999, background: 'linear-gradient(135deg, var(--felt-deep), var(--felt))', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'var(--f-display)', fontWeight: 700, fontSize: 16, color: 'var(--ink)' }}>ВК</div>
              <div>
                <div style={{ fontFamily: 'var(--f-display)', fontWeight: 600, fontSize: 16 }}>Валерій Ковтун</div>
                <div style={{ fontFamily: 'var(--f-mono)', fontSize: 11, color: 'var(--ink-4)', letterSpacing: '0.14em', textTransform: 'uppercase', marginTop: 2 }}>тренер · майстер спорту</div>
              </div>
            </div>
          </div>
        </section>

        <section style={{ paddingBottom: 60 }}>
          <div className="container-x" style={{ maxWidth: 1100 }}>
            <div data-anim="fade-up" style={{ aspectRatio: '21/9', borderRadius: 'var(--r-xl)', overflow: 'hidden', backgroundImage: `url(${post.cover})`, backgroundSize: 'cover', backgroundPosition: 'center', border: '1px solid var(--line-soft)', position: 'relative' }}>
              <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(180deg, transparent 60%, oklch(0.13 0.012 150 / 0.6))' }}/>
              <span style={{ position: 'absolute', top: 18, left: 18 }} className="tape tape-brass">{post.cat}</span>
            </div>
          </div>
        </section>

        <section style={{ paddingBottom: 60 }}>
          <div className="container-x" style={{ maxWidth: 760 }}>
            {post.content.map((s, i) => (
              <div key={i} data-anim="fade-up" style={{ marginBottom: 36 }}>
                <h2 className="display" style={{ fontSize: 'clamp(24px, 3vw, 32px)', fontWeight: 600, letterSpacing: '-0.02em', margin: '0 0 14px', display: 'grid', gridTemplateColumns: 'auto 1fr', alignItems: 'baseline', columnGap: 14 }}>
                  <span style={{ fontFamily: 'var(--f-mono)', fontSize: 13, color: 'var(--felt-2)', letterSpacing: '0.12em', fontWeight: 500 }}>{String(i+1).padStart(2,'0')}.</span>
                  <span>{s.h}</span>
                </h2>
                <p style={{ color: 'var(--ink-2)', lineHeight: 1.7, fontSize: 17, margin: 0, textWrap: 'pretty' }}>{s.p}</p>
              </div>
            ))}
            <div data-anim="fade-up" className="card card-pad" style={{ marginTop: 48, background: 'linear-gradient(135deg, oklch(0.22 0.04 155), oklch(0.16 0.013 150))', borderColor: 'oklch(0.55 0.12 155 / 0.4)' }}>
              <span className="eyebrow">від тренера</span>
              <p className="display" style={{ fontSize: 'clamp(22px, 2.6vw, 28px)', fontWeight: 500, letterSpacing: '-0.015em', lineHeight: 1.3, margin: '14px 0 24px', textWrap: 'pretty' }}>
                «Прочитати — це 10% шляху. Решта 90% — стіл, кий і чесна година роботи. Ласкаво прошу до залу.»
              </p>
              <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
                <Link to="/#schedule" className="btn btn-felt">Записатись на заняття <Icon.Arrow/></Link>
                <a href="https://t.me/billiard_rhino_school" target="_blank" rel="noreferrer" className="btn btn-ghost"><Icon.Tg/> Спитати в Telegram</a>
              </div>
            </div>

            <div data-anim="fade-up" style={{ marginTop: 56, display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
              {prev ? (
                <Link to={`/blog/${prev.slug}`} className="card card-pad" style={{ textDecoration: 'none', color: 'inherit' }}>
                  <span style={{ fontFamily: 'var(--f-mono)', fontSize: 11, letterSpacing: '0.16em', color: 'var(--ink-4)', textTransform: 'uppercase' }}>← попередня</span>
                  <div style={{ fontFamily: 'var(--f-display)', fontSize: 17, fontWeight: 600, letterSpacing: '-0.015em', marginTop: 10, lineHeight: 1.3 }}>{prev.title}</div>
                </Link>
              ) : <div/>}
              {next ? (
                <Link to={`/blog/${next.slug}`} className="card card-pad" style={{ textDecoration: 'none', color: 'inherit', textAlign: 'right' }}>
                  <span style={{ fontFamily: 'var(--f-mono)', fontSize: 11, letterSpacing: '0.16em', color: 'var(--ink-4)', textTransform: 'uppercase' }}>наступна →</span>
                  <div style={{ fontFamily: 'var(--f-display)', fontSize: 17, fontWeight: 600, letterSpacing: '-0.015em', marginTop: 10, lineHeight: 1.3 }}>{next.title}</div>
                </Link>
              ) : <div/>}
            </div>
          </div>
        </section>

        {recommended.length > 0 && (
          <section style={{ padding: '80px 0', borderTop: '1px solid var(--line-soft)', background: 'var(--bg-2)' }}>
            <div className="container-x">
              <div data-anim="fade-up" style={{ marginBottom: 32 }}>
                <span className="eyebrow">читайте далі</span>
                <h3 className="display display-md" style={{ marginTop: 14 }}>Схожі матеріали</h3>
              </div>
              <div data-anim="fade-up" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 18 }}>
                {recommended.map((a) => (
                  <Link key={a.slug} to={`/blog/${a.slug}`} className="card" style={{ textDecoration: 'none', color: 'inherit', display: 'flex', flexDirection: 'column' }}>
                    <div style={{ aspectRatio: '16/10', borderTopLeftRadius: 'var(--r-lg)', borderTopRightRadius: 'var(--r-lg)', backgroundImage: `linear-gradient(180deg, transparent 50%, oklch(0.16 0.013 150 / 0.85)), url(${a.cover})`, backgroundSize: 'cover', backgroundPosition: 'center', position: 'relative' }}>
                      <span style={{ position: 'absolute', top: 12, left: 12 }} className="tape">{a.cat}</span>
                    </div>
                    <div style={{ padding: 22, display: 'flex', flexDirection: 'column', gap: 8 }}>
                      <div style={{ fontFamily: 'var(--f-mono)', fontSize: 11, color: 'var(--ink-4)', letterSpacing: '0.12em', textTransform: 'uppercase' }}>{a.date} · {a.read}</div>
                      <h4 style={{ fontFamily: 'var(--f-display)', fontSize: 19, fontWeight: 600, letterSpacing: '-0.015em', margin: 0, lineHeight: 1.2 }}>{a.title}</h4>
                      <p style={{ color: 'var(--ink-3)', margin: 0, lineHeight: 1.5, fontSize: 14 }}>{a.excerpt}</p>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </section>
        )}
      </main>
      <BlogFooter/>
    </>
  );
}
