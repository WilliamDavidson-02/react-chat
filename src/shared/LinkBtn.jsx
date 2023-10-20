import React from "react";

export default function LinkBtn(props) {
  const { children, direction } = props;

  return (
    <a
      href={direction}
      className="w-full flex items-center justify-center gap-2 bg-charcoal-gray-700 border border-charcoal-gray-500 px-4 py-2 rounded-lg"
    >
      {children}
    </a>
  );
}
