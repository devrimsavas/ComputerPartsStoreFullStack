import Link from "next/link";
import MainNav from "./MainNav";

const PageHeader = () => {
  return (
    <header className="w-full border-b bg-white shadow-sm">
      <div className="container mx-auto flex justify-between items-center px-6 py-4">
        <Link href="/" className="text-2xl font-bold text-blue-700">
          TechParts Direct
        </Link>
        <MainNav />
      </div>
    </header>
  );
};

export default PageHeader;
