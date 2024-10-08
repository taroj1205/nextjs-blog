import { Suspense } from "react";
import Link from "next/link";
import Image from "next/image";
import { SearchBar } from "@/components/search-bar";
import { Button } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, BookOpen, Calendar, Clock, Tag } from "lucide-react";
import { allPosts } from "content-collections";
import { calculateReadingTime } from "@/lib/mdx";

export default async function Home() {
	return (
		<div className="container mx-auto px-4 py-8 space-y-12">
			<section className="text-center space-y-4">
				<h1 className="text-4xl font-extrabold tracking-tight lg:text-5xl">
					Welcome to My University Blog
				</h1>
				<p className="text-xl text-muted-foreground max-w-[700px] mx-auto">
					Exploring the intersection of university life and coding adventures.
					Join me on this exciting journey!
				</p>
				<Suspense fallback={<div>Loading search...</div>}>
					<SearchBar />
				</Suspense>
			</section>

			<section>
				<h2 className="text-3xl font-bold mb-6">Featured Posts</h2>
				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
					{allPosts.slice(0, 3).map((post) => (
						<Card
							key={post._meta.filePath}
							className="flex flex-col overflow-hidden transition-all hover:shadow-lg"
						>
							<CardHeader className="p-0">
								<Image
									src={post.coverImage || "/placeholder.svg"}
									alt={post.title}
									width={600}
									height={400}
									className="object-cover w-full h-48"
								/>
							</CardHeader>
							<CardContent className="flex-grow p-6">
								<Link
									href={`/blog/${post._meta.path}`}
									passHref
									className="hover:underline"
								>
									<CardTitle>{post.title}</CardTitle>
								</Link>
								<p className="text-muted-foreground mb-4 line-clamp-3">
									{post.excerpt}
								</p>
								<div className="flex flex-wrap gap-2">
									{post.tags.slice(0, 3).map((tag: string) => (
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
			</section>

			<section className="space-y-6">
				<h2 className="text-3xl font-bold">Recent Posts</h2>
				<div className="space-y-4">
					{allPosts.slice(0, 5).map((post) => (
						<Link
							key={post._meta.filePath}
							href={`/blog/${post._meta.path}`}
							passHref
						>
							<div className="flex items-center space-x-4 p-4 rounded-lg transition-all hover:bg-muted">
								<div className="flex-shrink-0">
									<Image
										src={post.coverImage || "/placeholder.svg"}
										alt={post.title}
										width={100}
										height={100}
										className="object-cover rounded-md"
									/>
								</div>
								<div className="flex-grow">
									<h3 className="text-xl font-semibold mb-1">{post.title}</h3>
									<p className="text-muted-foreground line-clamp-2">
										{post.excerpt}
									</p>
									<div className="flex items-center mt-2 text-sm text-muted-foreground">
										<Calendar className="mr-1 h-4 w-4" />
										<time dateTime={post.date}>
											{new Date(post.date).toLocaleDateString()}
										</time>
										<span className="mx-2">•</span>
										<Clock className="mr-1 h-4 w-4" />
										<span>{calculateReadingTime(post.content)} min read</span>
										<span className="mx-2">•</span>
										<Tag className="mr-1 h-4 w-4" />
										<span>{post.tags.slice(0, 2).join(", ")}</span>
									</div>
								</div>
							</div>
						</Link>
					))}
				</div>
				<div className="text-center">
					<Link href="/blog" passHref>
						<Button>
							View all posts
							<ArrowRight className="ml-2 h-4 w-4" />
						</Button>
					</Link>
				</div>
			</section>

			<section className="bg-muted p-8 rounded-lg">
				<h2 className="text-3xl font-bold mb-4">About This Blog</h2>
				<p className="text-lg mb-6">
					This blog is a chronicle of my university experiences and coding
					journey. Here, I share insights, challenges, and discoveries from both
					academic and programming worlds.
				</p>
				<div className="flex justify-center space-x-4">
					<Link href="https://taroj.pages.dev/" passHref>
						<Button variant="outline">Learn More About Me</Button>
					</Link>
					<Link href="/blog" passHref>
						<Button>
							Start Reading
							<BookOpen className="ml-2 h-4 w-4" />
						</Button>
					</Link>
				</div>
			</section>
		</div>
	);
}
