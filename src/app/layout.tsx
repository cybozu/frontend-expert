import "./app.css";
import "./theme.css";
import "prismjs/themes/prism.css";
import { Layout } from "../components/Layout";
type Props = {
  title?: string;
  slug?: string;
  description?: string;
  children: React.ReactNode;
};

export default function RootLayout({ children }: Props) {
  return (
    <html lang="ja">
      <body>
        <Layout>{children}</Layout>
      </body>
    </html>
  );
}
