import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { ClerkProvider } from '@clerk/nextjs';
const inter = Inter({ subsets: ['latin'] });
import { TopNav } from './_components/topnav';

export const metadata: Metadata = {
  title: 'Image gallery',
  description: 'Create and share your image gallery',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className={inter.className}>
          <TopNav />
          {children}
        </body>
      </html>
    </ClerkProvider>
  );
}
