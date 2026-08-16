import { isSuperAdmin } from "@/lib/access";
import { Tenant } from "@/payload-types";
import { lexicalEditor, UploadFeature } from "@payloadcms/richtext-lexical";
import { CollectionConfig } from "payload";

export const Products: CollectionConfig = {
  slug: "products",
  access: {
    read: () => true,
    create: ({ req }) => {
      if (isSuperAdmin(req.user)) return true;

      const tenant = req.user?.tenants?.[0]?.tenant as Tenant;

      return Boolean(tenant?.stripeDetailsSubmitted);
    },
    delete: ({ req }) => isSuperAdmin(req.user),
  },
  admin: {
    useAsTitle: "name",
    description:
      "You must verify your account before creating your first products",
  },
  fields: [
    {
      name: "name",
      type: "text",
      required: true,
    },
    {
      name: "description",
      type: "richText",
    },
    {
      name: "price",
      type: "number",
      required: true,
      admin: {
        description: "Price in USD",
      },
    },
    {
      name: "category",
      type: "relationship",
      relationTo: "categories",
      hasMany: false,
    },
    {
      name: "tags",
      type: "relationship",
      relationTo: "tags",
      hasMany: true,
    },
    {
      name: "media",
      type: "upload",
      relationTo: "media",
    },
    {
      name: "refundPolicy",
      type: "select",
      options: ["30-day", "14-day", "7-day", "3-day", "1-day", "no-refunds"],
      defaultValue: "30-day",
    },
    {
      name: "content",
      type: "richText",
      editor: lexicalEditor({
        features: ({ defaultFeatures }) => [
          ...defaultFeatures,
          UploadFeature({
            collections: {
              media: {
                fields: [
                  {
                    name: "name",
                    type: "text",
                  },
                ],
              },
            },
          }),
        ],
      }),
      admin: {
        description:
          "Protected content only visible to customers after purchase. You can add product documentation, downloadable files, starting guides, bonus materials or other thing that you want to share with your customers. Also support markdown formatting",
      },
    },
    {
      name: "isPrivate",
      label: "Private",
      defaultValue: false,
      type: "checkbox",
      admin: {
        description:
          "Check if you want to hide this product from public storefront. This product will still be displayed on your profile page",
      },
    },
    {
      name: "isArchived",
      label: "Archive",
      defaultValue: false,
      type: "checkbox",
      admin: {
        description:
          "Check if you want to hide this product from anyone. You can show it on display again in the future. Your customer who previously purchase this will still have access to it",
      },
    },
  ],
};
