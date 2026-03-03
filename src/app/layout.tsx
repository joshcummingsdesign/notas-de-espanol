import { ThemeRegistry } from "@/components/ThemeRegistry";
import { Layout } from "@/components/Layout";
import { getAllPages } from "@/lib/content";

export const metadata = {
  title: "Notas de Español",
  description: "Spanish language learning notes",
};

const RootLayout = ({ children }: { children: React.ReactNode }) => {
  const pages = getAllPages();

  return (
    <html lang="en">
      <body>
        <ThemeRegistry>
          <Layout pages={pages}>{children}</Layout>
        </ThemeRegistry>
      </body>
    </html>
  );
};

export default RootLayout;
