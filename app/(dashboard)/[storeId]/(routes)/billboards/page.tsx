import prismaDb from "@/lib/prismaDb";
import { format } from "date-fns";
import { BillboardClient } from "./components/billboardsClient";
import { BillboardColumn } from "./components/columns";

const BillboardsPage = async ({ params }: { params: { storeId: string } }) => {
  // fetch billboards for this active store
  const billboards = await prismaDb.billboard.findMany({
    where: {
      storeId: params.storeId,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  const formattedBillboards: BillboardColumn[] = billboards.map((item) => ({
    id: item.id,
    label: item.label,
    createdAt: format(item.createdAt, "MMMM do, yyyy"),
  }));

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <BillboardClient billboardsData={formattedBillboards} />
      </div>
    </div>
  );
};

export default BillboardsPage;
