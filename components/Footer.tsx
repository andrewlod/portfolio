import { siteConfig } from '@/content/config';

export function Footer() {
  return (
    <footer className="border-t border-surface bg-background/80">
      <div className="container mx-auto px-6 py-6 flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-textTertiary">
        <p>
          &copy; {new Date().getFullYear()} {siteConfig.name}. All rights
          reserved.
        </p>
        <div className="flex gap-4">
          <a
            href={siteConfig.github}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-accentPrimary"
          >
            GitHub
          </a>
          <a
            href={siteConfig.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-accentPrimary"
          >
            LinkedIn
          </a>
        </div>
      </div>
    </footer>
  );
}

