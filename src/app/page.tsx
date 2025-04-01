import Link from "next/link"
import Image from "next/image"
import { SearchBar } from "@/components/search-bar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ArrowRight, BookOpen, Calendar, Clock, Tag } from "lucide-react"
import { allPosts } from "content-collections"
import { calculateReadingTime } from "@/lib/mdx"

export default async function Home() {
  return (
    <div className="container mx-auto space-y-12 px-4 py-8">
      <section className="space-y-4">
        <h1 className="text-center text-4xl font-extrabold tracking-tight lg:text-5xl">
          Welcome to My University Blog
        </h1>
        <p className="text-centertext-xl mx-auto max-w-[700px] text-muted-foreground">
          Exploring the intersection of university life and coding adventures.
          Join me on this exciting journey!
        </p>
        <SearchBar />
      </section>

      <section>
        <h2 className="mb-6 text-3xl font-bold">Featured Posts</h2>
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {allPosts
            .slice(-3)
            .reverse()
            .map((post) => (
              <Link
                key={post._meta.filePath}
                href={`/blog/${post._meta.path}`}
                className="group block"
              >
                <Card className="flex h-full flex-col overflow-hidden bg-card">
                  <CardHeader className="p-0">
                    <div>
                      <Image
                        src={post.coverImage || "/placeholder.svg"}
                        alt={post.title}
                        width={600}
                        height={400}
                        className="h-48 w-full object-cover object-left"
                      />
                    </div>
                  </CardHeader>
                  <CardContent className="flex-grow p-6">
                    <div className="mb-4">
                      <CardTitle className="mb-2 line-clamp-3 text-2xl hover:underline">
                        {post.title}
                      </CardTitle>
                      <div className="flex items-center gap-3 text-sm text-muted-foreground">
                        <Calendar className="h-4 w-4" />
                        <time dateTime={post.date}>
                          {new Date(post.date).toLocaleDateString()}
                        </time>
                        <span>•</span>
                        <Clock className="h-4 w-4" />
                        <span>
                          {calculateReadingTime(post.content)} min read
                        </span>
                      </div>
                    </div>
                    <p className="mb-6 line-clamp-3 text-muted-foreground">
                      {post.excerpt}
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {post.tags.slice(0, 3).map((tag: string) => (
                        <Link
                          key={tag}
                          href={`/blog?tag=${encodeURIComponent(tag)}`}
                        >
                          <Badge
                            variant="secondary"
                            className="hover:underline"
                          >
                            {tag}
                          </Badge>
                        </Link>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
        </div>
      </section>

      <section className="space-y-6">
        <h2 className="text-3xl font-bold">Recent Posts</h2>
        <div className="space-y-4">
          {allPosts
            .slice(-5)
            .reverse()
            .map((post) => (
              <Link
                key={post._meta.filePath}
                href={`/blog/${post._meta.path}`}
                passHref
              >
                <div className="flex items-center space-x-4 rounded-lg p-6 transition-all hover:bg-muted">
                  <div className="flex-shrink-0">
                    <Image
                      src={post.coverImage || "/placeholder.svg"}
                      alt={post.title}
                      width={100}
                      height={100}
                      className="rounded-md object-cover"
                    />
                  </div>
                  <div className="flex-grow">
                    <h3 className="mb-3 text-2xl font-semibold">
                      {post.title}
                    </h3>
                    <p className="mb-4 line-clamp-2 text-muted-foreground">
                      {post.excerpt}
                    </p>
                    <div className="mt-3 flex items-center gap-3 text-sm text-muted-foreground">
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

      <section className="rounded-lg bg-muted p-8">
        <h2 className="mb-4 text-3xl font-bold">About This Blog</h2>
        <p className="mb-6 text-lg">
          This blog is a chronicle of my university experiences and coding
          journey. Here, I share insights, challenges, and discoveries from both
          academic and programming worlds.
        </p>
        <div className="flex justify-center space-x-4">
          <Link href="https://taroj1205.poyo.jp/" passHref>
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
  )
}
