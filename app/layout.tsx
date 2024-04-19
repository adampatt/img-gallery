import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { ClerkProvider } from '@clerk/nextjs';
import { TopNav } from './_components/topnav';
import '@uploadthing/react/styles.css';
import { NextSSRPlugin } from '@uploadthing/react/next-ssr-plugin';
import { extractRouterConfig } from 'uploadthing/server';
import { ourFileRouter } from './api/uploadthing/core';
import { Toaster } from 'sonner';
import { ThemeProvider } from '@/components/theme-provider';
import { CSPostHogProvider } from '@/app/_analytics/provider';
const inter = Inter({
  subsets: ['latin'],
  variable: '--font-sans',
});

export const metadata: Metadata = {
  title: 'Image gallery',
  description: 'Create and share your image gallery',
};

export default function RootLayout({
  children,
  modal,
}: Readonly<{
  children: React.ReactNode;
  modal: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <CSPostHogProvider>
        <html lang="en">
          <NextSSRPlugin
            /**
             * The `extractRouterConfig` will extract **only** the route configs
             * from the router to prevent additional information from being
             * leaked to the client. The data passed to the client is the same
             * as if you were to fetch `/api/uploadthing` directly.
             */
            routerConfig={extractRouterConfig(ourFileRouter)}
          />
          <body className={`font-sans ${inter.variable}`}>
            <ThemeProvider
              attribute="class"
              defaultTheme="dark"
              enableSystem
            >
              {/* Use a div here to wrap the children and modal, this stops third party libraries making changes to the body */}
              <div className="h-screen grid grid-rows-[auto,1fr]">
                <TopNav />
                <main className="overflow-y-scroll">{children}</main>
              </div>
              {modal}
              {/* The below div can be used a target when mounting elements */}
              <div id="modal-root" />
              <Toaster className="dark" />
            </ThemeProvider>
          </body>
        </html>
      </CSPostHogProvider>
    </ClerkProvider>
  );
}
