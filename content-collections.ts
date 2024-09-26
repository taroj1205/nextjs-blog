import { defineCollection, defineConfig } from "@content-collections/core";
import { compileMarkdown } from "@content-collections/markdown";
import remarkGfm from "remark-gfm";
import remarkHeadingId from "remark-heading-id";
import rehypeSlug from "rehype-slug";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import rehypePrismPlus from "rehype-prism-plus";
import {
	calculateReadingTime,
	generateToc,
	generateTocMarkdown,
} from "@/lib/mdx";

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
		const headings = generateToc(post.content);
		post.content = post.content.replace(
			"<!-- toc -->",
			generateTocMarkdown(headings),
		);

		const html = await compileMarkdown(context, post, {
			rehypePlugins: [rehypeSlug, rehypeAutolinkHeadings, rehypePrismPlus],
			remarkPlugins: [remarkGfm, remarkHeadingId],
		});

		return {
			...post,
			html,
		};
	},
});

export default defineConfig({
	collections: [posts],
});
