import { defineCollection, defineConfig } from "@content-collections/core";
import {compileMDX} from "@content-collections/mdx";
import remarkGfm from "remark-gfm";
import remarkHeadingId from "remark-heading-id";
import rehypeSlug from "rehype-slug";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import rehypePrismPlus from "rehype-prism-plus";
// import toc from "@/lib/toc-data.json"
import { generateToc } from "@/lib/mdx";

const posts = defineCollection({
	name: "posts",
	directory: "src/posts",
	include: ["**/*.md", "**/*.mdx"],
	schema: (z) => ({
		title: z.string(),
		date: z.string(),
		excerpt: z.string(),
		tags: z.array(z.string()),
		categories: z.array(z.string()),
		coverImage: z.string(),
	}),
	transform: async (post, context) => {
		const mdx = await compileMDX(context, post, {
			rehypePlugins: [rehypeSlug, rehypeAutolinkHeadings, rehypePrismPlus],
			remarkPlugins: [remarkGfm, remarkHeadingId],
		})

		return {
			...post,
			mdx,
		};
	}
});

export default defineConfig({
	collections: [posts],
});
