"use client";
import React, { useContext, useRef, useEffect } from "react";
import AvatarsSelector from "@/Components/AvatarsSelector";
import AvatarContext from "@/Context/AvatarContext";
import Link from "next/link";
import Image from "next/image";
export default function Profile() {
  const { profile, setProfile } = useContext(AvatarContext);
  const inputRef = useRef(null);
  useEffect(() => {
    localStorage.setItem("profile", JSON.stringify(profile));
  }, [profile]);
  return (
    <div className="rounded profile flex justify-center items-center w-4/10">
      <div className="profile-content p-5 w-4/5">
        <Image
          src={require("images/logo/main.png")}
          alt="main-logo"
          className="mb-4"
        />
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

          {typeof localStorage !== "undefined" ? (
            <AvatarsSelector />
          ) : (
            <div className="w-24 h-52"></div>
          )}
        </div>

        <div className="w-1/3"></div>
      </div>
    </div>
  );
}
