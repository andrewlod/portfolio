import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import remarkGfm from 'remark-gfm';
import { compileMDX } from 'next-mdx-remote/rsc';
import { MDXComponents } from '@/components/mdx/MDXComponents';

const projectsDirectory = path.join(process.cwd(), 'content/projects');
const blogDirectory = path.join(process.cwd(), 'content/blog');

export interface Project {
  id: string;
  title: string;
  subtitle: string;
  category: string;
  date: string;
  featured: boolean;
  order: number;
  impact: {
    primary: string;
    secondary: string;
  };
  metrics: Array<{
    label: string;
    value?: string;
    suffix?: string;
    before?: string;
    after?: string;
  }>;
  technologies: string[];
  diagram?: string;
  thumbnail?: string;
  /** Image alignment when cropped (object-position). Default: center */
  thumbnailPosition?: 'top' | 'center' | 'bottom' | 'left' | 'right' | 'left-top' | 'left-bottom' | 'right-top' | 'right-bottom';
  content: React.ReactNode;
}

export interface BlogPost {
  id: string;
  title: string;
  subtitle?: string;
  date: string;
  tags?: string[];
  featured?: boolean;
  content: React.ReactNode;
}

async function compileFile(filePath: string) {
  const fileContents = fs.readFileSync(filePath, 'utf8');
  const { data, content } = matter(fileContents);

  const { content: mdxContent } = await compileMDX<{ [key: string]: any }>({
    source: content,
    options: {
      mdxOptions: {
        remarkPlugins: [remarkGfm],
        rehypePlugins: [],
      },
    },
    components: MDXComponents,
  });

  return { data, mdxContent };
}

export async function getAllProjects(): Promise<Project[]> {
  if (!fs.existsSync(projectsDirectory)) return [];

  const fileNames = fs.readdirSync(projectsDirectory);

  const projects = await Promise.all(
    fileNames
      .filter((fileName) => fileName.endsWith('.mdx'))
      .map(async (fileName) => {
        const id = fileName.replace(/\.mdx$/, '');
        const fullPath = path.join(projectsDirectory, fileName);
        const { data, mdxContent } = await compileFile(fullPath);

        return {
          id,
          ...data,
          content: mdxContent,
        } as Project;
      }),
  );

  return projects.sort((a, b) => (a.order || 0) - (b.order || 0));
}

export async function getProjectBySlug(slug: string): Promise<Project | null> {
  try {
    const fullPath = path.join(projectsDirectory, `${slug}.mdx`);
    const { data, mdxContent } = await compileFile(fullPath);

    return {
      id: slug,
      ...data,
      content: mdxContent,
    } as Project;
  } catch {
    return null;
  }
}

export async function getFeaturedProjects(): Promise<Project[]> {
  const allProjects = await getAllProjects();
  return allProjects.filter((p) => p.featured);
}

export async function getAllBlogPosts(): Promise<BlogPost[]> {
  if (!fs.existsSync(blogDirectory)) return [];

  const fileNames = fs
    .readdirSync(blogDirectory)
    .filter((fileName) => fileName.endsWith('.mdx'));

  const posts = await Promise.all(
    fileNames.map(async (fileName) => {
      const id = fileName.replace(/\.mdx$/, '');
      const fullPath = path.join(blogDirectory, fileName);
      const { data, mdxContent } = await compileFile(fullPath);

      return {
        id,
        ...data,
        content: mdxContent,
      } as BlogPost;
    }),
  );

  return posts.sort((a, b) => (a.date || '').localeCompare(b.date || ''));
}

export async function getBlogPostBySlug(slug: string): Promise<BlogPost | null> {
  try {
    const fullPath = path.join(blogDirectory, `${slug}.mdx`);
    const { data, mdxContent } = await compileFile(fullPath);

    return {
      id: slug,
      ...data,
      content: mdxContent,
    } as BlogPost;
  } catch {
    return null;
  }
}

