import Link from "next/link";
import { BlogList } from "@/components/blog-list";
import { Button } from "@/components/ui/button";
import { allPosts } from "content-collections";
import searchJSON from "@/lib/search-data.json";

export const metadata = {
	title: "Blog",
	description: "Read about my university life and coding journey",
};

export default async function BlogPage({
	searchParams,
}: {
	searchParams: { [key: string]: string | string[] | undefined };
}) {
	const page =
		typeof searchParams.page === "string" ? Number(searchParams.page) : 1;
	const searchQuery = searchParams.q;
	const tag = searchParams.tag;
	const limit = 10;

	const posts = allPosts
		.filter(
			(post) =>
				!searchQuery ||
				(typeof searchQuery === "string" &&
					JSON.stringify(
						searchJSON.find((item) => item.slug === post._meta.path),
					)
						.toLowerCase()
						.includes(searchQuery.toLowerCase())),
		)
		.filter(
			(post) =>
				!tag ||
				(typeof tag === "string" &&
					post.tags.find((postTag) => postTag === tag)),
		)
		.slice(page - 1, page * limit);

	const totalPages = Math.ceil(posts.length / limit);
	const paginatedPosts = posts.slice((page - 1) * limit, page * limit);

	return (
		<div className="container mx-auto px-4 py-8">
			<h1 className="text-4xl font-bold mb-8">Blog Posts</h1>
			<BlogList posts={paginatedPosts} />
			<div className="mt-8 flex justify-between">
				{page > 1 && (
					<Link href={`/blog?page=${page - 1}`} passHref>
						<Button variant="outline">Previous Page</Button>
					</Link>
				)}
				{page < totalPages && (
					<Link href={`/blog?page=${page + 1}`} passHref>
						<Button variant="outline">Next Page</Button>
					</Link>
				)}
			</div>
		</div>
	);
}
