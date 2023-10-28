import React from "react";
import { colorPallet } from './coloPallet';

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
