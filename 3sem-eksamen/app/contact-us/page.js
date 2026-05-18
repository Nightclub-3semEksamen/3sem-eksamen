"use client";

import { useEffect, useState } from "react";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export default function ContactPage() {
  const [bgImage, setBgImage] = useState("");

  const [form, setForm] = useState({
    name: "",
    email: "",
    comment: "",
  });

  const [status, setStatus] = useState("");

  useEffect(() => {
    async function fetchGalleryImage() {
      try {
        const res = await fetch(`${API_URL}/gallery`);
        const data = await res.json();

        const image = data.find((item) => item.id === 1);

        if (image) {
          setBgImage(`${API_URL}${image.asset.url}`);
        }
      } catch (err) {
        console.error("Failed to fetch image:", err);
      }
    }

    fetchGalleryImage();
  }, []);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

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
  };

  return (
    <main className="bg-black min-h-screen text-white overflow-hidden">
      {/* HERO */}
      <section
        className="relative h-[160px] md:h-[240px] bg-cover bg-center flex items-center justify-center"
        style={{
          backgroundImage: bgImage ? `linear-gradient(rgba(0,0,0,.6), rgba(0,0,0,.6)), url(${bgImage})` : "none",
        }}
      >
        <div className="text-center">
          <h1 className="text-4xl md:text-5xl font-bold tracking-[4px] uppercase">CONTACT US</h1>

          <div className="w-[90px] h-[2px] bg-[#ff005c] mx-auto mt-3" />
        </div>
      </section>

      {/* FORM */}
      <section className="px-6 py-10 md:py-20 flex justify-center bg-[#050505]">
        <form onSubmit={handleSubmit} className="w-full max-w-[650px]">
          {/* NAME */}
          <input
            type="text"
            name="name"
            placeholder="Your Name"
            required
            value={form.name}
            onChange={handleChange}
            className="
              w-full
              h-[54px]
              md:h-[64px]
              mb-5
              px-4
              bg-transparent
              border
              border-[#8a8a8a]
              text-white
              placeholder:text-white
              outline-none
            "
          />

          {/* EMAIL */}
          <input
            type="email"
            name="email"
            placeholder="Your Email"
            required
            value={form.email}
            onChange={handleChange}
            className="
              w-full
              h-[54px]
              md:h-[64px]
              mb-5
              px-4
              bg-transparent
              border
              border-[#8a8a8a]
              text-white
              placeholder:text-white
              outline-none
            "
          />

          {/* COMMENT */}
          <textarea
            name="comment"
            placeholder="Your Comment"
            required
            value={form.comment}
            onChange={handleChange}
            className="
              w-full
              h-[280px]
              md:h-[360px]
              p-4
              bg-transparent
              border
              border-[#8a8a8a]
              text-white
              placeholder:text-white
              outline-none
              resize-none
            "
          />

          {/* BUTTON */}
          <div className="flex justify-end mt-4">
            <button
              type="submit"
              className="
                relative
                w-[180px]
                py-4
                uppercase
                tracking-[2px]
                font-semibold
                text-white
              "
            >
              <span className="absolute top-0 left-0 w-full h-[2px] bg-white" />
              <span className="absolute bottom-0 left-0 w-full h-[2px] bg-white" />
              SEND
            </button>
          </div>

          {status && <p className="text-center mt-6 text-sm text-gray-300">{status}</p>}
        </form>
      </section>
    </main>
  );
}
