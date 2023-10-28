import React from "react";

const colorPallet = [
  "from-cyan-500 to-blue-500",
  "from-emerald-400 to-blue-500",
  "from-purple-500 to-blue-500",
  "from-yellow-400 to-red-500",
  "from-fuchsia-500 to-red-500",
  "from-fuchsia-500 to-blue-500",
  "from-lime-500 to-rose-500",
  "from-violet-500 to-rose-500",
];

export default function Avatar({ profileImage }) {
  return (
    <div
      className={`w-10 h-10 rounded-full overflow-hidden bg-gradient-to-r 
      ${colorPallet[profileImage] ? colorPallet[profileImage] : ''}`}
    >
      {!colorPallet[profileImage] && profileImage && (
        <img
          className="w-full h-full object-cover object-center"
          src={profileImage}
          alt=""
        />
      )}
    </div>
  );
}
