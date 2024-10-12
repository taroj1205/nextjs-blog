import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";

const postsDirectory = path.join(process.cwd(), "src", "posts");
const searchDataFile = path.join(process.cwd(), "src", "lib", "search-data.json");
const publicDirectory = path.join(process.cwd(), "public", "assets");

if (!fs.existsSync(publicDirectory)) {
  fs.mkdirSync(publicDirectory);
}

function generateSearchData() {
  const slugs = fs.readdirSync(postsDirectory);
  const searchData = slugs.map((slug) => {
    const fullPath = path.join(postsDirectory, slug);
    const fileContents = fs.readFileSync(fullPath, "utf8");
    const { data, content } = matter(fileContents);

    return {
      slug: slug.replace(/\.(mdx|md)/, ""),
      title: data.title,
      excerpt: data.excerpt,
      tags: data.tags,
      categories: data.categories,
      content: content.slice(0, 1000),
    };
  });

  fs.writeFileSync(searchDataFile, JSON.stringify(searchData));
  fs.copyFileSync(searchDataFile, path.join(publicDirectory, "search-data.json"));
  console.log("Search data generated successfully!");
}

generateSearchData();
