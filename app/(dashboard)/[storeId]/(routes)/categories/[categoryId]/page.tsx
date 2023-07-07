import prismaDb from "@/lib/prismaDb";
import CategoryForm from "./components/categoryForm";

const CategoryPage = async ({
  params,
}: {
  params: { categoryId: string; storeId: string };
}) => {
  // try fetching an existing category using id in params
  const category = await prismaDb.category.findUnique({
    where: {
      id: params.categoryId,
    },
  });

  // fetch billboards
  const billboards = await prismaDb.billboard.findMany({
    where: {
      storeId: params.storeId,
    },
  });

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <CategoryForm initialData={category} billboards={billboards} />
      </div>
    </div>
  );
};

export default CategoryPage;
