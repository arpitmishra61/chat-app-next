"use client";
import Image from "next/image";
import React, { useContext } from "react";
import AvatarContext from "@/Context/AvatarContext";
const getAvatars = (profile, setProfile) => {
  let imgs = [];
  for (let i = 0; i < 5; i++)
    imgs.push(
      <div
        className="avatar-container"
        data-selected={profile.profileUrl === `avatar-${i}`}
      >
        <Image
          src={require(`images/avatars/avatar-${i}.png`)}
          width={100}
          height={100}
          className="avatar-select"
          onClick={() => {
            setProfile((profile) => ({
              ...profile,
              profileUrl: `avatar-${i}`,
            }));
          }}
        />
      </div>
    );

  return imgs;
};
export default function AvatarsSelector() {
  const { profile, setProfile } = useContext(AvatarContext);
  console.log("profile", profile);
  return (
    <div className="mt-4" p-4>
      <h3 className="text-2xl">Select Avatar</h3>
      <div className="flex justify-between w-2/3 mt-6 p-4 mb-4">
        {getAvatars(profile, setProfile)}
      </div>
    </div>
  );
}
