import Hero from "@/components/Hero";
import Navbar from "@/components/Navbar";
import Welcome from "@/components/Welcome";

export default function Home() {
  return (
    <main>
      <Hero />
      <Navbar />
      <Welcome />
    </main>
  );
}