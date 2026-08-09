"use client";

import Link from "next/link";

export const Footer = () => {
  return (
    <footer className="border-t font-medium bg-primary">
      <div className="max-w-(--breakpoint-xl) mx-auto flex items-center h-full gap-2 px-4 py-4 lg:px-10">
        <p className="text-white">Powered by</p>
        <Link href={"/"}>
          <span className="text-2xl text-white font-semibold">
            Lvl marketplace
          </span>
        </Link>
      </div>
    </footer>
  );
};
