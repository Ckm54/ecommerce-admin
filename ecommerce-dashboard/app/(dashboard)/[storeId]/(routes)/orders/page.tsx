import prismaDb from "@/lib/prismaDb";
import { priceFormatter } from "@/lib/utils";
import { format } from "date-fns";
import { OrderClient } from "./components/ordersClient";
import { OrderColumn } from "./components/columns";

const OrdersPage = async ({ params }: { params: { storeId: string } }) => {
  // fetch orders for this active store
  const orders = await prismaDb.order.findMany({
    where: {
      storeId: params.storeId,
    },
    include: {
      orderItems: {
        include: {
          product: true,
        },
      },
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  const formattedOrders: OrderColumn[] = orders.map((item) => ({
    id: item.id,
    phone: item.phone,
    address: item.address,
    products: item.orderItems
      .map((orderItem) => orderItem.product.name)
      .join(", "),
    totalPrice: priceFormatter.format(
      item.orderItems.reduce(
        (total, item) => total + Number(item.product.price),
        0
      )
    ),
    createdAt: format(item.createdAt, "MMMM do, yyyy"),
    isPaid: item.isPaid,
  }));

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <OrderClient ordersData={formattedOrders} />
      </div>
    </div>
  );
};

export default OrdersPage;
