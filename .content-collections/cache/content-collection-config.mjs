// content-collections.ts
import { defineCollection, defineConfig } from "@content-collections/core";
import { compileMarkdown } from "@content-collections/markdown";
import remarkGfm from "remark-gfm";
import remarkHeadingId from "remark-heading-id";
import rehypeSlug from "rehype-slug";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import rehypePrismPlus from "rehype-prism-plus";

// src/lib/mdx.ts
var generateToc = (content) => {
  const headings = content.match(/(#{1,6})\s+(.+)/g) || [];
  return headings.map((heading) => {
    const [, hashes, text] = heading.match(/(#{1,6})\s+(.+)/) || [];
    return {
      id: text.toLowerCase().replace(/[^\w]+/g, "-"),
      text,
      level: hashes.length
    };
  });
};
var generateTocMarkdown = (tocItems) => {
  return tocItems.map((item) => `${"  ".repeat(item.level - 1)}- [${item.text}](#${item.id})`).join("\n");
};

// content-collections.ts
var posts = defineCollection({
  name: "posts",
  directory: "src/posts",
  include: ["**/*.md", "**/*.mdx"],
  schema: (z) => ({
    title: z.string(),
    date: z.string(),
    excerpt: z.string(),
    tags: z.array(z.string()),
    categories: z.array(z.string()),
    coverImage: z.string()
  }),
  transform: async (post, context) => {
    const headings = generateToc(post.content);
    post.content = post.content.replace(
      "<!-- toc -->",
      generateTocMarkdown(headings)
    );
    const html = await compileMarkdown(context, post, {
      rehypePlugins: [rehypeSlug, rehypeAutolinkHeadings, rehypePrismPlus],
      remarkPlugins: [remarkGfm, remarkHeadingId]
    });
    return {
      ...post,
      html
    };
  }
});
var content_collections_default = defineConfig({
  collections: [posts]
});
export {
  content_collections_default as default
};
