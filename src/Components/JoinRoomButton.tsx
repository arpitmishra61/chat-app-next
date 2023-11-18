"use client";
import Link from "next/link";
import React, { useState } from "react";
import ShortUniqueId from "short-unique-id";

const btnClasses =
  "text-white bg-purple-700 hover:bg-purple-800 font-medium rounded-md text-md px-5 py-3 mb-1 mt-8 text-2xl";
export default React.memo(function JoinRoomButton() {
  const [roomId] = useState(() => {
    return new ShortUniqueId({ length: 5 }).rnd();
  });

  return (
    <Link href={`/room/${roomId}`} className="m-auto">
      {" "}
      <button className={btnClasses}>Start New Room</button>{" "}
    </Link>
  );
});
