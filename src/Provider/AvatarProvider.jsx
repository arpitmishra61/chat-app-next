"use client";
import React, { useState } from "react";
import AvatarContext from "../Context/AvatarContext";

export default function AvatarProvider({ children }) {
  const getProfileDetails = () => {
    if (typeof localStorage !== "undefined") {
      const profileData = JSON.parse(
        localStorage?.getItem?.("profile") || "null"
      );
      if (profileData) {
        return profileData;
      } else {
        return {
          name: "Anonymous",
          profileUrl: "avatar-0",
        };
      }
    } else {
      return {
        name: "Anonymous",
        profileUrl: "avatar-0",
      };
    }
  };
  const [profile, setProfile] = useState(getProfileDetails);
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
