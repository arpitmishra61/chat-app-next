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
          width={80}
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
  return (
    <div className="mt-12">
      <h3 className="text-2xl">Select Your Avatar</h3>
      <div className="flex justify-between w-100 mt-1 p-5 mb-4 flex-wrap">
        {getAvatars(profile, setProfile)}
      </div>
    </div>
  );
}
