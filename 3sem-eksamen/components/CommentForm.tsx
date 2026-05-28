"use client";

import { useState } from "react";
import { toast } from "sonner";

type CommentFormProps = {
  eventId: number;
};

const API_URL = process.env.NEXT_PUBLIC_API_URL || "https://night-club-api-2026-main.onrender.com";

export default function CommentForm({ eventId }: CommentFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);

    const comment = {
      name: formData.get("name"),
      email: formData.get("email"),
      content: formData.get("content"),
      eventId,
    };

    try {
      setIsSubmitting(true);

      const response = await fetch(`${API_URL}/comments`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(comment),
      });

      if (!response.ok) {
        throw new Error("Failed to submit comment");
      }

      toast.success("Comment submitted!");
      e.currentTarget.reset();
    } catch (error) {
      toast.error("Something went wrong!");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div className="grid md:grid-cols-2 gap-5">
        <input name="name" type="text" placeholder="Your Name" required className="bg-transparent border border-white/40 h-14 px-5 text-sm outline-none focus:border-pink-500" />

        <input name="email" type="email" placeholder="Your Email" required className="bg-transparent border border-white/40 h-14 px-5 text-sm outline-none focus:border-pink-500" />
      </div>

      <textarea name="content" placeholder="Your Comment" rows={9} required className="w-full bg-transparent border border-white/40 p-5 text-sm outline-none focus:border-pink-500 resize-none" />

      <div className="flex justify-end">
        <button type="submit" disabled={isSubmitting} className="border-y border-white/60 px-10 py-3 text-xs uppercase font-bold tracking-[1px] hover:text-pink-500 hover:border-pink-500 transition disabled:opacity-50">
          {isSubmitting ? "Submitting..." : "Submit"}
        </button>
      </div>
    </form>
  );
}
