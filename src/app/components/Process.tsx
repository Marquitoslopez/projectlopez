import { useRef } from 'react';
import { motion, useInView } from 'motion/react';
import { MessageSquare, FileSearch, HardHat, CheckCircle2 } from 'lucide-react';

const STEPS = [
  {
    num: '01',
    icon: MessageSquare,
    title: 'Consulta inicial',
    text: 'Nos reunimos para entender su visión, necesidades y presupuesto. Analizamos el terreno o la obra existente y definimos el alcance del proyecto.',
  },
  {
    num: '02',
    icon: FileSearch,
    title: 'Diseño y planificación',
    text: 'Nuestro equipo elabora planos, renders y presupuesto detallado. Iteramos hasta que el proyecto refleje exactamente lo que imaginó.',
  },
  {
    num: '03',
    icon: HardHat,
    title: 'Ejecución de obra',
    text: 'Comenzamos la construcción con supervisión técnica permanente. Informes de avance semanales y acceso a la obra en cualquier momento.',
  },
  {
    num: '04',
    icon: CheckCircle2,
    title: 'Entrega y garantía',
    text: 'Hacemos entrega formal con todos los documentos, planos finales y garantía escrita. Su satisfacción es nuestra mejor obra.',
  },
];

export function Process() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section id="proceso" style={{ background: '#111111', padding: 'var(--section-pad, 7rem 4rem)', position: 'relative', overflow: 'hidden' }}>
      {/* Background pattern */}
      <div style={{
        position: 'absolute', inset: 0, opacity: 0.025,
        backgroundImage: 'linear-gradient(rgba(201,168,76,0.5) 1px,transparent 1px),linear-gradient(90deg,rgba(201,168,76,0.5) 1px,transparent 1px)',
        backgroundSize: '60px 60px',
      }} />

      <div style={{ maxWidth: 1200, margin: '0 auto', position: 'relative', zIndex: 1 }}>

        {/* Header */}
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          style={{ textAlign: 'center', maxWidth: 580, margin: '0 auto 5rem' }}
        >
          <p style={{
            fontFamily: '"Inter", sans-serif',
            fontSize: '0.65rem', letterSpacing: '0.55em',
            color: '#C9A84C', textTransform: 'uppercase',
            fontWeight: 500, marginBottom: '0.8rem',
          }}>Cómo trabajamos</p>
          <h2 style={{
            fontFamily: '"Playfair Display", serif',
            fontSize: 'clamp(2rem,3.6vw,2.9rem)',
            fontWeight: 500, lineHeight: 1.15,
            color: '#F5F3EE', marginBottom: '1.2rem',
          }}>Un proceso <em style={{ fontStyle: 'italic', color: '#E8C97E' }}>transparente</em> y estructurado</h2>
          <motion.div
            initial={{ width: 0 }}
            animate={inView ? { width: 44 } : {}}
            transition={{ duration: 0.8, delay: 0.3 }}
            style={{ height: 1, background: '#C9A84C', margin: '0 auto' }}
          />
        </motion.div>

        {/* Steps */}
        <div style={{
          display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)',
          gap: '1.5rem', position: 'relative',
        }} className="process-grid">

          {/* Connecting line */}
          <motion.div
            initial={{ scaleX: 0 }}
            animate={inView ? { scaleX: 1 } : {}}
            transition={{ duration: 1.2, delay: 0.5 }}
            style={{
              position: 'absolute', top: '2.5rem', left: '12.5%', right: '12.5%',
              height: 1,
              background: 'linear-gradient(to right, transparent, rgba(201,168,76,0.3), rgba(201,168,76,0.3), transparent)',
              transformOrigin: 'left',
            }}
            className="process-line"
          />

          {STEPS.map((step, i) => {
            const Icon = step.icon;
            return (
              <motion.div
                key={step.num}
                initial={{ opacity: 0, y: 30 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.7, delay: 0.3 + i * 0.15 }}
                style={{ textAlign: 'center', padding: '0 0.5rem' }}
              >
                {/* Icon circle */}
                <div style={{
                  width: 52, height: 52, margin: '0 auto 1.5rem',
                  border: '0.5px solid rgba(201,168,76,0.35)',
                  background: 'rgba(201,168,76,0.06)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  color: '#C9A84C', position: 'relative',
                }}>
                  <Icon size={20} strokeWidth={1.3} />
                  <span style={{
                    position: 'absolute', top: '-10px', right: '-10px',
                    fontFamily: '"Playfair Display", serif',
                    fontSize: '0.65rem', fontWeight: 700,
                    color: '#C9A84C',
                    background: '#111111',
                    border: '0.5px solid rgba(201,168,76,0.3)',
                    width: 22, height: 22,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    letterSpacing: 0,
                  }}>{i + 1}</span>
                </div>

                <h3 style={{
                  fontFamily: '"Playfair Display", serif',
                  fontSize: '1.1rem', fontWeight: 600,
                  color: '#F5F3EE', marginBottom: '0.75rem',
                  lineHeight: 1.3,
                }}>{step.title}</h3>

                <p style={{
                  fontFamily: '"Inter", sans-serif',
                  fontSize: '0.83rem', color: '#6B6B6B',
                  fontWeight: 300, lineHeight: 1.7,
                }}>{step.text}</p>
              </motion.div>
            );
          })}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 1, duration: 0.7 }}
          style={{ textAlign: 'center', marginTop: '4rem' }}
        >
          <button
            onClick={() => document.getElementById('contacto')?.scrollIntoView({ behavior: 'smooth' })}
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
          >Iniciar mi proyecto</button>
        </motion.div>
      </div>

      <style>{`
        @media (max-width: 900px) {
          .process-grid { grid-template-columns: repeat(2,1fr) !important; }
          .process-line { display: none !important; }
        }
        @media (max-width: 560px) {
          .process-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  );
}
