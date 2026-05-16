import Hero from "@/components/Hero";
import Navbar from "@/components/Navbar";
import Welcome from "@/components/Welcome";
import Featured from "@/components/Featured";

export default function Home() {
  return (
    <main>
      <Hero />
      <Navbar />
      <Welcome />
      <Featured />
    </main>
  );
}