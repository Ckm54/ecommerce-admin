import prismaDb from "@/lib/prismaDb";
import ProductForm from "./components/productForm";
import { ProductColumn } from "../components/columns";
import { priceFormatter } from "@/lib/utils";

const ProductPage = async ({
  params,
}: {
  params: { productId: string; storeId: string };
}) => {
  // try fetching an existing product using id in params
  const product =
    params.productId !== "new"
      ? await prismaDb.product.findUnique({
          where: {
            id: params.productId,
          },
          include: {
            images: true,
            size: true,
            category: true,
            color: true,
          },
        })
      : null;

  // fetch categories
  const categories = await prismaDb.category.findMany({
    where: {
      storeId: params.storeId,
    },
  });

  // fetch sizes
  const sizes = await prismaDb.size.findMany({
    where: {
      storeId: params.storeId,
    },
  });

  // fetch colors
  const colors = await prismaDb.color.findMany({
    where: {
      storeId: params.storeId,
    },
  });

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <ProductForm
          initialData={product}
          sizes={sizes}
          categories={categories}
          colors={colors}
        />
      </div>
    </div>
  );
};

export default ProductPage;
