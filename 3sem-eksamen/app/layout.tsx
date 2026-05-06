import Link from "next/link";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <header style={{ padding: "20px", borderBottom: "1px solid #ddd" }}>
          <nav style={{ display: "flex", gap: "20px" }}>
            <Link href="/">Forside</Link>
            <Link href="/events">Events</Link>
            <Link href="/book-table">Book Table</Link>
            <Link href="/contact-us">Contact Us</Link>
          </nav>
        </header>

        {children}
      </body>
    </html>
  );
}
