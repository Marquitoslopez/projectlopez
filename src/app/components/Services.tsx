import { useRef } from 'react';
import { motion, useInView } from 'motion/react';
import { Building2, Home, Wrench, ClipboardList, HardHat, Ruler } from 'lucide-react';

const SERVICES = [
  {
    icon: Building2,
    num: '01',
    title: 'Arquitectura',
    text: 'Diseño arquitectónico integral, desde el concepto hasta los planos ejecutivos. Soluciones estéticas y funcionales para cada cliente.',
    detail: 'Residencial · Comercial · Industrial',
  },
  {
    icon: HardHat,
    num: '02',
    title: 'Construcción Civil',
    text: 'Ejecución de obras civiles de gran envergadura: edificios, complejos residenciales, infraestructuras industriales y obras públicas.',
    detail: 'Estructuras · Hormigón · Mampostería',
  },
  {
    icon: Wrench,
    num: '03',
    title: 'Remodelaciones',
    text: 'Transformación y renovación de espacios existentes con criterio técnico y estético. Cumplimos plazos y minimizamos interferencias.',
    detail: 'Reforma · Ampliación · Restauración',
  },
  {
    icon: ClipboardList,
    num: '04',
    title: 'Consultoría Técnica',
    text: 'Auditoría, peritaje y asesoría en proyectos de terceros. Análisis estructural, gestión de obra y control de calidad certificado.',
    detail: 'Peritaje · Auditoría · Gestión',
  },
  {
    icon: Home,
    num: '05',
    title: 'Viviendas Particulares',
    text: 'Construcción de casas y chalets a medida. Materializamos la vivienda que soñó con la calidad y el acabado que merece.',
    detail: 'Llave en mano · Personalizado',
  },
  {
    icon: Ruler,
    num: '06',
    title: 'Relevamiento y Planos',
    text: 'Relevamiento de construcciones existentes, regularización dominial y confección de documentación técnica ante organismos oficiales.',
    detail: 'Planos · Legalizaciones · CUIT',
  },
];

export function Services() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section id="servicios" style={{ background: '#0A0A0A', padding: 'var(--section-pad, 7rem 4rem)' }}>
      <div style={{ maxWidth: 1200, margin: '0 auto' }}>

        {/* Header */}
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          style={{ textAlign: 'center', maxWidth: 560, margin: '0 auto 4rem' }}
        >
          <p style={{
            fontFamily: '"Inter", sans-serif',
            fontSize: '0.65rem', letterSpacing: '0.55em',
            color: '#C9A84C', textTransform: 'uppercase',
            fontWeight: 500, marginBottom: '0.8rem',
          }}>Lo que hacemos</p>
          <h2 style={{
            fontFamily: '"Playfair Display", serif',
            fontSize: 'clamp(2rem,3.6vw,2.9rem)',
            fontWeight: 500, lineHeight: 1.15,
            color: '#F5F3EE', marginBottom: '1.2rem',
          }}>Servicios de <em style={{ fontStyle: 'italic', color: '#E8C97E' }}>excelencia</em></h2>
          <motion.div
            initial={{ width: 0 }}
            animate={inView ? { width: 44 } : {}}
            transition={{ duration: 0.8, delay: 0.3 }}
            style={{ height: 1, background: '#C9A84C', margin: '0 auto' }}
          />
        </motion.div>

        {/* Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gap: '1.25rem',
        }} className="services-grid">
          {SERVICES.map((svc, i) => {
            const Icon = svc.icon;
            return (
              <motion.div
                key={svc.num}
                initial={{ opacity: 0, y: 32 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.7, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }}
                style={{
                  padding: '2.25rem 1.75rem',
                  border: '0.5px solid rgba(201,168,76,0.12)',
                  background: 'rgba(255,255,255,0.015)',
                  position: 'relative', overflow: 'hidden',
                  cursor: 'default',
                  transition: 'border-color 0.3s, transform 0.3s, background 0.3s',
                }}
                onMouseEnter={e => {
                  (e.currentTarget as HTMLElement).style.borderColor = 'rgba(201,168,76,0.35)';
                  (e.currentTarget as HTMLElement).style.transform = 'translateY(-6px)';
                  (e.currentTarget as HTMLElement).style.background = 'rgba(201,168,76,0.03)';
                }}
                onMouseLeave={e => {
                  (e.currentTarget as HTMLElement).style.borderColor = 'rgba(201,168,76,0.12)';
                  (e.currentTarget as HTMLElement).style.transform = 'none';
                  (e.currentTarget as HTMLElement).style.background = 'rgba(255,255,255,0.015)';
                }}
              >
                {/* Top accent line on hover - using CSS */}
                <div style={{
                  position: 'absolute', top: 0, left: 0, right: 0, height: 1,
                  background: 'linear-gradient(90deg, transparent, #C9A84C, transparent)',
                }} />

                {/* Number watermark */}
                <div style={{
                  position: 'absolute', top: '1rem', right: '1.25rem',
                  fontFamily: '"Playfair Display", serif',
                  fontSize: '3.5rem', fontWeight: 700,
                  color: 'rgba(201,168,76,0.05)', lineHeight: 1,
                  userSelect: 'none',
                }}>{svc.num}</div>

                {/* Icon */}
                <div style={{
                  width: 44, height: 44, marginBottom: '1.25rem',
                  border: '0.5px solid rgba(201,168,76,0.25)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  color: '#C9A84C',
                }}>
                  <Icon size={20} strokeWidth={1.4} />
                </div>

                <h3 style={{
                  fontFamily: '"Playfair Display", serif',
                  fontSize: '1.2rem', fontWeight: 600,
                  color: '#F5F3EE', marginBottom: '0.65rem',
                }}>{svc.title}</h3>

                <p style={{
                  fontFamily: '"Inter", sans-serif',
                  fontSize: '0.85rem', color: '#6B6B6B',
                  fontWeight: 300, lineHeight: 1.7,
                  marginBottom: '1rem',
                }}>{svc.text}</p>

                <p style={{
                  fontFamily: '"Inter", sans-serif',
                  fontSize: '0.6rem', letterSpacing: '0.3em',
                  color: '#8B6E2E', textTransform: 'uppercase',
                }}>{svc.detail}</p>
              </motion.div>
            );
          })}
        </div>
      </div>

      <style>{`
        @media (max-width: 1100px) { .services-grid { grid-template-columns: repeat(2,1fr) !important; } }
        @media (max-width: 600px)  { .services-grid { grid-template-columns: 1fr !important; } }
      `}</style>
    </section>
  );
}
