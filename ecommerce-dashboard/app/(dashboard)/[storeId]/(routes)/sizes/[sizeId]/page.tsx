import prismaDb from "@/lib/prismaDb";
import SizeForm from "./components/sizeForm";

const SizePage = async ({ params }: { params: { sizeId: string } }) => {
  // try fetching an existing size using id in params
  const size = await prismaDb.size.findUnique({
    where: {
      id: params.sizeId,
    },
  });

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <SizeForm initialData={size} />
      </div>
    </div>
  );
};

export default SizePage;
