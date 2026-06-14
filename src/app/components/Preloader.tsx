import { useEffect, useState } from 'react';

const TAGLINES = ['Calidad · Compromiso · Innovación', 'Construyendo el futuro', 'San Juan · Argentina', 'Cada detalle importa'];

interface PreloaderProps { onComplete: () => void; }

export function Preloader({ onComplete }: PreloaderProps) {
  const [progress, setProgress] = useState(0);
  const [taglineIdx, setTaglineIdx] = useState(0);
  const [taglineVisible, setTaglineVisible] = useState(true);
  const [hiding, setHiding] = useState(false);

  useEffect(() => {
    let prog = 0;
    const interval = setInterval(() => {
      const step = prog < 30 ? 4 : prog < 60 ? 2.2 : prog < 80 ? 1 : 0.4;
      prog = Math.min(prog + step, 95);
      setProgress(prog);
    }, 55);

    const tagTimer = setInterval(() => {
      setTaglineVisible(false);
      setTimeout(() => { setTaglineIdx(i => (i + 1) % TAGLINES.length); setTaglineVisible(true); }, 400);
    }, 1800);

    const done = setTimeout(() => {
      clearInterval(interval);
      clearInterval(tagTimer);
      setProgress(100);
      setTimeout(() => { setHiding(true); setTimeout(onComplete, 700); }, 300);
    }, 3200);

    return () => { clearInterval(interval); clearInterval(tagTimer); clearTimeout(done); };
  }, [onComplete]);

  return (
    <div
      style={{
        position: 'fixed', inset: 0, zIndex: 99999,
        background: '#0A0A0A',
        display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
        transition: 'opacity 0.7s ease, transform 0.7s ease',
        opacity: hiding ? 0 : 1,
        transform: hiding ? 'scale(1.04)' : 'scale(1)',
        pointerEvents: hiding ? 'none' : 'all',
      }}
    >
      {/* Corner brackets */}
      {(['tl','tr','bl','br'] as const).map(c => (
        <div key={c} style={{
          position: 'absolute',
          width: 20, height: 20,
          top:    c.startsWith('t') ? '2rem' : 'auto',
          bottom: c.startsWith('b') ? '2rem' : 'auto',
          left:   c.endsWith('l')   ? '2rem' : 'auto',
          right:  c.endsWith('r')   ? '2rem' : 'auto',
          borderTop:    c.startsWith('t') ? '1px solid rgba(201,168,76,0.35)' : 'none',
          borderBottom: c.startsWith('b') ? '1px solid rgba(201,168,76,0.35)' : 'none',
          borderLeft:   c.endsWith('l')   ? '1px solid rgba(201,168,76,0.35)' : 'none',
          borderRight:  c.endsWith('r')   ? '1px solid rgba(201,168,76,0.35)' : 'none',
          animation: 'plFadeUp 0.5s 0.5s ease both',
        }} />
      ))}

      {/* Logo + Brand */}
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1.4rem' }}>
        <div style={{
          width: 80, height: 80,
          animation: 'plLogoIn 0.9s 0.3s cubic-bezier(.34,1.56,.64,1) both',
          background: 'rgba(201,168,76,0.1)',
          border: '1px solid rgba(201,168,76,0.3)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
        }}>
          <svg width="40" height="40" viewBox="0 0 44 44" fill="none">
            <polygon points="22,4 40,40 4,40" fill="none" stroke="#C9A84C" strokeWidth="1.5"/>
            <rect x="16" y="26" width="12" height="12" fill="rgba(201,168,76,0.2)" stroke="#C9A84C" strokeWidth="0.8"/>
          </svg>
        </div>
        <div style={{ textAlign: 'center', animation: 'plFadeUp 0.7s 0.8s ease both' }}>
          <h2 style={{
            fontFamily: '"Playfair Display", serif',
            fontSize: '1.6rem', fontWeight: 700,
            letterSpacing: '0.25em', color: '#F5F3EE',
            textTransform: 'uppercase', lineHeight: 1,
          }}>López Group</h2>
          <span style={{
            display: 'block', fontFamily: '"Inter", sans-serif',
            fontSize: '0.58rem', letterSpacing: '0.55em',
            color: '#C9A84C', fontWeight: 500,
            textTransform: 'uppercase', marginTop: '0.5rem',
          }}>Construcción · Arquitectura</span>
        </div>
      </div>

      {/* Progress bar */}
      <div style={{
        width: 160, height: 1,
        background: 'rgba(201,168,76,0.12)',
        marginTop: '2.5rem', position: 'relative', overflow: 'hidden',
        animation: 'plFadeUp 0.5s 1.1s ease both',
      }}>
        <div style={{
          position: 'absolute', left: 0, top: 0, bottom: 0,
          width: `${progress}%`,
          background: 'linear-gradient(90deg, #8B6E2E, #C9A84C, #E8C97E)',
          transition: 'width 0.1s linear',
        }} />
      </div>
      <p style={{
        fontFamily: '"Playfair Display", serif',
        fontSize: '0.72rem', color: '#8B6E2E',
        letterSpacing: '0.3em', marginTop: '0.75rem',
        animation: 'plFadeUp 0.5s 1.2s ease both',
      }}>{Math.round(progress)}%</p>

      {/* Tagline */}
      <p style={{
        position: 'absolute', bottom: '2.5rem', left: 0, right: 0,
        textAlign: 'center',
        fontFamily: '"Inter", sans-serif',
        fontSize: '0.62rem', letterSpacing: '0.48em',
        textTransform: 'uppercase', color: 'rgba(201,168,76,0.3)',
        transition: 'opacity 0.4s ease',
        opacity: taglineVisible ? 1 : 0,
        animation: 'plFadeUp 0.6s 1.5s ease both',
      }}>{TAGLINES[taglineIdx]}</p>
    </div>
  );
}
