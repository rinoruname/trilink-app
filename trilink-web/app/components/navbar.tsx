"use client";
import Image from "next/image";

export default function NavBar() {
  return (
    <div className="flex justify-center p-5 border-b border-gray-light">
      <Image
        className="flex"
        src="/assets/appstellar-academy-logo.svg"
        alt="academy-logo"
        width={200}
        height={50}
      />
    </div>
  );
}
