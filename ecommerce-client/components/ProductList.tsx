import { ProductType } from "@/types";
import NoResults from "@/components/ui/NoResults";
import ProductCard from "@/components/ui/ProductCard";

interface ProductListProps {
  title: string;
  data: ProductType[];
}

const ProductList: React.FC<ProductListProps> = ({ title, data }) => {
  return (
    <div className="space-y-4">
      <h3 className="font-bold text-3xl">{title}</h3>
      {data.length === 0 ? (
        <NoResults />
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {data.map((item) => (
            <ProductCard key={item.id} product={item} />
          ))}
        </div>
      )}
    </div>
  );
};

export default ProductList;
