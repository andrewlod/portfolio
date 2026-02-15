'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import { siteConfig } from '@/content/config';

export function Navigation() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  const isActive = (href: string) =>
    href === '/'
      ? pathname === '/'
      : pathname === href || pathname.startsWith(`${href}/`);

  const navLinkClasses = (href: string) =>
    `text-sm md:text-base text-textSecondary hover:text-accentPrimary transition-colors ${
      isActive(href) ? 'text-accentPrimary border-b-2 border-accentPrimary' : ''
    }`;

  return (
    <nav className="sticky top-0 z-50 border-b border-surface bg-background/80 backdrop-blur-md">
      <div className="container mx-auto flex items-center justify-between px-6 py-4">
        <Link href="/" className="text-xl font-bold">
          andrewlod.com
        </Link>

        <div className="hidden md:flex items-center gap-8">
          <a href="/#projects" className={navLinkClasses('/#projects')}>
            Projects
          </a>
          <Link href="/blog" className={navLinkClasses('/blog')}>
            Blog
          </Link>
          <a href="/#contact" className={navLinkClasses('/#contact')}>
            Contact
          </a>
          <a href={siteConfig.resumePDF} download className="btn-secondary">
            Resume ↓
          </a>
          {siteConfig.availability.status === 'available' && (
            <span className="px-3 py-1 rounded-full bg-accentTertiary/20 text-accentTertiary text-sm">
              Available for Hire
            </span>
          )}
        </div>

        <button
          className="md:hidden text-2xl"
          aria-label="Toggle navigation menu"
          onClick={() => setOpen((v) => !v)}
        >
          ☰
        </button>
      </div>

      {open && (
        <div className="md:hidden border-t border-surface bg-background/95 backdrop-blur-md">
          <div className="px-6 py-4 space-y-4">
            <a
              href="/#projects"
              className="block text-textSecondary hover:text-accentPrimary"
              onClick={() => setOpen(false)}
            >
              Projects
            </a>
            <Link
              href="/blog"
              className="block text-textSecondary hover:text-accentPrimary"
              onClick={() => setOpen(false)}
            >
              Blog
            </Link>
            <a
              href="/#contact"
              className="block text-textSecondary hover:text-accentPrimary"
              onClick={() => setOpen(false)}
            >
              Contact
            </a>
            <a
              href={siteConfig.resumePDF}
              download
              className="block text-accentPrimary"
              onClick={() => setOpen(false)}
            >
              Resume ↓
            </a>
          </div>
        </div>
      )}
    </nav>
  );
}

