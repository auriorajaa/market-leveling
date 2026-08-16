"use client";

import { TriangleAlertIcon } from "lucide-react";

const ErrorPage = () => {
  return (
    <div className="px-4 lg:px-12 py-10">
      <div className="border border-slate-400 border-dashed flex items-center justify-center p-8 flex-col gap-y-4 bg-white w-full rounded-none text-slate-400">
        <TriangleAlertIcon />
        <p className="text-base font-medium">
          The product you looking for doesnt exist or might be deleted
        </p>
      </div>
    </div>
  );
};

export default ErrorPage;
