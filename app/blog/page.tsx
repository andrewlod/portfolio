import { getAllBlogPosts } from '@/lib/mdx';
import { BlogCard } from '@/components/BlogCard';

export default async function BlogIndexPage() {
  const posts = await getAllBlogPosts();
  
  // Sort posts by date (newest first)
  const sortedPosts = posts.sort((a, b) => {
    const dateA = new Date(a.date).getTime();
    const dateB = new Date(b.date).getTime();
    return dateB - dateA; // Descending order (newest first)
  });

  return (
    <section className="py-20">
      <div className="container mx-auto px-6 max-w-4xl">
        <h1 className="text-4xl font-bold mb-4 text-center">Blog</h1>
        <p className="text-textSecondary text-center mb-12">
          Long-form notes on DevOps, MLOps, software and platform engineering.
        </p>

        {sortedPosts.length === 0 ? (
          <p className="text-center text-textTertiary">
            No posts yet. Check back soon.
          </p>
        ) : (
          <div className="space-y-6">
            {sortedPosts.map((post) => (
              <BlogCard key={post.id} post={post} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}