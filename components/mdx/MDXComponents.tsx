import Image from 'next/image';
import { ComponentProps } from 'react';
import { CodeBlock } from './CodeBlock';
import { TOC } from './TOC';

export const MDXComponents = {
  h1: (props: ComponentProps<'h1'>) => (
    <h1 className="text-4xl font-bold mt-8 mb-4" {...props} />
  ),
  h2: (props: ComponentProps<'h2'>) => (
    <h2 className="text-3xl font-bold mt-6 mb-3" {...props} />
  ),
  h3: (props: ComponentProps<'h3'>) => (
    <h3 className="text-2xl font-bold mt-4 mb-2" {...props} />
  ),

  p: (props: ComponentProps<'p'>) => (
    <p className="text-textSecondary leading-relaxed mb-4" {...props} />
  ),

  ul: (props: ComponentProps<'ul'>) => (
    <ul
      className="list-disc list-inside space-y-2 mb-4 text-textSecondary"
      {...props}
    />
  ),
  li: (props: ComponentProps<'li'>) => <li className="ml-4" {...props} />,
  
  code: (props: ComponentProps<'code'>) => {
    const { className, children, ...rest } = props;
    const isInline = !className;

    if (isInline) {
      return (
        <code
          className="px-1.5 py-0.5 bg-surface text-accentPrimary rounded text-sm font-mono"
          {...rest}
        >
          {children}
        </code>
      );
    }

    // Block code with syntax highlighting
    return <CodeBlock className={className}>{String(children)}</CodeBlock>;
  },

  pre: (props: ComponentProps<'pre'>) => {
    // Check if this is a code block (has a code child)
    const isCodeBlock = props.children && 
      typeof props.children === 'object' && 
      'type' in props.children && 
      props.children.type === 'code';
  
    if (isCodeBlock) {
      // Let CodeBlock handle the styling
      return <div className="my-6">{props.children}</div>;
    }
  
    // For non-code pre blocks (if you have any)
    return (
      <pre
        className="bg-surface p-4 rounded-lg overflow-x-auto mb-6 border border-surfaceElevated"
        {...props}
      />
    );
  },

  img: (props: ComponentProps<'img'>) => (
    <Image
      src={props.src || ''}
      alt={props.alt || ''}
      width={800}
      height={600}
      className="rounded-lg my-6"
    />
  ),

  Callout: ({
    type = 'info',
    children,
  }: {
    type?: 'info' | 'warning' | 'success';
    children: React.ReactNode;
  }) => {
    const colors: Record<string, string> = {
      info: 'bg-accentPrimary/10 border-accentPrimary text-accentPrimary',
      warning: 'bg-accentSecondary/10 border-accentSecondary text-accentSecondary',
      success: 'bg-accentTertiary/10 border-accentTertiary text-accentTertiary',
    };

    return (
      <div className={`p-4 rounded-lg border-l-4 mb-6 ${colors[type]}`}>
        {children}
      </div>
    );
  },

  MetricComparison: ({
    before,
    after,
  }: {
    before?: { label?: string; value?: string } | undefined;
    after?: { label?: string; value?: string } | undefined;
  }) => {
    // Defensive checks
    if (!before?.value || !after?.value) {
      console.error('MetricComparison error:', { before, after });
      return (
        <div className="p-4 bg-red-500/10 border border-red-500 rounded-lg my-6">
          <p className="text-red-500 text-sm">
            MetricComparison: Missing required props (before.value or after.value)
          </p>
        </div>
      );
    }
  
    return (
      <div className="grid grid-cols-2 gap-4 my-6 p-6 bg-surfaceElevated rounded-lg">
        <div>
          <p className="text-textTertiary text-sm mb-1">
            {before.label || 'Before'}
          </p>
          <p className="text-2xl font-bold font-mono">{before.value}</p>
        </div>
        <div>
          <p className="text-textTertiary text-sm mb-1">
            {after.label || 'After'}
          </p>
          <p className="text-2xl font-bold font-mono text-accentTertiary">
            {after.value}
          </p>
        </div>
      </div>
    );
  },

  TOC: TOC,

  // Table wrapper with horizontal scroll
  table: (props: ComponentProps<'table'>) => (
    <div className="my-6 overflow-x-auto">
      <table className="w-full border-collapse border border-surfaceElevated rounded-lg" {...props} />
    </div>
  ),

  // Header background
  thead: (props: ComponentProps<'thead'>) => (
    <thead className="bg-surface" {...props} />
  ),

  // Body (no special styling)
  tbody: (props: ComponentProps<'tbody'>) => <tbody {...props} />,

  // Row borders
  tr: (props: ComponentProps<'tr'>) => (
    <tr className="border-b border-surfaceElevated last:border-0" {...props} />
  ),

  // Header cells (bold, left-aligned)
  th: (props: ComponentProps<'th'>) => (
    <th className="px-4 py-3 text-left text-sm font-semibold text-textPrimary border-r border-surfaceElevated last:border-0" {...props} />
  ),

  // Data cells
  td: (props: ComponentProps<'td'>) => (
    <td className="px-4 py-3 text-sm text-textSecondary border-r border-surfaceElevated last:border-0" {...props} />
  ),
};

