import Link from "next/link";
import Image from "next/image";
import CategoryLabel from "./CategoryLabel";

export default function Post({ post, compact }) {
  return (
    <div className="bg-white dark:bg-gray-800 w-full px-10 py-6 rounded-lg shadow-md mt-6">
      {!compact && (
        <Image
          src={post.frontmatter.cover_image}
          alt=""
          width={600}
          height={420}
          className="mb-4 rounded"
        />
      )}
      <div className="flex justify-between items-center">
        <span className="font-light dark:text-white text-gray-600">
          {post.frontmatter.date}
        </span>
        <CategoryLabel>{post.frontmatter.category}</CategoryLabel>
      </div>
      <div className="mt-2">
        <Link
          href={`/blog/${post.slug}`}
          className="text-2xl text-gray-700 font-bold hover:underline dark:text-white"
        >
          {post.frontmatter.title}
        </Link>
        <p className="mt-2 text-gray-600 dark:text-white">{post.frontmatter.excerpt}</p>
      </div>
      {!compact && (
        <div className="flex justify-between items-center mt-6">
          <Link
            href={`/blog/${post.slug}`}
            className="text-gray-900 dark:text-white hover:text-blue-600"
          >
            Read more
          </Link>
          <div className="flex items-center">
            <img
              src={post.frontmatter.author_image}
              alt=""
              className="mx-4 w-10 h-10 object-cover rounded-full hidden sm:block"
            />
            <h3 className="text-gray-700 font-bold dark:text-white">
              {post.frontmatter.author}
            </h3>
          </div>
        </div>
      )}
    </div>
  );
}
