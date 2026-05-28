"use client";

import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { toast } from "sonner";
import Navbar from "@/components/Navbar";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "https://night-club-api-2026-main.onrender.com";

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

  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    async function fetchGalleryImage() {
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

    try {
      setIsSubmitting(true);

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

      if (!res.ok) {
        throw new Error("Failed to send");
      }

      toast.success("Message sent!");

      setForm({
        name: "",
        email: "",
        comment: "",
      });
    } catch (err) {
      console.error(err);
      toast.error("Something went wrong!");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <main className="bg-[oklch(0.08_0_0)] min-h-screen text-[oklch(1_0_0)]">
      <Navbar />

      <section
  className="relative flex h-[160px] items-center justify-center bg-cover bg-center bg-no-repeat px-8 text-center md:h-[240px]"
  style={{
    backgroundImage: "url('/images/fest.webp')",
  }}
>
  <div className="text-center">
    <h1 className="text-3xl font-bold uppercase tracking-[4px] md:text-4xl">
      Contact Us
    </h1>

    <img
      src="/images/sline.webp"
      alt=""
      className="mx-auto mt-4 h-auto w-[220px] md:w-[260px]"
    />
  </div>
</section>

      <section className="px-6 py-10 md:py-20 flex justify-center bg-[oklch(0.05_0_0)]">
        <form onSubmit={handleSubmit} className="w-full max-w-[650px]">
          <input type="text" name="name" placeholder="Your Name" required value={form.name} onChange={handleChange} className="w-full h-[54px] md:h-[64px] mb-5 px-4 bg-transparent border border-[oklch(0.55_0_0)] text-[oklch(1_0_0)] placeholder:text-[oklch(0.75_0_0)] outline-none focus:border-[oklch(0.65_0.25_8)]" />

          <input type="email" name="email" placeholder="Your Email" required value={form.email} onChange={handleChange} className="w-full h-[54px] md:h-[64px] mb-5 px-4 bg-transparent border border-[oklch(0.55_0_0)] text-[oklch(1_0_0)] placeholder:text-[oklch(0.75_0_0)] outline-none focus:border-[oklch(0.65_0.25_8)]" />

          <textarea name="comment" placeholder="Your Comment" required value={form.comment} onChange={handleChange} className="w-full h-[280px] md:h-[360px] p-4 bg-transparent border border-[oklch(0.55_0_0)] text-[oklch(1_0_0)] placeholder:text-[oklch(0.75_0_0)] outline-none resize-none focus:border-[oklch(0.65_0.25_8)]" />

          <div className="flex justify-end mt-4">
            <button type="submit" disabled={isSubmitting} className="relative w-[180px] py-4 uppercase tracking-[2px] font-semibold text-[oklch(1_0_0)] hover:text-[oklch(0.65_0.25_8)] transition disabled:opacity-50">
              <span className="absolute top-0 left-0 w-full h-[2px] bg-[oklch(1_0_0)]" />
              <span className="absolute bottom-0 left-0 w-full h-[2px] bg-[oklch(1_0_0)]" />
              {isSubmitting ? "SENDING..." : "SEND"}
            </button>
          </div>
        </form>
      </section>
    </main>
  );
}
