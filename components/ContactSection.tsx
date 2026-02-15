import { Mail, Linkedin, Calendar, Download } from 'lucide-react';
import { siteConfig } from '@/content/config';

export function ContactSection() {
  return (
    <section id="contact" className="py-20 bg-surface">
      <div className="container mx-auto px-6 max-w-4xl text-center">
        <h2 className="text-4xl font-bold mb-6">Let&apos;s Work Together</h2>

        <p className="text-xl text-textSecondary mb-8">
          I&apos;m{' '}
          {siteConfig.availability.status === 'available'
            ? 'available'
            : 'currently limited'}{' '}
          for DevOps/Platform engineering contract work. Based in {siteConfig.location} (
          {siteConfig.timezone}), fluent English, C2 proficiency.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-12 max-w-2xl mx-auto">
          <div className="bg-surfaceElevated p-4 rounded-lg">
            <p className="text-textTertiary text-sm">Location</p>
            <p className="text-xl font-bold">{siteConfig.timezone}</p>
          </div>
          <div className="bg-surfaceElevated p-4 rounded-lg">
            <p className="text-textTertiary text-sm">Availability</p>
            <p className="text-xl font-bold">
              {siteConfig.availability.hours}
            </p>
          </div>
        </div>

        <div className="flex flex-wrap gap-4 justify-center mb-8">
          <a
            href={`mailto:${siteConfig.email}`}
            className="flex items-center gap-2 px-6 py-3 bg-surfaceElevated border border-surface rounded-lg hover:border-accentPrimary transition-colors"
          >
            <Mail className="w-5 h-5" />
            Email Me
          </a>

          <a
            href={siteConfig.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-6 py-3 bg-surfaceElevated border border-surface rounded-lg hover:border-accentPrimary transition-colors"
          >
            <Linkedin className="w-5 h-5" />
            LinkedIn
          </a>

          {siteConfig.calendly && (
            <a
              href={siteConfig.calendly}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-6 py-3 bg-surfaceElevated border border-surface rounded-lg hover:border-accentPrimary transition-colors"
            >
              <Calendar className="w-5 h-5" />
              Schedule Call
            </a>
          )}
        </div>

        <div>
          <p className="text-textSecondary mb-4">Or download my resume:</p>
          <a
            href={siteConfig.resumePDF}
            download
            className="inline-flex items-center gap-2 btn-primary"
          >
            <Download className="w-5 h-5" />
            Download PDF
          </a>
        </div>
      </div>
    </section>
  );
}

