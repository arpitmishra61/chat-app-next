"use client";
import { useParams } from "next/navigation";
import React, { useEffect, useRef, useState, useContext, useId } from "react";

import { io } from "socket.io-client";
import RenderMessages from "./RenderMessages";
import AvatarContext from "@/Context/AvatarContext";
import FilePreview from "./FilePreview";
import Image from "next/image";
import imageCompression from "browser-image-compression";
import TopBar from "./TopBar";

export default function Room({ messagesFromStorage }: { messagesFromStorage: any[] }) {
  async function getImgData() {
    const files = fileRef.current.files[0];
    if (files) {
      const fileReader = new FileReader();
      const options = {
        maxSizeMB: 0.4,
        maxWidthOrHeight: 1024,
        useWebWorker: true,
      };
      const compressedFile = await imageCompression(files, options);
      fileReader.readAsDataURL(compressedFile);
      fileReader.addEventListener("load", function () {
        setfilePreview({
          url: String(this.result),
        });
      });
    }
  }

  const { profile } = useContext(AvatarContext);
  let timeStamp = 0;

  const sendMessage = () => {
    const text = messageRef.current?.value;
    const message = {
      text,
      id: socketRef.current.id,
      name: profile?.name,
      profileUrl: profile?.profileUrl,
      imageUrl: filePreview.url,
      userId: profile.userId
    };
    const typeMessage = {
      id: socketRef.current.id,
      name: profile?.name,
      profileUrl: profile?.profileUrl,
      value: false,
      userId: profile.userId
    };

    socketRef.current.emit("message", message, roomId);
    setMessages((messages) => [...messages, message]);
    messageRef.current.focus();
    socketRef.current.emit("not-typing", typeMessage, roomId);
    setfilePreview({ url: "" });
  };


  const { roomId } = useParams();
  const messageRef: any = useRef("");
  const fileRef: any = useRef("");
  const [messages, setMessages] = useState(messagesFromStorage || []);
  const [filePreview, setfilePreview] = useState({ url: "" });
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
    const dataJoin = {
      id: socketRef.current.id,
      name: profile?.name,
      profileUrl: profile?.profileUrl,
      profileId: profile?.userId
    };
    socketRef.current.emit("join-room", dataJoin, roomId);
    socketRef.current.on("receive-message", (message) => {
      setMessages((messages) => [...messages, message]);

    });
    socketRef.current.on("person-joined", (message) => {
      setMessages((messages) => [...messages, message]);
    });
    socketRef.current.on("typing-event", (data) => {
      setTyping(data);
    });

    messageRef.current.addEventListener("keydown", (e) => {
      const message = {
        id: socketRef.current.id,
        name: profile?.name,
        profileUrl: profile?.profileUrl,
      };
      let blockSend = false;
      if (Date.now() - timeStamp > 2500) {
        socketRef.current.emit("not-typing", message, roomId);
      }
      console.log("typing click");
      if (Date.now() - timeStamp < 1500) {
        socketRef.current.emit("typing", message, roomId);
        console.log("typing emmit");
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
    if (messages.length) {
      localStorage.setItem(`messages-${roomId}`, JSON.stringify(messages))
    }
  }, [messages])

  useEffect(() => {
    if (messages?.length) {
      const chatScreen: any = document.querySelector(".chat-screen");

      const paddingBottom = window
        .getComputedStyle(chatScreen, null)
        .getPropertyValue("padding-bottom");
      chatScreen.scrollTo(
        0,
        chatScreen.scrollHeight + +paddingBottom?.replace("px", "")
      );
      if (messages[messages.length - 1].userId === profile.userId)
        messageRef.current.value = "";
    }
  }, [messages]);
  return (
    <div className="room w-4/5 m-auto">
      <TopBar setMessages={setMessages} />
      <div className="chat-screen">
        {Boolean(filePreview?.url) && <FilePreview filePreview={filePreview} />}
        {!Boolean(filePreview.url) && (
          <RenderMessages
            messages={messages}
            userId={profile?.userId}
            typing={typing}
          />
        )}
      </div>
      <div className="relative justify-center flex ">
        <div className="input-box flex align-center relative">
          <textarea
            placeholder="Type your message.."
            ref={messageRef}
            rows={1}
            cols={1}
          ></textarea>
          <div className="icon-box flex justify-between items-center">
            <input
              type="file"
              className="hidden"
              ref={fileRef}
              accept="image/*"
              onChange={() => {
                getImgData();
              }}
            />
            <Image
              src={require(`images/avatars/mic.png`)}
              alt="file"
              width={32}
              height={32}
              className="mic-icon"
            />
            <Image
              src={require(`images/avatars/send-file.png`)}
              alt="file"
              width={32}
              height={32}
              className="file-icon"
              onClick={() => {
                const file = fileRef.current;
                file.click();
              }}
            />
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
    </div>
  );
}
