"use client";
import { formatCurrency, generateTenantURL } from "@/lib/utils";
import { StarIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

interface ProductCardProps {
  id: string;
  name: string;
  imageUrl?: string | null;
  tenantSlug: string;
  tenantImageUrl?: string | null;
  reviewRating: number;
  reviewCount: number;
}

export const ProductCard = ({
  id,
  name,
  imageUrl,
  tenantSlug,
  tenantImageUrl,
  reviewRating,
  reviewCount,
}: ProductCardProps) => {
  return (
    <div className="relative hover:border-primary transition-colors border rounded-none bg-white overflow-hidden h-full flex flex-col">
      <Link
        href={`/library/${id}`}
        className="absolute inset-0 z-0"
        aria-label={name}
      />

      <div className="relative aspect-square pointer-events-none">
        <Image
          loading="eager"
          alt={name}
          fill
          src={imageUrl || "https://placehold.net/400x400.png"}
          className="object-cover"
        />
      </div>

      <div className="p-4 border-y flex flex-col gap-3 flex-1">
        <h2 className="text-lg font-medium line-clamp-2 min-h-[3.5rem] pointer-events-none">
          {name}
        </h2>

        <Link
          href={generateTenantURL(tenantSlug)}
          className="relative z-10 flex items-center gap-2 w-fit"
          onClick={(e) => e.stopPropagation()}
        >
          {tenantImageUrl && (
            <Image
              alt={tenantSlug}
              src={tenantImageUrl}
              width={28}
              height={28}
              className="rounded-full border object-cover shrink-0 size-7"
            />
          )}
          <p className="underline font-medium">{tenantSlug}</p>
        </Link>

        {reviewCount > 0 && (
          <div className="flex items-center gap-1 pointer-events-none">
            <StarIcon className="size-3.5 fill-black" />
            <p className="text-sm font-medium">
              {reviewRating} ({reviewCount})
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export const ProductCardSkeleteon = () => {
  return (
    <div className="w-full aspect-3/4 bg-neutral-200 rounded-none animate-pulse" />
  );
};
