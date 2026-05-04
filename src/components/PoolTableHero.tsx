import { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { Icon } from './Icon';

const TABLE_W = 800, TABLE_H = 480;
const BALL_R = 16;
const POCKET_R = 26;
const FRICTION = 0.985;
const STOP_THRESHOLD = 0.05;
const RAIL = 46; // wooden rail width
const POCKETS: [number, number][] = [
  [RAIL, RAIL], [TABLE_W / 2, RAIL - 6], [TABLE_W - RAIL, RAIL],
  [RAIL, TABLE_H - RAIL], [TABLE_W / 2, TABLE_H - RAIL + 6], [TABLE_W - RAIL, TABLE_H - RAIL],
];
const MARGIN = 70;

// Felt area bounds (inside the rail)
const FX = RAIL, FY = RAIL, FW = TABLE_W - RAIL * 2, FH = TABLE_H - RAIL * 2;

type BallDef = { id: string; x: number; y: number; color: string; n: string; txt?: string };
type Ball = BallDef & { vx: number; vy: number; sunk: boolean };

function randomBallPos(existing: { x: number; y: number }[] = []): { x: number; y: number } {
  for (let attempt = 0; attempt < 400; attempt++) {
    const x = MARGIN + Math.random() * (TABLE_W - MARGIN * 2);
    const y = MARGIN + Math.random() * (TABLE_H - MARGIN * 2);
    if (POCKETS.some(([px, py]) => Math.hypot(x - px, y - py) < POCKET_R + BALL_R + 18)) continue;
    if (existing.some(b => Math.hypot(x - b.x, y - b.y) < BALL_R * 2 + 70)) continue;
    return { x, y };
  }
  return { x: TABLE_W / 2 + (existing.length ? 120 : -120), y: TABLE_H / 2 };
}

function makeBalls(): Ball[] {
  const cuePos = randomBallPos();
  const eightPos = randomBallPos([cuePos]);
  return [
    { id: 'cue', x: cuePos.x, y: cuePos.y, color: 'cue', n: '', vx: 0, vy: 0, sunk: false },
    { id: '8', x: eightPos.x, y: eightPos.y, color: '#111', n: '8', txt: '#fff', vx: 0, vy: 0, sunk: false },
  ];
}

type Props = { onBook?: () => void };

export function PoolTableHero({ onBook }: Props = {}) {
  const [showPromo, setShowPromo] = useState(false);
  const svgRef = useRef<SVGSVGElement | null>(null);
  const [balls, setBalls] = useState<Ball[]>(() => makeBalls());
  const [aiming, setAiming] = useState<{ x: number; y: number } | null>(null);
  const [dragging, setDragging] = useState(false);
  const [power, setPower] = useState(0);
  const [potted, setPotted] = useState<string[]>([]);
  const ballsRef = useRef<Ball[]>(balls);
  const aimingRef = useRef<{ x: number; y: number } | null>(null);
  const draggingRef = useRef(false);
  const rafRef = useRef<number | null>(null);
  const promoTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  ballsRef.current = balls;
  aimingRef.current = aiming;

  const toSvg = (e: MouseEvent | TouchEvent | any) => {
    const svg = svgRef.current; if (!svg) return null;
    const pt = svg.createSVGPoint();
    const t = (e as TouchEvent).touches?.[0] || (e as MouseEvent);
    pt.x = t.clientX; pt.y = t.clientY;
    return pt.matrixTransform(svg.getScreenCTM()!.inverse());
  };

  const moving = () => ballsRef.current.some(b => !b.sunk && (Math.abs(b.vx) > STOP_THRESHOLD || Math.abs(b.vy) > STOP_THRESHOLD));

  const step = () => {
    const next: Ball[] = ballsRef.current.map(b => ({ ...b }));
    for (const b of next) {
      if (b.sunk) continue;
      b.x += b.vx; b.y += b.vy;
      b.vx *= FRICTION; b.vy *= FRICTION;
      if (Math.abs(b.vx) < STOP_THRESHOLD) b.vx = 0;
      if (Math.abs(b.vy) < STOP_THRESHOLD) b.vy = 0;
      if (b.x < RAIL + BALL_R) { b.x = RAIL + BALL_R; b.vx = -b.vx * 0.85; }
      if (b.x > TABLE_W - RAIL - BALL_R) { b.x = TABLE_W - RAIL - BALL_R; b.vx = -b.vx * 0.85; }
      if (b.y < RAIL + BALL_R) { b.y = RAIL + BALL_R; b.vy = -b.vy * 0.85; }
      if (b.y > TABLE_H - RAIL - BALL_R) { b.y = TABLE_H - RAIL - BALL_R; b.vy = -b.vy * 0.85; }
    }
    for (let i = 0; i < next.length; i++) {
      for (let j = i + 1; j < next.length; j++) {
        const a = next[i], b = next[j];
        if (a.sunk || b.sunk) continue;
        const dx = b.x - a.x, dy = b.y - a.y;
        const d = Math.hypot(dx, dy) || 0.0001;
        if (d < BALL_R * 2) {
          const nx = dx / d, ny = dy / d;
          const overlap = (BALL_R * 2 - d) / 2;
          a.x -= nx * overlap; a.y -= ny * overlap;
          b.x += nx * overlap; b.y += ny * overlap;
          const dvx = b.vx - a.vx, dvy = b.vy - a.vy;
          const along = dvx * nx + dvy * ny;
          if (along < 0) {
            const imp = along;
            a.vx += imp * nx; a.vy += imp * ny;
            b.vx -= imp * nx; b.vy -= imp * ny;
          }
        }
      }
    }
    const newlySunk: string[] = [];
    for (const b of next) {
      if (b.sunk) continue;
      for (const [px, py] of POCKETS) {
        if (Math.hypot(b.x - px, b.y - py) < POCKET_R) {
          b.sunk = true; b.vx = 0; b.vy = 0;
          if (b.id !== 'cue') {
            newlySunk.push(b.id);
          } else {
            const pos = randomBallPos(next.filter(x => !x.sunk && x.id !== 'cue'));
            b.x = pos.x; b.y = pos.y; b.sunk = false;
          }
          break;
        }
      }
    }
    if (newlySunk.length) {
      setPotted(p => [...p, ...newlySunk]);
      if (newlySunk.includes('8')) {
        promoTimerRef.current = setTimeout(() => setShowPromo(true), 600);
      }
    }
    setBalls(next);
    if (moving()) {
      rafRef.current = requestAnimationFrame(step);
    } else {
      rafRef.current = null;
    }
  };

  const shoot = () => {
    if (!draggingRef.current) return;
    setDragging(false);
    draggingRef.current = false;
    const cue = ballsRef.current.find(b => b.id === 'cue')!;
    const aim = aimingRef.current;
    if (aim) {
      const dx = aim.x - cue.x, dy = aim.y - cue.y;
      const d = Math.hypot(dx, dy);
      if (d > 6) {
        const force = Math.min(d / 6, 20);
        const next = ballsRef.current.map(b =>
          b.id === 'cue' ? { ...b, vx: -(dx / d) * force, vy: -(dy / d) * force } : b
        );
        ballsRef.current = next;
        setBalls(next);
        if (!rafRef.current) rafRef.current = requestAnimationFrame(step);
      }
    }
    setAiming(null);
    setPower(0);
  };

  useEffect(() => {
    const handleMove = (e: MouseEvent) => {
      if (!draggingRef.current) return;
      const p = toSvg(e); if (!p) return;
      setAiming({ x: p.x, y: p.y });
      const cue = ballsRef.current.find(b => b.id === 'cue')!;
      setPower(Math.min(1, Math.hypot(p.x - cue.x, p.y - cue.y) / 280));
    };
    document.addEventListener('mousemove', handleMove);
    document.addEventListener('mouseup', shoot);
    return () => {
      document.removeEventListener('mousemove', handleMove);
      document.removeEventListener('mouseup', shoot);
    };
  }, []);

  useEffect(() => () => {
    if (rafRef.current) cancelAnimationFrame(rafRef.current);
    if (promoTimerRef.current) clearTimeout(promoTimerRef.current);
  }, []);

  const onDown = (e: any) => {
    if (moving()) return;
    const p = toSvg(e); if (!p) return;
    const cue = ballsRef.current.find(b => b.id === 'cue')!;
    if (Math.hypot(p.x - cue.x, p.y - cue.y) < BALL_R + 8) {
      setDragging(true);
      draggingRef.current = true;
      setAiming({ x: p.x, y: p.y });
      e.preventDefault?.();
    }
  };

  const onMoveTouch = (e: any) => {
    if (!draggingRef.current) return;
    const p = toSvg(e); if (!p) return;
    setAiming({ x: p.x, y: p.y });
    const cue = ballsRef.current.find(b => b.id === 'cue')!;
    setPower(Math.min(1, Math.hypot(p.x - cue.x, p.y - cue.y) / 280));
  };

  const reset = () => {
    if (rafRef.current) { cancelAnimationFrame(rafRef.current); rafRef.current = null; }
    setBalls(makeBalls());
    setPotted([]);
    setShowPromo(false);
    setAiming(null); setPower(0); setDragging(false); draggingRef.current = false;
  };

  const cue = balls.find(b => b.id === 'cue')!;
  const aimDx = aiming ? aiming.x - cue.x : 0;
  const aimDy = aiming ? aiming.y - cue.y : 0;
  const aimLen = Math.hypot(aimDx, aimDy);

  return (
    <div>
      {/* ── Controls bar (above table) ── */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 22, gap: 8 }}>
        <div style={{ display: 'flex', gap: 8, alignItems: 'center', flexWrap: 'wrap' }}>
          <div className="tape" style={{ gap: 8 }}>
            <span style={{ width: 7, height: 7, borderRadius: 999, background: '#5fb87a', boxShadow: '0 0 7px #5fb87a88', flexShrink: 0 }}/>
            Live · потягни кулю та пусти
          </div>
          {potted.length > 0 && (
            <div className="tape" style={{ color: '#5fb87a', borderColor: 'rgba(95,184,122,0.45)', background: 'rgba(95,184,122,0.08)' }}>
              забито · {potted.length}
            </div>
          )}
        </div>
        <button type="button" className="btn btn-ghost btn-sm" onClick={reset} style={{ display: 'inline-flex', alignItems: 'center', gap: 6 }}>
          <Icon.Reset/> Reset
        </button>
      </div>

      {/* ── Pool table ── */}
      <div className="pool-table" aria-hidden="true" style={{ touchAction: 'none' }}>
        <svg
          ref={svgRef}
          viewBox={`0 0 ${TABLE_W} ${TABLE_H}`}
          width="100%"
          height="100%"
          style={{ position: 'absolute', inset: 0, cursor: dragging ? 'grabbing' : 'grab', display: 'block' }}
          onMouseDown={onDown}
          onTouchStart={onDown}
          onTouchMove={onMoveTouch}
          onTouchEnd={shoot}
        >
          <defs>
            {/* Wood rail gradient */}
            <linearGradient id="wood-rail" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#A0481E"/>
              <stop offset="40%" stopColor="#7A3212"/>
              <stop offset="100%" stopColor="#3E160A"/>
            </linearGradient>
            {/* Felt surface gradient */}
            <radialGradient id="felt-grad" cx="48%" cy="42%" r="62%">
              <stop offset="0%" stopColor="#226830"/>
              <stop offset="100%" stopColor="#164d22"/>
            </radialGradient>
            {/* Subtle felt diamond pattern */}
            <pattern id="felt-pattern" x="0" y="0" width="24" height="24" patternUnits="userSpaceOnUse">
              <path d="M12,0 L24,12 L12,24 L0,12 Z" fill="rgba(255,255,255,0.018)" stroke="none"/>
            </pattern>
            {/* Ball gradients */}
            <radialGradient id="cueball" cx="0.35" cy="0.3" r="0.9">
              <stop offset="0%" stopColor="#fff"/>
              <stop offset="60%" stopColor="#f3efe3"/>
              <stop offset="100%" stopColor="#bcb39a"/>
            </radialGradient>
            <radialGradient id="b-8" cx="0.35" cy="0.3" r="0.9">
              <stop offset="0%" stopColor="#fff" stopOpacity="0.55"/>
              <stop offset="50%" stopColor="#1a1a1a"/>
              <stop offset="100%" stopColor="#000" stopOpacity="0.7"/>
            </radialGradient>
            <filter id="bshadow" x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur stdDeviation="4" result="b"/>
              <feOffset dy="4" in="b" result="o"/>
              <feComponentTransfer in="o" result="t"><feFuncA type="linear" slope="0.45"/></feComponentTransfer>
              <feMerge><feMergeNode in="t"/><feMergeNode in="SourceGraphic"/></feMerge>
            </filter>
            {/* Pocket inner shadow */}
            <radialGradient id="pocket-depth" cx="40%" cy="35%" r="65%">
              <stop offset="0%" stopColor="#1a0a02" stopOpacity="0.5"/>
              <stop offset="100%" stopColor="#000" stopOpacity="0"/>
            </radialGradient>
          </defs>

          {/* ── WOODEN FRAME ── */}
          {/* Outer dark border — rx matches CSS border-radius:26px so corners align with overflow:hidden clip */}
          <rect x="0" y="0" width={TABLE_W} height={TABLE_H} rx="26" fill="#140601"/>
          {/* Rail surface */}
          <rect x="3" y="3" width={TABLE_W - 6} height={TABLE_H - 6} rx="23" fill="url(#wood-rail)"/>
          {/* Inner rail edge highlight */}
          <rect x="3" y="3" width={TABLE_W - 6} height={TABLE_H - 6} rx="23" fill="none" stroke="rgba(200,120,60,0.22)" strokeWidth="1.5"/>

          {/* ── FELT PLAYING SURFACE ── */}
          <rect x={FX} y={FY} width={FW} height={FH} fill="url(#felt-grad)"/>
          <rect x={FX} y={FY} width={FW} height={FH} fill="url(#felt-pattern)"/>
          {/* Inner shadow at rail/felt boundary */}
          <rect x={FX} y={FY} width={FW} height={FH} fill="none" stroke="rgba(0,0,0,0.55)" strokeWidth="10"/>

          {/* ── RAIL DIAMOND MARKERS ── */}
          {/* Top and bottom rail */}
          {[163, 282, 518, 637].map((x, i) => (
            <g key={'tm' + i}>
              <polygon points={`${x},${18} ${x + 5},${24} ${x},${30} ${x - 5},${24}`} fill="#c8a040" opacity="0.7"/>
              <polygon points={`${x},${450} ${x + 5},${456} ${x},${462} ${x - 5},${456}`} fill="#c8a040" opacity="0.7"/>
            </g>
          ))}
          {/* Left and right rail */}
          {[148, 240, 332].map((y, i) => (
            <g key={'sm' + i}>
              <polygon points={`${18},${y} ${24},${y - 5} ${30},${y} ${24},${y + 5}`} fill="#c8a040" opacity="0.7"/>
              <polygon points={`${770},${y} ${776},${y - 5} ${782},${y} ${776},${y + 5}`} fill="#c8a040" opacity="0.7"/>
            </g>
          ))}

          {/* Center spot */}
          <circle cx={TABLE_W / 2} cy={TABLE_H / 2} r="3.5" fill="rgba(200,165,80,0.45)"/>

          {/* ── POCKETS ── */}
          {POCKETS.map(([px, py], i) => {
            const J = 32;
            let jawA: string, jawB: string;
            if (i === 0) { // top-left corner
              jawA = `M${px},6 L${px+J},6 L${px},${py} Z`;
              jawB = `M6,${py} L6,${py+J} L${px},${py} Z`;
            } else if (i === 1) { // top-center side
              jawA = `M${px-J},6 L${px},6 L${px},${py} Z`;
              jawB = `M${px},6 L${px+J},6 L${px},${py} Z`;
            } else if (i === 2) { // top-right corner
              jawA = `M${px-J},6 L${px},6 L${px},${py} Z`;
              jawB = `M${TABLE_W-6},${py} L${TABLE_W-6},${py+J} L${px},${py} Z`;
            } else if (i === 3) { // bottom-left corner
              jawA = `M${px},${TABLE_H-6} L${px+J},${TABLE_H-6} L${px},${py} Z`;
              jawB = `M6,${py-J} L6,${py} L${px},${py} Z`;
            } else if (i === 4) { // bottom-center side
              jawA = `M${px-J},${TABLE_H-6} L${px},${TABLE_H-6} L${px},${py} Z`;
              jawB = `M${px},${TABLE_H-6} L${px+J},${TABLE_H-6} L${px},${py} Z`;
            } else { // bottom-right corner
              jawA = `M${px-J},${TABLE_H-6} L${px},${TABLE_H-6} L${px},${py} Z`;
              jawB = `M${TABLE_W-6},${py-J} L${TABLE_W-6},${py} L${px},${py} Z`;
            }
            return (
              <g key={i}>
                <path d={jawA} fill="rgba(0,0,0,0.7)"/>
                <path d={jawB} fill="rgba(0,0,0,0.7)"/>
                <circle cx={px} cy={py} r={POCKET_R+4} fill="rgba(0,0,0,0.5)"/>
                <circle cx={px} cy={py} r={POCKET_R} fill="#2a0e06"/>
                <circle cx={px} cy={py} r={POCKET_R-3} fill="#060908"/>
                <circle cx={px} cy={py} r={POCKET_R-3} fill="url(#pocket-depth)"/>
              </g>
            );
          })}

          {/* ── AIMING + CUE STICK ── */}
          {aiming && cue && !cue.sunk && (() => {
            const dirX = aimDx / (aimLen || 1);
            const dirY = aimDy / (aimLen || 1);
            const tx = cue.x - dirX * 600;
            const ty = cue.y - dirY * 600;
            const baseGap = 22;
            const pullBack = power * 70;
            const tipX = cue.x + dirX * (baseGap + pullBack);
            const tipY = cue.y + dirY * (baseGap + pullBack);
            const buttX = tipX + dirX * 170;
            const buttY = tipY + dirY * 170;
            return (
              <g>
                <line x1={cue.x} y1={cue.y} x2={tx} y2={ty} stroke="rgba(255,255,255,0.3)" strokeWidth="1" strokeDasharray="6 6"/>
                <linearGradient id="cuestick" x1={tipX} y1={tipY} x2={buttX} y2={buttY} gradientUnits="userSpaceOnUse">
                  <stop offset="0" stopColor="#f0d9a8"/>
                  <stop offset="0.15" stopColor="#caa55a"/>
                  <stop offset="0.7" stopColor="#5a3216"/>
                  <stop offset="1" stopColor="#2a160a"/>
                </linearGradient>
                <line x1={tipX} y1={tipY} x2={buttX} y2={buttY} stroke="url(#cuestick)" strokeWidth="6" strokeLinecap="round"/>
                <circle cx={tipX} cy={tipY} r="3.2" fill="#3a82c4" stroke="#1a1a1a" strokeWidth="0.5"/>
                {/* Power bar — near cue ball */}
                <g transform={`translate(${cue.x + 28}, ${cue.y - 28})`}>
                  <rect x="0" y="0" width="72" height="5" rx="2.5" fill="rgba(0,0,0,0.5)"/>
                  <rect x="0" y="0" width={72 * power} height="5" rx="2.5" fill={power > 0.7 ? '#c8332a' : power > 0.4 ? '#efc44a' : '#5fb87a'}/>
                </g>
              </g>
            );
          })()}

          {/* ── BALLS ── */}
          {balls.map(b => b.sunk ? null : (
            <g key={b.id} filter="url(#bshadow)" transform={`translate(${b.x} ${b.y})`}>
              <circle r={BALL_R} fill={b.id === 'cue' ? 'url(#cueball)' : `url(#b-${b.id})`}/>
              {b.id !== 'cue' && (
                <>
                  <circle r={BALL_R * 0.55} fill="#fff" opacity="0.92"/>
                  <text textAnchor="middle" y="4" fontFamily="Bricolage Grotesque" fontWeight="700" fontSize="12" fill={b.txt || b.color}>{b.n}</text>
                </>
              )}
            </g>
          ))}
        </svg>

        {/* ── 8-ball promo portal ── */}
        {showPromo && createPortal(
          <div
            className="modal-backdrop"
            onClick={() => setShowPromo(false)}
            style={{ backdropFilter: 'blur(14px)', WebkitBackdropFilter: 'blur(14px)', background: 'rgba(0,0,0,0.78)' }}
          >
            <div
              onClick={e => e.stopPropagation()}
              style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 24, padding: '44px 36px', maxWidth: 360, width: 'calc(100% - 40px)', textAlign: 'center', animation: 'pt-pop 0.42s cubic-bezier(0.34,1.56,0.64,1) both' }}
            >
              <div style={{ fontSize: 48, lineHeight: 1, marginBottom: 18 }}>🎱</div>
              <h3 className="display display-md" style={{ margin: '0 0 10px' }}>Чорна — в лузі!</h3>
              <p style={{ color: 'var(--ink-2)', fontSize: 15, margin: '0 0 28px' }}>
                Перше заняття — безкоштовно.<br/>Запишіться прямо зараз.
              </p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                <button className="btn btn-felt" style={{ width: '100%' }} onClick={() => { setShowPromo(false); onBook?.(); }}>
                  Записатись на пробне <Icon.Arrow/>
                </button>
                <button className="btn btn-ghost" style={{ width: '100%' }} onClick={reset}>
                  Зіграти ще раз
                </button>
              </div>
            </div>
            <style>{`@keyframes pt-pop { from { opacity:0; transform:scale(0.86) translateY(30px); } to { opacity:1; transform:scale(1) translateY(0); } }`}</style>
          </div>,
          document.body
        )}
      </div>
    </div>
  );
}
