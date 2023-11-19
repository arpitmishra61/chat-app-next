"use client";
import { useParams } from "next/navigation";
import React, { useEffect, useRef, useState, useContext } from "react";

import { io } from "socket.io-client";
import RenderMessages from "./RenderMessages";
import AvatarContext from "@/Context/AvatarContext";

export default function Room() {
  const { profile } = useContext(AvatarContext);

  const sendMessage = () => {
    const text = messageRef.current?.value;
    console.log(text);
    const message = {
      text,
      id: socketRef.current.id,
      name: profile?.name,
      profileUrl: profile?.profileUrl,
    };
    socketRef.current.emit("message", message, roomId);
    setMessages((messages) => [...messages, message]);
    messageRef.current.focus();
  };

  const { roomId } = useParams();
  const messageRef: any = useRef("");
  const [messages, setMessages] = useState([]);
  let socketRef: any = useRef("");
  useEffect(() => {
    window.onresize = () => {
      var metaViewport = document.querySelector("meta[name=viewport]");
      console.log("grgr");
      metaViewport.removeAttribute("content");
      metaViewport.setAttribute(
        "content",
        "width=device-width, initial-scale=1.0, interactive-widget=resizes-content"
      );
    };
    socketRef.current = io(`https://chat-application-be.onrender.com`);
    console.log("process.env.backendUrl");
    socketRef.current.emit("join-room", roomId, () => {
      console.log("JOINED!!!");
    });
    socketRef.current.on("receive-message", (message) => {
      setMessages((messages) => [...messages, message]);
    });
    messageRef.current.addEventListener("keypress", (e) => {
      let blockSend = false;

      if (e.shiftKey) {
        blockSend = true;
      }
      if (e.key === "Enter" && !e.shiftKey) {
        if (!blockSend) {
          e.preventDefault();
          sendMessage();

          blockSend = false;
        }
      }
    });
  }, []);

  useEffect(() => {
    if (messages?.length) {
      const chatScreen: any = document.querySelector(".chat-screen");

      const paddingBottom = window
        .getComputedStyle(chatScreen, null)
        .getPropertyValue("padding-bottom");
      console.log(paddingBottom);
      console.log(chatScreen.scrollHeight);
      console.log(+paddingBottom?.replace("px", ""), chatScreen.scrollHeight);
      chatScreen.scrollTo(
        0,
        chatScreen.scrollHeight + +paddingBottom?.replace("px", "")
      );
      messageRef.current.value = "";
    }
  }, [messages]);
  return (
    <div className="room w-4/5 m-auto">
      <div className="chat-screen">
        <RenderMessages messages={messages} userId={socketRef.current.id} />
      </div>
      <div className="relative justify-center flex ">
        <div className="input-box flex align-center relative">
          <textarea
            placeholder="Type your message.."
            ref={messageRef}
            rows={1}
            cols={1}
          ></textarea>
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            onClick={sendMessage}
          >
            <path
              d="M7 11L12 6L17 11M12 18V7"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            ></path>
          </svg>
        </div>
      </div>
    </div>
  );
}
