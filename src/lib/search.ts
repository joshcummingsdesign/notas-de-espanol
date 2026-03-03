interface Page {
  slug: string;
  title: string;
  content: string;
}

interface SearchResult {
  slug: string;
  title: string;
  snippet: string;
}

export const searchPages = (pages: Page[], query: string): SearchResult[] => {
  if (!query.trim()) {
    return [];
  }

  const lowerQuery = query.toLowerCase();
  const results: SearchResult[] = [];

  for (const page of pages) {
    const titleMatch = page.title.toLowerCase().includes(lowerQuery);
    const contentLower = page.content.toLowerCase();
    const contentMatch = contentLower.includes(lowerQuery);

    if (titleMatch || contentMatch) {
      let snippet = "";

      if (contentMatch) {
        const index = contentLower.indexOf(lowerQuery);
        const start = Math.max(0, index - 40);
        const end = Math.min(page.content.length, index + query.length + 40);
        snippet =
          (start > 0 ? "..." : "") +
          page.content.slice(start, end).trim() +
          (end < page.content.length ? "..." : "");
      } else {
        snippet = page.content.slice(0, 80).trim() + "...";
      }

      results.push({
        slug: page.slug,
        title: page.title,
        snippet,
      });
    }
  }

  return results;
};
