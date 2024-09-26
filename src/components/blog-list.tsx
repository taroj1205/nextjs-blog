"use client";

import Link from "next/link";
import Image from "next/image";
import {
	Card,
	CardContent,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

type Post = {
	slug: string;
	title: string;
	date: string;
	excerpt: string;
	tags: string[];
	coverImage: string;
	readingTime: number;
};

export function BlogList({ posts }: { posts: Post[] }) {
	return (
		<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
			{posts.map((post) => (
				<Card key={post.slug} className="flex flex-col">
					<CardHeader className="p-0">
						<Image
							src={post.coverImage || "/placeholder.svg"}
							alt={post.title}
							width={600}
							height={400}
							className="object-cover w-full h-48 rounded-t-lg"
						/>
					</CardHeader>
					<CardContent className="flex-grow p-4">
						<CardTitle className="mb-2">
							<Link href={`/blog/${post.slug}`} className="hover:underline">
								{post.title}
							</Link>
						</CardTitle>
						<p className="text-muted-foreground mb-4">{post.excerpt}</p>
						<div className="flex flex-wrap gap-2">
							{post.tags.map((tag) => (
								<Link
									key={tag}
									href={`/blog?tag=${encodeURIComponent(tag)}`}
									passHref
								>
									<Badge variant="secondary" className="hover:underline">
										{tag}
									</Badge>
								</Link>
							))}
						</div>
					</CardContent>
					<CardFooter className="p-4 pt-0">
						<div className="flex justify-between items-center w-full text-sm text-muted-foreground">
							<time dateTime={post.date}>
								{new Date(post.date).toLocaleDateString()}
							</time>
							<span>{post.readingTime} min read</span>
						</div>
					</CardFooter>
				</Card>
			))}
		</div>
	);
}
