"use client";
import { useParams } from "next/navigation";
import React, { useEffect, useRef, useState, useContext } from "react";

import { io } from "socket.io-client";
import RenderMessages from "./RenderMessages";
import AvatarContext from "@/Context/AvatarContext";

export default function Room() {
  const { profile } = useContext(AvatarContext);
  let timeStamp = 0;

  const sendMessage = () => {
    const text = messageRef.current?.value;
    const message = {
      text,
      id: socketRef.current.id,
      name: profile?.name,
      profileUrl: profile?.profileUrl,
    };
    let typeMessage = {
      id: socketRef.current.id,
      name: profile?.name,
      profileUrl: profile?.profileUrl,
      value: false,
    };

    socketRef.current.emit("message", message, roomId);
    setMessages((messages) => [...messages, message]);
    messageRef.current.focus();
    socketRef.current.emit("not-typing", typeMessage, roomId);
  };

  const { roomId } = useParams();
  const messageRef: any = useRef("");
  const [messages, setMessages] = useState([]);
  const [typing, setTyping] = useState(false);
  let socketRef: any = useRef("");
  useEffect(() => {
    window.onresize = () => {
      var metaViewport = document.querySelector("meta[name=viewport]");
      metaViewport.removeAttribute("content");
      metaViewport.setAttribute(
        "content",
        "width=device-width, initial-scale=1.0, interactive-widget=resizes-content"
      );
    };
    socketRef.current = io(`https://chat-application-be.onrender.com`);
    socketRef.current.emit("join-room", roomId, () => {
      console.log("JOINED!!!");
    });
    socketRef.current.on("receive-message", (message) => {
      setMessages((messages) => [...messages, message]);
    });
    socketRef.current.on("typing-event", (data) => {
      console.log("data", data);
      setTyping(data);
    });

    messageRef.current.addEventListener("keypress", (e) => {
      const message = {
        id: socketRef.current.id,
        name: profile?.name,
        profileUrl: profile?.profileUrl,
      };
      let blockSend = false;
      if (Date.now() - timeStamp > 2500) {
        socketRef.current.emit("not-typing", message, roomId);
      }
      if (Date.now() - timeStamp < 1500) {
        socketRef.current.emit("typing", message, roomId);
      }

      timeStamp = Date.now();
      setTimeout(() => {
        if (Date.now() - timeStamp > 2000) {
          socketRef.current.emit("not-typing", message, roomId);
        }
      }, 2000);
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
      if (messages[messages.length - 1].id === socketRef.current.id)
        messageRef.current.value = "";
    }
  }, [messages]);
  return (
    <div className="room w-4/5 m-auto">
      <div className="chat-screen">
        <RenderMessages
          messages={messages}
          userId={socketRef.current.id}
          typing={typing}
        />
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
