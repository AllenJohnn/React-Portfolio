import { Helmet } from "react-helmet-async";

interface SEOProps {
  title?: string;
  description?: string;
  keywords?: string;
  ogImage?: string;
  url?: string;
}

export const SEO = ({
  title = "Allen John | Frontend Developer & MCA Student",
  description = "Portfolio of Allen John - Frontend Developer specializing in React, TypeScript, and modern web technologies. MCA student passionate about creating beautiful, responsive web experiences.",
  keywords = "Allen John, Frontend Developer, React Developer, Web Developer, Portfolio, MCA Student, TypeScript, JavaScript, UI/UX",
  ogImage = "https://allenjohnjoy.vercel.app/og-image.png",
  url = "https://allenjohnjoy.vercel.app"
}: SEOProps) => {
  return (
    <Helmet>
      {/* Primary Meta Tags */}
      <title>{title}</title>
      <meta name="title" content={title} />
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      <meta name="author" content="Allen John" />
      <meta name="robots" content="index, follow" />
      <meta name="language" content="English" />
      
      {/* Open Graph / Facebook */}
      <meta property="og:type" content="website" />
      <meta property="og:url" content={url} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={ogImage} />
      <meta property="og:site_name" content="Allen John Portfolio" />

      {/* Twitter */}
      <meta property="twitter:card" content="summary_large_image" />
      <meta property="twitter:url" content={url} />
      <meta property="twitter:title" content={title} />
      <meta property="twitter:creator" content="@allenjohnjoy" />
      <meta property="twitter:description" content={description} />
      <meta property="twitter:image" content={ogImage} />

      {/* Additional Meta Tags */}
      <meta name="theme-color" content="#667eea" />
      <link rel="canonical" href={url} />
    </Helmet>
  );
};
