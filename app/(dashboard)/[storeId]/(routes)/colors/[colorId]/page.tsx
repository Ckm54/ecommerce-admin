import prismaDb from "@/lib/prismaDb";
import ColorForm from "./components/colorForm";

const ColorPage = async ({ params }: { params: { colorId: string } }) => {
  // try fetching an existing color using id in params
  const color = await prismaDb.color.findUnique({
    where: {
      id: params.colorId,
    },
  });

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <ColorForm initialData={color} />
      </div>
    </div>
  );
};

export default ColorPage;
