import getProduct from "@/actions/getProduct";
import getRelatedProducts from "@/actions/getRelatedProducts";
import Gallery from "@/components/Gallery";
import ProductInfo from "@/components/ProductInfo";
import ProductList from "@/components/ProductList";
import Container from "@/components/ui/Container";

export const revalidate = 0;

interface ProductPageProps {
  params: {
    productId: string;
  };
}

const ProductPage: React.FC<ProductPageProps> = async ({ params }) => {
  // fetch product info
  const product = await getProduct(params.productId);

  // fetch suggested products -- by category
  const suggestedProducts = await getRelatedProducts({
    id: product.id,
    query: { categoryId: product?.category?.id },
  });

  return (
    <div className="bg-white">
      <Container>
        <div className="px-4 py-10 sm:px-6 sm:py-8">
          <div className="lg:grid lg:grid-cols-2 lg:items-start lg:gap-x-8">
            {/* gallery */}
            <Gallery images={product.images} />
            <div className="mt-10 px-4 sm:mt-16 sm:px-0 lg:mt-0">
              <ProductInfo product={product} />
            </div>
          </div>
        </div>
        <hr my-10 />

        {/* Related / suggested products */}
        <ProductList title="Related Products" data={suggestedProducts} />
      </Container>
    </div>
  );
};

export default ProductPage;
