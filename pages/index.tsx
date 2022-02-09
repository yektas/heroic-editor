import type { NextPage } from "next";
import React, { useState, useEffect } from "react";
import Renderer from "../components/Renderer";
import dynamic from "next/dynamic";
import EVENTS from "../config/events";
import { useSocket } from "../context/socketContext";
import toast from "react-hot-toast";
import { CloudDownloadIcon, PrinterIcon } from "@heroicons/react/outline";
import Button from "../components/Button";
import Navbar from "../components/Navbar";
import UploadButton from "../components/UploadButton";
import UsernameModal from "../components/UsernameModal";

const Codemirror = dynamic(import("../components/Editor"), {
  ssr: false,
});

const Home: NextPage = () => {
  const [input, setInput] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  const { socket, roomId, username, setUsername } = useSocket();

  const uploadMarkdown = (event: any) => {
    if (!event.target.files || event.target.files.length === 0) {
      return;
    }

    let reader = new FileReader();
    reader.readAsText(event.target.files[0]);

    reader.onload = function () {
      const newInput = reader.result as string;
      setInput(newInput);
      socket.emit(EVENTS.CLIENT.NEW_MESSAGE, {
        username,
        roomId,
        message: newInput,
      });
    };

    reader.onerror = function () {
      console.log(reader.error);
      alert("Unable to read " + event.target.files[0].name);
    };
  };

  const download = () => {
    const blob = new Blob([input], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "markdown.md";
    a.click();
    URL.revokeObjectURL(url);
  };

  const handlePrint = async () => {
    window.print();
  };

  useEffect(() => {
    if (localStorage.getItem("username")) {
      setUsername(localStorage.getItem("username") as string);
    } else {
      setIsOpen(true);
    }
  }, []);

  useEffect((): any => {
    socket.on("connect", () => {
      console.log("SOCKET CONNECTED!", socket.id);
    });

    socket.on(EVENTS.SERVER.JOINED_ROOM, ({ username }) => {
      toast(`${username} has joined your session!`, { icon: "👋" });
    });

    socket.on(EVENTS.SERVER.NEW_MESSAGE, ({ username, roomId, message }) => {
      setInput(message);
    });

    // socket disconnect onUnmount if exists
    if (socket) return () => socket.disconnect();
  }, []);

  useEffect(() => {
    if (socket && username && roomId) {
      socket.emit(EVENTS.CLIENT.JOIN_ROOM, { username, roomId });
    }
  }, [socket, username, roomId]);

  const onMessageChange = (message: string) => {
    socket.emit(EVENTS.CLIENT.NEW_MESSAGE, { roomId, username, message });
    setInput(message);
  };

  return (
    <div className="mx-auto">
      <UsernameModal isOpen={isOpen} setIsOpen={setIsOpen} />
      <Navbar />
      <div className="grid w-full h-full grid-cols-7 grid-rows-1 gap-2 ">
        <div className="col-span-3 overflow-x-hidden bg-transparent print:hidden">
          <Codemirror input={input} setInput={onMessageChange} />
        </div>
        <div className="flex flex-col items-center justify-around ">
          <h1 className="text-4xl font-semibold text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-blue-500">
            Welcome <span>{username}!</span>
          </h1>
          <div className="flex flex-col items-center justify-center print:hidden ">
            <div className="space-y-10 ">
              <UploadButton onUpload={uploadMarkdown} />
              <Button
                onClick={download}
                icon={<CloudDownloadIcon className="w-6 h-6" />}
              >
                Download
              </Button>
              <Button
                onClick={handlePrint}
                icon={<PrinterIcon className="w-6 h-6" />}
              >
                Print
              </Button>
            </div>
          </div>
        </div>

        <div className="col-span-3 p-8 w-full h-screen overflow-x-hidden overflow-scroll top-0 bottom-0  bg-[#EEEEEE] markdown print:col-span-7 print:border-0 print:overflow-hidden">
          <Renderer content={input} />
        </div>
      </div>
    </div>
  );
};

export default Home;
