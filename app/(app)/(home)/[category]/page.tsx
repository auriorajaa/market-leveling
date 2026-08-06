interface Props {
  params: Promise<{
    category: string;
  }>;
}

const Page = async ({ params }: Props) => {
  const { category } = await params;

  return (
    <div>
      <div>Category for: {category}</div>
    </div>
  );
};

export default Page;
