import { SequenceScroll } from "@/components/SequenceScroll";
import { Navbar } from "@/components/Navbar";
import { About } from "@/components/About";
import { Bento } from "@/components/Bento";
import { Stats } from "@/components/Stats";
import { TastingNotes } from "@/components/TastingNotes";
import { Testimonials } from "@/components/Testimonials";
import { CTA } from "@/components/CTA";
import { Footer } from "@/components/Footer";

export default function HomePage() {
  return (
    <>
      <Navbar />

      {/* Hero — sticky canvas, 400vh tall. The -mt-[100vh] wrapper on the
          next section visually closes the hero so the page doesn't feel like
          one long vertical drop after the sequence. */}
      <main id="top" className="bg-sequence-bg">
        <SequenceScroll />

        {/* Everything below "closes" the hero with -mt-[100vh] + z-10 */}
        <div className="relative z-10 -mt-[100vh]">
          <About />
          <Bento />
          <Stats />
          <TastingNotes />
          <Testimonials />
          <CTA />
          <Footer />
        </div>
      </main>
    </>
  );
}
