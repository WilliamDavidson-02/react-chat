import React from "react";

export default function Email() {
  return (
    <div className="w-full flex flex-col gap-2">
      <label className="text-sm text-charcoal-gray-300" htmlFor="email">
        Email
      </label>
      <input
        className="bg-charcoal-gray-700 border border-charcoal-gray-500 px-4 py-2 rounded-lg"
        type="text"
        id="email"
        placeholder="you@example.com"
      />
    </div>
  );
}
