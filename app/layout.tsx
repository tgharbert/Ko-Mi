import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Providers from "./components/Providers";
import Appbar from "./components/Appbar";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v13-appRouter";

const inter = Inter({ subsets: ["latin"] });

const APP_NAME = "Ko-Mi";
const APP_DEFAULT_TITLE = "Ko-Mi";
const APP_TITLE_TEMPLATE = "%s - Ko-Mi";
const APP_DESCRIPTION = "Your kitchen companion!";

export const metadata: Metadata = {
  applicationName: APP_NAME,
  title: {
    default: APP_DEFAULT_TITLE,
    template: APP_TITLE_TEMPLATE,
  },
  description: APP_DESCRIPTION,
  manifest: "./manifest.json",
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: APP_NAME,
    // startUpImage: [],
  },
  formatDetection: {
    telephone: false,
  },
  openGraph: {
    type: "website",
    siteName: "ko-mi.io",
    title: {
      default: APP_DEFAULT_TITLE,
      template: "",
    },
    description: APP_DESCRIPTION,
  },
  twitter: {
    card: "summary",
    title: {
      default: APP_DEFAULT_TITLE,
      template: APP_DEFAULT_TITLE,
    },
    description: APP_DESCRIPTION,
  },
};

export const viewport: Viewport = {
  themeColor: "#233329",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="bg-primary font-roboto text-tertiary overflow-y-scroll h-lvh ">
        <AppRouterCacheProvider>
          <Providers>
            <Appbar />
            {children}
          </Providers>
        </AppRouterCacheProvider>
      </body>
    </html>
  );
}
