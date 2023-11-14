import Link from "next/link";
import React from "react";
const btnClasses =
  "text-white bg-purple-700 hover:bg-purple-800 font-medium rounded-md text-md px-5 py-2.5 me-2 mb-2 absolute top-10 right-5 flex";

export default function UpdateProfileButton() {
  return (
    <Link href="/profile">
      <button type="button" className={btnClasses}>
        <svg
          className="h-6 w-6 text-white-500 inline-block"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
          />
        </svg>{" "}
        <h4 className="text-white-500 inline-block text-xl"> Profile</h4>
      </button>
    </Link>
  );
}
