import React from "react";

export default function Email(props) {
  const { email, setEmail, errors, validate } = props;

  return (
    <div className="w-full flex flex-col gap-2">
      <label className="text-sm text-charcoal-gray-300" htmlFor="email">
        Email
      </label>
      <input
        onChange={(ev) => setEmail(ev.target.value)}
        value={email}
        autoComplete="off"
        onBlur={() => validate("email")}
        className={`bg-charcoal-gray-700 border ${
          errors.includes("email")
            ? "border-red-600 focus:border-red-400"
            : "border-charcoal-gray-500 focus:border-charcoal-gray-300"
        } px-4 py-2 rounded-lg placeholder:text-charcoal-gray-500`}
        type="text"
        id="email"
        placeholder="you@example.com"
      />
    </div>
  );
}
