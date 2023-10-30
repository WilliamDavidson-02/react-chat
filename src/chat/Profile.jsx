import React, { useContext } from "react";
import Avatar from "../shared/Avatar";

export default function Profile({ isCollapsed, user }) {
  return (
    <div
      className={`py-2 w-full flex items-center gap-2 overflow-hidden ${
        !isCollapsed ? "px-4" : ""
      }`}
    >
      <Avatar profileImage={user.profileImage} />
      <div>
        <h4 className="font-semibold text-light-silver whitespace-nowrap">
          {user.firstName} {user.lastName}
        </h4>
      </div>
    </div>
  );
}
