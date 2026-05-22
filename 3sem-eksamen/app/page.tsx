import Hero from "@/components/Hero";
import Navbar from "@/components/Navbar";
import Welcome from "@/components/Welcome";
import Featured from "@/components/Featured";
import Gallery from "@/components/Gallery";
import Track from "@/components/Track";
import Video from "@/components/Video";
import Testimonials from "@/components/Testimonials";
import Newsletter from "@/components/Newsletter";
import ScrollReveal from "@/components/ScrollReveal";

export default function Home() {
  return (
    <main>
      <Hero />
      <Navbar />
      <ScrollReveal direction="up">
      <Welcome />
      </ScrollReveal>
      <ScrollReveal direction="up">
      <Featured />
      </ScrollReveal>
      <ScrollReveal direction="scale">
      <Gallery />
      </ScrollReveal>
      <ScrollReveal direction="left">
      <Track />
      </ScrollReveal>
      <ScrollReveal direction="scale">
      <Video />
      </ScrollReveal>
      <ScrollReveal>
      <Testimonials />
      </ScrollReveal>
      <ScrollReveal>
      <Newsletter />
      </ScrollReveal>
    </main>
  );
}