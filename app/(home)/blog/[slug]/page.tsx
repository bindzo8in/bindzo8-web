import { prisma } from "@/lib/prisma"
import { notFound } from "next/navigation"
import Image from "next/image"
import Link from "next/link"
import { format } from "date-fns"
import { Badge } from "@/components/ui/badge"
import { SocialShare } from "@/features/blog/components/social-share"
import { Metadata } from "next"

interface BlogPostPageProps {
  params: Promise<{ slug: string }>
}

export async function generateMetadata(
  props: BlogPostPageProps
): Promise<Metadata> {
  const params = await props.params;
  const post = await prisma.blogPost.findUnique({
    where: { slug: params.slug },
  })

  if (!post) {
    return {
      title: "Post Not Found",
    }
  }

  return {
    title: post.metaTitle || post.title,
    description: post.metaDescription || post.excerpt,
    openGraph: {
      title: post.metaTitle || post.title,
      description: post.metaDescription || post.excerpt,
      type: "article",
      publishedTime: post.publishedAt?.toISOString(),
      authors: ["Bindzo8"],
      images: post.featuredImage ? [{ url: post.featuredImage }] : [],
    },
  }
}

export default async function BlogPostPage(props: BlogPostPageProps) {
  const params = await props.params;
  const post = await prisma.blogPost.findUnique({
    where: { slug: params.slug },
    include: {
      category: true,
      tags: true,
      author: {
        select: { email: true }
      }
    }
  })

  if (!post || post.status !== "PUBLISHED") {
    notFound()
  }

  return (
    <article className="dark bg-[#0b0b0c] text-white min-h-screen pt-20 md:pt-24">
      {/* Header / Hero Section */}
      <header className="relative w-full py-20 md:py-32 overflow-hidden flex items-center justify-center">
        {post.featuredImage && (
          <div className="absolute inset-0 z-0">
            <Image
              src={post.featuredImage}
              alt={post.featuredImageAlt || post.title}
              fill
              className="object-cover opacity-20"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background to-background/60" />
          </div>
        )}
        
        <div className="container relative z-10 max-w-4xl mx-auto px-4 text-center">
          <Link href={`/blog?category=${post.category.slug}`}>
            <Badge className="mb-6 hover:bg-primary/90 text-sm py-1 px-3">
              {post.category.name}
            </Badge>
          </Link>
          
          <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight mb-6 leading-tight">
            {post.title}
          </h1>
          
          <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-3xl mx-auto">
            {post.excerpt}
          </p>
          
          <div className="flex flex-wrap items-center justify-center gap-4 text-sm text-muted-foreground font-medium">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center text-primary">
                {(post.author?.email?.[0] || "A").toUpperCase()}
              </div>
              <span>{post.author?.email?.split('@')[0] || "Admin"}</span>
            </div>
            <span>•</span>
            <time dateTime={post.publishedAt?.toISOString()}>
              {post.publishedAt ? format(new Date(post.publishedAt), "MMMM d, yyyy") : ""}
            </time>
            {post.readingTime && (
              <>
                <span>•</span>
                <span>{post.readingTime} min read</span>
              </>
            )}
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container max-w-4xl mx-auto px-4 py-12">
        {post.featuredImage && (
          <div className="relative w-full aspect-video rounded-2xl overflow-hidden mb-16 shadow-2xl">
            <Image
              src={post.featuredImage}
              alt={post.featuredImageAlt || post.title}
              fill
              className="object-cover"
              priority
            />
          </div>
        )}

        <div 
          className="prose prose-lg dark:prose-invert max-w-none 
            prose-headings:font-bold prose-headings:tracking-tight 
            prose-a:text-primary prose-a:no-underline hover:prose-a:underline
            prose-img:rounded-xl prose-img:shadow-lg mx-auto"
          dangerouslySetInnerHTML={{ __html: post.content }}
        />

        {/* Footer Actions (Tags & Share) */}
        <div className="mt-16 pt-8 border-t flex flex-col sm:flex-row sm:items-center justify-between gap-8">
          {post.tags.length > 0 ? (
            <div className="flex items-center gap-4 flex-wrap">
              <span className="font-medium">Tags:</span>
              {post.tags.map(tag => (
                <Link key={tag.id} href={`/blog?tag=${tag.slug}`}>
                  <Badge variant="outline" className="hover:bg-accent cursor-pointer">
                    {tag.name}
                  </Badge>
                </Link>
              ))}
            </div>
          ) : (
            <div />
          )}

          <SocialShare title={post.title} />
        </div>
      </main>
    </article>
  )
}
