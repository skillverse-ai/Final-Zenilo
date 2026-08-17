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
      canonical: `https://zenlio.agency/blog/${post.slug}`,
    },
    openGraph: {
      title: `${post.title} | Zenlio`,
      description: post.snippet,
      url: `https://zenlio.agency/blog/${post.slug}`,
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
    "@type": "BlogPosting",
    "headline": post.title,
    "description": post.snippet,
    "image": "https://zenlio.agency/logo.png",
    "datePublished": "2026-08-16T12:00:00Z",
    "dateModified": "2026-08-16T12:00:00Z",
    "author": {
      "@type": "Organization",
      "@id": "https://zenlio.agency/#organization",
      "name": "Zenlio",
      "url": "https://zenlio.agency"
    },
    "publisher": {
      "@type": "Organization",
      "@id": "https://zenlio.agency/#organization",
      "name": "Zenlio",
      "logo": {
        "@type": "ImageObject",
        "url": "https://zenlio.agency/logo.png"
      }
    }
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Home",
        "item": "https://zenlio.agency"
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": "Blog",
        "item": "https://zenlio.agency/blog"
      },
      {
        "@type": "ListItem",
        "position": 3,
        "name": post.title,
        "item": `https://zenlio.agency/blog/${slug}`
      }
    ]
  };

  const faqSchema = post.faqs && post.faqs.length > 0 ? {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": post.faqs.map((faq) => ({
      "@type": "Question",
      "name": faq.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.answer
      }
    }))
  } : null;

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      {faqSchema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
        />
      )}
      <BlogReaderClient slug={slug} />
    </>
  );
}
