import fs from "fs";
import path from "path";
import matter from "gray-matter";

export default function handler(req, res) {
  if (req.method !== "GET") {
    return res.status(405).json({ message: "Method Not Allowed" });
  }

  let posts;
  if (process.env.NODE_ENV === "production") {
    posts = require("../../cache/data").posts;
  } else {
    const files = fs.readdirSync(path.join("posts"));
    posts = files.map((filename) => {
      const slug = filename.replace(".md", "");
      const markdownWithMeta = fs.readFileSync(
        path.join("posts", filename),
        "utf-8"
      );
      const { data: frontmatter } = matter(markdownWithMeta);
      return {
        frontmatter,
        slug: `/blog/${slug}`,
      };
    });
  }

  const query = req.query.q?.toLowerCase() || "";
  const results = posts.filter(({ frontmatter: { title, excerpt, category } }) =>
    [title, excerpt, category].some((field) => field.toLowerCase().includes(query))
  );

  return res.status(200).json({ results });
}
