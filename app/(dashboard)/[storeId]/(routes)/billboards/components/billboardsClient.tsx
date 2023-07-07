"use client";
import { Plus } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import React from "react";

import { Heading } from "@/components/ui/Heading";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { BillboardColumn, columns } from "./columns";
import { DataTable } from "@/components/ui/data-table";
import ApiList from "@/components/ui/ApiList";

interface BillboardClientProps {
  billboardsData: BillboardColumn[];
}

export const BillboardClient: React.FC<BillboardClientProps> = ({
  billboardsData,
}) => {
  const router = useRouter();
  const params = useParams();
  return (
    <>
      <div className="flex items-center justify-between">
        <Heading
          title={`Billboards (${billboardsData.length})`}
          description="Manage billboards for your store"
        />
        <Button
          onClick={() => router.push(`/${params.storeId}/billboards/new`)}
        >
          <Plus className="mr-2 h-4 w-4" />
          Add New
        </Button>
      </div>
      <Separator />

      {/* DATA TABLE */}
      <DataTable columns={columns} data={billboardsData} searchKey="label" />

      {/* API Routes */}
      <Heading title="API" description="API calls for Billboards" />
      <Separator />
      <ApiList entityName="billboards" entityIdName="billboardId" />
    </>
  );
};
