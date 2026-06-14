import { useState, useEffect } from 'react';
import { ArrowUp } from 'lucide-react';

export function FloatingButtons() {
  const [showTop, setShowTop] = useState(false);

  useEffect(() => {
    const onScroll = () => setShowTop(window.scrollY > 400);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <>
      {/* WhatsApp */}
      <div style={{
        position: 'fixed', bottom: '2rem', right: '2rem',
        zIndex: 500, display: 'flex', alignItems: 'center',
        animation: 'waBounceIn 0.6s 2.8s cubic-bezier(.34,1.56,.64,1) both',
      }}>
        <span style={{
          background: '#1A1A1A',
          border: '0.5px solid rgba(201,168,76,0.25)',
          color: '#F5F3EE',
          fontFamily: '"Inter", sans-serif',
          fontSize: '0.75rem',
          padding: '0.5rem 1rem',
          whiteSpace: 'nowrap',
          marginRight: '0.75rem',
          opacity: 0,
          transition: 'opacity 0.25s ease, transform 0.25s ease',
        }} id="wa-tooltip">
          ¡Hola! <strong style={{ color: '#C9A84C' }}>¿Consultamos?</strong>
        </span>
        <div style={{ position: 'relative' }}>
          {/* Pulse ring */}
          <div style={{
            position: 'absolute', inset: -4, borderRadius: '50%',
            background: 'rgba(37,211,102,0.3)',
            animation: 'waPulse 2.5s 3.5s infinite',
          }} />
          <a
            href="https://wa.me/5492644000000?text=Hola%20L%C3%B3pez%20Group%2C%20me%20gustar%C3%ADa%20consultar%20sobre%20un%20proyecto."
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Contactar por WhatsApp"
            style={{
              width: 58, height: 58,
              background: '#25D366',
              borderRadius: '50%',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              textDecoration: 'none', position: 'relative',
              boxShadow: '0 4px 20px rgba(37,211,102,0.4), 0 2px 8px rgba(0,0,0,0.3)',
              transition: 'transform 0.25s cubic-bezier(.34,1.56,.64,1), box-shadow 0.25s ease',
            }}
            onMouseEnter={e => {
              (e.currentTarget as HTMLElement).style.transform = 'scale(1.12)';
              (e.currentTarget as HTMLElement).style.boxShadow = '0 6px 28px rgba(37,211,102,0.55), 0 4px 12px rgba(0,0,0,0.3)';
              const tooltip = document.getElementById('wa-tooltip');
              if (tooltip) { tooltip.style.opacity = '1'; tooltip.style.transform = 'translateX(0)'; }
            }}
            onMouseLeave={e => {
              (e.currentTarget as HTMLElement).style.transform = 'scale(1)';
              (e.currentTarget as HTMLElement).style.boxShadow = '0 4px 20px rgba(37,211,102,0.4), 0 2px 8px rgba(0,0,0,0.3)';
              const tooltip = document.getElementById('wa-tooltip');
              if (tooltip) { tooltip.style.opacity = '0'; tooltip.style.transform = 'translateX(8px)'; }
            }}
          >
            <svg viewBox="0 0 32 32" width={28} height={28} fill="#fff">
              <path d="M16 .5C7.439.5.5 7.439.5 16c0 2.777.726 5.38 1.995 7.644L.5 31.5l8.13-2.128A15.437 15.437 0 0016 31.5C24.561 31.5 31.5 24.561 31.5 16S24.561.5 16 .5zm7.234 19.003c-.396-.198-2.344-1.156-2.707-1.289-.363-.132-.627-.198-.891.199-.264.396-1.023 1.289-1.254 1.553-.231.265-.462.298-.858.1-.396-.199-1.672-.616-3.185-1.965-1.177-1.05-1.972-2.346-2.203-2.742-.231-.396-.025-.61.173-.807.179-.178.396-.463.594-.695.198-.231.264-.396.396-.66.132-.264.066-.496-.033-.695-.1-.198-.891-2.15-1.221-2.945-.32-.773-.647-.668-.891-.68l-.759-.013c-.264 0-.693.099-1.056.496-.363.396-1.386 1.354-1.386 3.304 0 1.95 1.419 3.834 1.617 4.098.198.264 2.793 4.263 6.768 5.979.946.408 1.684.651 2.259.834.949.302 1.813.259 2.496.157.762-.113 2.344-.958 2.675-1.883.33-.925.33-1.718.231-1.883-.099-.165-.363-.264-.759-.462z"/>
            </svg>
            {/* Badge */}
            <div style={{
              position: 'absolute', top: 1, right: 1,
              width: 14, height: 14,
              background: '#ff3b30', borderRadius: '50%',
              border: '2px solid #0A0A0A',
            }} />
          </a>
        </div>
      </div>

      {/* Back to top */}
      <button
        onClick={() => document.getElementById('inicio')?.scrollIntoView({ behavior: 'smooth' })}
        aria-label="Volver al inicio"
        style={{
          position: 'fixed', bottom: '2rem', left: '2rem',
          zIndex: 500, width: 46, height: 46,
          background: 'rgba(10,10,10,0.85)',
          border: '0.5px solid rgba(201,168,76,0.35)',
          color: '#C9A84C', cursor: 'pointer',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          opacity: showTop ? 1 : 0,
          transform: showTop ? 'translateY(0)' : 'translateY(16px)',
          pointerEvents: showTop ? 'auto' : 'none',
          transition: 'opacity 0.35s ease, transform 0.35s ease, background 0.25s ease, border-color 0.25s ease',
          backdropFilter: 'blur(8px)',
          WebkitBackdropFilter: 'blur(8px)',
        }}
        onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = '#C9A84C'; (e.currentTarget as HTMLElement).style.borderColor = '#C9A84C'; (e.currentTarget as HTMLElement).style.color = '#0A0A0A'; }}
        onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = 'rgba(10,10,10,0.85)'; (e.currentTarget as HTMLElement).style.borderColor = 'rgba(201,168,76,0.35)'; (e.currentTarget as HTMLElement).style.color = '#C9A84C'; }}
      >
        <ArrowUp size={16} strokeWidth={1.8} />
      </button>
    </>
  );
}
