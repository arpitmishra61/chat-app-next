"use client";
import React from "react";
import Image from "next/image";
export default function RenderMessages({ messages, userId, typing }) {
  console.log(typing);
  return !messages?.length ? (
    <div
      className="flex items-center justify-center"
      style={{ height: "100%" }}
    >
      {" "}
      <h3>Your Conversation</h3>
    </div>
  ) : (
    <div className="p-4">
      {messages.map((message, i) => {
        const flexJustify = message.id === userId ? "msg-end" : "msg-start";

        const bg = message.id === userId ? "white" : "purple";
        const nameText = message.id === userId ? "purple" : "white";
        const text = message.id === userId ? "black" : "white";
        return (
          <div className={`flex ${flexJustify}`} key={i}>
            <div
              className={`bg-${bg}-700 text-${text} p-3 my-4 rounded message relative`}
            >
              <p className={`text-${nameText}-800 text-med mb-1`}>
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
      {typing.value ? (
        <div className={`flex items-center w-200`}>
          <Image
            className="inline-block"
            src={require(`images/avatars/${typing.profileUrl}.png`)}
            alt="img typing"
            width={16}
            height={16}
          />{" "}
          <p className="text-sm"> typing...</p>
        </div>
      ) : null}
    </div>
  );
}
