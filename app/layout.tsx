import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Providers from "./components/Providers";
import Appbar from "./components/Appbar";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v13-appRouter";

const inter = Inter({ subsets: ["latin"] });

const APP_NAME = "PWA App";
const APP_DEFAULT_TITLE = "My Awesome PWA App";
const APP_TITLE_TEMPLATE = "%s - PWA App";
const APP_DESCRIPTION = "Best PWA app in the world!";

// export const metadata: Metadata = {
//   title: "Ko-Mi",
//   description: "Your online kitchen companion!",
// };

export const metadata: Metadata = {
  applicationName: APP_NAME,
  title: {
    default: "Ko-Mi",
    template: APP_TITLE_TEMPLATE,
  },
  description: "Your kitchen companion!",
  manifest: "/manifest.json",
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "Ko-Mi",
    // startUpImage: [],
  },
  formatDetection: {
    telephone: false,
  },
  openGraph: {
    type: "website",
    siteName: APP_NAME,
    title: {
      default: "Ko-Mi",
      template: APP_TITLE_TEMPLATE,
    },
    description: APP_DESCRIPTION,
  },
  twitter: {
    card: "summary",
    title: {
      default: "Ko-Mi",
      template: APP_TITLE_TEMPLATE,
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
      {/* <body className={inter.className}> */}
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
