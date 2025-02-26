import Link from "next/link";
import Header from "@/app/ui/header";

export default function Home() {
  return (
    <div>
      <Header />
      <h1 className="text-5xl border-b-4 p-5 font-bold">Latest Posts</h1>
      <div className="flex justify-center">
        <Link
          href="/blog"
          className="dark:text-white dark:hover:bg-sky-700 block text-center border border-gray-500 text-gray-800 rounded-md py-4 my-5 transition duration-500 ease select-none hover:text-white hover:bg-gray-900 focus:outline-none focus:shadow-outline w-64"
        >
          All Posts
        </Link>
      </div>
    </div>
  );
}
