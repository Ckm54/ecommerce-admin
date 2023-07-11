"use client";

import React from "react";
import { useSearchParams } from "next/navigation";
import Button from "@/components/ui/Button";
import Currency from "@/components/ui/Currency";
import useCart from "@/hooks/useCart";
import axios from "axios";
import { toast } from "react-hot-toast";

const CartSummary = () => {
  const searchParams = useSearchParams();
  const cartItems = useCart((state) => state.items);
  const clearCartItems = useCart((state) => state.clearCart);

  React.useEffect(() => {
    if (searchParams.get("success")) {
      toast.success("Payment completed");
      clearCartItems();
    }

    if (searchParams.get("canceled")) {
      toast.error("Something went wrong");
    }
  }, [clearCartItems, searchParams]);

  const totalPrice = cartItems.reduce(
    (total, item) => total + Number(item.price),
    0
  );

  const onCheckout = async () => {
    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_API_URL}/checkout`,
      {
        productIds: cartItems.map((item) => item.id),
      }
    );

    window.location = response.data.url;
  };
  return (
    <div className="mt-16 rounded-lg bg-gray-50 px-4 py-6 sm:p-6 lg:col-span-5 lg:mt-0 lg:p-8">
      <h2 className="text-lg font-medium text-gray-900">Order Summary</h2>

      <div className="mt-6 space-y-4">
        <div className="flex items-center justify-between border-t border-gray-200 pt-4">
          <h3 className="text-base font-medium text-gray-900">Order Total</h3>

          <Currency value={totalPrice} />
        </div>
      </div>

      <Button className="w-full mt-6" onClick={onCheckout}>
        Checkout
      </Button>
    </div>
  );
};

export default CartSummary;
