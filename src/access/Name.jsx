import React from "react";

export default function Name(props) {
  const { name, setName, label, errors, validate } = props;
  return (
    <div className="w-full flex flex-col gap-2">
      <label className="text-sm text-charcoal-gray-300" htmlFor={label}>
        {label}
      </label>
      <input
        onChange={(ev) => setName(ev.target.value)}
        value={name}
        autoComplete="off"
        onBlur={() => validate(label)}
        className={`bg-charcoal-gray-700 border ${
          errors.includes(label)
            ? "border-red-600 focus:border-red-400"
            : "border-charcoal-gray-500 focus:border-charcoal-gray-300"
        } px-4 py-2 rounded-lg placeholder:text-charcoal-gray-500`}
        type="text"
        id={label}
      />
    </div>
  );
}
