import { useRef, useState } from 'react';
import { motion, useInView, AnimatePresence } from 'motion/react';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';

const CATEGORIES = ['Todos', 'Residencial', 'Comercial', 'Industrial'];

const PROJECTS = [
  {
    id: 1, category: 'Residencial', wide: true,
    img: 'https://images.unsplash.com/photo-1680874261352-ed1ee3d1cf01?w=1200&q=80&auto=format&fit=crop',
    title: 'Complejo Residencial Vista', location: 'San Juan · 2023', year: '2023',
    desc: 'Complejo de 24 unidades de alta categoría con amenities completos y terminaciones premium.',
  },
  {
    id: 2, category: 'Comercial', wide: false,
    img: 'https://images.unsplash.com/photo-1599995903128-531fc7fb694b?w=800&q=80&auto=format&fit=crop',
    title: 'Torre Empresarial Norte', location: 'San Juan · 2022', year: '2022',
    desc: 'Edificio de oficinas de 12 plantas con diseño corporativo de último nivel.',
  },
  {
    id: 3, category: 'Residencial', wide: false,
    img: 'https://images.unsplash.com/photo-1720247520862-7e4b14176fa8?w=800&q=80&auto=format&fit=crop',
    title: 'Villa Privada Rivadavia', location: 'Rivadavia · 2023', year: '2023',
    desc: 'Vivienda unifamiliar de lujo con diseño arquitectónico exclusivo y materiales importados.',
  },
  {
    id: 4, category: 'Industrial', wide: true,
    img: 'https://images.unsplash.com/photo-1508450859948-4e04fabaa4ea?w=1200&q=80&auto=format&fit=crop',
    title: 'Planta Industrial Caucete', location: 'Caucete · 2021', year: '2021',
    desc: 'Nave industrial de 8.000 m² con oficinas y sistemas de última generación para el sector minero.',
  },
  {
    id: 5, category: 'Comercial', wide: false,
    img: 'https://images.unsplash.com/photo-1657346088167-b982455bf29a?w=800&q=80&auto=format&fit=crop',
    title: 'Centro Comercial Oeste', location: 'San Juan · 2022', year: '2022',
    desc: 'Remodelación integral de 3.500 m² de local comercial con accesibilidad y tecnología domótica.',
  },
  {
    id: 6, category: 'Residencial', wide: false,
    img: 'https://images.unsplash.com/photo-1750420556288-d0e32a6f517b?w=800&q=80&auto=format&fit=crop',
    title: 'Departamento Premium', location: 'Capital · 2024', year: '2024',
    desc: 'Diseño de interiores y construcción de departamento de alta gama en el corazón de la ciudad.',
  },
];

interface LightboxState { project: typeof PROJECTS[0] | null; }

export function Projects() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });
  const [active, setActive] = useState('Todos');
  const [lightbox, setLightbox] = useState<LightboxState>({ project: null });

  const filtered = active === 'Todos' ? PROJECTS : PROJECTS.filter(p => p.category === active);

  return (
    <section id="proyectos" style={{ background: '#0A0A0A', padding: 'var(--section-pad, 7rem 4rem)' }}>
      <div style={{ maxWidth: 1200, margin: '0 auto' }}>

        {/* Header */}
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '2.5rem', flexWrap: 'wrap', gap: '1rem' }}
        >
          <div>
            <p style={{
              fontFamily: '"Inter", sans-serif',
              fontSize: '0.65rem', letterSpacing: '0.55em',
              color: '#C9A84C', textTransform: 'uppercase',
              fontWeight: 500, marginBottom: '0.8rem',
            }}>Nuestro trabajo</p>
            <h2 style={{
              fontFamily: '"Playfair Display", serif',
              fontSize: 'clamp(2rem,3.6vw,2.9rem)',
              fontWeight: 500, lineHeight: 1.15,
              color: '#F5F3EE',
            }}>Proyectos que <em style={{ fontStyle: 'italic', color: '#E8C97E' }}>hablan</em><br />por sí solos</h2>
          </div>
          <div style={{ width: 44, height: 1, background: '#C9A84C', alignSelf: 'flex-end' }} />
        </motion.div>

        {/* Filter tabs */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.3 }}
          style={{ display: 'flex', gap: '0.5rem', marginBottom: '2.5rem', flexWrap: 'wrap' }}
        >
          {CATEGORIES.map(cat => (
            <button
              key={cat}
              onClick={() => setActive(cat)}
              style={{
                padding: '0.45rem 1.2rem',
                fontFamily: '"Inter", sans-serif',
                fontSize: '0.68rem', letterSpacing: '0.2em',
                textTransform: 'uppercase', fontWeight: 500,
                border: active === cat ? '1px solid #C9A84C' : '1px solid rgba(201,168,76,0.2)',
                background: active === cat ? '#C9A84C' : 'transparent',
                color: active === cat ? '#0A0A0A' : '#6B6B6B',
                cursor: 'pointer',
                transition: 'all 0.25s',
              }}
            >{cat}</button>
          ))}
        </motion.div>

        {/* Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 3 }} className="proj-grid">
          <AnimatePresence mode="popLayout">
            {filtered.map((project, i) => (
              <motion.article
                key={project.id}
                layout
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.5, delay: i * 0.07 }}
                onClick={() => setLightbox({ project })}
                style={{
                  position: 'relative', overflow: 'hidden',
                  cursor: 'pointer',
                  background: '#1A1A1A',
                  gridColumn: project.wide ? 'span 2' : 'span 1',
                }}
              >
                <div style={{
                  paddingBottom: project.wide ? '46%' : '130%',
                  position: 'relative', overflow: 'hidden',
                }}>
                  <img
                    src={project.img}
                    alt={project.title}
                    loading="lazy"
                    className="lp-project-img"
                    style={{
                      position: 'absolute', inset: 0,
                      width: '100%', height: '100%',
                      objectFit: 'cover',
                      transition: 'transform 0.7s cubic-bezier(.25,.46,.45,.94)',
                    }}
                  />
                  <div
                    className="lp-project-overlay"
                    style={{
                      position: 'absolute', inset: 0,
                      background: 'linear-gradient(to top, rgba(6,6,6,0.97) 0%, rgba(6,6,6,0.2) 52%, transparent 100%)',
                      display: 'flex', flexDirection: 'column',
                      justifyContent: 'flex-end', padding: '1.75rem',
                      opacity: 0, transition: 'opacity 0.4s ease',
                    }}
                  >
                    <span style={{
                      fontFamily: '"Inter", sans-serif',
                      fontSize: '0.58rem', letterSpacing: '0.42em',
                      color: '#C9A84C', textTransform: 'uppercase',
                      marginBottom: '0.4rem', display: 'block',
                    }}>{project.category} · {project.year}</span>
                    <p style={{
                      fontFamily: '"Playfair Display", serif',
                      fontSize: '1.35rem', fontWeight: 600,
                      color: '#F5F3EE', marginBottom: '0.3rem', lineHeight: 1.25,
                    }}>{project.title}</p>
                    <p style={{
                      fontFamily: '"Inter", sans-serif',
                      fontSize: '0.77rem', color: '#ADADAD',
                      fontWeight: 300, lineHeight: 1.5,
                    }}>{project.desc}</p>
                  </div>
                  <span style={{
                    position: 'absolute', top: '0.85rem', right: '0.85rem',
                    fontFamily: '"Inter", sans-serif',
                    fontSize: '0.58rem', letterSpacing: '0.28em',
                    color: 'rgba(201,168,76,0.5)', textTransform: 'uppercase',
                  }}>Ver más</span>
                </div>
              </motion.article>
            ))}
          </AnimatePresence>
        </div>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {lightbox.project && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setLightbox({ project: null })}
            style={{
              position: 'fixed', inset: 0, zIndex: 9999,
              background: 'rgba(0,0,0,0.96)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              padding: '1.5rem',
            }}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              onClick={e => e.stopPropagation()}
              style={{ maxWidth: 900, width: '100%', position: 'relative' }}
            >
              <button
                onClick={() => setLightbox({ project: null })}
                style={{
                  position: 'absolute', top: '-3rem', right: 0,
                  background: 'none', border: '1px solid rgba(201,168,76,0.3)',
                  color: '#C9A84C', fontFamily: '"Inter", sans-serif',
                  fontSize: '0.7rem', cursor: 'pointer',
                  letterSpacing: '0.2em', textTransform: 'uppercase',
                  padding: '0.4rem 1.1rem', display: 'flex', alignItems: 'center', gap: '0.5rem',
                }}
              ><X size={12} /> Cerrar</button>
              <img
                src={lightbox.project.img}
                alt={lightbox.project.title}
                style={{ width: '100%', aspectRatio: '16/9', objectFit: 'cover', display: 'block' }}
              />
              <div style={{ marginTop: '1rem' }}>
                <span style={{
                  fontFamily: '"Inter", sans-serif',
                  fontSize: '0.58rem', letterSpacing: '0.42em',
                  color: '#C9A84C', textTransform: 'uppercase',
                }}>{lightbox.project.category} · {lightbox.project.location}</span>
                <h3 style={{
                  fontFamily: '"Playfair Display", serif',
                  fontSize: '1.5rem', fontWeight: 400,
                  color: '#F5F3EE', marginTop: '0.3rem',
                }}>{lightbox.project.title}</h3>
                <p style={{
                  fontFamily: '"Inter", sans-serif',
                  fontSize: '0.84rem', color: '#6B6B6B',
                  marginTop: '0.3rem', lineHeight: 1.6,
                }}>{lightbox.project.desc}</p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <style>{`
        @media (max-width: 900px) {
          .proj-grid { grid-template-columns: 1fr 1fr !important; }
          .proj-grid article[style*="span 2"] { grid-column: span 2 !important; }
        }
        @media (max-width: 560px) {
          .proj-grid { grid-template-columns: 1fr !important; }
          .proj-grid article[style*="span 2"] { grid-column: span 1 !important; }
        }
        .lp-project-card:hover .lp-project-img { transform: scale(1.06); }
        article:hover .lp-project-img { transform: scale(1.06); }
        article:hover .lp-project-overlay { opacity: 1 !important; }
      `}</style>
    </section>
  );
}
