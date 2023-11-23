"use client";
import Image from "next/image";
import VideoSVG from "images/homepage/video-call-home-logo.svg";
import UpdateProfileButton from "@/Components/UpdateProfileButton";
import JoinRoomButton from "@/Components/JoinRoomButton";
import Profile from "@/Components/Profile";
import AvatarContext from "@/Context/AvatarContext";
import { useContext } from "react";
export default function Home() {
  const { profile } = useContext(AvatarContext);

  return (
    <div className="flex h-screen home items-center justify-center">
      <div className="container w-7/10 rounded flex">
        <div className="home-img w-4/10">
          <Profile />
        </div>

        <div className="content">
          <div className="flex align-center justify-center flex-col">
            <div className="screen-image">
              <Image
                src={VideoSVG}
                alt="fsfs"
                width={500}
                className="flex m-auto"
              />
              <div className="screen-custom  flex flex-col justify-center items-center">
                <Image
                  src={require(`./../images/avatars/${profile?.profileUrl}.png`)}
                  alt="fsfs"
                  width={100}
                />
                <h3>{profile?.name ? profile?.name : "Anonymous"}</h3>
              </div>
            </div>

            <JoinRoomButton />

            <div className="flex align-center justify-center mt-1 p-8">
              {" "}
              <input
                className=" border-4 outline-0 p-2 border-purple-700 border-rounded rounded-md text-2xl"
                style={{
                  borderRight: "none",
                  borderTopRightRadius: "0",
                  borderBottomRightRadius: "0",
                }}
                placeholder=" Enter Room ID"
              />
              <button
                className="rounded-md text-md px-5 py-2.5 me-2  bg-purple-700 text-white text-2xl p-2"
                style={{
                  borderLeft: "none",
                  borderTopLeftRadius: "0",
                  borderBottomLeftRadius: "0",
                }}
              >
                Join
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
