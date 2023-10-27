import React from "react";
import { colorPallet } from "./colorPallet";

export default function Avatar({ profileImage }) {
  return (
    <div
      className={`w-10 h-10 bg-gradient-to-r ${
        colorPallet[profileImage] ? colorPallet[profileImage] : ""
      } rounded-full overflow-hidden`}
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
