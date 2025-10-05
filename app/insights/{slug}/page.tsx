import type { Metadata } from "next"
import { notFound } from "next/navigation"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Calendar, Clock, ArrowLeft } from "lucide-react"
import { getBlogPost, getAllBlogPosts } from "@/lib/data/blog-posts"
import ReactMarkdown from "react-markdown"

export async function generateStaticParams() {
  const posts = getAllBlogPosts()
  return posts.map((post) => ({
    slug: post.slug,
  }))
}

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const post = getBlogPost(params.slug)

  if (!post) {
    return {
      title: "Post Not Found | Samabi Functional Medicine",
    }
  }

  return {
    title: `${post.title} | Samabi Functional Medicine`,
    description: post.excerpt,
    openGraph: {
      title: `${post.title} | Samabi Functional Medicine`,
      description: post.excerpt,
      type: "article",
      publishedTime: post.date,
      authors: [post.author],
    },
  }
}

export default function BlogPostPage({ params }: { params: { slug: string } }) {
  const post = getBlogPost(params.slug)

  if (!post) {
    notFound()
  }

  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-primary/5 via-background to-accent/5 px-4 py-16 md:py-24">
        <div className="container mx-auto max-w-4xl">
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-1000">
            <Link
              href="/insights"
              className="group mb-6 inline-flex items-center gap-2 text-muted-foreground text-sm transition-colors hover:text-foreground"
            >
              <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
              Back to Insights
            </Link>
            <div className="mb-4">
              <Badge className="bg-primary">{post.category}</Badge>
            </div>
            <h1 className="mb-6 text-balance font-bold text-3xl text-foreground md:text-4xl lg:text-5xl">
              {post.title}
            </h1>
            <div className="flex flex-wrap items-center gap-4 text-muted-foreground text-sm">
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4" />
                <span>
                  {new Date(post.date).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4" />
                <span>{post.readTime}</span>
              </div>
              <div>By {post.author}</div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Image */}
      <section className="px-4 py-8">
        <div className="container mx-auto max-w-4xl">
          <div className="relative aspect-[21/9] overflow-hidden rounded-2xl animate-in fade-in slide-in-from-bottom-4 duration-1000 delay-200">
            <Image src={post.image || "/placeholder.svg"} alt={post.title} fill className="object-cover" />
          </div>
        </div>
      </section>

      {/* Article Content */}
      <article className="px-4 py-8 md:py-12">
        <div className="container mx-auto max-w-3xl">
          <div className="prose prose-lg prose-slate dark:prose-invert max-w-none animate-in fade-in slide-in-from-bottom-4 duration-1000 delay-300">
            <ReactMarkdown
              components={{
                h1: ({ children }) => (
                  <h1 className="mb-6 font-bold text-3xl text-foreground md:text-4xl">{children}</h1>
                ),
                h2: ({ children }) => (
                  <h2 className="mb-4 mt-8 font-bold text-2xl text-foreground md:text-3xl">{children}</h2>
                ),
                h3: ({ children }) => (
                  <h3 className="mb-3 mt-6 font-semibold text-xl text-foreground md:text-2xl">{children}</h3>
                ),
                p: ({ children }) => <p className="mb-4 text-muted-foreground leading-relaxed">{children}</p>,
                ul: ({ children }) => (
                  <ul className="my-4 ml-6 list-disc space-y-2 text-muted-foreground">{children}</ul>
                ),
                ol: ({ children }) => (
                  <ol className="my-4 ml-6 list-decimal space-y-2 text-muted-foreground">{children}</ol>
                ),
                li: ({ children }) => <li className="leading-relaxed">{children}</li>,
                strong: ({ children }) => <strong className="font-semibold text-foreground">{children}</strong>,
                a: ({ children, href }) => (
                  <a href={href} className="text-primary underline transition-colors hover:text-primary/80">
                    {children}
                  </a>
                ),
              }}
            >
              {post.content}
            </ReactMarkdown>
          </div>

          {/* Tags */}
          <div className="mt-12 pt-8 border-t border-border animate-in fade-in slide-in-from-bottom-4 duration-1000 delay-400">
            <div className="flex flex-wrap gap-2">
              {post.tags.map((tag) => (
                <Badge key={tag} variant="outline">
                  {tag}
                </Badge>
              ))}
            </div>
          </div>
        </div>
      </article>

      {/* CTA Section */}
      <section className="bg-gradient-to-br from-primary/10 via-background to-accent/10 px-4 py-16 md:py-24">
        <div className="container mx-auto max-w-4xl text-center animate-in fade-in slide-in-from-bottom-4 duration-1000">
          <h2 className="mb-6 text-balance font-bold text-3xl text-foreground md:text-4xl">
            Ready to transform your health?
          </h2>
          <p className="mb-8 text-balance text-muted-foreground text-lg leading-relaxed">
            Schedule a consultation to discover how functional medicine can help you achieve optimal wellness.
          </p>
          <Button size="lg" className="group" asChild>
            <Link href="/contact">
              Book Consultation
              <span className="ml-2 transition-transform duration-300 group-hover:translate-x-1">→</span>
            </Link>
          </Button>
        </div>
      </section>
    </main>
  )
}
