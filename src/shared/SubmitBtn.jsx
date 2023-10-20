import React from "react";

export default function SubmitBtn({ text }) {
  return (
    <button
      className="px-4 py-2 bg-forest-green border border-emerald-green hover:bg-emerald-green transition duration-300 w-full rounded-lg text-light-silver"
      type="submit"
    >
      {text}
    </button>
  );
}
