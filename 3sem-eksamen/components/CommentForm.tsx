"use client";

import { toast } from "sonner";

export default function CommentForm() {
  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    toast.success("Comment submitted!");
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div className="grid md:grid-cols-2 gap-5">
        <input type="text" placeholder="Your Name" className="bg-transparent border border-white/40 h-14 px-5 text-sm outline-none focus:border-pink-500" />

        <input type="email" placeholder="Your Email" className="bg-transparent border border-white/40 h-14 px-5 text-sm outline-none focus:border-pink-500" />
      </div>

      <textarea placeholder="Your Comment" rows={9} className="w-full bg-transparent border border-white/40 p-5 text-sm outline-none focus:border-pink-500 resize-none" />

      <div className="flex justify-end">
        <button type="submit" className="border-y border-white/60 px-10 py-3 text-xs uppercase font-bold tracking-[1px] hover:text-pink-500 hover:border-pink-500 transition">
          Submit
        </button>
      </div>
    </form>
  );
}
