"use client";
import { useParams, useRouter } from "next/navigation";
import React from "react";

import { Heading } from "@/components/ui/Heading";
import { DataTable } from "@/components/ui/data-table";
import { Separator } from "@/components/ui/separator";
import { OrderColumn, columns } from "./columns";

interface OrderClientProps {
  ordersData: OrderColumn[];
}

export const OrderClient: React.FC<OrderClientProps> = ({ ordersData }) => {
  const router = useRouter();
  const params = useParams();
  return (
    <>
      <Heading
        title={`Orders (${ordersData.length})`}
        description="Manage orders for your store"
      />

      <Separator />

      {/* DATA TABLE */}
      <DataTable columns={columns} data={ordersData} searchKey="label" />
    </>
  );
};
