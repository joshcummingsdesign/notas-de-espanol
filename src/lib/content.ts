import fs from "fs";
import path from "path";
import matter from "gray-matter";

const contentDirectory = path.join(process.cwd(), "content");

export interface Page {
  slug: string;
  title: string;
  content: string;
  category?: string;
}

export interface CategoryGroup {
  name: string;
  pages: Page[];
}

export const getAllPages = (): Page[] => {
  const fileNames = fs.readdirSync(contentDirectory);
  const pages = fileNames
    .filter((fileName) => fileName.endsWith(".md"))
    .map((fileName) => {
      const slug = fileName.replace(/\.md$/, "");
      const fullPath = path.join(contentDirectory, fileName);
      const fileContents = fs.readFileSync(fullPath, "utf8");
      const { data, content } = matter(fileContents);

      return {
        slug: slug === "index" ? "" : slug,
        title: data.title || slug,
        content,
        category: data.category,
      };
    });

  return pages.sort((a, b) => {
    if (a.slug === "") return -1;
    if (b.slug === "") return 1;
    return a.title.localeCompare(b.title);
  });
};

export const getPageBySlug = (slug: string): Page | null => {
  const fileName = slug === "" ? "index.md" : `${slug}.md`;
  const fullPath = path.join(contentDirectory, fileName);

  if (!fs.existsSync(fullPath)) {
    return null;
  }

  const fileContents = fs.readFileSync(fullPath, "utf8");
  const { data, content } = matter(fileContents);

  return {
    slug,
    title: data.title || slug,
    content,
    category: data.category,
  };
};

export const getAllSlugs = (): string[] => {
  const pages = getAllPages();
  return pages.map((page) => page.slug);
};

export const groupPagesByCategory = (
  pages: Page[],
): { categories: CategoryGroup[]; uncategorized: Page[] } => {
  const groups = new Map<string, Page[]>();
  const uncategorized: Page[] = [];

  pages.forEach((page) => {
    if (page.slug === "") return;
    if (page.category) {
      const existing = groups.get(page.category) || [];
      groups.set(page.category, [...existing, page]);
    } else {
      uncategorized.push(page);
    }
  });

  const categories = Array.from(groups.entries())
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([name, categoryPages]) => ({
      name,
      pages: categoryPages.sort((a, b) => a.title.localeCompare(b.title)),
    }));

  return { categories, uncategorized };
};
