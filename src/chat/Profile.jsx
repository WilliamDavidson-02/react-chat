import React, { Suspense } from "react";
import Avatar from "../shared/Avatar";

export default function Profile({ user, isCollapsed }) {
  return (
    <div
      role="button"
      className={`hover:bg-charcoal-gray-600 transition-all ease-in-out duration-300 py-2 w-full flex items-center gap-2 overflow-hidden ${
        !isCollapsed ? "px-4" : ""
      }`}
    >
      <Suspense
        fallback={
          <div className="w-10 h-10 rounded-full overflow-hidden bg-gradient-to-r from-charcoal-gray-500 to-charcoal-gray-400"></div>
        }
      >
        <Avatar profileImage={user.profileImage} />
      </Suspense>
      <div>
        <h4 className="font-semibold text-light-silver whitespace-nowrap">
          {user.firstName} {user.lastName}
        </h4>
      </div>
    </div>
  );
}
