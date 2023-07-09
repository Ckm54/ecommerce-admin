"use client";

import Image from "next/image";

import { ProductType } from "@/types";

import IconButton from "@/components/ui/IconButton";
import { Expand, ShoppingCart } from "lucide-react";
import Currency from "@/components/ui/Currency";
import { useRouter } from "next/navigation";

interface ProductCardProps {
  product: ProductType;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const router = useRouter();

  const handleViewProductDetails = () => {
    router.push(`/products/${product.id}`);
  };

  return (
    <div className="bg-white group cursor-pointer rounded-xl borer space-y-4">
      {/* images and actions */}
      <div className="aspect-square rounded-t-xl bg-gray-100 relative overflow-hidden">
        <Image
          src={product?.images?.[0].url}
          fill
          alt={`${product.name} image`}
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="aspect-square object-cover"
        />
        <div className="opacity-0 group-hover:opacity-100 transition absolute w-full px-6 bottom-5">
          <div className="flex gap-x-6 justify-center">
            <IconButton
              icon={<Expand size={20} className="text-gray-600" />}
              onClick={handleViewProductDetails}
            />
            <IconButton
              icon={<ShoppingCart size={20} className="text-gray-600" />}
              onClick={() => {}}
            />
          </div>
        </div>
      </div>

      <div className="px-4 pb-4">
        {/* description */}
        <div>
          <h4 className="font-semibold text-lg">{product.name}</h4>
          <h5 className="text-sm text-gray-500">{product.category.name}</h5>
        </div>

        {/* price */}
        <div className="flex items-center justify-between">
          <Currency value={product.price} />
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
