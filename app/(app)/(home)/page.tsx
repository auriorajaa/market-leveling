import configPromise from "@payload-config";
import { getPayload } from "payload";

export default async function Home() {
  const payload = await getPayload({
    config: configPromise,
  });

  const data = await payload.find({
    collection: "categories",
  });

  return (
    <div className="p-8 max-w-2xl mx-auto space-y-10">
      {JSON.stringify(data, null, 2)}
    </div>
  );
}
