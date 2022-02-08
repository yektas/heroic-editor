import { PencilIcon } from "@heroicons/react/outline";
import React, { useEffect, useState } from "react";
import EVENTS from "../config/events";
import { useSocket } from "../context/socketContext";
import Join from "./Join";

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const { socket, roomId, setRoomId, username } = useSocket();

  const goLive = async () => {
    if (!username) return;

    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL!}/create-room`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username }),
      }
    );

    const data = await res.text();
    setRoomId(data);
    socket.emit(EVENTS.CLIENT.JOIN_ROOM, { username, roomId: data });
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
  }, []);

  const handleScroll = () => {
    if (window.pageYOffset > 0) {
      setScrolled(true);
    } else {
      setScrolled(false);
    }
  };

  return (
    <div className="relative w-full py-4 text-white shadow-md bg-primary print:hidden">
      <div className="px-2 mx-auto max-w-7xl sm:px-6 lg:px-8">
        <div className="relative flex items-center justify-between h-12">
          <div className="flex items-center flex-1 pl-8 sm:p-0 sm:items-stretch sm:justify-start">
            <div className="flex items-center flex-shrink-0">
              <PencilIcon className="w-10 h-10" />
            </div>
            <div className="hidden sm:block sm:ml-12">
              <div className="flex space-x-12">
                <div className="px-3 py-2 text-2xl font-medium border-b-2 border-transparent cursor-pointer">
                  Heroic Editor
                </div>
              </div>
            </div>
          </div>
          <div className="absolute inset-y-0 right-0 flex items-center pr-2 space-x-8 font-medium sm:static sm:inset-auto sm:ml-6 sm:pr-0">
            {roomId ? (
              <div className="relative flex items-center justify-center">
                <div className="flex items-center justify-center">
                  <div className="absolute w-4 h-4 bg-green-400 rounded-full animate-ping"></div>
                  <div className="absolute w-4 h-4 bg-green-400 rounded-full "></div>
                </div>
                <div className="pl-4 rounded-lg ">
                  Room ID: <span className="text-md">{roomId}</span>
                </div>
              </div>
            ) : (
              <button
                onClick={goLive}
                className="px-4 py-2 font-semibold text-white transition bg-pink-500 border-2 rounded-full shadow-lg hover:border-primary hover:text-primary hover:shadow-primary/30 border-primary/80 shadow-primary/10"
              >
                Go Live
              </button>
            )}

            <Join />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
