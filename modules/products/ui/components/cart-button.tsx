"use client";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useCart } from "@/modules/checkout/hooks/use-cart";

interface Props {
  tenantSlug: string;
  productId: string;
}

export const CartButton = ({ tenantSlug, productId }: Props) => {
  const cart = useCart(tenantSlug);

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
