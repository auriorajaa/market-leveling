"use client";

import { Button } from "@/components/ui/button";
import { generateTenantURL } from "@/lib/utils";
// import { CheckoutButton } from "@/modules/checkout/ui/components/checkout-button";
import { useTRPC } from "@/trpc/client";
import { useSuspenseQuery } from "@tanstack/react-query";
import { ShoppingCartIcon } from "lucide-react";
import dynamic from "next/dynamic";
import Image from "next/image";
import Link from "next/link";

const CheckoutButton = dynamic(
  () =>
    import("@/modules/checkout/ui/components/checkout-button").then(
      (mod) => mod.CheckoutButton,
    ),
  {
    ssr: false,
    loading: () => (
      <Button disabled className="text-white text-xl p-5 rounded-none">
        <ShoppingCartIcon className="size-5 me-2" />
      </Button>
    ),
  },
);

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

        <CheckoutButton hideIfEmpty tenantSlug={slug} />
      </div>
    </nav>
  );
};

export const NavbarSkeleton = () => {
  return (
    <nav className="h-20 border-b font-medium bg-primary">
      <div className="max-w-(--breakpoint-xl) mx-auto flex justify-between items-center h-full px-4 lg:px-10">
        <Button disabled className="text-white text-xl p-5 rounded-none">
          <ShoppingCartIcon className="size-5 me-2" />
        </Button>
      </div>
    </nav>
  );
};
