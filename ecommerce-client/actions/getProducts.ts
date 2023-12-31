import queryString from "query-string";

import { ProductType } from "@/types";

interface Query {
  categoryId?: string;
  colorId?: string;
  sizeId?: string;
  isFeatured?: boolean;
}

const URL = `${process.env.NEXT_PUBLIC_API_URL}/products`;

const getProducts = async (query: Query): Promise<ProductType[]> => {
  const params = {
    colorId: query.colorId,
    sizeId: query.sizeId,
    categoryId: query.categoryId,
    isFeatured: query.isFeatured,
  };
  const url = `${URL}?${queryString.stringify(params)}`;

  const response = await fetch(url);

  return response.json();
};

export default getProducts;
