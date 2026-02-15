'use client';

import { motion } from 'framer-motion';
import { siteConfig } from '@/content/config';
import { MetricCounter } from './MetricCounter';

export function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 opacity-30">
        {/* Subtle animated background could be added here */}
      </div>

      <div className="container mx-auto px-6 text-center relative z-10">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-6xl md:text-7xl font-bold mb-4"
        >
          {siteConfig.name}
        </motion.h1>

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-3xl md:text-4xl mb-6 bg-gradient-to-r from-accentPrimary to-accentSecondary bg-clip-text text-transparent"
        >
          {siteConfig.title}
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-xl text-textSecondary max-w-2xl mx-auto mb-8"
        >
          {siteConfig.tagline}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="flex gap-4 justify-center mb-16"
        >
          <a href="#projects" className="btn-primary">
            View Projects ↓
          </a>
          <a href={siteConfig.resumePDF} download className="btn-secondary">
            Download Resume
          </a>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-3xl mx-auto"
        >
          {siteConfig.heroMetrics.map((metric) => (
            <div
              key={metric.label}
              className="bg-surfaceElevated p-6 rounded-lg border border-surface"
            >
              <MetricCounter
                value={Number(metric.value)}
                prefix={metric.prefix}
                suffix={metric.suffix}
              />
              <p className="text-textSecondary mt-2">{metric.label}</p>
            </div>
          ))}
        </motion.div>
      </div>

      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 1.5, repeat: Infinity }}
      >
        <svg
          className="w-6 h-6 text-textTertiary"
          viewBox="0 0 24 24"
          aria-hidden="true"
        >
          <path
            d="M12 16l-6-6h12l-6 6z"
            fill="currentColor"
          />
        </svg>
      </motion.div>
    </section>
  );
}

