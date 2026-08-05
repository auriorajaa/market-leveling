"use client";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useState } from "react";
import { NavbarSidebar } from "./navbar-sidebar";
import { MenuIcon } from "lucide-react";

interface NavbarItemProps {
  href: string;
  children: React.ReactNode;
  isActive?: boolean;
}

const NavbarItem = ({ href, children, isActive }: NavbarItemProps) => {
  return (
    <Button
      asChild
      variant={"outline"}
      className={cn(
        "bg-transparent hover:bg-transparent border-0 rounded-none hover:underline border-transparent px-3.5 text-lg",
        isActive &&
          "bg-primary text-primary-foreground hover:bg-primary hover:text-primary-foreground"
      )}
    >
      <Link href={href}>{children}</Link>
    </Button>
  );
};

const navbarItems = [
  { href: "/", children: "Home" },
  { href: "/about", children: "About" },
  { href: "/features", children: "Features" },
  { href: "/contact", children: "Contact" },
];

export const Navbar = () => {
  const pathName = usePathname();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <nav className="h-20 flex border-b justify-between font-medium bg-white">
      <Link href="/" className="pl-6 flex items-center">
        <span className="text-xl font-bold text-foreground font-sans tracking-tight">
          Lvl Marketplace
        </span>
      </Link>

      {/* We pass the plain string route path down here */}
      <NavbarSidebar
        items={navbarItems}
        open={isSidebarOpen}
        currentPath={pathName}
        onOpenChange={setIsSidebarOpen}
      />

      <div className="items-center gap-4 hidden lg:flex">
        {navbarItems.map((item) => (
          <NavbarItem
            key={item.href}
            href={item.href}
            isActive={pathName === item.href}
          >
            {item.children}
          </NavbarItem>
        ))}
      </div>

      <div className="hidden lg:flex">
        <Button
          asChild
          variant={"secondary"}
          className="border-l border-t-0 border-b-0 border-r-0 px-12 h-full rounded-none bg-white hover:bg-transparent transition-colors text-lg text-black hover:underline"
        >
          <Link prefetch href={"/sign-in"}>Log in</Link>
        </Button>
        <Button
          asChild
          className="border-l-0 border-t-0 border-b-0 border-r-0 px-12 h-full rounded-none bg-primary hover:bg-primary transition-colors text-lg text-primary-foreground hover:underline"
        >
          <Link prefetch href={"/sign-up"}> Start selling</Link>
        </Button>
      </div>

      <div className="flex lg:hidden items-center justify-center pr-2">
        <Button
          variant={"ghost"}
          className="size-12 border-transparent bg-white"
          onClick={() => setIsSidebarOpen(true)}
        >
          <MenuIcon />
        </Button>
      </div>
    </nav>
  );
};
