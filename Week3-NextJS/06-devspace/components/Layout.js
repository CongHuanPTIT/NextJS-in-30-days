import Head from "next/head";
import Header from "./Header";
import Search from "./Search";

export default function Layout({ title, keywords, description, children }) {
  return (
    <div className="bg-white dark:bg-gray-800">
      <Head>
        <title>{title}</title>
        <link rel="shortcut icon" href="/favicon.ico" type="image/x-icon" />
        <meta name="keywords" content={keywords} />
        <meta name="description" content={description} />
      </Head>
      <Header />
      <Search />
      <main className="container mx-auto my-7">{children}</main>
    </div>
  );
}

Layout.defaultProps = {
  title: "Welcome to DevSpace",
  keywords: "development, coding, programming",
  description: "The best info and news in development",
};
