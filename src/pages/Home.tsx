import { useEffect, useState } from 'react';
import { useReveal } from '../components/Icon';
import { Nav } from '../components/Nav';
import { Hero } from '../components/Hero';
import { Ticker, Stats, Program } from '../components/SimpleSections';
import { Coach } from '../components/Coach';
import { Pricing } from '../components/Pricing';
import { Schedule, Features, Glossary } from '../components/Interactive';
import { BlogVideos } from '../components/BlogVideos';
import { Reviews, FAQ, Contact, FinalCTA, Footer } from '../components/Closing';
import { BookingModal } from '../components/BookingModal';

export default function Home() {
  const [book, setBook] = useState(false);
  const [bookWhen, setBookWhen] = useState<string | undefined>();
  const openBook = (when?: string) => { setBookWhen(when); setBook(true); };
  useReveal();

  // smooth-scroll to hash on initial load (e.g. /#schedule)
  useEffect(() => {
    if (window.location.hash) {
      const id = window.location.hash.slice(1);
      const el = document.getElementById(id);
      if (el) setTimeout(() => el.scrollIntoView({ behavior: 'smooth', block: 'start' }), 100);
    }
  }, []);

  return (
    <>
      <Nav onBook={() => openBook()}/>
      <main>
        <Hero onBook={() => openBook()}/>
        <Ticker/>
        <Stats/>
        <Program/>
        <Coach/>
        <Features/>
        <Pricing onBook={() => openBook()}/>
        <Schedule onBook={openBook}/>
        <Glossary/>
        <BlogVideos/>
        <Reviews/>
        <FAQ/>
        <Contact onBook={() => openBook()}/>
        <FinalCTA onBook={() => openBook()}/>
      </main>
      <Footer/>
      <BookingModal open={book} prefillWhen={bookWhen} onClose={() => { setBook(false); setBookWhen(undefined); }}/>
    </>
  );
}
