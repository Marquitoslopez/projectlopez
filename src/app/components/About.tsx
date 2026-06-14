import { useRef } from 'react';
import { motion, useInView } from 'motion/react';

const ABOUT_IMG = 'https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=900&q=80&auto=format&fit=crop';
const TEAM_IMG  = 'https://images.unsplash.com/photo-1608303588026-884930af2559?w=600&q=80&auto=format&fit=crop';

const VALUES = [
  { icon: '◆', title: 'Excelencia', text: 'Cada detalle importa. Ejecutamos con los más altos estándares de calidad en cada etapa.' },
  { icon: '◈', title: 'Compromiso', text: 'Plazos que se respetan y presupuestos que se cumplen. La palabra empeñada es nuestro contrato.' },
  { icon: '◉', title: 'Innovación', text: 'Incorporamos las mejores tecnologías y métodos constructivos para entregar obras que duran décadas.' },
];

export function About() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section id="nosotros" style={{ background: '#111111', padding: 'var(--section-pad, 7rem 4rem)' }}>
      <div style={{ maxWidth: 1200, margin: '0 auto' }}>

        {/* Section header */}
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          style={{ marginBottom: '4rem' }}
        >
          <p style={{
            fontFamily: '"Inter", sans-serif',
            fontSize: '0.65rem', letterSpacing: '0.55em',
            color: '#C9A84C', textTransform: 'uppercase',
            fontWeight: 500, marginBottom: '0.8rem',
          }}>Quiénes somos</p>
          <h2 style={{
            fontFamily: '"Playfair Display", serif',
            fontSize: 'clamp(2rem,3.6vw,2.9rem)',
            fontWeight: 500, lineHeight: 1.15,
            color: '#F5F3EE', maxWidth: 560,
          }}>
            Más de 26 años <em style={{ fontStyle: 'italic', color: '#E8C97E' }}>construyendo</em> confianza
          </h2>
        </motion.div>

        {/* Two-column layout */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '5rem', alignItems: 'start' }} className="about-grid">

          {/* Image column */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.9, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            style={{ position: 'relative' }}
          >
            <img
              src={ABOUT_IMG}
              alt="Arquitecto López Group trabajando"
              style={{
                width: '100%', aspectRatio: '4/5',
                objectFit: 'cover',
                display: 'block',
              }}
            />
            {/* Accent card */}
            <div style={{
              position: 'absolute', bottom: '-2rem', right: '-2rem',
              background: '#111111',
              border: '0.5px solid rgba(201,168,76,0.2)',
              padding: '1.5rem',
              maxWidth: 220,
            }}>
              <img
                src={TEAM_IMG}
                alt="Equipo López Group"
                style={{ width: '100%', aspectRatio: '4/3', objectFit: 'cover', marginBottom: '1rem', display: 'block' }}
              />
              <p style={{
                fontFamily: '"Playfair Display", serif',
                fontSize: '0.85rem', color: '#C9A84C',
                lineHeight: 1.4, fontStyle: 'italic',
              }}>"Cada obra es la mejor tarjeta de presentación."</p>
              <p style={{
                fontFamily: '"Inter", sans-serif',
                fontSize: '0.62rem', color: '#6B6B6B',
                marginTop: '0.35rem', letterSpacing: '0.2em',
              }}>— Fundador, López Group</p>
            </div>

            {/* Gold border accent */}
            <div style={{
              position: 'absolute', top: '-1rem', left: '-1rem',
              width: 60, height: 60,
              borderTop: '2px solid #C9A84C',
              borderLeft: '2px solid #C9A84C',
            }} />
          </motion.div>

          {/* Text column */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.9, delay: 0.35, ease: [0.22, 1, 0.36, 1] }}
            style={{ paddingTop: '1rem' }}
          >
            <div style={{ width: 44, height: 1, background: '#C9A84C', marginBottom: '1.8rem' }} />

            <p style={{
              fontFamily: '"Inter", sans-serif',
              fontSize: '1rem', fontWeight: 300,
              color: '#ADADAD', lineHeight: 1.85,
              marginBottom: '1.4rem',
            }}>
              Fundada en San Juan, Argentina, <strong style={{ color: '#F5F3EE', fontWeight: 500 }}>López Group</strong> nació de la pasión por construir obras que trascienden. Con más de 26 años de trayectoria, somos referentes en construcción civil, arquitectura y remodelaciones de alto standing en la región de Cuyo.
            </p>
            <p style={{
              fontFamily: '"Inter", sans-serif',
              fontSize: '1rem', fontWeight: 300,
              color: '#ADADAD', lineHeight: 1.85,
              marginBottom: '2.5rem',
            }}>
              Nuestro equipo de arquitectos, ingenieros y maestros de obra trabaja con una metodología rigurosa, incorporando tecnología de vanguardia y materiales de primera calidad para garantizar obras que superan las expectativas.
            </p>

            {/* Values */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
              {VALUES.map((val, i) => (
                <motion.div
                  key={val.title}
                  initial={{ opacity: 0, x: 20 }}
                  animate={inView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.6, delay: 0.5 + i * 0.12 }}
                  style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start' }}
                >
                  <div style={{
                    color: '#C9A84C', fontSize: '0.75rem',
                    marginTop: '0.2rem', flexShrink: 0,
                    width: 28, height: 28,
                    border: '0.5px solid rgba(201,168,76,0.3)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                  }}>{val.icon}</div>
                  <div>
                    <h4 style={{
                      fontFamily: '"Playfair Display", serif',
                      fontSize: '1rem', fontWeight: 600,
                      color: '#F5F3EE', marginBottom: '0.2rem',
                    }}>{val.title}</h4>
                    <p style={{
                      fontFamily: '"Inter", sans-serif',
                      fontSize: '0.84rem', color: '#6B6B6B',
                      fontWeight: 300, lineHeight: 1.65,
                    }}>{val.text}</p>
                  </div>
                </motion.div>
              ))}
            </div>

            <motion.button
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 1 } : {}}
              transition={{ delay: 0.9 }}
              onClick={() => document.getElementById('contacto')?.scrollIntoView({ behavior: 'smooth' })}
              style={{
                marginTop: '2.5rem',
                padding: '0.85rem 2.2rem',
                background: 'transparent',
                color: '#C9A84C',
                fontFamily: '"Inter", sans-serif',
                fontSize: '0.72rem', letterSpacing: '0.2em',
                fontWeight: 600, textTransform: 'uppercase',
                border: '1px solid #C9A84C',
                cursor: 'pointer',
                transition: 'background 0.25s, color 0.25s',
              }}
              onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = '#C9A84C'; (e.currentTarget as HTMLElement).style.color = '#0A0A0A'; }}
              onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = 'transparent'; (e.currentTarget as HTMLElement).style.color = '#C9A84C'; }}
            >Conversemos sobre su proyecto</motion.button>
          </motion.div>
        </div>
      </div>

      <style>{`
        @media (max-width: 900px) {
          .about-grid { grid-template-columns: 1fr !important; gap: 3rem !important; }
          .about-grid > div:first-child { padding-bottom: 3rem; }
        }
      `}</style>
    </section>
  );
}
