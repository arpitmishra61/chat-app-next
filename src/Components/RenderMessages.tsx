"use client";
import React from "react";
import Image from "next/image";
const getIsCurrentUser = (userId, userIdFromMessage) => userId === userIdFromMessage
export default function RenderMessages({ messages, userId, typing }) {

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
        const isCurrentUser = getIsCurrentUser(message.userId, userId)
        const flexJustify = isCurrentUser ? "msg-end" : "msg-start";

        const bg = isCurrentUser ? "white" : "purple";
        const nameText = isCurrentUser ? "purple" : "white";
        const text = isCurrentUser ? "black" : "white";
        return (
          <div className={`flex ${flexJustify}`} key={i} onClick={() => {

          }}>
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
              {message.imageUrl ? (
                <Image
                  src={message.imageUrl}
                  width={200}
                  height={200}
                  alt="image"
                  className=""
                />
              ) : null}

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
