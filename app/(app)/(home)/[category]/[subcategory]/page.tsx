interface Props {
  params: Promise<{
    category: string;
    subcategory: string;
  }>;
}

const Page = async ({ params }: Props) => {
  const { category, subcategory } = await params;

  return (
    <div>
      <div>Category for: {category}</div>
      <div>Subcategory for: {subcategory}</div>
    </div>
  );
};

export default Page;
