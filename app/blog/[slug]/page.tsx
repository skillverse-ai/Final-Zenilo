import { notFound } from "next/navigation";
import { blogPosts } from "@/lib/blog-data";
import { BlogReaderClient } from "@/components/sections/BlogReaderClient";

export async function generateStaticParams() {
  return blogPosts.map((post) => ({
    slug: post.slug,
  }));
}

export default async function BlogPost({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = blogPosts.find((p) => p.slug === slug);

  if (!post) {
    notFound();
  }

  return <BlogReaderClient slug={slug} />;
}
