"use client";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useCart } from "@/modules/checkout/hooks/use-cart";
import Link from "next/link";

interface Props {
  tenantSlug: string;
  productId: string;
  isPurchased?: boolean;
}

export const CartButton = ({ tenantSlug, productId, isPurchased }: Props) => {
  const cart = useCart(tenantSlug);

  if (isPurchased) {
    return (
      <Button
        asChild
        className="flex-1 bg-white text-primary border border-primary text-xl size-14 cursor-pointer rounded-none hover:underline hover:text-primary hover:bg-white"
      >
        <Link prefetch href={`/library/${productId}`}>
          View in Library
        </Link>
      </Button>
    );
  }

  return (
    <Button
      onClick={() => cart.toggleProduct(productId)}
      className={cn(
        "flex-1 bg-primary text-xl size-14 cursor-pointer rounded-none hover:bg-primary hover:underline",
        cart.isProductInCart(productId) &&
          "flex-1 bg-white text-primary border border-primary text-xl size-14 cursor-pointer rounded-none hover:underline hover:text-primary hover:bg-white",
      )}
    >
      {cart.isProductInCart(productId) ? "Remove from cart" : "Add to cart"}
    </Button>
  );
};
