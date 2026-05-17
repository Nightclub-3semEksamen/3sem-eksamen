import Hero from "@/components/Hero";
import Navbar from "@/components/Navbar";
import Welcome from "@/components/Welcome";
import Featured from "@/components/Featured";
import Gallery from "@/components/Gallery";

export default function Home() {
  return (
    <main>
      <Hero />
      <Navbar />
      <Welcome />
      <Featured />
      <Gallery />
    </main>
  );
}