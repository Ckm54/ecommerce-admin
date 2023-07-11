import { ProductType } from "@/types";
import { toast } from "react-hot-toast";
import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

interface CartStore {
  items: ProductType[];
  addItem: (item: ProductType) => void;
  removeItem: (itemId: string) => void;
  clearCart: () => void;
}

const useCart = create(
  persist<CartStore>(
    (set, get) => ({
      items: [],
      addItem: (data) => {
        const currentCartItems = get().items;
        const existingItem = currentCartItems.find(
          (item) => item.id === data.id
        );

        if (existingItem) {
          return toast("Item already in cart");
        }

        set({ items: [...get().items, data] });
        toast.success("Item added to cart");
      },
      removeItem: (id) => {
        set({ items: [...get().items.filter((item) => item.id !== id)] });
        toast.success("Item removed from cart");
      },
      clearCart: () => set({ items: [] }),
    }),
    {
      name: "cartStorage",
      storage: createJSONStorage(() => localStorage),
    }
  )
);

export default useCart;
