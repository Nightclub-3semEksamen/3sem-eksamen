"use client";

import { useState } from "react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

type CommentFormProps = {
  eventId: number;
};

const API_URL = process.env.NEXT_PUBLIC_API_URL || "https://night-club-api-2026-main.onrender.com";

export default function CommentForm({ eventId }: CommentFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const form = e.currentTarget;
    const formData = new FormData(form);

    const comment = {
      eventId,
      name: formData.get("name"),
      content: formData.get("content"),
      date: new Date().toISOString(),
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
      form.reset();
      router.refresh();
    } catch (error) {
      toast.error("Something went wrong!");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <input name="name" type="text" placeholder="Your Name" required className="w-full bg-transparent border border-[oklch(1_0_0/0.4)] h-14 px-5 text-sm text-[oklch(1_0_0)] placeholder:text-[oklch(0.75_0_0)] outline-none focus:border-[oklch(0.65_0.25_8)]" />

      <textarea name="content" placeholder="Your Comment" rows={9} required className="w-full bg-transparent border border-[oklch(1_0_0/0.4)] p-5 text-sm text-[oklch(1_0_0)] placeholder:text-[oklch(0.75_0_0)] outline-none resize-none focus:border-[oklch(0.65_0.25_8)]" />

      <div className="flex justify-end">
        <button type="submit" disabled={isSubmitting} className="border-y border-[oklch(1_0_0/0.6)] px-10 py-3 text-xs uppercase font-bold tracking-[1px] text-[oklch(1_0_0)] hover:text-[oklch(0.65_0.25_8)] hover:border-[oklch(0.65_0.25_8)] transition disabled:opacity-50">
          {isSubmitting ? "Submitting..." : "Submit"}
        </button>
      </div>
    </form>
  );
}
