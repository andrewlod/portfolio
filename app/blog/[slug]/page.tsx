import { notFound } from 'next/navigation';
import { getAllBlogPosts, getBlogPostBySlug } from '@/lib/mdx';

export async function generateStaticParams() {
  const posts = await getAllBlogPosts();
  return posts.map((post) => ({
    slug: post.id,
  }));
}

export default async function BlogPostPage({
  params,
}: {
  params: { slug: string };
}) {
  const post = await getBlogPostBySlug(params.slug);

  if (!post) {
    notFound();
  }

  return (
    <article className="py-20">
      <div className="container mx-auto px-6 max-w-3xl">
        <a
          href="/blog"
          className="inline-flex items-center text-textSecondary hover:text-accentPrimary mb-8"
        >
          ← Back to Blog
        </a>

        <header className="mb-8">
          <h1 className="text-4xl font-bold mb-2">{post.title}</h1>
          {post.subtitle && (
            <p className="text-xl text-textSecondary mb-2">{post.subtitle}</p>
          )}
          <p className="text-textTertiary text-sm">
            {new Date(post.date).toLocaleDateString()}
          </p>
        </header>

        <div className="prose prose-invert max-w-none">{post.content}</div>
      </div>
    </article>
  );
}

