import prismaDb from "@/lib/prismaDb";

interface DashboardPageProps {
  params: { storeId: string };
}

const DashboardPage: React.FC<DashboardPageProps> = async ({ params }) => {
  const store = await prismaDb.store.findFirst({
    where: {
      id: params.storeId,
    },
  });
  return (
    <div>
      This is the DashboardPage
      <p>Active store {store?.name}</p>
    </div>
  );
};

export default DashboardPage;
