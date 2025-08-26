import type { Metadata } from "next";
import "./globals.css";
import Providers from '@/components/provider';
import { headers } from 'next/headers'
import { cookieToInitialState } from 'wagmi'
import { getConfig } from '@/components/config'
import ActiveFooter from "@/components/footer";
import ActiveNavbar from "@/components/navbar";


export const metadata: Metadata = {
  title: "REZORYA",
  description: "REZORYA-CLIENT",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  const initialState = cookieToInitialState(
    getConfig(),
    (await headers()).get('cookie')
  )

  return (
    <html lang="en">
      <body>
        <Providers initialState={initialState}>
          <ActiveNavbar />
          {children}
          <ActiveFooter />
        </Providers>
        <ActiveFooter />
      </body>
    </html>
  );
}