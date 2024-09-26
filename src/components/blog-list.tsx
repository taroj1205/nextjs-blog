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
import { ArrowRight, Calendar, Clock } from "lucide-react";
import { calculateReadingTime } from "@/lib/mdx";
import { Button } from "./ui/button";
import type { Post } from "content-collections";

export function BlogList({ posts }: { posts: Post[] }) {
	return (
		<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
			{posts.map((post) => (
				<Card key={post._meta.path} className="flex flex-col">
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
							<Link
								href={`/blog/${post._meta.path}`}
								className="hover:underline"
							>
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
					<CardFooter className="p-6 pt-0 flex justify-between items-center flex-wrap gap-4">
						<div className="flex items-center text-sm text-muted-foreground gap-4">
							<div className="flex items-center justify-center">
								<Calendar className="mr-1 h-4 w-4" />
								<time dateTime={post.date}>
									{new Date(post.date).toLocaleDateString()}
								</time>
							</div>
							<span className="mx-2 hidden lg:flex">•</span>
							<div className="flex items-center justify-center">
								<Clock className="mr-1 h-4 w-4" />
								<span>{calculateReadingTime(post.content)} min read</span>
							</div>
						</div>
						<Link href={`/blog/${post._meta.path}`} passHref>
							<Button variant="ghost" className="p-2">
								Read more
								<ArrowRight className="ml-2 h-4 w-4" />
							</Button>
						</Link>
					</CardFooter>
				</Card>
			))}
		</div>
	);
}
