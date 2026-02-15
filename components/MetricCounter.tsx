'use client';

import { useEffect, useRef, useState } from 'react';
import { useInView } from 'framer-motion';

interface MetricCounterProps {
  value: number;
  prefix?: string;
  suffix?: string;
  duration?: number;
}

export function MetricCounter({
  value,
  prefix = '',
  suffix = '',
  duration = 2000,
}: MetricCounterProps) {
  const [displayValue, setDisplayValue] = useState(0);
  const ref = useRef<HTMLDivElement | null>(null);
  const isInView = useInView(ref, { once: true });

  useEffect(() => {
    if (!isInView) return;

    const startTime = Date.now();
    const endTime = startTime + duration;

    const timer = setInterval(() => {
      const now = Date.now();
      const progress = Math.min((now - startTime) / duration, 1);

      const eased = 1 - Math.pow(1 - progress, 3);
      const current = eased * value;
      setDisplayValue(current);

      if (progress === 1) {
        clearInterval(timer);
      }
    }, 16);

    return () => clearInterval(timer);
  }, [isInView, value, duration]);

  const isIntegerTarget = Number.isInteger(value);
  const formatted = isIntegerTarget
    ? Math.round(displayValue).toLocaleString()
    : displayValue.toLocaleString(undefined, {
        minimumFractionDigits: 1,
        maximumFractionDigits: 1,
      });

  return (
    <div ref={ref} className="text-4xl font-bold font-mono">
      {prefix}
      {formatted}
      {suffix}
    </div>
  );
}

