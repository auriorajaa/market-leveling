import React, { Suspense } from "react";
import { Navbar } from "./navbar";
import Footer from "./footer";
import { SearchFilters } from "./search-filters";
import { getQueryClient, trpc } from "@/trpc/server";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";

interface Props {
  children: React.ReactNode;
}

const layout = async ({ children }: Props) => {
  const queryClient = getQueryClient();
  void queryClient.prefetchQuery(trpc.categories.getMany.queryOptions());

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <HydrationBoundary state={dehydrate(queryClient)}>
        <Suspense fallback={<SearchFilters />}>
          <SearchFilters />
        </Suspense>
      </HydrationBoundary>
      <div className="flex-1"> {children}</div>
      <Footer />
    </div>
  );
};

export default layout;
