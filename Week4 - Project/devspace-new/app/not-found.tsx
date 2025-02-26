import Header from "@/app/ui/header";
import Image from "next/image";
import Link from "next/link";

export default function NotFound() {
  return (
    <div>
      <Header />
      <div className="flex flex-col items-center mt-20">
        <Image
          src="/logo.png"
          alt="Logo"
          width={70}
          height={70}
          className="bg-transparent invert rounded-2xl"
        />
        <h1 className="text-6xl my-5">Whoops!</h1>
        <h2 className="text-4xl text-gray-400 mb-5">
          This page does not exist
        </h2>
        <Link href="/" className="text-lg text-blue-500 hover:text-blue-700">
          Go back home
        </Link>
      </div>
    </div>
  );
}
