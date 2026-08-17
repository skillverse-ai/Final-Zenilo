import type { Metadata } from 'next';
import { notFound } from "next/navigation";
import { blogPosts } from "@/lib/blog-data";
import { BlogReaderClient } from "@/components/sections/BlogReaderClient";

export async function generateStaticParams() {
  return blogPosts.map((post) => ({
    slug: post.slug,
  }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const post = blogPosts.find((p) => p.slug === slug);
  
  if (!post) {
    return {};
  }
  
  return {
    title: post.title,
    description: post.snippet,
    alternates: {
      canonical: `https://zenlio.io/blog/${post.slug}`,
    },
    openGraph: {
      title: `${post.title} | Zenlio`,
      description: post.snippet,
      url: `https://zenlio.io/blog/${post.slug}`,
      type: "article",
      publishedTime: "2026-08-16T12:00:00Z",
      authors: ["Zenlio"],
    },
    twitter: {
      card: "summary_large_image",
      title: `${post.title} | Zenlio`,
      description: post.snippet,
    }
  };
}

export default async function BlogPost({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = blogPosts.find((p) => p.slug === slug);

  if (!post) {
    notFound();
  }

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "NewsArticle",
    "headline": post.title,
    "description": post.snippet,
    "image": "https://zenlio.io/logo.png",
    "datePublished": "2026-08-16T12:00:00Z",
    "author": {
      "@type": "Organization",
      "name": "Zenlio",
      "url": "https://zenlio.io"
    },
    "publisher": {
      "@type": "Organization",
      "name": "Zenlio",
      "logo": {
        "@type": "ImageObject",
        "url": "https://zenlio.io/logo.png"
      }
    }
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />
      <BlogReaderClient slug={slug} />
    </>
  );
}
