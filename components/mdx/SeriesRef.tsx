import { getAllBlogPosts } from '@/lib/mdx';
import Link from 'next/link';

interface SeriesRefProps {
  series: string;
}

export async function SeriesRef({ series }: SeriesRefProps) {
  // Get all blog posts
  const allPosts = await getAllBlogPosts();
  
  // Filter posts in this series and sort by seriesOrder
  const seriesPosts = allPosts
    .filter((post) => post.series === series)
    .sort((a, b) => (a.seriesOrder || 0) - (b.seriesOrder || 0));
  
  if (seriesPosts.length === 0) {
    return (
      <p className="text-textTertiary italic">
        No posts found in this series.
      </p>
    );
  }
  
  return (
    <ul className="space-y-2 my-4 list-none ml-0">
      {seriesPosts.map((post) => (
        <li key={post.id} className="ml-0">
          <Link
            href={`/blog/${post.id}`}
            className="text-accentPrimary hover:text-accentSecondary transition-colors hover:underline"
          >
            {post.refTitle || post.title}
          </Link>
        </li>
      ))}
    </ul>
  );
}