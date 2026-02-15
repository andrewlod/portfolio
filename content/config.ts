export const siteConfig = {
  name: 'André Wlodkovski',
  title: 'Senior DevOps/Platform Engineer',
  tagline:
    'Building scalable infrastructure that bridges operations, software engineering and machine learning',
  bio: 'DevOps engineer with a background in software engineering and AI/ML. I specialize in AWS, Kubernetes, and building ML inference platforms. Available for remote contract work.',

  // Contact
  email: 'andremacwlod@gmail.com',
  linkedin: 'https://linkedin.com/in/andrewlod',
  github: 'https://github.com/andrewlod',
  calendly: "https://calendly.com/andremacwlod",

  // Location & Availability
  location: 'Curitiba, Brazil',
  timezone: 'UTC-3',
  availability: {
    status: 'available' as 'available' | 'limited' | 'unavailable',
    hours: '40 hrs/week',
    remote: true,
  },

  // Hero Metrics
  heroMetrics: [
    { label: 'Saved', value: '56', prefix: '$', suffix: 'K+' },
    { label: 'RPS Boosted', value: '500', prefix: '', suffix: '%' },
    { label: 'Uptime', value: '99.9', prefix: '', suffix: '%' },
  ],

  // Featured projects (IDs from /content/projects/)
  featuredProjects: [
    'cost-optimization',
    'ml-platform',
    'observability',
    'cdn-optimization',
  ],

  // Resume
  resumePDF: '/andre-wlodkovski-resume.pdf',
} as const;

export type SiteConfig = typeof siteConfig;

