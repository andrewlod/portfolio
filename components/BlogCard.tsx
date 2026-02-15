import Link from 'next/link';
import type { BlogPost } from '@/lib/mdx';

interface BlogCardProps {
  post: BlogPost;
}

export function BlogCard({ post }: BlogCardProps) {
  return (
    <Link href={`/blog/${post.id}`}>
      <article className="group bg-surfaceElevated rounded-lg border border-surface p-6 transition-all hover:-translate-y-1 hover:border-accentPrimary/60">
        <h3 className="text-2xl font-bold mb-2 group-hover:text-accentPrimary transition-colors">
          {post.title}
        </h3>
        {post.subtitle && (
          <p className="text-textSecondary mb-3">{post.subtitle}</p>
        )}
        <p className="text-textTertiary text-sm mb-4">
          {new Date(post.date).toLocaleDateString()}
        </p>
        {post.tags && post.tags.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {post.tags.map((tag) => (
              <span
                key={tag}
                className="px-2 py-1 bg-surface text-xs text-textSecondary rounded"
              >
                {tag}
              </span>
            ))}
          </div>
        )}
      </article>
    </Link>
  );
}

