"use client";
import Room from "@/Components/Room";
import Profile from "@/Components/Profile";
import { useState } from "react";

export default function layout() {
  const [allowed, setAllowed] = useState(false);

  if (allowed) return <Room />;
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
