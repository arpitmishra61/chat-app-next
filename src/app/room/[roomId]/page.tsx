"use client";
import Room from "@/Components/Room";
import Profile from "@/Components/Profile";

export default function layout() {
  if (2 === 2) return <Room />;
  else
    return (
      <div className="w-1/2 m-auto">
        <Profile />
        <button>Join</button>
      </div>
    );
}
