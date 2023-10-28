import React, { useRef, useState } from "react";
import Profile from "./Profile";
import { ChevronsLeft, MenuIcon } from "lucide-react";
import { useMediaQuery } from "@uidotdev/usehooks";
import UserMenu from "./UserMenu";
import { AnimatePresence } from "framer-motion";

export default function Sidebar({ user }) {
  const isMobile = useMediaQuery("(max-width: 768px");
  const sidebarRef = useRef(null);
  const navbarRef = useRef(null);
  const isResizingRef = useRef(false);

  const [isCollapsed, setIsCollapsed] = useState(isMobile);
  const [isResetting, setIsResetting] = useState(false);
  const [userMenuToggle, setUserMenuToggle] = useState(false);

  function handleMouseMove(ev) {
    if (!isResizingRef.current) return;
    let newWidth = ev.clientX;

    if (newWidth < 240) newWidth = 240;
    if (newWidth > 480) newWidth = 480;

    if (sidebarRef.current && navbarRef.current) {
      sidebarRef.current.style.width = `${newWidth}px`;
      navbarRef.current.style.setProperty("left", `${newWidth}px`);
      navbarRef.current.style.setProperty(
        "width",
        `calc(100% - ${newWidth}px)`
      );
    }
  }

  function handleMouseUp() {
    isResizingRef.current = false;
    document.removeEventListener("mousemove", handleMouseMove);
    document.removeEventListener("mouseup", handleMouseUp);
  }

  function handleMouseDown(ev) {
    ev.preventDefault();
    ev.stopPropagation();

    isResizingRef.current = true;
    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);
  }

  function resetWidth() {
    if (sidebarRef.current && navbarRef.current) {
      setIsCollapsed(false);
      setIsResetting(true);

      sidebarRef.current.style.width = isMobile ? "100%" : "240px";
      navbarRef.current.style.setProperty(
        "width",
        isMobile ? "0" : "calc(100% - 240px)"
      );
      navbarRef.current.style.setProperty("left", isMobile ? "100%" : "240px");
      setTimeout(() => setIsResetting(false), 300);
    }
  }

  function collapse() {
    if (sidebarRef.current && navbarRef.current) {
      setIsCollapsed(true);
      setIsResetting(true);

      sidebarRef.current.style.width = "0";
      navbarRef.current.style.setProperty("width", "100%");
      navbarRef.current.style.setProperty("left", "0");
      setTimeout(() => setIsResetting(false), 300);
    }
  }

  return (
    <>
      <div
        ref={sidebarRef}
        className={`group w-60 h-full flex flex-col bg-charcoal-gray-800 relative
        ${isCollapsed ? "w-0" : ""}
        ${isResetting ? "transition-all ease-in-out duration-300" : ""}`}
      >
        <div
          onMouseDown={handleMouseDown}
          onClick={resetWidth}
          className="opacity-0 group-hover:opacity-100 transition cursor-ew-resize absolute h-full w-1 bg-charcoal-gray-500 right-0 top-0"
        />
        <div
          className={`flex justify-end text-charcoal-gray-300 opacity-0 group-hover:opacity-100 transition mr-4 mt-4
              ${isMobile ? "opacity-100" : ""}`}
        >
          <ChevronsLeft onClick={collapse} role="button" />
        </div>
        <div className="relative">
          <div onClick={() => setUserMenuToggle(!userMenuToggle)}>
            <Profile user={user} isCollapsed={isCollapsed} />
          </div>
          <AnimatePresence>
            {userMenuToggle && (
              <UserMenu
                userMenuToggle={userMenuToggle}
                setUserMenuToggle={setUserMenuToggle}
                user={user}
              />
            )}
          </AnimatePresence>
        </div>
      </div>
      <div
        ref={navbarRef}
        className={`absolute top-0 left-60 w-[calc(100%-240px)]
        ${isMobile ? "left-0 w-full" : ""}
        ${isResetting ? "transition-all ease-in-out duration-300" : ""} 
    `}
      >
        <nav className="px-3 py-2 w-full">
          {isCollapsed && (
            <MenuIcon
              onClick={resetWidth}
              role="button"
              className="h-6 w-6 text-charcoal-gray-300"
            />
          )}
        </nav>
      </div>
    </>
  );
}
