//import ActiveFooter from "@/components/activefooter";
//import { SpeedInsights } from "@vercel/speed-insights/next"
import Providers from "@/components/provider";
import { cookieToInitialState } from 'wagmi'
import { getConfig } from '@/components/config'
import { headers } from 'next/headers'
import Navbar from "@/app/money/components/navbar";
import EthereumPriceDisplay from "@/app/money/components/price";



export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  const initialState = cookieToInitialState(
    getConfig(),
    (await headers()).get('cookie')
  )



  async function getSEOData() {
  // This would typically fetch from an API endpoint
  // For now, we'll return structured data for SEO
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "Castle Sudan",
    "url": "https://castel-sudan.vercel.app",
    "logo": "https://castel-sudan.vercel.app/logo.png",
    "sameAs": [
      "https://github.com/Software-Malware/Castle-Sudan",
      "https://www.facebook.com/dafe.nshi.9/posts/pfbid02REcTRxuGLxczr1pkW7gdnY4fDJF1cjPQ6KnQ6gkZoGJQcKwwx83kqPC6Gxntm7rPl"
    ],
    "contactPoint": [{
      "@type": "ContactPoint",
      "telephone": "+249-918946937",
      "contactType": "customer service",
      "email": "defenshi989@gmail.com"
    }],
    "description": "Castle Sudan provides cutting-edge Capture The Flag challenges and cybersecurity training programs."
  };
}

  return (
      <>
        <Navbar />
          <Providers initialState={initialState}>
            {children}
         </Providers>
      </>
  );
}