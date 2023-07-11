"use client";

import CartItem from "@/components/Cart/CartItem";
import CartSummary from "@/components/Cart/CartSummary";
import Container from "@/components/ui/Container";
import useCart from "@/hooks/useCart";
import React from "react";

const CartPage = () => {
  const [isMounted, setIsMounted] = React.useState(false);
  const cart = useCart();

  React.useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  return (
    <div className="bg-white">
      <Container>
        <div className="px-4 py-16 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold text-black">Shopping Cart</h1>

          {cart.items.length === 0 ? (
            <div className="my-24 flex flex-1 items-center justify-center">
              <p className="text-neutral-500">No items in cart</p>
            </div>
          ) : (
            <div className="mt-12 lg:grid lg:grid-cols-12 lg:items-start gap-x-12">
              <div className="lg:col-span-7">
                <ul>
                  {cart.items.map((product) => (
                    <CartItem key={product.id} data={product} />
                  ))}
                </ul>
              </div>

              <CartSummary />
            </div>
          )}
        </div>
      </Container>
    </div>
  );
};

export default CartPage;
