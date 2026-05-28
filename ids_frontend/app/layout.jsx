import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "../lib/context/ThemeContext";
import { AuthProvider } from "../lib/auth/auth";
import Navbar from "../components/Navbar/Navbar";
import Footer from "../components/Footer/Footer";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
});

import SplashScreen from "../components/Loader/SplashScreen";

export const metadata = {
  title: "Hybrid IDS",
  description: "Hybrid CNN & ConvNeXt-Tiny IDS for IoT Networks",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body suppressHydrationWarning className={`${inter.variable} ${jetbrainsMono.variable} min-h-screen bg-gray-200 dark:bg-black sm:bg-gray-50 sm:dark:bg-gray-900 transition-colors duration-300 font-sans flex items-center justify-center sm:block`}>
        <div className="w-full sm:w-full h-[100dvh] sm:h-auto sm:min-h-screen max-w-[345px] max-h-[640px] sm:max-w-none sm:max-h-none bg-gray-50 dark:bg-gray-900 shadow-2xl sm:shadow-none overflow-x-hidden overflow-y-auto relative flex flex-col mx-auto">
          <SplashScreen>
            <ThemeProvider>
              <AuthProvider>
                <Navbar />
                <main className="flex-grow">
                  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                    {children}
                  </div>
                </main>
                <Footer />
              </AuthProvider>
            </ThemeProvider>
          </SplashScreen>
        </div>
      </body>
    </html>
  );
}
