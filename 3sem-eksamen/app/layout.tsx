import "./globals.css";
import Footer from "@/components/Footer";
import { Toaster } from "sonner";
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        {children}
        <Footer />
        <Toaster richColors position="top-right" />
      </body>
    </html>
  );
}
