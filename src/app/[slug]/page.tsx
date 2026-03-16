import { Metadata } from "next";
import { getPageBySlug, getAllSlugs } from "@/lib/content";
import { MarkdownContent } from "@/components/MarkdownContent";
import { notFound } from "next/navigation";

interface Props {
  params: Promise<{ slug: string }>;
}

export const generateMetadata = async ({ params }: Props): Promise<Metadata> => {
  const { slug } = await params;
  const page = getPageBySlug(slug);
  return {
    title: page ? `${page.title} | Notas de Español` : "Notas de Español",
  };
};

export const generateStaticParams = async () => {
  const slugs = getAllSlugs();
  return slugs.filter((slug) => slug !== "").map((slug) => ({ slug }));
};

const NotePage = async ({ params }: Props) => {
  const { slug } = await params;
  const page = getPageBySlug(slug);

  if (!page) {
    notFound();
  }

  return <MarkdownContent content={page.content} />;
};

export default NotePage;
