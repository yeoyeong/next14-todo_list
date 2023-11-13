import Link from "next/link";
import NavLinks from "./nav-links";
import { signOut } from "@/auth";

const SideNav = () => {
  return (
    <div className="flex h-full flex-col px-3 py-4 md:px-2">
      <Link
        className="py-10 mb-2 flex items-center justify-center bg-blue-600 rounded-md	"
        href="/"
      >
        <div className="font-bold text-white text-2xl">YEO</div>
      </Link>
      {/* <div className="flex grow flex-row justify-between space-x-2 md:flex-col md:space-x-0 md:space-y-2"> */}
      <div className="flex grow flex-col gap-2">
        <NavLinks />
        {/* <div className="hidden h-auto w-full grow rounded-md bg-gray-50 md:block"></div> */}
        <form
          action={async () => {
            "use server";
            await signOut();
          }}
        >
          <button className="flex h-[48px] w-[48px] items-center justify-center p-10 bg-gray-50 rounded-xl hover:bg-sky-100 hover:text-blue-600">
            {/* <PowerIcon className="w-6" /> */}
            <div className="">Sign Out</div>
          </button>
        </form>
      </div>
    </div>
  );
};

export default SideNav;
