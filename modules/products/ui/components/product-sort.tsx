"use client";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useProductFilters } from "../../hooks/use-product-filters";

export const ProductSort = () => {
  const [filters, setFilters] = useProductFilters();

  return (
    <div className="flex items-center gap-2">
      <Button
        className={cn(
          "rounded-none bg-primary hover:bg-primary text-white border border-primary",
          filters.sort !== "picked" &&
            "bg-white border border-stone-900 text-black cursor-pointer hover:bg-white hover:underline",
        )}
        variant={"secondary"}
        onClick={() => setFilters({ sort: "picked" })}
      >
        Picked for you
      </Button>

      <Button
        className={cn(
          "rounded-none bg-primary hover:bg-primary text-white border border-primary",
          filters.sort !== "trending" &&
            "bg-white border border-stone-900 text-black cursor-pointer hover:bg-white hover:underline",
        )}
        variant={"secondary"}
        onClick={() => setFilters({ sort: "trending" })}
      >
        Trending
      </Button>

      <Button
        className={cn(
          "rounded-none bg-primary hover:bg-primary text-white border border-primary",
          filters.sort !== "new" &&
            "bg-white border border-stone-900 text-black cursor-pointer hover:bg-white hover:underline",
        )}
        variant={"secondary"}
        onClick={() => setFilters({ sort: "new" })}
      >
        New
      </Button>
    </div>
  );
};
