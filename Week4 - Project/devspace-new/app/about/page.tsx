import Header from "@/app/ui/header";
import Link from "next/link";

export default function About() {
  return (
    <div>
      <Header />
      <div className="container mx-auto my-7">
        <h1 className="text-5xl border-b-4 pb-5 font-bold">About</h1>
        <div className="bg-white dark:bg-gray-800  shadow-md rounded-lg px-10 py-6 mt-6">
          <h3 className="text-2xl mb-5">DevSpace Blog</h3>

          <p className="mb-3">
            This is an updated version of the web blog built with Next.js and
            Markdown.
          </p>
          <Link 
            href="https://github.com/solygambas/next-projects/tree/main/06-devspace" 
            className="text-blue-500 text-decoration-none hover:underline"
          >
            Link to original source code
          </Link>
          <p>
            <span className="font-bold">Version 1.1.0</span>
          </p>
        </div>
      </div>
    </div>
  );
}
