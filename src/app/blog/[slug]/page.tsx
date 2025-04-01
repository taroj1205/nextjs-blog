import { notFound } from "next/navigation"
import { calculateReadingTime } from "@/lib/mdx"
import { allPosts } from "content-collections"
import Link from "next/link"
import Image from "next/image"
import { Badge } from "@/components/ui/badge"
import { MDXContent } from "@content-collections/mdx/react"
import { Toc } from "@/components/toc"

export const dynamic = "force-static"

export const generateStaticParams = async () => {
  const posts = allPosts.map((post) => ({
    slug: post._meta.path,
  }))

  return posts
}

export const generateMetadata = ({ params }: { params: { slug: string } }) => {
  const post = allPosts.find((post) => post._meta.path === params.slug)

  if (!post) {
    return null
  }

  return {
    title: post.title,
    description: post.excerpt,
  }
}

export default async function BlogPost({
  params,
}: {
  params: { slug: string }
}) {
  const post = allPosts.find((post) => post._meta.path === params.slug)

  if (!post) {
    notFound()
  }

  return (
    <div className="container mx-auto overflow-visible px-4 py-8">
      <article className="prose mx-auto overflow-visible dark:prose-invert lg:prose-xl prose-h1:scroll-mt-20 prose-h2:scroll-mt-20 prose-h3:scroll-mt-20 prose-h4:scroll-mt-20 prose-h5:scroll-mt-20 prose-h6:scroll-mt-20">
        {post.coverImage && post.coverImage !== "/placeholder.svg" && (
          <div className="relative my-6 mb-12 w-full">
            <Image
              src={post.coverImage}
              alt={`Cover image for ${post.title}`}
              width={1200}
              height={630}
              className="h-auto w-full rounded-lg"
              priority
            />
          </div>
        )}
        <h1 className="!mb-4">{post.title}</h1>
        <div className="flex items-center space-x-2 text-sm text-muted-foreground">
          <time dateTime={post.date}>
            {new Date(post.date).toLocaleDateString()}
          </time>
          <span>•</span>
          <span>{calculateReadingTime(post.content)} min read</span>
        </div>
        <div className="my-2 flex flex-wrap gap-2">
          {post.tags.map((tag: string) => (
            <Link
              key={tag}
              href={`/blog?q=${encodeURIComponent(tag)}`}
              passHref
            >
              <Badge
                variant="secondary"
                className="rounded-md text-sm hover:underline"
              >
                {tag}
              </Badge>
            </Link>
          ))}
        </div>
        <MDXContent
          code={post.mdx}
          components={{
            Toc,
          }}
        />
      </article>
    </div>
  )
}
