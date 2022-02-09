import { createContext, useContext, useState } from "react";
import io, { Socket } from "socket.io-client";

const socket = io(process.env.NEXT_PUBLIC_BASE_URL!);

interface Context {
  socket: Socket;
  roomId?: string;
  username?: string;
  setUsername: Function;
  setRoomId: Function;
}

const SocketContext = createContext<Context>({
  socket,
  setRoomId: () => false,
  setUsername: () => false,
});

function SocketProvider(props: any) {
  const [username, setUsername] = useState("");
  const [roomId, setRoomId] = useState("");
  return (
    <SocketContext.Provider
      value={{ socket, roomId, setRoomId, username, setUsername }}
      {...props}
    />
  );
}

export const useSocket = () => useContext(SocketContext);

export default SocketProvider;
