import React, { useContext, useEffect, useRef, useState } from "react";
import Profile from "./Profile";
import { ChevronsLeft, Command, MenuIcon, PenSquare } from "lucide-react";
import { useMediaQuery } from "@uidotdev/usehooks";
import UserMenu from "./UserMenu";
import { AnimatePresence } from "framer-motion";
import AddFriend from "./AddFriend";
import { UserContext } from "../context/UserContext";
import FriendRequests from "./FriendRequests";
import FormModal from "../shared/FormModal";

export default function Sidebar({
  messageRef,
  setSelectedFriend,
  selectedFriend,
}) {
  const { user } = useContext(UserContext);
  const isMobile = useMediaQuery("(max-width: 768px");
  const sidebarRef = useRef(null);
  const navbarRef = useRef(null);
  const isResizingRef = useRef(false);

  const [isCollapsed, setIsCollapsed] = useState(isMobile);
  const [isResetting, setIsResetting] = useState(false);
  const [userMenuToggle, setUserMenuToggle] = useState(false);
  const [toggleAddFriend, setToggleAddFriend] = useState(false);
  const [toggleFriendRequests, setToggleFriendRequests] = useState(false);

  useEffect(() => {
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, []);

  function handleKeyDown(ev) {
    if (ev.metaKey && ev.key === "k") {
      ev.preventDefault();
      setToggleAddFriend(true);
    } else if (ev.key === "Escape") {
      setToggleAddFriend(false);
    }
  }

  function handleMouseMove(ev) {
    if (!isResizingRef.current || isMobile) return;
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
      messageRef.current.style.setProperty(
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
      messageRef.current.style.setProperty(
        "width",
        isMobile ? "0" : "calc(100% - 240px)"
      );
      messageRef.current.style.setProperty(
        "padding",
        isMobile ? "0" : "40px 16px 0px 16px"
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
      messageRef.current.style.setProperty("width", "100%");
      messageRef.current.style.setProperty("padding", "40px 16px 0px 16px");
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
          <div
            role="button"
            className="hover:bg-charcoal-gray-600 transition-all ease-in-out duration-300"
            onClick={() => setUserMenuToggle(!userMenuToggle)}
          >
            <Profile user={user} isCollapsed={isCollapsed} />
          </div>
          <AnimatePresence>
            {userMenuToggle && (
              <UserMenu
                setToggleFriendRequests={setToggleFriendRequests}
                setUserMenuToggle={setUserMenuToggle}
              />
            )}
          </AnimatePresence>
        </div>
        <div>
          <div className="w-[calc(100%-16px)] h-[1px] mx-auto my-4 bg-charcoal-gray-500"></div>
          {user.friendList?.map((friend, index) => {
            return (
              <div
                key={index}
                role="button"
                onClick={() => setSelectedFriend(index)}
                className="hover:bg-charcoal-gray-600 transition-all ease-in-out duration-300"
              >
                <Profile user={friend} isCollapsed={isCollapsed} />
              </div>
            );
          })}
        </div>
      </div>
      <div
        ref={navbarRef}
        className={`absolute top-0 left-60 w-[calc(100%-240px)] bg-charcoal-gray-700 text-charcoal-gray-300
        ${isMobile ? "left-0 w-full" : ""}
        ${isResetting ? "transition-all ease-in-out duration-300" : ""} 
    `}
      >
        <nav className="px-3 h-10 w-full flex items-center justify-between">
          <MenuIcon onClick={resetWidth} role="button" size={24} />
          {selectedFriend !== null && (
            <span>
              {user.friendList[selectedFriend].firstName}{" "}
              {user.friendList[selectedFriend].lastName}
            </span>
          )}
          <PenSquare
            onClick={() => setToggleAddFriend(true)}
            role="button"
            size={20}
          />
        </nav>
      </div>
      <AnimatePresence>
        {toggleAddFriend && (
          <FormModal setToggleModal={setToggleAddFriend}>
            <AddFriend />
          </FormModal>
        )}
        {toggleFriendRequests && (
          <FormModal setToggleModal={setToggleFriendRequests}>
            <FriendRequests />
          </FormModal>
        )}
      </AnimatePresence>
    </>
  );
}
