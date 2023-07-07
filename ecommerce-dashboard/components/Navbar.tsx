import { UserButton, auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import prismaDb from "@/lib/prismaDb";

import { MainNav } from "@/components/MainNav";
import StoreSwitcher from "@/components/StoreSwitcher";

const Navbar = async () => {
  const { userId } = auth();

  if (!userId) {
    redirect(`/sign-in`);
  }

  const stores = await prismaDb.store.findMany({
    where: {
      userId,
    },
  });

  return (
    <nav className="border-b">
      <div className="flex h-16 items-center px-4">
        <StoreSwitcher items={stores} />
        <MainNav className="mx-6" />
        <div className="ml-auto flex items-center space-x-4">
          <UserButton afterSignOutUrl="/" />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
