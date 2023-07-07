import React from "react";
import Container from "@/components/ui/Container";
import Link from "next/link";
import MainNav from "@/components/MainNav";
import getCategories from "@/actions/getCategories";

// Do not cache page contents
export const revalidate = 0;

const Navbar = async () => {
  const categories = await getCategories();

  return (
    <nav className="border-b">
      <Container>
        <div className="relative px-4 sm:px-6 lg:px-8 flex h-16 items-center">
          <Link href={"/"} className="ml-4 lg:ml-0 flex gap-x-2">
            <p className="font-bold text-xl">STORE</p>
          </Link>

          <MainNav navLinks={categories} />
        </div>
      </Container>
    </nav>
  );
};

export default Navbar;
