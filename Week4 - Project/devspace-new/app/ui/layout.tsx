import Head from "next/head";
import Header from "@/app/ui/header";

export default function Home({
  title,
  keywords,
  description,
  children,
}: {
  title: "Welcome to DevSpace";
  keywords: "development, coding, programming";
  description: "The best info and news in development";
  children: React.ReactNode;
}) {
  return (
    <div className="bg-white dark:bg-gray-800">
      <Head>
        <title>{title}</title>
        <link rel="shortcut icon" href="/favicon.ico" type="image/x-icon" />
        <meta name="keywords" content={keywords} />
        <meta name="description" content={description} />
      </Head>
      <Header />
      <main className="container mx-auto my-7">{children}</main>
    </div>
  );
}
