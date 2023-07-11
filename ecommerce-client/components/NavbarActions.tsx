"use client";

import React from "react";

import Button from "@/components/ui/Button";
import { ShoppingBag } from "lucide-react";
import useCart from "@/hooks/useCart";

const NavbarActions = () => {
  const [isMounted, setIsMounted] = React.useState(false);
  const cart = useCart();

  React.useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  return (
    <div className="ml-auto flex items-center gap-x-4">
      <Button className="flex items-center rounded-full bg-black px-4 py-2">
        <ShoppingBag size={20} color="white" />
        {/* amount of items in cart */}
        <span className="ml-2 font-medium text-white">{cart.items.length}</span>
      </Button>
    </div>
  );
};

export default NavbarActions;
