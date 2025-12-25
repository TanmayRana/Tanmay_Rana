import type { Metadata } from "next";

interface SEOProps {
  title?: string;
  description?: string;
  keywords?: string;
  image?: string;
  url?: string;
}

export function createMetadata({
  title = "Tanmay Rana | Full-Stack Developer & AI Enthusiast",
  description = "Full-stack developer specializing in building exceptional digital experiences with modern technologies, AI/ML solutions, and purposeful design. Available for new opportunities.",
  keywords = "web developer, full-stack developer, AI/ML, React, TypeScript, Next.js, portfolio, Tanmay Rana, frontend developer",
  image = "/og-image.png",
  url = "https://tanmay-rana.vercel.app", // Placeholder URL, update if you have a custom domain
}: SEOProps = {}): Metadata {
  const fullTitle = title.includes("|") ? title : `${title} | Tanmay Rana`;

  return {
    title: fullTitle,
    description,
    keywords,
    authors: [{ name: "Tanmay Rana" }],

    openGraph: {
      type: "website",
      url,
      title: fullTitle,
      description,
      images: [
        {
          url: image,
          width: 1200,
          height: 630,
          alt: fullTitle,
        },
      ],
    },

    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description,
      images: [image],
    },

    alternates: {
      canonical: url,
    },

    themeColor: "#0a0b0f",
  };
}
