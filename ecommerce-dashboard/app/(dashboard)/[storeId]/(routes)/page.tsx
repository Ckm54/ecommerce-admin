import { getGraphRevenue } from "@/actions/getGraphRevenue";
import { getSalesCount } from "@/actions/getSalesCount";
import { getStockCount } from "@/actions/getStockCount";
import { getTotalRevenue } from "@/actions/getTotalRevenue";
import Overview from "@/components/Overview";
import DashboardCard from "@/components/ui/DashboardCard";
import { Heading } from "@/components/ui/Heading";
import { CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { priceFormatter } from "@/lib/utils";
import { CreditCard, DollarSign, Package } from "lucide-react";

interface DashboardPageProps {
  params: { storeId: string };
}

const DashboardPage: React.FC<DashboardPageProps> = async ({ params }) => {
  // const store = await prismaDb.store.findFirst({
  //   where: {
  //     id: params.storeId,
  //   },
  // });

  const totalRevenue = await getTotalRevenue(params.storeId);

  const salesCount = await getSalesCount(params.storeId);

  const stockCount = await getStockCount(params.storeId);

  const graphRevenue = await getGraphRevenue(params.storeId);

  return (
    <div className="flex-col">
      <div className="flex-1 sace-y-4 p-8 pt-6">
        <Heading title="Dashboard" description="Your store overview" />
        <Separator />

        <div className="gris gap-4 grid grid-cols-3">
          <DashboardCard
            title="Total Revenue"
            icon={<DollarSign className="h-4 w-4 text-muted-foreground" />}
            content={priceFormatter.format(totalRevenue)}
          />

          <DashboardCard
            title="Sales"
            icon={<CreditCard className="h-4 w-4 text-muted-foreground" />}
            content={`+ ${salesCount}`}
          />

          <DashboardCard
            title="Products In Stock"
            icon={<Package className="h-4 w-4 text-muted-foreground" />}
            content={`${stockCount}`}
          />
        </div>

        <div className="col-span-4">
          <CardHeader>
            <CardTitle>Overview</CardTitle>
          </CardHeader>
          <CardContent className="pl-2">
            <Overview data={graphRevenue} />
          </CardContent>
        </div>
      </div>
      {/* <p>Active store {store?.name}</p> */}
    </div>
  );
};

export default DashboardPage;
