import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "../lib/context/ThemeContext";
import { AuthProvider } from "../lib/auth/auth";
import LayoutWrapper from "../components/LayoutWrapper/LayoutWrapper";
import { MotionConfig } from "framer-motion";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "IntrusionX",
  description: "Hybrid CNN & ConvNeXt-Tiny IDS for IoT Networks",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body suppressHydrationWarning className={`${inter.variable} ${jetbrainsMono.variable} min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-300 font-sans`}>
        <div className="w-full min-h-screen flex flex-col">
          <MotionConfig transition={{ duration: 0 }} reducedMotion="always">
            <ThemeProvider>
              <AuthProvider>
                <LayoutWrapper>
                  {children}
                </LayoutWrapper>
              </AuthProvider>
            </ThemeProvider>
          </MotionConfig>
        </div>
      </body>
    </html>
  );
}
