import type { Metadata } from "next";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v14-appRouter";
import "./globals.css";
import { ThemeProvider } from "@mui/material/styles";
import { theme } from "@/app/_theme/theme";
import { QueryProvider } from "@/app/_providers/QueryProvider";

export const metadata: Metadata = {
  title: "Pokemon trainer creator",
  description: "Create your trainer identity and catch them all!",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <QueryProvider>
          <AppRouterCacheProvider>
            <ThemeProvider theme={theme}>{children}</ThemeProvider>
          </AppRouterCacheProvider>
        </QueryProvider>
      </body>
    </html>
  );
}
