"use client";

import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import Link from "next/link";
import { cn } from "@/lib/utils";

interface NavbarItem {
  href: string;
  children: React.ReactNode;
}

interface Props {
  items: NavbarItem[];
  open: boolean;
  currentPath: string;
  onOpenChange: (open: boolean) => void;
}

export const NavbarSidebar = ({
  items,
  open,
  currentPath,
  onOpenChange,
}: Props) => {
  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent side="left" className="p-0 transition-none">
        <SheetHeader className="p-4 border-b">
          <SheetTitle>Menu</SheetTitle>
          <SheetDescription className="sr-only">
            Navigation menu for marketplace routes and account access.
          </SheetDescription>
        </SheetHeader>
        <ScrollArea className="flex flex-col overflow-y-auto h-full pb-2">
          {items.map((item) => {
            const isActive = currentPath === item.href;

            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => onOpenChange(false)}
                className={cn(
                  "w-full text-left p-4 flex items-center text-base font-medium transition-colors",
                  isActive
                    ? "bg-primary text-primary-foreground font-bold"
                    : "hover:underline"
                )}
              >
                {item.children}
              </Link>
            );
          })}

          {/* Bottom static links section */}
          <div className="border-t mt-2">
            <Link
              onClick={() => onOpenChange(false)}
              href={"/sign-in"}
              className={cn(
                "w-full text-left p-4 flex items-center text-base font-medium transition-colors",
                currentPath === "/sign-in"
                  ? "bg-primary text-primary-foreground font-bold"
                  : "hover:underline"
              )}
            >
              Log in
            </Link>
            <Link
              onClick={() => onOpenChange(false)}
              href={"/sign-up"}
              className={cn(
                "w-full text-left p-4 flex items-center text-base font-medium transition-colors",
                currentPath === "/sign-up"
                  ? "bg-primary text-primary-foreground font-bold"
                  : "hover:underline"
              )}
            >
              Start selling
            </Link>
          </div>
        </ScrollArea>
      </SheetContent>
    </Sheet>
  );
};
