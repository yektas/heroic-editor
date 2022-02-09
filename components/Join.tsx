import { UsersIcon } from "@heroicons/react/outline";
import React, { FormEvent, useState } from "react";
import toast from "react-hot-toast";
import EVENTS from "../config/events";
import { useSocket } from "../context/socketContext";

type Props = {};

const Join = (props: Props) => {
  const [connectingRoomId, setConnectingRoomId] = useState("");
  const { socket, setRoomId, username } = useSocket();

  async function joinRoom(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (!connectingRoomId || !username) {
      return;
    }

    socket.emit(EVENTS.CLIENT.JOIN_ROOM, { username, connectingRoomId });
    setRoomId(connectingRoomId);
    toast.success("Joined the room");
  }

  return (
    <form
      onSubmit={joinRoom}
      className="flex flex-wrap justify-between md:flex-row"
    >
      <div className="relative w-full mx-10 lg:mx-0">
        <label htmlFor="room" className="sr-only">
          RoomID
        </label>

        <input
          type="text"
          id="room"
          name="room"
          value={connectingRoomId}
          onChange={(e) => setConnectingRoomId(e.target.value.trim())}
          placeholder="Connect with Room ID"
          className="block h-12 pl-4 pr-16 text-gray-700 placeholder-gray-400 border-0 w-76 text-md focus:ring-0 rounded-xl "
        />
        <button
          type="submit"
          className="absolute px-4 py-2 text-white transform -translate-y-1/2 bg-pink-500 rounded-lg shadow-md right-4 top-1/2"
        >
          <span>Join</span>
        </button>
      </div>
    </form>
  );
};

export default Join;
