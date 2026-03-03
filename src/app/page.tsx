import { getPageBySlug } from '@/lib/content';
import { MarkdownContent } from '@/components/MarkdownContent';
import { notFound } from 'next/navigation';

const HomePage = () => {
  const page = getPageBySlug('');

  if (!page) {
    notFound();
  }

  return <MarkdownContent content={page.content} />;
};

export default HomePage;
