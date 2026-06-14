import { motion } from 'motion/react';

const HERO_IMG = 'https://images.unsplash.com/photo-1619218070141-bcfeb8b93074?w=1920&q=85&auto=format&fit=crop';

export function Hero() {
  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section
      id="inicio"
      style={{
        position: 'relative', minHeight: '100vh',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        overflow: 'hidden',
      }}
    >
      {/* Background Image */}
      <div style={{ position: 'absolute', inset: 0 }}>
        <img
          src={HERO_IMG}
          alt="Arquitectura López Group"
          style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center' }}
        />
        {/* Dark overlays */}
        <div style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.72)' }} />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(10,10,10,1) 0%, rgba(10,10,10,0.2) 40%, transparent 100%)' }} />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to right, rgba(10,10,10,0.5) 0%, transparent 60%)' }} />
      </div>

      {/* Grid texture */}
      <div style={{
        position: 'absolute', inset: 0, zIndex: 1, opacity: 0.04,
        backgroundImage: 'linear-gradient(rgba(201,168,76,0.6) 1px,transparent 1px),linear-gradient(90deg,rgba(201,168,76,0.6) 1px,transparent 1px)',
        backgroundSize: '80px 80px',
      }} />

      {/* Geometric accent */}
      <div style={{
        position: 'absolute', right: '6%', top: '50%',
        transform: 'translateY(-50%)',
        zIndex: 1, opacity: 0.06, pointerEvents: 'none',
      }}>
        <svg width="420" height="420" viewBox="0 0 500 500" fill="none">
          <polygon points="250,18 485,475 15,475" fill="none" stroke="#C9A84C" strokeWidth="0.8"/>
          <polygon points="250,72 446,455 54,455" fill="none" stroke="#C9A84C" strokeWidth="0.5"/>
          <polygon points="250,126 407,435 93,435" fill="none" stroke="#C9A84C" strokeWidth="0.3"/>
        </svg>
      </div>

      {/* Content */}
      <div style={{
        position: 'relative', zIndex: 2,
        textAlign: 'center', maxWidth: 860, padding: '0 2rem',
        paddingTop: '5rem',
      }}>
        <motion.p
          initial={{ opacity: 0, letterSpacing: '1.2em' }}
          animate={{ opacity: 1, letterSpacing: '0.55em' }}
          transition={{ duration: 1, delay: 0.3 }}
          style={{
            fontFamily: '"Inter", sans-serif',
            fontSize: '0.67rem', letterSpacing: '0.55em',
            color: '#C9A84C', textTransform: 'uppercase',
            fontWeight: 500, marginBottom: '1.4rem',
          }}
        >San Juan, Argentina</motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.55, ease: [0.22, 1, 0.36, 1] }}
          style={{
            fontFamily: '"Playfair Display", serif',
            fontSize: 'clamp(2.6rem,5.5vw,4.8rem)',
            fontWeight: 400, lineHeight: 1.08,
            color: '#F5F3EE', marginBottom: '1.5rem',
          }}
        >
          Construyendo el futuro,<br />
          <em style={{ fontStyle: 'italic', color: '#E8C97E' }}>cimiento por cimiento.</em>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.8 }}
          style={{
            fontFamily: '"Inter", sans-serif',
            fontSize: '1rem', fontWeight: 300,
            color: '#ADADAD', maxWidth: 500,
            margin: '0 auto 2.5rem',
            lineHeight: 1.8, letterSpacing: '0.02em',
          }}
        >
          Obras de excelencia que perduran. Diseñamos, construimos y transformamos espacios con precisión y visión de alto standing.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1 }}
          style={{ display: 'flex', gap: '1.1rem', justifyContent: 'center', flexWrap: 'wrap' }}
        >
          <button
            onClick={() => scrollTo('proyectos')}
            style={{
              padding: '0.9rem 2.5rem',
              background: '#C9A84C', color: '#0A0A0A',
              fontFamily: '"Inter", sans-serif',
              fontSize: '0.72rem', letterSpacing: '0.2em',
              fontWeight: 600, textTransform: 'uppercase',
              border: 'none', cursor: 'pointer',
              transition: 'background 0.25s, transform 0.2s',
            }}
            onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = '#E8C97E'; (e.currentTarget as HTMLElement).style.transform = 'translateY(-2px)'; }}
            onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = '#C9A84C'; (e.currentTarget as HTMLElement).style.transform = 'none'; }}
          >Ver proyectos</button>

          <button
            onClick={() => scrollTo('contacto')}
            style={{
              padding: '0.9rem 2.5rem',
              background: 'transparent', color: '#F5F3EE',
              fontFamily: '"Inter", sans-serif',
              fontSize: '0.72rem', letterSpacing: '0.2em',
              fontWeight: 500, textTransform: 'uppercase',
              border: '1px solid rgba(255,255,255,0.25)',
              cursor: 'pointer',
              transition: 'border-color 0.25s, color 0.25s, transform 0.2s',
            }}
            onMouseEnter={e => { (e.currentTarget as HTMLElement).style.borderColor = '#C9A84C'; (e.currentTarget as HTMLElement).style.color = '#C9A84C'; (e.currentTarget as HTMLElement).style.transform = 'translateY(-2px)'; }}
            onMouseLeave={e => { (e.currentTarget as HTMLElement).style.borderColor = 'rgba(255,255,255,0.25)'; (e.currentTarget as HTMLElement).style.color = '#F5F3EE'; (e.currentTarget as HTMLElement).style.transform = 'none'; }}
          >Solicitar presupuesto</button>
        </motion.div>

        {/* Live badges */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.4, duration: 0.8 }}
          style={{
            display: 'flex', gap: '2rem', justifyContent: 'center',
            marginTop: '3.5rem', flexWrap: 'wrap',
          }}
        >
          {[
            { num: '26+', text: 'Años de experiencia' },
            { num: '+200', text: 'Proyectos completados' },
            { num: '98%', text: 'Satisfacción del cliente' },
          ].map(item => (
            <div key={item.num} style={{
              textAlign: 'center',
              padding: '0.5rem 1.5rem',
              borderLeft: '1px solid rgba(201,168,76,0.3)',
            }}>
              <div style={{
                fontFamily: '"Playfair Display", serif',
                fontSize: '1.6rem', fontWeight: 300,
                color: '#C9A84C', lineHeight: 1,
              }}>{item.num}</div>
              <div style={{
                fontFamily: '"Inter", sans-serif',
                fontSize: '0.6rem', letterSpacing: '0.3em',
                color: '#6B6B6B', textTransform: 'uppercase',
                marginTop: '0.3rem', fontWeight: 500,
              }}>{item.text}</div>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <div style={{
        position: 'absolute', bottom: '2rem', left: '50%',
        transform: 'translateX(-50%)',
        zIndex: 2, display: 'flex', flexDirection: 'column',
        alignItems: 'center', gap: '0.4rem', opacity: 0.6,
      }}>
        <span style={{
          fontFamily: '"Inter", sans-serif',
          fontSize: '0.58rem', letterSpacing: '0.45em',
          color: '#C9A84C', textTransform: 'uppercase',
        }}>Scroll</span>
        <div style={{
          width: 1, height: 44,
          background: 'linear-gradient(to bottom, transparent, #C9A84C)',
          animation: 'scrollPulse 2s infinite',
        }} />
      </div>
    </section>
  );
}
