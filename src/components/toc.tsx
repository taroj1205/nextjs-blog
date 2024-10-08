"use client";
import { usePathname } from "next/navigation";
import { allPosts } from "content-collections";
import { remark } from "remark";
import html from "remark-html";
import { generateToc, generateTocMarkdown } from "@/lib/mdx";

export const Toc = () => {
	const pathname = usePathname();
	const path = pathname.split("/").slice(-1)[0];
	const content = allPosts.find((post) => post._meta.path === path)?.content;
	if (!content) {
		return null;
	}
	const tocData = generateToc(content);
	if (!tocData) {
		return null;
	}
	const tocMD = generateTocMarkdown(tocData);

	const tocHTML = remark().use(html).processSync(tocMD).toString();

	// biome-ignore lint/security/noDangerouslySetInnerHtml: <explanation>
	return <div id="toc" dangerouslySetInnerHTML={{ __html: tocHTML }} />;
};
