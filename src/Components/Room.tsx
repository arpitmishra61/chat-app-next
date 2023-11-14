"use client";
import { useParams } from "next/navigation";
import React, { useEffect, useRef, useState, useContext } from "react";

import { io } from "socket.io-client";
import RenderMessages from "./RenderMessages";
import AvatarContext from "@/Context/AvatarContext";
import Image from "next/image";
import { transform } from "next/dist/build/swc";
const btnClasses =
  "text-white bg-purple-700 hover:bg-purple-100 font-medium  text-md px-5 py-2.5 me-2";

export default function Room() {
  const { profile } = useContext(AvatarContext);

  const sendMessage = () => {
    const text = messageRef.current?.value;
    const message = {
      text,
      id: socketRef.current.id,
      name: profile?.name,
      profileUrl: profile?.profileUrl,
    };
    socketRef.current.emit("message", message, roomId);
    setMessages((messages) => [...messages, message]);
  };

  const { roomId } = useParams();
  const messageRef: any = useRef("");
  const [messages, setMessages] = useState([]);
  let socketRef: any = useRef("");
  useEffect(() => {
    socketRef.current = io("http://localhost:8000");
    socketRef.current.emit("join-room", roomId, () => {
      console.log("JOINED!!!");
    });
    socketRef.current.on("receive-message", (message) => {
      console.log("message", message);
      setMessages((messages) => [...messages, message]);
    });
    messageRef.current.addEventListener("keypress", (e) => {
      let blockSend = false;
      if (e.shiftKey) {
        blockSend = true;
      }
      if (e.key === "Enter" && !e.shiftKey) {
        if (!blockSend) {
          sendMessage();
          blockSend = false;
          messageRef.current.value = "";
        }
      }
    });
  }, []);
  return (
    <div className="room w-4/5 m-auto">
      <div className="chat-screen">
        <RenderMessages messages={messages} userId={socketRef.current.id} />
      </div>
      <div className="relative justify-center flex ">
        <div className="input-box flex align-center w-11/12 relative">
          <textarea
            className=" flex-auto"
            placeholder="Type your message.."
            ref={messageRef}
          />
          {/* <Image
            src={require("images/avatars/send-message-icon.png")}
            onClick={() => {
              sendMessage();
            }}
            style={{
              height: "64px",
              position: "absolute",
              right: "-30px",
              top: "25%",
              cursor: "pointer",
            }}
            width={64}
            height={64}
            alt="arrow"
          /> */}
        </div>
      </div>
    </div>
  );
}
