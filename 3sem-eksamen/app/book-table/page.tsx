import Navbar from "@/components/Navbar";
import BookTable from "@/components/BookTable";

export default function BookTablePage() {
  return (
    <main className="min-h-screen bg-black text-white">
      <Navbar />
      <BookTable />
    </main>
  );
}