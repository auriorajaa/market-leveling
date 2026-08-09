import { Category } from "@/payload-types";
import Link from "next/link";
import { CategoriesGetManyOutput } from "@/modules/categories/types";

interface Props {
  category: CategoriesGetManyOutput[1];
  isOpen: boolean;
}

export const SubcategoryMenu = ({ category, isOpen }: Props) => {
  if (
    !isOpen ||
    !category.subcategories ||
    category.subcategories.length === 0
  ) {
    return null;
  }

  return (
    <div className="absolute z-100" style={{ top: "100%", left: 0 }}>
      <div className="h-3 w-60" />
      <div className="w-60 text-black rounded-none overflow-hidden border -translate-x-[2px] -translate-y-[2px] bg-white">
        <div>
          {category.subcategories?.map((subcategory: Category) => (
            <Link
              key={subcategory.slug}
              href={`/${category.slug}/${subcategory.slug}`}
              className="w-full text-left p-4 text-black flex justify-between items-center underline font-medium hover:bg-primary hover:text-white"
            >
              {subcategory.name}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};
