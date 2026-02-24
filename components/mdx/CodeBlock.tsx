'use client';

import { Highlight, themes } from 'prism-react-renderer';
import './prism-promql'; // Add PromQL support

interface CodeBlockProps {
  children: string;
  className?: string;
}

export function CodeBlock({ children, className }: CodeBlockProps) {
  // Extract language from className (e.g., "language-json")
  const language = className?.replace(/language-/, '') || 'text';
  
  return (
    <Highlight
      theme={themes.nightOwl} // or themes.vsDark, themes.dracula
      code={children.trim()}
      language={language}
    >
      {({ className, style, tokens, getLineProps, getTokenProps }) => (
        <pre
          className={className}
          style={{
            ...style,
            margin: 0, // Remove default margin
            background: 'var(--color-surface)', // Use your CSS variable
          }}
        >
          <code>
            {tokens.map((line, i) => (
              <div key={i} {...getLineProps({ line })}>
                {line.map((token, key) => (
                  <span key={key} {...getTokenProps({ token })} />
                ))}
              </div>
            ))}
          </code>
        </pre>
      )}
    </Highlight>
  );
}