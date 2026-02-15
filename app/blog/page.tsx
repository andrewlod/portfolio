import { getAllBlogPosts } from '@/lib/mdx';
import { BlogCard } from '@/components/BlogCard';

export default async function BlogIndexPage() {
  const posts = await getAllBlogPosts();

  return (
    <section className="py-20">
      <div className="container mx-auto px-6 max-w-4xl">
        <h1 className="text-4xl font-bold mb-4 text-center">Blog</h1>
        <p className="text-textSecondary text-center mb-12">
          Long-form notes on DevOps, MLOps, and platform engineering. Posts will
          appear here as MDX files under <code>content/blog</code>.
        </p>

        {posts.length === 0 ? (
          <p className="text-center text-textTertiary">
            No posts yet. Check back soon.
          </p>
        ) : (
          <div className="space-y-6">
            {posts.map((post) => (
              <BlogCard key={post.id} post={post} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

