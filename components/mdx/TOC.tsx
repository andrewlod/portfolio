
'use client';

import { useEffect, useState } from 'react';

interface Heading {
  id: string;
  text: string;
  level: number;
}

export function TOC() {
  const [headings, setHeadings] = useState<Heading[]>([]);
  const [activeId, setActiveId] = useState<string>('');

  useEffect(() => {
    // Get all h1, h2, and h3 headings from the page
    const elements = Array.from(document.querySelectorAll('h1, h2, h3'));
    
    // Track seen IDs to ensure uniqueness
    const seenIds = new Set<string>();
    
    // Generate IDs for headings that don't have them
    const headingData = elements
      .map((elem, index) => {
        const text = elem.textContent || '';
        let id = elem.id;
        
        // If no ID exists, generate one from the text
        if (!id) {
          id = text
            .toLowerCase()
            .replace(/[^a-z0-9]+/g, '-')
            .replace(/^-+|-+$/g, '');
          
          // Fallback if text is empty
          if (!id) {
            id = `heading-${index}`;
          }
          
          // Ensure uniqueness by appending number if duplicate
          let finalId = id;
          let counter = 1;
          while (seenIds.has(finalId)) {
            finalId = `${id}-${counter}`;
            counter++;
          }
          
          // Set the ID on the element so links work
          elem.id = finalId;
          id = finalId;
        }
        
        // Track this ID
        seenIds.add(id);
        
        return {
          id,
          text,
          level: parseInt(elem.tagName.charAt(1)),
        };
      })
      .filter((heading) => heading.id && heading.text); // Filter out any invalid headings
    
    setHeadings(headingData);

    // Intersection Observer to highlight active section
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      { rootMargin: '-100px 0px -80% 0px' }
    );

    elements.forEach((elem) => observer.observe(elem));

    return () => observer.disconnect();
  }, []);

  if (headings.length === 0) return null;

  return (
    <nav className="bg-surface border border-surfaceElevated rounded-lg p-6 mb-8">
      <h2 className="text-xl font-bold mb-4 text-textPrimary">
        Table of Contents
      </h2>
      <ul className="space-y-2">
        {headings.map((heading, index) => (
          <li
            key={`${heading.id}-${index}`}
            style={{ marginLeft: `${(heading.level - 1) * 1}rem` }}
          >
            <a
              href={`#${heading.id}`}
              className={`text-sm hover:text-accentPrimary transition-colors ${
                activeId === heading.id
                  ? 'text-accentPrimary font-semibold'
                  : 'text-textSecondary'
              }`}
            >
              {heading.text}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
