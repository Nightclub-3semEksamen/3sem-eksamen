"use client";

import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import Navbar from "@/components/Navbar";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

type GalleryItem = {
  id: number;
  asset?: {
    url?: string;
  };
};

type ContactForm = {
  name: string;
  email: string;
  comment: string;
};

export default function ContactPage() {
  const [bgImage, setBgImage] = useState<string>("");

  const [form, setForm] = useState<ContactForm>({
    name: "",
    email: "",
    comment: "",
  });

  const [status, setStatus] = useState<string>("");

  useEffect(() => {
    async function fetchGalleryImage() {
      if (!API_URL) return;

      try {
        const res = await fetch(`${API_URL}/gallery`);
        const data: GalleryItem[] = await res.json();

        const image = data.find((item) => item.id === 1);

        if (image?.asset?.url) {
          setBgImage(`${API_URL}${image.asset.url}`);
        }
      } catch (err) {
        console.error("Failed to fetch image:", err);
      }
    }

    fetchGalleryImage();
  }, []);

  function handleChange(e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    const { name, value } = e.target;

    setForm((prevForm) => ({
      ...prevForm,
      [name]: value,
    }));
  }

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (!API_URL) {
      setStatus("API URL mangler");
      return;
    }

    try {
      setStatus("Sending...");

      const res = await fetch(`${API_URL}/contact_messages`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: form.name,
          email: form.email,
          content: form.comment,
          date: new Date().toISOString(),
        }),
      });

      const data = await res.json();

      console.log(data);

      if (!res.ok) {
        throw new Error("Failed to send");
      }

      setStatus("Message sent!");

      setForm({
        name: "",
        email: "",
        comment: "",
      });
    } catch (err) {
      console.error(err);
      setStatus("Something went wrong");
    }
  }

  return (
    <main className="bg-[oklch(0.08_0_0)] min-h-screen text-[oklch(1_0_0)] overflow-hidden">
      <Navbar />

      <section
        className="relative h-[240px] md:h-[320px] bg-cover bg-center bg-no-repeat flex items-center justify-center"
        style={{
          backgroundImage: "url('/images/fest.webp')",
        }}
      >
        <div className="absolute inset-0 bg-[oklch(0_0_0/0.45)]" />

        <div className="relative z-10 text-center">
          <h1 className="text-4xl md:text-5xl font-bold tracking-[4px] uppercase">CONTACT US</h1>

          <div className="w-[90px] h-[2px] bg-[oklch(0.65_0.25_8)] mx-auto mt-3" />
        </div>
      </section>

      <section className="px-6 py-10 md:py-20 flex justify-center bg-[oklch(0.05_0_0)]">
        <form onSubmit={handleSubmit} className="w-full max-w-[650px]">
          <input type="text" name="name" placeholder="Your Name" required value={form.name} onChange={handleChange} className="w-full h-[54px] md:h-[64px] mb-5 px-4 bg-transparent border border-[oklch(0.55_0_0)] text-[oklch(1_0_0)] placeholder:text-[oklch(0.75_0_0)] outline-none focus:border-[oklch(0.65_0.25_8)]" />

          <input type="email" name="email" placeholder="Your Email" required value={form.email} onChange={handleChange} className="w-full h-[54px] md:h-[64px] mb-5 px-4 bg-transparent border border-[oklch(0.55_0_0)] text-[oklch(1_0_0)] placeholder:text-[oklch(0.75_0_0)] outline-none focus:border-[oklch(0.65_0.25_8)]" />

          <textarea name="comment" placeholder="Your Comment" required value={form.comment} onChange={handleChange} className="w-full h-[280px] md:h-[360px] p-4 bg-transparent border border-[oklch(0.55_0_0)] text-[oklch(1_0_0)] placeholder:text-[oklch(0.75_0_0)] outline-none resize-none focus:border-[oklch(0.65_0.25_8)]" />

          <div className="flex justify-end mt-4">
            <button type="submit" className="relative w-[180px] py-4 uppercase tracking-[2px] font-semibold text-[oklch(1_0_0)] hover:text-[oklch(0.65_0.25_8)] transition">
              <span className="absolute top-0 left-0 w-full h-[2px] bg-[oklch(1_0_0)]" />
              <span className="absolute bottom-0 left-0 w-full h-[2px] bg-[oklch(1_0_0)]" />
              SEND
            </button>
          </div>

          {status && <p className="text-center mt-6 text-sm text-[oklch(0.8_0_0)]">{status}</p>}
        </form>
      </section>
    </main>
  );
}
