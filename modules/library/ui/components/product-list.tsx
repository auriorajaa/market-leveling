"use client";

import { useTRPC } from "@/trpc/client";
import { useSuspenseInfiniteQuery } from "@tanstack/react-query";
import { DEFAULT_LIMIT } from "@/constants";
import { Button } from "@/components/ui/button";
import { InboxIcon } from "lucide-react";
import { ProductCard, ProductCardSkeleteon } from "./product-card";

export const ProductList = () => {
  const trpc = useTRPC();
  const { data, hasNextPage, isFetchingNextPage, fetchNextPage } =
    useSuspenseInfiniteQuery(
      trpc.library.getMany.infiniteQueryOptions(
        {
          limit: DEFAULT_LIMIT,
        },
        {
          getNextPageParam: (lastPage) => {
            return lastPage.docs.length > 0 ? lastPage.nextPage : undefined;
          },
        },
      ),
    );

  if (data.pages?.[0]?.docs.length === 0) {
    return (
      <div className="border border-slate-400 border-dashed flex items-center justify-center p-8 flex-col gap-y-4 bg-white w-full rounded-none text-slate-400">
        <InboxIcon />
        <p className="text-base font-medium">No products to show, yet...</p>
      </div>
    );
  }

  return (
    <>
      <div
        className={
          "grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-4"
        }
      >
        {data?.pages
          .flatMap((page) => page.docs)
          .map((product) => (
            <ProductCard
              key={product.id}
              id={product.id}
              name={product.name}
              imageUrl={product.image?.url}
              tenantSlug={product.tenant?.slug}
              tenantImageUrl={product.tenant?.media?.url}
              reviewRating={product.reviewRating}
              reviewCount={product.reviewCount}
            />
          ))}
      </div>

      <div className="flex justify-center pt-6">
        {hasNextPage && (
          <Button
            disabled={isFetchingNextPage}
            onClick={() => fetchNextPage()}
            className="font-medium disabled:opacity-50 bg-primary text-base py-5 rounded-none hover:bg-primary hover:underline cursor-pointer"
          >
            Load more
          </Button>
        )}
      </div>
    </>
  );
};

export const ProductListSkeleton = () => {
  return (
    <div
      className={
        "grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-4"
      }
    >
      {Array.from({ length: DEFAULT_LIMIT }).map((_, index) => (
        <ProductCardSkeleteon key={index} />
      ))}
    </div>
  );
};
