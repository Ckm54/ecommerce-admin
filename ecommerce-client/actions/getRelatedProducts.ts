import queryString from "query-string";

import { ProductType } from "@/types";

interface Query {
  categoryId?: string;
}

const URL = `${process.env.NEXT_PUBLIC_API_URL}/products`;

const getRelatedProducts = async ({
  id,
  query,
}: {
  id: string;
  query: Query;
}): Promise<ProductType[]> => {
  const params = {
    categoryId: query.categoryId,
  };
  const url = `${URL}/${id}/related?${queryString.stringify(params)}`;

  const response = await fetch(url);

  return response.json();
};

export default getRelatedProducts;
