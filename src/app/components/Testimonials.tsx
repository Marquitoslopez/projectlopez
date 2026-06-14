import { useRef, useState, useEffect } from 'react';
import { motion, useInView, AnimatePresence } from 'motion/react';
import { ChevronLeft, ChevronRight, Quote } from 'lucide-react';

const TESTIMONIALS = [
  {
    id: 1,
    name: 'Carlos Rodríguez',
    role: 'Empresario · San Juan',
    rating: 5,
    text: 'López Group superó todas nuestras expectativas. Entregaron nuestra planta industrial en tiempo y forma, con una calidad de terminaciones que jamás imaginamos posible. Hoy somos clientes fidelizados para siempre.',
    initials: 'CR',
  },
  {
    id: 2,
    name: 'Daniela Fernández',
    role: 'Arquitecta · Rivadavia',
    rating: 5,
    text: 'Tuve la oportunidad de trabajar junto al equipo de López Group en un proyecto residencial de alta complejidad. Su profesionalismo, su dominio técnico y la comunicación constante me dieron la tranquilidad de saber que estaba en manos expertas.',
    initials: 'DF',
  },
  {
    id: 3,
    name: 'Martín Allende',
    role: 'Inversor inmobiliario · Mendoza',
    rating: 5,
    text: 'Tres proyectos realizados, tres proyectos entregados a tiempo y dentro del presupuesto acordado. Con López Group no hay sorpresas. Solo resultados.',
    initials: 'MA',
  },
  {
    id: 4,
    name: 'Lucía Torres',
    role: 'Propietaria particular · San Juan',
    rating: 5,
    text: 'Construir la casa de nuestros sueños fue una experiencia increíble gracias a López Group. Nos guiaron en cada decisión, respetaron nuestras ideas y el resultado final fue mucho mejor de lo que imaginamos.',
    initials: 'LT',
  },
];

export function Testimonials() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });
  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState(1);

  useEffect(() => {
    const timer = setInterval(() => { setDirection(1); setCurrent(c => (c + 1) % TESTIMONIALS.length); }, 5000);
    return () => clearInterval(timer);
  }, []);

  const go = (dir: number) => {
    setDirection(dir);
    setCurrent(c => ((c + dir) % TESTIMONIALS.length + TESTIMONIALS.length) % TESTIMONIALS.length);
  };

  const t = TESTIMONIALS[current];

  return (
    <section style={{ background: '#0A0A0A', padding: 'var(--section-pad, 7rem 4rem)', position: 'relative', overflow: 'hidden' }}>
      {/* Decorative quote background */}
      <div style={{
        position: 'absolute', top: '4rem', left: '50%', transform: 'translateX(-50%)',
        fontSize: '20rem', color: 'rgba(201,168,76,0.025)',
        fontFamily: '"Playfair Display", serif',
        lineHeight: 1, userSelect: 'none', pointerEvents: 'none',
      }}>"</div>

      <div style={{ maxWidth: 900, margin: '0 auto', position: 'relative', zIndex: 1 }}>

        {/* Header */}
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          style={{ textAlign: 'center', marginBottom: '4rem' }}
        >
          <p style={{
            fontFamily: '"Inter", sans-serif',
            fontSize: '0.65rem', letterSpacing: '0.55em',
            color: '#C9A84C', textTransform: 'uppercase',
            fontWeight: 500, marginBottom: '0.8rem',
          }}>Testimonios</p>
          <h2 style={{
            fontFamily: '"Playfair Display", serif',
            fontSize: 'clamp(2rem,3.6vw,2.9rem)',
            fontWeight: 500, lineHeight: 1.15,
            color: '#F5F3EE',
          }}>Lo que dicen <em style={{ fontStyle: 'italic', color: '#E8C97E' }}>nuestros clientes</em></h2>
        </motion.div>

        {/* Carousel */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.3 }}
          style={{ position: 'relative' }}
        >
          <div style={{
            border: '0.5px solid rgba(201,168,76,0.15)',
            background: 'rgba(255,255,255,0.015)',
            padding: '3.5rem',
            minHeight: 280,
            position: 'relative',
            overflow: 'hidden',
          }}>
            {/* Gold corner accents */}
            <div style={{ position: 'absolute', top: '1.5rem', left: '1.5rem', width: 32, height: 32, borderTop: '1px solid rgba(201,168,76,0.35)', borderLeft: '1px solid rgba(201,168,76,0.35)' }} />
            <div style={{ position: 'absolute', bottom: '1.5rem', right: '1.5rem', width: 32, height: 32, borderBottom: '1px solid rgba(201,168,76,0.35)', borderRight: '1px solid rgba(201,168,76,0.35)' }} />

            {/* Quote icon */}
            <Quote size={24} style={{ color: 'rgba(201,168,76,0.4)', marginBottom: '1.5rem' }} />

            <AnimatePresence mode="wait" custom={direction}>
              <motion.div
                key={t.id}
                custom={direction}
                initial={{ opacity: 0, x: direction * 40 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -direction * 40 }}
                transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              >
                {/* Stars */}
                <div style={{ display: 'flex', gap: '0.25rem', marginBottom: '1.5rem' }}>
                  {Array.from({ length: t.rating }).map((_, i) => (
                    <span key={i} style={{ color: '#C9A84C', fontSize: '0.9rem' }}>★</span>
                  ))}
                </div>

                <p style={{
                  fontFamily: '"Playfair Display", serif',
                  fontSize: 'clamp(1.05rem,2vw,1.25rem)',
                  fontWeight: 400, fontStyle: 'italic',
                  color: '#F5F3EE', lineHeight: 1.7,
                  marginBottom: '2rem',
                }}>"{t.text}"</p>

                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                  <div style={{
                    width: 44, height: 44,
                    background: 'rgba(201,168,76,0.15)',
                    border: '0.5px solid rgba(201,168,76,0.3)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    flexShrink: 0,
                  }}>
                    <span style={{
                      fontFamily: '"Playfair Display", serif',
                      fontSize: '0.9rem', fontWeight: 600,
                      color: '#C9A84C',
                    }}>{t.initials}</span>
                  </div>
                  <div>
                    <div style={{
                      fontFamily: '"Inter", sans-serif',
                      fontSize: '0.88rem', fontWeight: 500,
                      color: '#F5F3EE',
                    }}>{t.name}</div>
                    <div style={{
                      fontFamily: '"Inter", sans-serif',
                      fontSize: '0.7rem', letterSpacing: '0.15em',
                      color: '#6B6B6B', textTransform: 'uppercase',
                    }}>{t.role}</div>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Navigation */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: '1.5rem' }}>
            {/* Dots */}
            <div style={{ display: 'flex', gap: '0.5rem' }}>
              {TESTIMONIALS.map((_, i) => (
                <button
                  key={i}
                  onClick={() => { setDirection(i > current ? 1 : -1); setCurrent(i); }}
                  style={{
                    width: i === current ? 24 : 6,
                    height: 6,
                    background: i === current ? '#C9A84C' : 'rgba(201,168,76,0.25)',
                    border: 'none', cursor: 'pointer',
                    transition: 'width 0.3s, background 0.3s',
                    padding: 0,
                  }}
                  aria-label={`Ir al testimonio ${i + 1}`}
                />
              ))}
            </div>

            <div style={{ display: 'flex', gap: '0.5rem' }}>
              <button
                onClick={() => go(-1)}
                style={{
                  width: 42, height: 42,
                  background: 'transparent',
                  border: '0.5px solid rgba(201,168,76,0.25)',
                  color: '#C9A84C', cursor: 'pointer',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  transition: 'background 0.2s, border-color 0.2s',
                }}
                onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = 'rgba(201,168,76,0.15)'; (e.currentTarget as HTMLElement).style.borderColor = '#C9A84C'; }}
                onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = 'transparent'; (e.currentTarget as HTMLElement).style.borderColor = 'rgba(201,168,76,0.25)'; }}
              ><ChevronLeft size={16} /></button>
              <button
                onClick={() => go(1)}
                style={{
                  width: 42, height: 42,
                  background: 'rgba(201,168,76,0.1)',
                  border: '0.5px solid rgba(201,168,76,0.35)',
                  color: '#C9A84C', cursor: 'pointer',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  transition: 'background 0.2s',
                }}
                onMouseEnter={e => (e.currentTarget as HTMLElement).style.background = 'rgba(201,168,76,0.2)'}
                onMouseLeave={e => (e.currentTarget as HTMLElement).style.background = 'rgba(201,168,76,0.1)'}
              ><ChevronRight size={16} /></button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
