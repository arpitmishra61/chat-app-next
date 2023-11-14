"use client";
import React, { useContext, useRef } from "react";
import AvatarsSelector from "@/Components/AvatarsSelector";
import AvatarContext from "@/Context/AvatarContext";
import Link from "next/link";

export default function page() {
  const { profile, setProfile } = useContext(AvatarContext);
  const inputRef = useRef();

  return (
    <div className="rounded profile-page flex justify-center items-center h-screen">
      <div className="content bg-gray-100 p-5 flex">
        <div className="w-2/3">
          <Link href="/">Back</Link>
          <h1 className="text-4xl my-4">Update Profile</h1>
          <hr />
          <input
            type="text"
            placeholder="Name"
            className="p-3 mt-4"
            value={profile?.name}
            ref={inputRef}
            onChange={() => {
              setProfile((profile) => ({
                ...profile,
                name: inputRef.current.value,
              }));
            }}
          />

          <AvatarsSelector />
        </div>

        <div className="w-1/3"></div>
      </div>
    </div>
  );
}
