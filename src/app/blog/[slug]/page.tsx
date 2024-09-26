import { notFound } from "next/navigation";
import { calculateReadingTime } from "@/lib/mdx";
import { allPosts } from "content-collections";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";

export const generateStaticParams = async () => {
	const posts = allPosts.map((post) => post._meta.path);

	return posts;
};

export const generateMetadata = ({ params }: { params: { slug: string } }) => {
	const post = allPosts.find((post) => post._meta.path === params.slug);

	if (!post) {
		return null;
	}

	return {
		title: post.title,
		description: post.excerpt,
	};
};

export default async function BlogPost({
	params,
}: {
	params: { slug: string };
}) {
	const post = allPosts.find((post) => post._meta.path === params.slug);

	if (!post) {
		notFound();
	}

	return (
		<div className="container mx-auto px-4 py-8">
			<article className="prose dark:prose-invert lg:prose-xl mx-auto">
				<h1>{post.title}</h1>
				<div className="flex items-center space-x-2 text-sm text-muted-foreground">
					<time dateTime={post.date}>
						{new Date(post.date).toLocaleDateString()}
					</time>
					<span>•</span>
					<span>{calculateReadingTime(post.content)} min read</span>
				</div>
				<div className="flex flex-wrap gap-2 my-4">
					{post.tags.map((tag: string) => (
						<Link
							key={tag}
							href={`/blog?q=${encodeURIComponent(tag)}`}
							passHref
						>
							<Badge
								variant="secondary"
								className="hover:underline text-sm rounded-md"
							>
								{tag}
							</Badge>
						</Link>
					))}
				</div>
				<div
					// biome-ignore lint/security/noDangerouslySetInnerHtml: <explanation>
					dangerouslySetInnerHTML={{ __html: post.html }}
					className="prose-h1:scroll-mt-20 prose-h2:scroll-mt-20 prose-h3:scroll-mt-20 prose-h4:scroll-mt-20 prose-h5:scroll-mt-20 prose-h6:scroll-mt-20"
				/>
			</article>
		</div>
	);
}
