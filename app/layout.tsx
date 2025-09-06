import type { Metadata } from "next";
import "./globals.css";
import ActiveFooter from "@/components/activefooter";
import { SpeedInsights } from "@vercel/speed-insights/next"

export const metadata: Metadata = {
  title: "Castle Sudan - Premium Quality Products & Services",
  description: "Discover premium quality products and services from Castle Sudan. Experience excellence in every offering with our innovative solutions and customer-focused approach.",
  keywords: "Castle Sudan, premium products, quality services, Sudan, African products, premium services, business solutions",

  // Open Graph for Facebook
  openGraph: {
    title: "Castle Sudan - Premium Quality Products & Services",
    description: "Discover premium quality products and services from Castle Sudan. Experience excellence in every offering with our innovative solutions.",
    url: "https://castel-sudan.vercel.app/",
    siteName: "Castle Sudan",
    images: [
      {
        url: "https://castel-sudan.vercel.app/favicon.ico", // Recommended: 1200x630px
        width: 1200,
        height: 630,
        alt: "Castle Sudan - Premium Quality Products and Services",
      },
      {
        url: "https://castel-sudan.vercel.app/favicon.ico", // Additional image
        width: 800,
        height: 600,
        alt: "Castle Sudan - Excellence in Every Offering",
      },
    ],
    locale: "en_US",
    type: "website",
    emails: ["defenshi989@gmail.com", "defenshi989@gmail.com"], // Optional email contacts
    phoneNumbers: ["+249918946937", "+249918946937"], // Optional phone numbers
  },

  // Twitter Card
  twitter: {
    card: "summary_large_image",
    title: "Castle Sudan - Premium Quality Products & Services",
    description: "Discover premium quality products and services from Castle Sudan. Experience excellence in every offering.",
    images: ["https://castel-sudan.vercel.app/favicon.ico"], // Recommended: 1200x628px
    creator: "@CastleSudan",
    site: "@CastleSudan",
  },

  // Additional metadata
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },

  // App Links
  appLinks: {
    web: {
      url: "https://castel-sudan.vercel.app",
      should_fallback: false,
    },
  },

  // Additional metadata for better SEO
  authors: [{ name: "Castle Sudan Team" }],
  creator: "Castle Sudan",
  publisher: "Castle Sudan",
  formatDetection: {
    email: true,
    address: true,
    telephone: true,
  },

  // Category and classification
  category: "E-commerce & Services",
  
  // Social Media Profiles
  other: {
    "facebook:url": "https://www.facebook.com/",
    "facebook:app_id": "pfbid079YGotYABXQ2pLo3WzWRxpeiGf8bRp4VnaxvjHAShuB7Tqm6hsEsYjveBFbSGNGJl",
    "facebook:profile_id": "dafe.nshi.9",
    

    "twitter:url": "https://x.com/Hackathon3301?t=S67TMqSCfXO5LJ9HxYef_A&s=09",

    // GitHub repository
    "github:url": "https://github.com/Software-Malware/Castle-Sudan",
    
    // Business information
    "business:contact_data:street_address": "123 Business District",
    "business:contact_data:locality": "Khartoum",
    "business:contact_data:region": "KH",
    "business:contact_data:postal_code": "11111",
    "business:contact_data:country_name": "Sudan",
    
    "application-name": "Castle Sudan",
    "msapplication-TileColor": "#ffffff",
    "theme-color": "#ffffff",
    
    // Additional Open Graph properties
    "og:email": "defenshi989@gmail.com",
    "og:phone_number": "+249918946937",
  },
};

// JSON-LD Structured Data for better SEO
const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  'name': 'Castle Sudan',
  'url': 'https://castel-sudan.vercel.app',
  'logo': 'https://castel-sudan.vercel.app/favicon.ico',
  'description': 'Premium Quality Products and Services from Sudan',
  'address': {
    '@type': 'Castle Sudan',
    'streetAddress': '123 Business District',
    'addressLocality': 'Khartoum',
    'addressRegion': 'KH',
    'postalCode': '11111',
    'addressCountry': 'Sudan'
  },
  'contactPoint': {
    '@type': 'Castle Sudan',
    'telephone': '+249918946937',
    'contactType': 'customer service',
    'email': 'defenshi989@gmail.com'
  },
  'sameAs': [
    'https://www.facebook.com/dafe.nshi.9/posts/pfbid02REcTRxuGLxczr1pkW7gdnY4fDJF1cjPQ6KnQ6gkZoGJQcKwwx83kqPC6Gxntm7rPl',
    'https://github.com/castlesudan/castel-sudan-website',
    'https://twitter.com/castlesudan',
  ]
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        {/* Favicon and additional meta tags */}
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" sizes="180x180" href="/favicon.ico" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon.ico" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon.ico" />
        <link rel="manifest" href="/site.webmanifest" />
        <link rel="mask-icon" href="/favicon.ico" color="#5bbad5" />
        
        {/* Canonical URL */}
        <link rel="canonical" href="https://castel-sudan.vercel.app" />
        
        {/* Preload critical resources */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        
        {/* Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        
        {/* Additional meta tags for mobile optimization */}
        <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content="Castle Sudan" />
        
        {/* Geo tags for local SEO */}
        <meta name="geo.region" content="SD" />
        <meta name="geo.placename" content="Khartoum" />
        <meta name="geo.position" content="15.5007;32.5599" />
        <meta name="ICBM" content="15.5007, 32.5599" />
      </head>
      <body>
      <SpeedInsights />
        {children}
        <ActiveFooter />
      </body>
    </html>
  );
}