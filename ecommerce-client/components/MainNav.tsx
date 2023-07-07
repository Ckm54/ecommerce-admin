"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

interface MainNavProps {
  navLinks: any;
}

const MainNav: React.FC<MainNavProps> = ({ navLinks }) => {
  const pathname = usePathname();

  const routes = navLinks.map((link) => ({
    href: `/category/${link.id}`,
    label: link.name,
    active: pathname === `/category/${link.id}`,
  }));
  return (
    <div className="mx-6 flex items-center space-x-4 lg:space-x-6">
      {routes.map((route) => (
        <Link key={route.href} href={route.href}>
          {route.label}
        </Link>
      ))}
    </div>
  );
};

export default MainNav;
