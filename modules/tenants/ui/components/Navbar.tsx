"use client";

import { generateTenantURL } from "@/lib/utils";
import { useTRPC } from "@/trpc/client";
import { useSuspenseQuery } from "@tanstack/react-query";
import Image from "next/image";
import Link from "next/link";

interface Props {
  slug: string;
}

export const Navbar = ({ slug }: Props) => {
  const trpc = useTRPC();
  const { data } = useSuspenseQuery(trpc.tenants.getOne.queryOptions({ slug }));

  return (
    <nav className="h-20 border-b font-medium bg-primary">
      <div className="max-w-(--breakpoint-xl) mx-auto flex justify-between items-center h-full px-4 lg:px-10">
        <Link
          href={generateTenantURL(slug)}
          className="flex items-center gap-2"
        >
          {data.media?.url && (
            <Image
              alt={slug}
              src={data.media.url}
              width={40}
              height={40}
              className="rounded-full object-cover shrink-0 size-10"
            />
          )}
          <p className="text-2xl text-white">{data.name}</p>
        </Link>
      </div>
    </nav>
  );
};

export const NavbarSkeleton = () => {
  return (
    <nav className="h-20 border-b font-medium bg-primary">
      <div className="max-w-(--breakpoint-xl) mx-auto flex justify-between items-center h-full px-4 lg:px-10">
        <div></div>
      </div>
    </nav>
  );
};
