import { RootProvider } from 'fumadocs-ui/provider/next';
import './global.css';
import { Poppins } from "next/font/google";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";
const searchAPI = `${basePath}/api/search`;
const searchType = process.env.GITHUB_PAGES === "true" ? "static" : "fetch";


export default function Layout({ children }: LayoutProps<'/'>) {
  return (
    <html lang="en" className={poppins.className} suppressHydrationWarning>
      <body className="flex flex-col min-h-screen">
        <RootProvider search={{ options: { api: searchAPI, type: searchType } }}>
          {children}
        </RootProvider>
      </body>
    </html>
  );
}
