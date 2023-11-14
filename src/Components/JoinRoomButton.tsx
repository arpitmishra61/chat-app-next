"use client";
import Link from "next/link";
import React, { useState } from "react";
import ShortUniqueId from "short-unique-id";

const btnClasses =
  "text-white bg-purple-700 hover:bg-purple-800 font-medium rounded-md text-md px-5 py-2.5 me-2 mb-2 mt-8";
export default React.memo(function JoinRoomButton() {
  const [roomId] = useState(() => {
    return new ShortUniqueId({ length: 5 }).rnd();
  });

  return (
    <Link href={`/room/${roomId}`}>
      {" "}
      <button className={btnClasses}>Start Room</button>{" "}
    </Link>
  );
});
