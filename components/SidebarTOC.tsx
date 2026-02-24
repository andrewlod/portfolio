'use client';

import { useEffect, useState } from 'react';
import { X, Menu } from 'lucide-react'; // You'll need: npm install lucide-react

interface Heading {
  id: string;
  text: string;
  level: number;
}

export function SidebarTOC() {
  const [headings, setHeadings] = useState<Heading[]>([]);
  const [activeId, setActiveId] = useState<string>('');
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    // Set desktop open state on mount
    if (window.innerWidth >= 1024) {
      setIsOpen(true);
    }
  }, []);

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
      .filter((heading) => heading.id && heading.text);
    
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

  // Close on escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setIsOpen(false);
      }
    };
    
    document.addEventListener('keydown', handleEscape);
    
    // Prevent body scroll when sidebar is open on mobile
    if (isOpen && window.innerWidth < 1024) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    
    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  if (headings.length === 0) return null;

  return (
    <>
      {/* Toggle Button - Mobile (bottom-left) and Desktop (top-left) */}
      <button
        onClick={() => {
          setIsOpen(!isOpen);
        }}
        className="fixed bottom-6 left-6 lg:top-24 lg:bottom-auto z-40 p-3 bg-surface border border-surfaceElevated rounded-full shadow-lg hover:bg-surfaceElevated transition-colors"
        aria-label="Toggle table of contents"
      >
        {isOpen ? (
          <X className="w-5 h-5 text-textPrimary" />
        ) : (
          <Menu className="w-5 h-5 text-textPrimary" />
        )}
      </button>

      {/* Backdrop - Mobile only */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`
          fixed left-0 w-80 bg-surface border-r border-surfaceElevated z-40
          transition-transform duration-300 ease-in-out
          top-0 h-screen
          lg:top-[73px] lg:h-[calc(100vh-73px)] lg:w-72
          ${isOpen ? (window.innerWidth < 1024) ? 'translate-x-0' : 'lg:translate-x-0' : 'lg:-translate-x-full -translate-x-full lg:hidden'}
        `}
      >
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-surfaceElevated">
            <h2 className="text-lg font-bold text-textPrimary">
              Table of Contents
            </h2>
            <button
              onClick={() => {
                setIsOpen(false);
              }}
              className="p-1 hover:bg-surfaceElevated rounded transition-colors"
              aria-label="Close table of contents"
            >
              <X className="w-5 h-5 text-textSecondary" />
            </button>
          </div>

          {/* TOC Content - Scrollable */}
          <nav className="flex-1 overflow-y-auto p-6">
            <ul className="space-y-1">
              {headings.map((heading, index) => (
                <li
                  key={`${heading.id}-${index}`}
                  style={{ marginLeft: `${(heading.level - 1) * 1}rem` }}
                >
                  <a
                    href={`#${heading.id}`}
                    onClick={() => {
                      if (window.innerWidth < 1024) {
                        setIsOpen(false);
                      }
                    }}
                    className={`
                      block py-1.5 px-2 text-sm rounded transition-all
                      ${
                        activeId === heading.id
                          ? 'text-accentPrimary font-semibold bg-accentPrimary/10 border-l-2 border-accentPrimary -ml-2 pl-[calc(0.5rem-2px)]'
                          : 'text-textSecondary hover:text-textPrimary hover:bg-surfaceElevated'
                      }
                    `}
                  >
                    {heading.text}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          {/* Footer - Desktop only */}
          { (window.innerHeight >= 1024) && 
          <div className="p-4 border-t border-surfaceElevated text-xs text-textTertiary lg:hidden">
            Press <kbd className="px-1.5 py-0.5 bg-surfaceElevated rounded">Esc</kbd> to close
          </div>
          }
        </div>
      </aside>
    </>
  );
}