"use client";
import Room from "@/Components/Room";
import Profile from "@/Components/Profile";
import { useState, useRef, useEffect } from "react";
function getFromStorage() {
  try {
    if (typeof window === 'undefined') {
      return []
    }
    const messages = JSON.parse(localStorage.getItem("messages"))
    if (Array.isArray(messages)) {
      return messages
    }
    return []

  }
  catch (err) {
    console.log(err)
    return []
  }

}
export default function RoomMainPage() {
  const [allowed, setAllowed] = useState(false);
  const messages = useRef(getFromStorage());


  if (allowed || messages.current.length) return <Room messagesFromStorage={messages.current} />;
  else
    return (
      <div className="room-profile">
        <div className="w-1/2 m-auto">
          <Profile />

          <button
            className="rounded-md text-md px-5 py-2.5w-500 bg-purple-700 text-white text-2xl p-2 block m-auto"
            onClick={() => {
              setAllowed(true);
            }}
          >
            Join The Chat
          </button>
        </div>
      </div>
    );
}
