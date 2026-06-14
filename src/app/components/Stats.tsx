import { useEffect, useRef, useState } from 'react';
import { motion, useInView } from 'motion/react';

const STATS = [
  { target: 26,    suffix: '+',  label: 'Años de experiencia',    icon: '◈' },
  { target: 200,   prefix: '+',  label: 'Proyectos completados',  icon: '◆' },
  { target: 85000, suffix: 'm²', label: 'Metros² construidos',    icon: '◉' },
  { target: 98,    suffix: '%',  label: 'Clientes satisfechos',   icon: '◎' },
];

function useCounter(target: number, active: boolean, duration = 2000) {
  const [value, setValue] = useState(0);
  useEffect(() => {
    if (!active) return;
    let start = 0;
    const startTime = performance.now();
    const step = (now: number) => {
      const progress = Math.min((now - startTime) / duration, 1);
      const eased = progress * (2 - progress);
      const current = Math.round(eased * target);
      setValue(current);
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [active, target, duration]);
  return value;
}

function StatItem({ stat, delay }: { stat: typeof STATS[0]; delay: number }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });
  const value = useCounter(stat.target, inView, Math.max(1200, Math.min(2400, 900 + stat.target * 0.6)));

  const formatted = value >= 1000 ? value.toLocaleString('es-AR') : value;

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8, delay, ease: [0.22, 1, 0.36, 1] }}
      style={{
        display: 'flex', flexDirection: 'column', alignItems: 'center',
        textAlign: 'center', padding: '3rem 1.5rem',
        borderRight: '0.5px solid rgba(201,168,76,0.12)',
        transition: 'background 0.3s',
      }}
      onMouseEnter={e => (e.currentTarget as HTMLElement).style.background = 'rgba(201,168,76,0.03)'}
      onMouseLeave={e => (e.currentTarget as HTMLElement).style.background = 'transparent'}
    >
      <div style={{ color: 'rgba(201,168,76,0.25)', fontSize: '1.3rem', marginBottom: '1rem' }}>{stat.icon}</div>
      <div style={{
        fontFamily: '"Playfair Display", serif',
        fontSize: 'clamp(3rem, 6vw, 4.5rem)',
        fontWeight: 300, color: '#C9A84C', lineHeight: 1,
        marginBottom: '0.5rem',
      }}>
        {'prefix' in stat && <span style={{ fontSize: 'clamp(1.5rem,3vw,2.1rem)', color: '#8B6E2E' }}>{stat.prefix}</span>}
        {formatted}
        {'suffix' in stat && stat.suffix && <span style={{ fontSize: 'clamp(1.5rem,3vw,2.1rem)', color: '#8B6E2E' }}>{stat.suffix}</span>}
      </div>
      <motion.div
        initial={{ width: 0 }}
        animate={inView ? { width: 32 } : {}}
        transition={{ duration: 0.8, delay: delay + 0.3 }}
        style={{ height: 1, background: '#C9A84C', margin: '0.75rem auto' }}
      />
      <p style={{
        fontFamily: '"Inter", sans-serif',
        fontSize: '0.68rem', letterSpacing: '0.38em',
        textTransform: 'uppercase', color: '#6B6B6B',
        fontWeight: 500,
      }}>{stat.label}</p>
    </motion.div>
  );
}

export function Stats() {
  return (
    <section style={{
      background: '#111111',
      borderTop: '0.5px solid rgba(201,168,76,0.1)',
      borderBottom: '0.5px solid rgba(201,168,76,0.1)',
    }}>
      <div style={{
        maxWidth: 1100, margin: '0 auto',
        display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)',
        padding: '0',
      }} className="grid-stats">
        {STATS.map((stat, i) => (
          <StatItem key={stat.label} stat={stat} delay={i * 0.12} />
        ))}
      </div>
      <style>{`
        @media (max-width: 900px) {
          .grid-stats { grid-template-columns: repeat(2, 1fr) !important; }
        }
        @media (max-width: 480px) {
          .grid-stats { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  );
}
