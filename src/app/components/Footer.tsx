import { Instagram, Linkedin, Facebook } from 'lucide-react';

const NAV = ['Inicio', 'Nosotros', 'Servicios', 'Proyectos', 'Proceso', 'Contacto'];
const SERVICES = ['Arquitectura', 'Construcción Civil', 'Remodelaciones', 'Consultoría Técnica', 'Viviendas Particulares', 'Relevamiento y Planos'];

const scrollTo = (id: string) => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });

export function Footer() {
  return (
    <footer style={{ background: '#111111', borderTop: '0.5px solid rgba(201,168,76,0.15)' }}>
      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '4rem 4rem 2rem' }} className="footer-inner">

        <div style={{ display: 'grid', gridTemplateColumns: '1.6fr 1fr 1fr 1fr', gap: '3rem', marginBottom: '3rem' }} className="footer-cols">

          {/* Brand */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1rem' }}>
              <div style={{
                width: 38, height: 38,
                border: '1px solid rgba(201,168,76,0.35)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                background: 'rgba(201,168,76,0.05)',
              }}>
                <svg width="18" height="18" viewBox="0 0 44 44" fill="none">
                  <polygon points="22,4 40,40 4,40" fill="none" stroke="#C9A84C" strokeWidth="1.8"/>
                  <rect x="16" y="26" width="12" height="12" fill="rgba(201,168,76,0.25)" stroke="#C9A84C" strokeWidth="0.8"/>
                </svg>
              </div>
              <div>
                <div style={{
                  fontFamily: '"Playfair Display", serif',
                  fontSize: '1rem', fontWeight: 600,
                  letterSpacing: '0.14em', color: '#F5F3EE',
                  lineHeight: 1.1, textTransform: 'uppercase',
                }}>López Group</div>
                <div style={{
                  fontSize: '0.52rem', letterSpacing: '0.42em',
                  color: '#C9A84C', fontWeight: 500,
                  textTransform: 'uppercase', fontFamily: '"Inter", sans-serif',
                }}>Construcción · Arquitectura</div>
              </div>
            </div>
            <p style={{
              fontFamily: '"Inter", sans-serif',
              fontSize: '0.82rem', color: '#6B6B6B',
              fontWeight: 300, lineHeight: 1.7,
              maxWidth: 240, marginBottom: '1.25rem',
            }}>Construyendo el futuro de San Juan con compromiso, calidad y visión en cada proyecto.</p>

            {/* Social links */}
            <div style={{ display: 'flex', gap: '0.6rem' }}>
              {[
                { Icon: Instagram, href: '#', label: 'Instagram' },
                { Icon: Linkedin,  href: '#', label: 'LinkedIn' },
                { Icon: Facebook,  href: '#', label: 'Facebook' },
              ].map(({ Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  style={{
                    width: 34, height: 34,
                    border: '0.5px solid rgba(201,168,76,0.25)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    color: '#6B6B6B', textDecoration: 'none',
                    transition: 'border-color 0.25s, color 0.25s',
                  }}
                  onMouseEnter={e => { (e.currentTarget as HTMLElement).style.borderColor = '#C9A84C'; (e.currentTarget as HTMLElement).style.color = '#C9A84C'; }}
                  onMouseLeave={e => { (e.currentTarget as HTMLElement).style.borderColor = 'rgba(201,168,76,0.25)'; (e.currentTarget as HTMLElement).style.color = '#6B6B6B'; }}
                ><Icon size={13} /></a>
              ))}
              <a
                href="https://wa.me/5492644000000"
                target="_blank" rel="noopener noreferrer"
                aria-label="WhatsApp"
                style={{
                  width: 34, height: 34,
                  border: '0.5px solid rgba(37,211,102,0.3)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  color: '#6B6B6B', textDecoration: 'none',
                  transition: 'border-color 0.25s, color 0.25s',
                }}
                onMouseEnter={e => { (e.currentTarget as HTMLElement).style.borderColor = '#25D366'; (e.currentTarget as HTMLElement).style.color = '#25D366'; }}
                onMouseLeave={e => { (e.currentTarget as HTMLElement).style.borderColor = 'rgba(37,211,102,0.3)'; (e.currentTarget as HTMLElement).style.color = '#6B6B6B'; }}
              >
                <svg viewBox="0 0 32 32" width={13} height={13} fill="currentColor">
                  <path d="M16 .5C7.439.5.5 7.439.5 16c0 2.777.726 5.38 1.995 7.644L.5 31.5l8.13-2.128A15.437 15.437 0 0016 31.5C24.561 31.5 31.5 24.561 31.5 16S24.561.5 16 .5zm7.234 19.003c-.396-.198-2.344-1.156-2.707-1.289-.363-.132-.627-.198-.891.199-.264.396-1.023 1.289-1.254 1.553-.231.265-.462.298-.858.1-.396-.199-1.672-.616-3.185-1.965-1.177-1.05-1.972-2.346-2.203-2.742-.231-.396-.025-.61.173-.807.179-.178.396-.463.594-.695.198-.231.264-.396.396-.66.132-.264.066-.496-.033-.695-.1-.198-.891-2.15-1.221-2.945-.32-.773-.647-.668-.891-.68l-.759-.013c-.264 0-.693.099-1.056.496-.363.396-1.386 1.354-1.386 3.304 0 1.95 1.419 3.834 1.617 4.098.198.264 2.793 4.263 6.768 5.979.946.408 1.684.651 2.259.834.949.302 1.813.259 2.496.157.762-.113 2.344-.958 2.675-1.883.33-.925.33-1.718.231-1.883-.099-.165-.363-.264-.759-.462z"/>
                </svg>
              </a>
            </div>
          </div>

          {/* Navigation */}
          <div>
            <h4 style={{
              fontFamily: '"Inter", sans-serif',
              fontSize: '0.65rem', letterSpacing: '0.35em',
              textTransform: 'uppercase', color: '#C9A84C',
              marginBottom: '1.1rem', fontWeight: 500,
            }}>Navegación</h4>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.65rem' }}>
              {NAV.map(item => (
                <li key={item}>
                  <a
                    href={`#${item.toLowerCase()}`}
                    onClick={e => { e.preventDefault(); scrollTo(item.toLowerCase()); }}
                    style={{
                      fontFamily: '"Inter", sans-serif',
                      fontSize: '0.82rem', color: '#6B6B6B',
                      textDecoration: 'none', fontWeight: 300,
                      transition: 'color 0.2s',
                    }}
                    onMouseEnter={e => (e.currentTarget as HTMLElement).style.color = '#C9A84C'}
                    onMouseLeave={e => (e.currentTarget as HTMLElement).style.color = '#6B6B6B'}
                  >{item}</a>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 style={{
              fontFamily: '"Inter", sans-serif',
              fontSize: '0.65rem', letterSpacing: '0.35em',
              textTransform: 'uppercase', color: '#C9A84C',
              marginBottom: '1.1rem', fontWeight: 500,
            }}>Servicios</h4>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.65rem' }}>
              {SERVICES.map(svc => (
                <li key={svc}>
                  <a
                    href="#servicios"
                    onClick={e => { e.preventDefault(); scrollTo('servicios'); }}
                    style={{
                      fontFamily: '"Inter", sans-serif',
                      fontSize: '0.82rem', color: '#6B6B6B',
                      textDecoration: 'none', fontWeight: 300,
                      transition: 'color 0.2s',
                    }}
                    onMouseEnter={e => (e.currentTarget as HTMLElement).style.color = '#C9A84C'}
                    onMouseLeave={e => (e.currentTarget as HTMLElement).style.color = '#6B6B6B'}
                  >{svc}</a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 style={{
              fontFamily: '"Inter", sans-serif',
              fontSize: '0.65rem', letterSpacing: '0.35em',
              textTransform: 'uppercase', color: '#C9A84C',
              marginBottom: '1.1rem', fontWeight: 500,
            }}>Contacto</h4>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.65rem' }}>
              {[
                { text: 'San Juan, Argentina', href: '#contacto' },
                { text: '+54 (2623) 000-000', href: 'tel:+542623000000' },
                { text: 'info@lopezgroup.com.ar', href: 'mailto:info@lopezgroup.com.ar' },
                { text: 'Lun – Vie 8:00 – 18:00', href: '#contacto' },
              ].map(item => (
                <li key={item.text}>
                  <a
                    href={item.href}
                    style={{
                      fontFamily: '"Inter", sans-serif',
                      fontSize: '0.82rem', color: '#6B6B6B',
                      textDecoration: 'none', fontWeight: 300,
                      transition: 'color 0.2s',
                    }}
                    onMouseEnter={e => (e.currentTarget as HTMLElement).style.color = '#C9A84C'}
                    onMouseLeave={e => (e.currentTarget as HTMLElement).style.color = '#6B6B6B'}
                  >{item.text}</a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div style={{
          borderTop: '0.5px solid rgba(255,255,255,0.05)',
          paddingTop: '1.5rem',
          display: 'flex', justifyContent: 'space-between', alignItems: 'center',
          flexWrap: 'wrap', gap: '0.5rem',
        }}>
          <p style={{
            fontFamily: '"Inter", sans-serif',
            fontSize: '0.72rem', color: '#6B6B6B', fontWeight: 300,
          }}>© 2025 <span style={{ color: '#C9A84C' }}>López Group</span>. Todos los derechos reservados.</p>
          <div style={{ display: 'flex', gap: '1.5rem' }}>
            {['Política de privacidad', 'Términos de uso'].map(item => (
              <a key={item} href="#" style={{
                fontFamily: '"Inter", sans-serif',
                fontSize: '0.68rem', color: '#6B6B6B',
                textDecoration: 'none', transition: 'color 0.2s',
              }}
                onMouseEnter={e => (e.currentTarget as HTMLElement).style.color = '#C9A84C'}
                onMouseLeave={e => (e.currentTarget as HTMLElement).style.color = '#6B6B6B'}
              >{item}</a>
            ))}
          </div>
          <p style={{
            fontFamily: '"Inter", sans-serif',
            fontSize: '0.72rem', color: '#6B6B6B', fontWeight: 300,
          }}>San Juan, Argentina</p>
        </div>
      </div>

      <style>{`
        @media (max-width: 1100px) { .footer-cols { grid-template-columns: 1fr 1fr !important; } }
        @media (max-width: 600px)  { .footer-cols { grid-template-columns: 1fr !important; } .footer-inner { padding: 3rem 1.5rem 1.75rem !important; } }
      `}</style>
    </footer>
  );
}
