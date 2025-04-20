"use client";
import React, { useState } from "react";
import AvatarContext from "../Context/AvatarContext";
const { v4: uuidv4 } = require('uuid');

export default function AvatarProvider({ children }) {
  const getProfileDetails = () => {
    let profileData
    if (typeof localStorage !== "undefined") {

      profileData = JSON.parse(
        localStorage?.getItem?.("profile") || "null"
      );
      if (profileData) {
        return profileData;
      } else {
        profileData = {
          name: "Anonymous",
          profileUrl: "avatar-0",
        };
      }
      let userId = localStorage.getItem("user-id")
      if (userId) {
        profileData.userId = userId
      }
      else {
        userId = uuidv4();
        profileData.userId = userId
        localStorage.setItem("user-id", userId)

      }

    }

    return profileData
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
