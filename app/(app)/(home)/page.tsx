"use client";

import { useTRPC } from "@/trpc/client";
import { useQuery } from "@tanstack/react-query";

export default function Home() {
  const trpc = useTRPC();
  const { data } = useQuery(trpc.auth.session.queryOptions());

  return (
    <div className="p-8 max-w-2xl mx-auto space-y-10">
      {JSON.stringify(data, null, 2)}
    </div>
  );
}
