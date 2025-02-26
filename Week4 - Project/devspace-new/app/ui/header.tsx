import Link from "next/link";
import Image from "next/image";

export default function Header() {
  return (
    <header className="bg-sky-600 dark:bg-gray-900 text-gray-100 shadow w-full">
      <div className="container mx-auto flex flex-wrap p-5 flex-col md:flex-row items-center">
        <Link
          href="/"
          className="flex md:w-1/5 title-font font-medium items-center md:justify-start mb-4 md:mb-0"
        >
          <Image src="/logo.png" width={40} height={40} alt="logo" />
          <span className="ml-3 text-xl">DevSpace</span>
        </Link>
        <nav className="flex flex-wrap md:w-4/5 items-center justify-end text-base md:ml-auto">
          <Link
            href="/about"
            className="mx-5 cursor-pointer uppercase hover:text-indigo-300"
          >
            About
          </Link>
          {/* {session && session.user ? (
            <div className="flex items-center gap-4">
              <Link href="/user-info" className="mx-5 hover:text-indigo-300">
                Welcome, {session.user.username || "User"}
              </Link>
              <button 
                onClick={() => signOut()} 
                className="bg-red-500 text-white uppercase px-3 py-1 rounded hover:bg-red-600"
              >
                Sign Out
              </button>
            </div>
          ) : (
            <Link href="/signin" className="mx-5 uppercase hover:text-indigo-300">
              Sign In
            </Link>
          )} */}
        </nav>
      </div>
    </header>
  );
}
