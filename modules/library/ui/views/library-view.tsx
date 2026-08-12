"use client";

import { ArrowLeftIcon } from "lucide-react";
import Link from "next/link";
import { ProductList, ProductListSkeleton } from "../components/product-list";
import { Suspense } from "react";

export const LibraryView = () => {
  return (
    <div className="min-h-screen bg-white">
      <nav className="p-4 bg-primary w-full border-b">
        <Link prefetch href={"/"} className="flex items-center gap-2">
          <ArrowLeftIcon className="size-5 text-white" />
          <span className="text font-medium text-lg text-white">
            Continue shopping
          </span>
        </Link>
      </nav>

      <header className="bg-primary py-8 border-b">
        <div className="max-w-(--breakpoint-xl) mx-auto px-4 lg:px-12 flex flex-col gap-y-4">
          <h1 className="text-6xl font-medium text-white">Library</h1>
          <p className="font-medium text-white">Your purchases and reviews</p>
        </div>
      </header>

      <section className="max-w-(--breakpoint-xl) mx-auto px-4 lg:px-12 py-10">
        <Suspense fallback={<ProductListSkeleton />}>
          <ProductList />
        </Suspense>
      </section>
    </div>
  );
};
