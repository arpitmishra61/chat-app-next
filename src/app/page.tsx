import Image from "next/image";
import VideoSVG from "images/homepage/video-call-home-logo.svg";
import UpdateProfileButton from "@/Components/UpdateProfileButton";
import JoinRoomButton from "@/Components/JoinRoomButton";

export default function Home() {
  return (
    <div className=" flex h-screen">
      <div className="flex items-center content-center w-2/5  bg-purple-600">
        <Image
          src={VideoSVG}
          alt="fsfs"
          width={500}
          height={500}
          className="flex"
        />
      </div>
      <div className="flex items-center justify-center w-3/5 flex-col">
        <UpdateProfileButton />
        <h1 className="text-bold text-purple-800 text-7xl">We Love We See</h1>
        <h2 className="text-5xl mt-10">We Chat</h2>
        <JoinRoomButton />
        OR
        <div className="flex align-center justify-center mt-10">
          <input
            className=" border-4 outline-0 p-2 border-purple-700 border-rounded rounded-md "
            style={{
              borderRight: "none",
              borderTopRightRadius: "0",
              borderBottomRightRadius: "0",
            }}
            placeholder=" Enter Room ID"
          />
          <button
            className="rounded-md text-md px-5 py-2.5 me-2  bg-purple-700 text-white"
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
  );
}
