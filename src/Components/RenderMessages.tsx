"use client";
import React from "react";
import Image from "next/image";
export default function RenderMessages({ messages, userId }) {
  return (
    <div className="p-4">
      {messages.map((message, i) => {
        console.log("message.id === userId", message.id, userId);
        const flexJustify = message.id === userId ? "msg-end" : "msg-start";
        const bg = message.id === userId ? "white" : "purple";
        const nameText = message.id === userId ? "purple" : "white";
        console.log("bg", bg);
        const text = message.id === userId ? "black" : "white";
        return (
          <div className={`flex ${flexJustify}`} key={i}>
            <div
              className={`bg-${bg}-600 text-${text} p-3 my-4 rounded message relative`}
            >
              <p className={`text-${nameText}-800 text-med mb-3`}>
                <strong>{message.name}</strong>
              </p>

              <Image
                src={require(`images/avatars/${message.profileUrl}.png`)}
                width={35}
                height={35}
                alt="image"
                className="absolute bottom-0 right-0 avatar"
              />

              <p>{message.text}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
}
