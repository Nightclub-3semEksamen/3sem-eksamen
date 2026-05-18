import Hero from "@/components/Hero";
import Navbar from "@/components/Navbar";
import Welcome from "@/components/Welcome";
import Featured from "@/components/Featured";
import Gallery from "@/components/Gallery";
import Track from "@/components/Track";
import Video from "@/components/Video";

export default function Home() {
  return (
    <main>
      <Hero />
      <Navbar />
      <Welcome />
      <Featured />
      <Gallery />
      <Track />
      <Video />
    </main>
  );
}