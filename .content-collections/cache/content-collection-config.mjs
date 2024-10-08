// content-collections.ts
import { defineCollection, defineConfig } from "@content-collections/core";
import { compileMDX } from "@content-collections/mdx";
import remarkGfm from "remark-gfm";
import remarkHeadingId from "remark-heading-id";
import rehypeSlug from "rehype-slug";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import rehypePrismPlus from "rehype-prism-plus";
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
    const mdx = await compileMDX(context, post, {
      rehypePlugins: [rehypeSlug, rehypeAutolinkHeadings, rehypePrismPlus],
      remarkPlugins: [remarkGfm, remarkHeadingId]
    });
    return {
      ...post,
      mdx
    };
  }
});
var content_collections_default = defineConfig({
  collections: [posts]
});
export {
  content_collections_default as default
};
