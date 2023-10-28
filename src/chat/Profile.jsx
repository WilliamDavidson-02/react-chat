import React from "react";
import Avatar from "../shared/Avatar";

export default function Profile({ user }) {
  return (
    <div className="w-full flex items-center gap-2">
      <Avatar profileImage={user.profileImage} />
      <div>
        <h4 className="font-semibold text-light-silver whitespace-nowrap">
          {user.firstName} {user.lastName}
        </h4>
      </div>
    </div>
  );
}
