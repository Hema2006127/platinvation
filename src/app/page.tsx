'use client';

import { useState } from 'react';
import IntroScreen   from '@/components/IntroScreen';
import Hero          from '@/components/Hero';
import Story         from '@/components/Story';
import Gallery       from '@/components/Gallery';
import Timeline      from '@/components/Timeline';
import Location      from '@/components/Location';
import RSVP          from '@/components/RSVP';
import WishesWall    from '@/components/WishesWall';
import FAQ           from '@/components/FAQ';
import Footer        from '@/components/Footer';
import WhatsAppFloat from '@/components/WhatsAppFloat';
import InvitationNav from '@/components/InvitationNav';
import SmoothScroll  from '@/components/SmoothScroll';
import MusicPlayer   from '@/components/MusicPlayer';

export default function Home() {
  const [introComplete, setIntroComplete] = useState(false);

  return (
    <main className="invitation-shell">
      {/* Cinematic intro with envelope animation */}
      <IntroScreen onComplete={() => setIntroComplete(true)} />

      {/* Main invitation — fades in after intro */}
      <SmoothScroll>
        <div className={`invitation-shell__content ${introComplete ? 'is-visible' : ''}`}>
          <InvitationNav />
          <section id="hero">
            <Hero />
          </section>
          <section id="story">
            <Story />
          </section>
          <section id="moments">
            <Gallery />
          </section>
          <section id="timeline">
            <Timeline />
          </section>
          <section id="location">
            <Location />
          </section>
          <section id="rsvp">
            <RSVP />
          </section>
          <section id="wishes">
            <WishesWall />
          </section>
          <section id="faq">
            <FAQ />
          </section>
          <Footer />
        </div>
      </SmoothScroll>

      {/* Floating controls */}
      {introComplete && <WhatsAppFloat />}
      {introComplete && <MusicPlayer />}
    </main>
  );
}
