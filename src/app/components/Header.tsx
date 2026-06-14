import { useState, useEffect } from 'react';

const NAV_LINKS = [
  { label: 'Inicio',     href: '#inicio' },
  { label: 'Nosotros',   href: '#nosotros' },
  { label: 'Servicios',  href: '#servicios' },
  { label: 'Proyectos',  href: '#proyectos' },
  { label: 'Proceso',    href: '#proceso' },
  { label: 'Contacto',   href: '#contacto', cta: true },
];

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    const close = (e: KeyboardEvent) => { if (e.key === 'Escape') setMenuOpen(false); };
    document.addEventListener('keydown', close);
    return () => document.removeEventListener('keydown', close);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : '';
  }, [menuOpen]);

  const scrollTo = (href: string) => {
    setMenuOpen(false);
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <header style={{
      position: 'fixed', top: 0, left: 0, right: 0,
      zIndex: 1000,
      display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      padding: scrolled ? '0.55rem 4rem' : '0.9rem 4rem',
      background: scrolled ? 'rgba(10,10,10,0.99)' : 'rgba(10,10,10,0.88)',
      backdropFilter: 'blur(20px)',
      WebkitBackdropFilter: 'blur(20px)',
      borderBottom: '0.5px solid rgba(201,168,76,0.18)',
      transition: 'padding 0.4s ease, background 0.4s ease',
    }}>
      {/* Logo */}
      <a
        href="#inicio"
        onClick={e => { e.preventDefault(); scrollTo('#inicio'); }}
        style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', textDecoration: 'none' }}
        aria-label="López Group — Inicio"
      >
        <div style={{
          width: 42, height: 42,
          border: '1px solid rgba(201,168,76,0.35)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          background: 'rgba(201,168,76,0.05)',
          flexShrink: 0,
        }}>
          <svg width="22" height="22" viewBox="0 0 44 44" fill="none">
            <polygon points="22,4 40,40 4,40" fill="none" stroke="#C9A84C" strokeWidth="1.8"/>
            <rect x="16" y="26" width="12" height="12" fill="rgba(201,168,76,0.25)" stroke="#C9A84C" strokeWidth="0.8"/>
          </svg>
        </div>
        <div>
          <div style={{
            fontFamily: '"Playfair Display", serif',
            fontSize: '1.15rem', fontWeight: 600,
            letterSpacing: '0.14em', color: '#F5F3EE',
            lineHeight: 1.1, textTransform: 'uppercase',
          }}>López Group</div>
          <div style={{
            fontSize: '0.56rem', letterSpacing: '0.42em',
            color: '#C9A84C', fontWeight: 500,
            textTransform: 'uppercase', fontFamily: '"Inter", sans-serif',
          }}>Construcción · Arquitectura</div>
        </div>
      </a>

      {/* Desktop Nav */}
      <nav style={{ display: 'flex', alignItems: 'center', gap: '2rem' }} className="hidden lg:flex">
        {NAV_LINKS.map(link => (
          <a
            key={link.href}
            href={link.href}
            onClick={e => { e.preventDefault(); scrollTo(link.href); }}
            style={{
              textDecoration: 'none',
              fontFamily: '"Inter", sans-serif',
              fontSize: '0.72rem',
              letterSpacing: '0.2em',
              fontWeight: 500,
              textTransform: 'uppercase',
              color: link.cta ? '#C9A84C' : '#ADADAD',
              transition: 'color 0.25s',
              padding: link.cta ? '0.45rem 1.3rem' : '0',
              border: link.cta ? '1px solid #C9A84C' : 'none',
              whiteSpace: 'nowrap',
            }}
            onMouseEnter={e => {
              if (!link.cta) (e.currentTarget as HTMLElement).style.color = '#C9A84C';
              else { (e.currentTarget as HTMLElement).style.background = '#C9A84C'; (e.currentTarget as HTMLElement).style.color = '#0A0A0A'; }
            }}
            onMouseLeave={e => {
              if (!link.cta) (e.currentTarget as HTMLElement).style.color = '#ADADAD';
              else { (e.currentTarget as HTMLElement).style.background = 'transparent'; (e.currentTarget as HTMLElement).style.color = '#C9A84C'; }
            }}
          >{link.label}</a>
        ))}
      </nav>

      {/* Hamburger */}
      <button
        onClick={() => setMenuOpen(o => !o)}
        aria-label={menuOpen ? 'Cerrar menú' : 'Abrir menú'}
        aria-expanded={menuOpen}
        className="lg:hidden"
        style={{
          background: 'none', border: 'none', cursor: 'pointer',
          display: 'flex', flexDirection: 'column', gap: '5px', padding: '4px',
        }}
      >
        {[0, 1, 2].map(i => (
          <span key={i} style={{
            display: 'block', width: 22, height: 1.5,
            background: '#C9A84C',
            transition: 'transform 0.3s, opacity 0.3s',
            transform: menuOpen
              ? i === 0 ? 'translateY(6.5px) rotate(45deg)'
                : i === 2 ? 'translateY(-6.5px) rotate(-45deg)'
                : 'none'
              : 'none',
            opacity: menuOpen && i === 1 ? 0 : 1,
          }} />
        ))}
      </button>

      {/* Mobile Menu */}
      <div
        style={{
          position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
          background: 'rgba(6,6,6,0.97)',
          backdropFilter: 'blur(14px)',
          WebkitBackdropFilter: 'blur(14px)',
          zIndex: -1,
          display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
          gap: '2.5rem',
          opacity: menuOpen ? 1 : 0,
          transform: menuOpen ? 'translateY(0)' : 'translateY(-10px)',
          pointerEvents: menuOpen ? 'auto' : 'none',
          transition: 'opacity 0.32s ease, transform 0.32s ease',
        }}
      >
        {NAV_LINKS.map(link => (
          <a
            key={link.href}
            href={link.href}
            onClick={e => { e.preventDefault(); scrollTo(link.href); }}
            style={{
              textDecoration: 'none',
              fontFamily: '"Inter", sans-serif',
              fontSize: '1.1rem',
              letterSpacing: '0.28em',
              fontWeight: 500,
              textTransform: 'uppercase',
              color: link.cta ? '#C9A84C' : '#ADADAD',
              padding: link.cta ? '0.7rem 2.5rem' : '0.4rem 0',
              border: link.cta ? '1px solid #C9A84C' : 'none',
            }}
          >{link.label}</a>
        ))}
      </div>
    </header>
  );
}
