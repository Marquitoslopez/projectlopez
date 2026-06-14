import { useRef, useState } from 'react';
import { motion, useInView, AnimatePresence } from 'motion/react';
import { Plus, Minus } from 'lucide-react';

const FAQS = [
  { q: '¿En qué zonas de Argentina operan?', a: 'Trabajamos principalmente en la provincia de San Juan y el resto de la región de Cuyo (Mendoza, San Luis, La Rioja). Para proyectos de gran envergadura podemos operar a nivel nacional.' },
  { q: '¿Cómo se define el presupuesto de una obra?', a: 'El presupuesto se elabora en base a un relevamiento detallado, los planos y especificaciones técnicas del proyecto. Entregamos un presupuesto desglosado por rubro, sin sorpresas.' },
  { q: '¿Cuánto tiempo demora la construcción de una vivienda?', a: 'Varía según la superficie, complejidad y materiales. Como referencia, una vivienda estándar de 120 m² demora aproximadamente 6 a 10 meses desde el inicio de obra.' },
  { q: '¿López Group ofrece financiamiento?', a: 'Si bien no somos una entidad financiera, asesoramos a nuestros clientes sobre opciones bancarias y de crédito disponibles, y podemos estructurar el proyecto en etapas para adecuarlo a su capacidad de inversión.' },
  { q: '¿Qué documentación proveen al finalizar la obra?', a: 'Entregamos planos "as built" actualizados, manuales de mantenimiento, garantías de los materiales instalados y toda la documentación técnica necesaria para gestión municipal o escritura.' },
  { q: '¿Trabajan con materiales de origen nacional o importados?', a: 'Utilizamos materiales de primera calidad, tanto nacionales como importados, según lo requiera el proyecto. Priorizamos proveedores con certificaciones de calidad y trabajamos con marcas líderes del mercado.' },
];

function FaqItem({ faq, index }: { faq: typeof FAQS[0]; index: number }) {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.08 }}
      style={{
        borderBottom: '0.5px solid rgba(201,168,76,0.12)',
      }}
    >
      <button
        onClick={() => setOpen(o => !o)}
        style={{
          width: '100%', textAlign: 'left',
          display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start',
          padding: '1.5rem 0', gap: '1.5rem',
          background: 'none', border: 'none', cursor: 'pointer',
        }}
      >
        <span style={{
          fontFamily: '"Playfair Display", serif',
          fontSize: '1.05rem', fontWeight: 500,
          color: open ? '#C9A84C' : '#F5F3EE',
          lineHeight: 1.4, textAlign: 'left',
          transition: 'color 0.25s',
        }}>{faq.q}</span>
        <span style={{
          color: '#C9A84C', flexShrink: 0, marginTop: '0.15rem',
          width: 24, height: 24,
          border: '0.5px solid rgba(201,168,76,0.35)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          transition: 'background 0.25s',
          background: open ? 'rgba(201,168,76,0.15)' : 'transparent',
        }}>
          {open ? <Minus size={12} /> : <Plus size={12} />}
        </span>
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            style={{ overflow: 'hidden' }}
          >
            <p style={{
              fontFamily: '"Inter", sans-serif',
              fontSize: '0.92rem', color: '#6B6B6B',
              fontWeight: 300, lineHeight: 1.75,
              paddingBottom: '1.5rem',
            }}>{faq.a}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export function FAQ() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section style={{ background: '#111111', padding: 'var(--section-pad, 7rem 4rem)' }}>
      <div style={{ maxWidth: 1200, margin: '0 auto', display: 'grid', gridTemplateColumns: '1fr 1.6fr', gap: '6rem', alignItems: 'start' }} className="faq-grid">

        {/* Left: header */}
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          style={{ position: 'sticky', top: '8rem' }}
        >
          <p style={{
            fontFamily: '"Inter", sans-serif',
            fontSize: '0.65rem', letterSpacing: '0.55em',
            color: '#C9A84C', textTransform: 'uppercase',
            fontWeight: 500, marginBottom: '0.8rem',
          }}>FAQ</p>
          <h2 style={{
            fontFamily: '"Playfair Display", serif',
            fontSize: 'clamp(2rem,3.2vw,2.8rem)',
            fontWeight: 500, lineHeight: 1.15,
            color: '#F5F3EE', marginBottom: '1.4rem',
          }}>Preguntas <em style={{ fontStyle: 'italic', color: '#E8C97E' }}>frecuentes</em></h2>
          <motion.div
            initial={{ width: 0 }}
            animate={inView ? { width: 44 } : {}}
            transition={{ duration: 0.8, delay: 0.3 }}
            style={{ height: 1, background: '#C9A84C', marginBottom: '1.5rem' }}
          />
          <p style={{
            fontFamily: '"Inter", sans-serif',
            fontSize: '0.9rem', color: '#6B6B6B',
            fontWeight: 300, lineHeight: 1.75,
            marginBottom: '2rem',
          }}>
            ¿No encontró su respuesta? Contáctenos directamente y le respondemos a la brevedad.
          </p>
          <button
            onClick={() => document.getElementById('contacto')?.scrollIntoView({ behavior: 'smooth' })}
            style={{
              padding: '0.8rem 2rem',
              background: 'transparent', color: '#C9A84C',
              fontFamily: '"Inter", sans-serif',
              fontSize: '0.7rem', letterSpacing: '0.2em',
              fontWeight: 600, textTransform: 'uppercase',
              border: '1px solid rgba(201,168,76,0.35)', cursor: 'pointer',
              transition: 'all 0.25s',
            }}
            onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = '#C9A84C'; (e.currentTarget as HTMLElement).style.color = '#0A0A0A'; }}
            onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = 'transparent'; (e.currentTarget as HTMLElement).style.color = '#C9A84C'; }}
          >Hacer una consulta</button>
        </motion.div>

        {/* Right: accordion */}
        <div>
          {FAQS.map((faq, i) => <FaqItem key={i} faq={faq} index={i} />)}
        </div>
      </div>

      <style>{`
        @media (max-width: 900px) {
          .faq-grid { grid-template-columns: 1fr !important; gap: 3rem !important; }
          .faq-grid > div:first-child { position: static !important; }
        }
      `}</style>
    </section>
  );
}
