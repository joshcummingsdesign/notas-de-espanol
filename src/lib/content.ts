import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

const contentDirectory = path.join(process.cwd(), 'content');

export interface Page {
  slug: string;
  title: string;
  content: string;
}

export function getAllPages(): Page[] {
  const fileNames = fs.readdirSync(contentDirectory);
  const pages = fileNames
    .filter((fileName) => fileName.endsWith('.md'))
    .map((fileName) => {
      const slug = fileName.replace(/\.md$/, '');
      const fullPath = path.join(contentDirectory, fileName);
      const fileContents = fs.readFileSync(fullPath, 'utf8');
      const { data, content } = matter(fileContents);

      return {
        slug: slug === 'index' ? '' : slug,
        title: data.title || slug,
        content,
      };
    });

  return pages.sort((a, b) => {
    if (a.slug === '') return -1;
    if (b.slug === '') return 1;
    return a.title.localeCompare(b.title);
  });
}

export function getPageBySlug(slug: string): Page | null {
  const fileName = slug === '' ? 'index.md' : `${slug}.md`;
  const fullPath = path.join(contentDirectory, fileName);

  if (!fs.existsSync(fullPath)) {
    return null;
  }

  const fileContents = fs.readFileSync(fullPath, 'utf8');
  const { data, content } = matter(fileContents);

  return {
    slug,
    title: data.title || slug,
    content,
  };
}

export function getAllSlugs(): string[] {
  const pages = getAllPages();
  return pages.map((page) => page.slug);
}
