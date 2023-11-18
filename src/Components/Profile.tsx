"use client";
import React, { useContext, useRef } from "react";
import AvatarsSelector from "@/Components/AvatarsSelector";
import AvatarContext from "@/Context/AvatarContext";
import Link from "next/link";

export default function Profile() {
  const { profile, setProfile } = useContext(AvatarContext);
  const inputRef = useRef(null);

  return (
    <div className="rounded profile flex justify-center items-center w-4/10">
      <div className="contnt p-5 w-4/5">
        <div>
          <input
            type="text"
            placeholder="Name"
            className="p-3 mt-4 mb-4 w-1/2 text-2xl"
            value={profile?.name}
            ref={inputRef}
            onChange={() => {
              setProfile((profile) => ({
                ...profile,
                name: inputRef?.current?.value,
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
