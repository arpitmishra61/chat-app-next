"use client";
import React, { useState } from "react";
import AvatarContext from "../Context/AvatarContext";

export default function AvatarProvider({ children }) {
  const [profile, setProfile] = useState({
    name: "Anonymous",
    profileUrl: "avatar-0",
  });
  const profileData = {
    profile,
    setProfile,
  };
  return (
    <AvatarContext.Provider value={profileData}>
      {children}
    </AvatarContext.Provider>
  );
}
