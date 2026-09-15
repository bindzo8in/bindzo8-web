import { prisma } from "@/lib/prisma"
import Link from "next/link"
import Image from "next/image"
import { format } from "date-fns"
import { Badge } from "@/components/ui/badge"

export const metadata = {
  title: "Blog | Insights and Updates",
  description: "Read our latest articles, insights, and updates.",
}

interface BlogPageProps {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}

export default async function BlogPage(props: BlogPageProps) {
  const searchParams = await props.searchParams
  const categorySlug = searchParams.category as string | undefined
  const tagSlug = searchParams.tag as string | undefined
  const searchQuery = searchParams.search as string | undefined

  const where: any = {
    status: "PUBLISHED",
  }

  if (categorySlug) {
    where.category = { slug: categorySlug }
  }

  if (tagSlug) {
    where.tags = { some: { slug: tagSlug } }
  }

  if (searchQuery) {
    where.OR = [
      { title: { contains: searchQuery, mode: "insensitive" } },
      { excerpt: { contains: searchQuery, mode: "insensitive" } },
    ]
  }

  const posts = await prisma.blogPost.findMany({
    where,
    orderBy: { publishedAt: "desc" },
    include: {
      category: true,
      tags: true,
      author: {
        select: { email: true }
      }
    }
  })

  const featuredPosts = await prisma.blogPost.findMany({
    where: {
      status: "PUBLISHED",
      isFeatured: true,
    },
    orderBy: { publishedAt: "desc" },
    take: 3,
    include: {
      category: true,
    }
  })

  return (
    <div className="container mx-auto px-4 py-12 md:py-24 max-w-7xl">
      <div className="text-center mb-16">
        <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-4">Our Blog</h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          Insights, thoughts, and updates from our team.
        </p>
      </div>

      {!categorySlug && !tagSlug && !searchQuery && featuredPosts.length > 0 && (
        <div className="mb-20">
          <h2 className="text-2xl font-bold mb-8">Featured Posts</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredPosts.map(post => (
              <BlogCard key={post.id} post={post} featured />
            ))}
          </div>
        </div>
      )}

      <div>
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl font-bold">
            {searchQuery ? `Search Results for "${searchQuery}"` : 
             categorySlug ? `Category: ${categorySlug}` : 
             tagSlug ? `Tag: ${tagSlug}` : "All Posts"}
          </h2>
        </div>

        {posts.length === 0 ? (
          <div className="text-center py-20 bg-muted/30 rounded-lg">
            <h3 className="text-xl font-medium mb-2">No posts found</h3>
            <p className="text-muted-foreground">Try adjusting your filters or search query.</p>
            <Button asChild className="mt-4" variant="outline">
              <Link href="/blog">Clear Filters</Link>
            </Button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {posts.map(post => (
              <BlogCard key={post.id} post={post} />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

function BlogCard({ post, featured = false }: { post: any, featured?: boolean }) {
  return (
    <Link href={`/blog/${post.slug}`} className="group flex flex-col h-full bg-card border rounded-xl overflow-hidden hover:shadow-lg transition-all duration-300">
      <div className="relative aspect-video w-full overflow-hidden bg-muted">
        {post.featuredImage ? (
          <Image
            src={post.featuredImage}
            alt={post.featuredImageAlt || post.title}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-500"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-muted-foreground">
            No Image
          </div>
        )}
        <div className="absolute top-4 left-4">
          <Badge variant="secondary" className="bg-background/80 backdrop-blur-sm">
            {post.category.name}
          </Badge>
        </div>
      </div>
      
      <div className="p-6 flex flex-col flex-grow">
        <div className="flex items-center text-sm text-muted-foreground mb-3 space-x-4">
          <time dateTime={post.publishedAt?.toISOString()}>
            {post.publishedAt ? format(new Date(post.publishedAt), "MMMM d, yyyy") : "Draft"}
          </time>
          {post.readingTime && (
            <span>{post.readingTime} min read</span>
          )}
        </div>
        
        <h3 className="text-xl font-bold mb-3 group-hover:text-primary transition-colors line-clamp-2">
          {post.title}
        </h3>
        
        <p className="text-muted-foreground line-clamp-3 mb-6 flex-grow">
          {post.excerpt}
        </p>
        
        <div className="flex items-center justify-between mt-auto pt-4 border-t">
          <div className="text-sm font-medium truncate">
            {post.author?.email?.split('@')[0] || "Admin"}
          </div>
          <span className="text-sm font-semibold text-primary">Read More →</span>
        </div>
      </div>
    </Link>
  )
}

// Ensure Button is available in this file since it's used in empty state
import { Button } from "@/components/ui/button"
