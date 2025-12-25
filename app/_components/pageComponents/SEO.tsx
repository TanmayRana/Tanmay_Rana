import type { Metadata } from "next";

interface SEOProps {
  title?: string;
  description?: string;
  keywords?: string;
  image?: string;
  url?: string;
}

export function createMetadata({
  title = "John Doe | Full-Stack Developer & Motion Designer",
  description = "Full-stack developer specializing in building exceptional digital experiences with modern technologies and purposeful motion design. Available for new opportunities.",
  keywords = "web developer, full-stack developer, React, TypeScript, Next.js, portfolio, motion design, frontend developer",
  image = "/og-image.png",
  url = "https://johndoe.dev",
}: SEOProps = {}): Metadata {
  const fullTitle = title.includes("|") ? title : `${title} | John Doe`;

  return {
    title: fullTitle,
    description,
    keywords,
    authors: [{ name: "John Doe" }],

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
