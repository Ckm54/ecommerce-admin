import prismaDb from "@/lib/prismaDb";
import BillboardForm from "./components/billboardForm";

const BillboardPage = async ({
  params,
}: {
  params: { billboardId: string };
}) => {
  // try fetching an existing billboard using id in params
  const billboard = await prismaDb.billboard.findUnique({
    where: {
      id: params.billboardId,
    },
  });

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <BillboardForm initialData={billboard} />
      </div>
    </div>
  );
};

export default BillboardPage;
