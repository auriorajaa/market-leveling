"use client";

import { useTRPC } from "@/trpc/client";
import { useMutation } from "@tanstack/react-query";
import { LoaderIcon } from "lucide-react";
import { useEffect } from "react";

function redirectToPage(url: string) {
  window.location.href = url;
}

const Page = () => {
  const trpc = useTRPC();
  const { mutate: verify } = useMutation(
    trpc.checkout.verify.mutationOptions({
      onSuccess: (data) => {
        redirectToPage(data.url);
      },
      onError: () => {
        redirectToPage("/");
      },
    }),
  );

  useEffect(() => {
    verify();
  }, [verify]);

  return (
    <div className="flex min-h-screen items-center justify-center">
      <LoaderIcon className="animate-spin text-black" />
    </div>
  );
};

export default Page;
