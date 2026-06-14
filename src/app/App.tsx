import { useState } from 'react';
import { Preloader }       from './components/Preloader';
import { Header }          from './components/Header';
import { Hero }            from './components/Hero';
import { Stats }           from './components/Stats';
import { About }           from './components/About';
import { Services }        from './components/Services';
import { Projects }        from './components/Projects';
import { Process }         from './components/Process';
import { Testimonials }    from './components/Testimonials';
import { FAQ }             from './components/FAQ';
import { Contact }         from './components/Contact';
import { Footer }          from './components/Footer';
import { FloatingButtons } from './components/FloatingButtons';

export default function App() {
  const [ready, setReady] = useState(false);

  return (
    <div style={{
      background: '#0A0A0A',
      color: '#F5F3EE',
      fontFamily: '"Inter", sans-serif',
      minHeight: '100vh',
      overflowX: 'hidden',
    }}>
      {!ready && <Preloader onComplete={() => setReady(true)} />}

      <div style={{
        opacity: ready ? 1 : 0,
        transition: 'opacity 0.5s ease',
        transitionDelay: '0.1s',
      }}>
        <Header />

        <main>
          <Hero />
          <Stats />
          <About />
          <Services />
          <Projects />
          <Process />
          <Testimonials />
          <FAQ />
          <Contact />
        </main>

        <Footer />
        <FloatingButtons />
      </div>
    </div>
  );
}
