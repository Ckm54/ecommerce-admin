"use client";

import { ProductType } from "@/types";
import React from "react";
import Currency from "./ui/Currency";
import Button from "./ui/Button";
import { ShoppingCart } from "lucide-react";
import useCart from "@/hooks/useCart";

interface ProductInfoProps {
  product: ProductType;
}

const ProductInfo: React.FC<ProductInfoProps> = ({ product }) => {
  const addToCart = useCart((state) => state.addItem);

  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-900">{product.name}</h1>
      <div className="mt-3 flex items-end justify-between">
        <p className="text-2xl text-gray-900">
          <Currency value={product.price} />
        </p>
      </div>
      <hr className="my-4" />
      <div className="pb-4">
        <p>{product.description}</p>
      </div>
      <div className="flex flex-col gap-y-6">
        <h3 className="font-semibold text-black">
          Size: <span>{product.size.name}</span>
        </h3>

        <div className="flex items-center gap-x-4">
          <h3 className="font-semibold text-black">Color: </h3>
          <div
            className="h-6 w-6 rounded-full border border-gray-600"
            style={{ backgroundColor: product.color.value }}
          />
        </div>
      </div>
      <div>
        <p>{product.quantity > 0 ? "In stock" : "Out of stock"}</p>
      </div>

      <div className="mt-10 flex items-center gap-x-3">
        <Button
          className="flex items-center gap-x-2"
          onClick={() => addToCart(product)}
          disabled={product.quantity <= 0}
        >
          Add to cart
          <ShoppingCart />
        </Button>
      </div>
    </div>
  );
};

export default ProductInfo;
