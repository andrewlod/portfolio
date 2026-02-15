import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { Navigation } from '@/components/Navigation';
import { Footer } from '@/components/Footer';
import { Analytics } from '@vercel/analytics/react';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'André Wlodkovski - Senior DevOps/Platform Engineer',
  description:
    "DevOps engineer specializing in AWS, Kubernetes, and MLOps. Built ML platforms for Brazil's top banks. Available for contract work.",
  keywords: 'DevOps, MLOps, AWS, Kubernetes, Terraform, Brazil, contractor',
  authors: [{ name: 'André Wlodkovski' }],
  openGraph: {
    title: 'André Wlodkovski - DevOps Engineer',
    description: '$56K saved, 500% scaled, 99.9% uptime',
    images: ['/og-image.png'],
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <body
        className={`${inter.className} bg-background text-textPrimary antialiased`}
      >
        <Navigation />
        <main>{children}</main>
        <Footer />
        <Analytics />
      </body>
    </html>
  );
}

