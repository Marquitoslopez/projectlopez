import { useRef, useState } from 'react';
import { motion, useInView } from 'motion/react';
import { MapPin, Phone, Mail, Clock, Send } from 'lucide-react';

const INFO = [
  { icon: MapPin, title: 'Dirección', content: 'Av. San Martín 1234, San Martín\nSan Juan, Argentina' },
  { icon: Phone,  title: 'Teléfono', content: '+54 (2623) 000-000', href: 'tel:+542623000000' },
  { icon: Mail,   title: 'Email',    content: 'info@lopezgroup.com.ar', href: 'mailto:info@lopezgroup.com.ar' },
  { icon: Clock,  title: 'Horarios', content: 'Lun – Vie: 8:00 – 18:00 h\nSábados: 9:00 – 13:00 h' },
];

export function Contact() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });
  const [form, setForm] = useState({ nombre: '', empresa: '', email: '', telefono: '', tipo: '', mensaje: '' });
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent'>('idle');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('sending');
    setTimeout(() => setStatus('sent'), 1500);
  };

  const inputStyle = {
    width: '100%',
    background: 'rgba(255,255,255,0.04)',
    border: '0.5px solid rgba(201,168,76,0.18)',
    color: '#F5F3EE',
    padding: '0.9rem 1rem',
    fontFamily: '"Inter", sans-serif',
    fontSize: '0.9rem', fontWeight: 300,
    outline: 'none',
    transition: 'border-color 0.25s, background 0.25s',
    borderRadius: 0,
    appearance: 'none' as const,
    WebkitAppearance: 'none' as const,
  };

  return (
    <section id="contacto" style={{ background: '#0A0A0A', padding: 'var(--section-pad, 7rem 4rem)' }}>
      <div style={{ maxWidth: 1200, margin: '0 auto' }}>

        {/* Header */}
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
          }}>Hablemos</p>
          <h2 style={{
            fontFamily: '"Playfair Display", serif',
            fontSize: 'clamp(2rem,3.6vw,2.9rem)',
            fontWeight: 500, lineHeight: 1.15,
            color: '#F5F3EE',
          }}>Iniciemos su <em style={{ fontStyle: 'italic', color: '#E8C97E' }}>próximo<br />gran proyecto</em></h2>
        </motion.div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '5rem' }} className="contact-grid">

          {/* Form */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <div style={{ width: 44, height: 1, background: '#C9A84C', marginBottom: '1.75rem' }} />

            {status === 'sent' ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                style={{
                  padding: '3rem 2rem', textAlign: 'center',
                  border: '0.5px solid rgba(201,168,76,0.25)',
                  background: 'rgba(201,168,76,0.04)',
                }}
              >
                <div style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>✓</div>
                <h3 style={{
                  fontFamily: '"Playfair Display", serif',
                  fontSize: '1.4rem', color: '#C9A84C', marginBottom: '0.75rem',
                }}>Mensaje enviado</h3>
                <p style={{
                  fontFamily: '"Inter", sans-serif',
                  fontSize: '0.88rem', color: '#6B6B6B', lineHeight: 1.6,
                }}>Gracias por contactarnos. Le responderemos a la brevedad.</p>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit}>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1rem' }}>
                  {[
                    { id: 'nombre', label: 'Nombre *', placeholder: 'Su nombre completo', required: true },
                    { id: 'empresa', label: 'Empresa', placeholder: 'Razón social (opcional)', required: false },
                  ].map(f => (
                    <div key={f.id}>
                      <label style={{
                        display: 'block',
                        fontFamily: '"Inter", sans-serif',
                        fontSize: '0.65rem', letterSpacing: '0.28em',
                        textTransform: 'uppercase', color: '#6B6B6B',
                        fontWeight: 500, marginBottom: '0.45rem',
                      }}>{f.label}</label>
                      <input
                        type="text" id={f.id} required={f.required}
                        placeholder={f.placeholder}
                        value={(form as any)[f.id]}
                        onChange={e => setForm(fm => ({ ...fm, [f.id]: e.target.value }))}
                        style={inputStyle}
                        onFocus={e => { e.target.style.borderColor = '#C9A84C'; e.target.style.background = 'rgba(201,168,76,0.03)'; }}
                        onBlur={e => { e.target.style.borderColor = 'rgba(201,168,76,0.18)'; e.target.style.background = 'rgba(255,255,255,0.04)'; }}
                      />
                    </div>
                  ))}
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1rem' }}>
                  {[
                    { id: 'email', label: 'Email *', type: 'email', placeholder: 'contacto@empresa.com', required: true },
                    { id: 'telefono', label: 'Teléfono', type: 'tel', placeholder: '+54 264 000-0000', required: false },
                  ].map(f => (
                    <div key={f.id}>
                      <label style={{
                        display: 'block',
                        fontFamily: '"Inter", sans-serif',
                        fontSize: '0.65rem', letterSpacing: '0.28em',
                        textTransform: 'uppercase', color: '#6B6B6B',
                        fontWeight: 500, marginBottom: '0.45rem',
                      }}>{f.label}</label>
                      <input
                        type={f.type} id={f.id} required={f.required}
                        placeholder={f.placeholder}
                        value={(form as any)[f.id]}
                        onChange={e => setForm(fm => ({ ...fm, [f.id]: e.target.value }))}
                        style={inputStyle}
                        onFocus={e => { e.target.style.borderColor = '#C9A84C'; e.target.style.background = 'rgba(201,168,76,0.03)'; }}
                        onBlur={e => { e.target.style.borderColor = 'rgba(201,168,76,0.18)'; e.target.style.background = 'rgba(255,255,255,0.04)'; }}
                      />
                    </div>
                  ))}
                </div>

                <div style={{ marginBottom: '1rem' }}>
                  <label style={{
                    display: 'block',
                    fontFamily: '"Inter", sans-serif',
                    fontSize: '0.65rem', letterSpacing: '0.28em',
                    textTransform: 'uppercase', color: '#6B6B6B',
                    fontWeight: 500, marginBottom: '0.45rem',
                  }}>Tipo de proyecto</label>
                  <select
                    value={form.tipo}
                    onChange={e => setForm(fm => ({ ...fm, tipo: e.target.value }))}
                    style={{ ...inputStyle, color: form.tipo ? '#F5F3EE' : '#6B6B6B' }}
                    onFocus={e => { e.target.style.borderColor = '#C9A84C'; }}
                    onBlur={e => { e.target.style.borderColor = 'rgba(201,168,76,0.18)'; }}
                  >
                    <option value="" disabled>Seleccione una categoría</option>
                    <option value="residencial" style={{ background: '#1A1A1A' }}>Arquitectura residencial</option>
                    <option value="comercial" style={{ background: '#1A1A1A' }}>Construcción civil / comercial</option>
                    <option value="industrial" style={{ background: '#1A1A1A' }}>Proyecto industrial</option>
                    <option value="remodelacion" style={{ background: '#1A1A1A' }}>Remodelación</option>
                    <option value="consultoria" style={{ background: '#1A1A1A' }}>Consultoría técnica</option>
                    <option value="otro" style={{ background: '#1A1A1A' }}>Otro</option>
                  </select>
                </div>

                <div style={{ marginBottom: '1.5rem' }}>
                  <label style={{
                    display: 'block',
                    fontFamily: '"Inter", sans-serif',
                    fontSize: '0.65rem', letterSpacing: '0.28em',
                    textTransform: 'uppercase', color: '#6B6B6B',
                    fontWeight: 500, marginBottom: '0.45rem',
                  }}>Cuéntenos su proyecto</label>
                  <textarea
                    placeholder="Describa brevemente su idea, ubicación y plazos estimados..."
                    value={form.mensaje}
                    onChange={e => setForm(fm => ({ ...fm, mensaje: e.target.value }))}
                    style={{ ...inputStyle, minHeight: 140, resize: 'vertical' }}
                    onFocus={e => { e.target.style.borderColor = '#C9A84C'; e.target.style.background = 'rgba(201,168,76,0.03)'; }}
                    onBlur={e => { e.target.style.borderColor = 'rgba(201,168,76,0.18)'; e.target.style.background = 'rgba(255,255,255,0.04)'; }}
                  />
                </div>

                <button
                  type="submit"
                  disabled={status === 'sending'}
                  style={{
                    width: '100%', padding: '1rem 2rem',
                    background: '#C9A84C', color: '#0A0A0A',
                    fontFamily: '"Inter", sans-serif',
                    fontSize: '0.72rem', letterSpacing: '0.2em',
                    fontWeight: 600, textTransform: 'uppercase',
                    border: 'none', cursor: status === 'sending' ? 'not-allowed' : 'pointer',
                    opacity: status === 'sending' ? 0.7 : 1,
                    display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.6rem',
                    transition: 'background 0.25s',
                  }}
                  onMouseEnter={e => { if (status !== 'sending') (e.currentTarget as HTMLElement).style.background = '#E8C97E'; }}
                  onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = '#C9A84C'; }}
                >
                  <Send size={14} />
                  {status === 'sending' ? 'Enviando...' : 'Enviar consulta'}
                </button>
              </form>
            )}
          </motion.div>

          {/* Sidebar */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.35 }}
          >
            {/* Mock map */}
            <div style={{
              background: '#1A1A1A',
              border: '0.5px solid rgba(201,168,76,0.12)',
              marginBottom: '0',
            }}>
              <div style={{ padding: '2rem 2rem 0', height: 220, position: 'relative', overflow: 'hidden' }}>
                <div style={{
                  position: 'absolute', inset: 0, opacity: 0.12,
                  backgroundImage: 'linear-gradient(rgba(201,168,76,0.7) 1px,transparent 1px),linear-gradient(90deg,rgba(201,168,76,0.7) 1px,transparent 1px)',
                  backgroundSize: '36px 36px',
                }} />
                <div style={{
                  position: 'absolute', inset: 0, opacity: 0.15,
                  backgroundImage: 'linear-gradient(rgba(201,168,76,1) 2px,transparent 2px),linear-gradient(90deg,rgba(201,168,76,1) 2px,transparent 2px)',
                  backgroundSize: '180px 180px', backgroundPosition: '90px 90px',
                }} />
                <div style={{
                  position: 'absolute', top: '45%', left: '48%', transform: 'translate(-50%,-50%)',
                  display: 'flex', flexDirection: 'column', alignItems: 'center',
                }}>
                  <div style={{
                    width: 14, height: 14, borderRadius: '50%',
                    background: '#C9A84C',
                    animation: 'markerPulse 2s infinite',
                  }} />
                  <div style={{ width: 1, height: 18, background: '#C9A84C' }} />
                </div>
                <div style={{
                  position: 'absolute', bottom: '1rem', left: '1.1rem',
                  fontFamily: '"Playfair Display", serif',
                  fontSize: '0.85rem', color: 'rgba(201,168,76,0.5)',
                  letterSpacing: '0.18em',
                }}>San Juan · Argentina</div>
              </div>

              {/* Info items */}
              <div style={{ padding: '1.5rem', borderTop: '0.5px solid rgba(201,168,76,0.12)' }}>
                {INFO.map(item => {
                  const Icon = item.icon;
                  return (
                    <div key={item.title} style={{
                      display: 'flex', gap: '0.9rem', alignItems: 'flex-start',
                      marginBottom: '1.1rem',
                    }}>
                      <div style={{
                        color: '#C9A84C', flexShrink: 0, marginTop: '0.15rem',
                        width: 28, height: 28,
                        border: '0.5px solid rgba(201,168,76,0.25)',
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                      }}><Icon size={12} /></div>
                      <div>
                        <div style={{
                          fontFamily: '"Inter", sans-serif',
                          fontSize: '0.62rem', letterSpacing: '0.25em',
                          textTransform: 'uppercase', color: '#C9A84C',
                          marginBottom: '0.12rem', fontWeight: 500,
                        }}>{item.title}</div>
                        {item.href ? (
                          <a href={item.href} style={{
                            fontFamily: '"Inter", sans-serif',
                            fontSize: '0.84rem', color: '#ADADAD',
                            fontWeight: 300, lineHeight: 1.55,
                            textDecoration: 'none', transition: 'color 0.2s',
                          }}
                            onMouseEnter={e => (e.currentTarget as HTMLElement).style.color = '#C9A84C'}
                            onMouseLeave={e => (e.currentTarget as HTMLElement).style.color = '#ADADAD'}
                          >{item.content}</a>
                        ) : (
                          <p style={{
                            fontFamily: '"Inter", sans-serif',
                            fontSize: '0.84rem', color: '#ADADAD',
                            fontWeight: 300, lineHeight: 1.55, whiteSpace: 'pre-line',
                          }}>{item.content}</p>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* WhatsApp CTA */}
            <a
              href="https://wa.me/5492644000000?text=Hola%20L%C3%B3pez%20Group%2C%20me%20gustar%C3%ADa%20consultar%20sobre%20un%20proyecto."
              target="_blank" rel="noopener noreferrer"
              style={{
                display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.75rem',
                marginTop: '1rem', padding: '1rem',
                background: '#25D366', color: '#fff',
                fontFamily: '"Inter", sans-serif',
                fontSize: '0.75rem', letterSpacing: '0.15em',
                textTransform: 'uppercase', fontWeight: 600,
                textDecoration: 'none',
                transition: 'background 0.25s',
              }}
              onMouseEnter={e => (e.currentTarget as HTMLElement).style.background = '#128C7E'}
              onMouseLeave={e => (e.currentTarget as HTMLElement).style.background = '#25D366'}
            >
              <svg viewBox="0 0 32 32" width={20} height={20} fill="#fff">
                <path d="M16 .5C7.439.5.5 7.439.5 16c0 2.777.726 5.38 1.995 7.644L.5 31.5l8.13-2.128A15.437 15.437 0 0016 31.5C24.561 31.5 31.5 24.561 31.5 16S24.561.5 16 .5zm7.234 19.003c-.396-.198-2.344-1.156-2.707-1.289-.363-.132-.627-.198-.891.199-.264.396-1.023 1.289-1.254 1.553-.231.265-.462.298-.858.1-.396-.199-1.672-.616-3.185-1.965-1.177-1.05-1.972-2.346-2.203-2.742-.231-.396-.025-.61.173-.807.179-.178.396-.463.594-.695.198-.231.264-.396.396-.66.132-.264.066-.496-.033-.695-.1-.198-.891-2.15-1.221-2.945-.32-.773-.647-.668-.891-.68l-.759-.013c-.264 0-.693.099-1.056.496-.363.396-1.386 1.354-1.386 3.304 0 1.95 1.419 3.834 1.617 4.098.198.264 2.793 4.263 6.768 5.979.946.408 1.684.651 2.259.834.949.302 1.813.259 2.496.157.762-.113 2.344-.958 2.675-1.883.33-.925.33-1.718.231-1.883-.099-.165-.363-.264-.759-.462z"/>
              </svg>
              Consultar por WhatsApp
            </a>
          </motion.div>
        </div>
      </div>

      <style>{`
        @media (max-width: 900px) {
          .contact-grid { grid-template-columns: 1fr !important; gap: 2.5rem !important; }
        }
        @media (max-width: 560px) {
          form > div:first-child, form > div:nth-child(2) { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  );
}
