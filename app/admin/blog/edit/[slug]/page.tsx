import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { BlogEditorForm } from "@/components/admin/blog-editor-form";

type Props = {
  params: { slug: string };
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const supabase = createClient();
  const { data: post } = await supabase
    .from("blog_posts")
    .select("title")
    .eq("slug", params.slug)
    .single();

  return {
    title: `Edit: ${post?.title || "Blog Post"} | Samabi Admin`,
  };
}

export default async function EditBlogPostPage({ params }: Props) {
  const supabase = createClient();
  const { data: post, error } = await supabase
    .from("blog_posts")
    .select("*")
    .eq("slug", params.slug)
    .single();

  if (error || !post) {
    notFound();
  }

  return (
    <div className="container mx-auto py-10 px-4 max-w-5xl">
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-2">Edit Blog Post</h1>
        <p className="text-muted-foreground">
          You are editing: <span className="font-semibold">{post.title}</span>
        </p>
      </div>
      <BlogEditorForm post={post} />
    </div>
  );
}
