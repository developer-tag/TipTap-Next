// src/app/layout.tsx
import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

// Configure fonts with more explicit options
const geistSans = localFont({
  src: [
    {
      path: './fonts/GeistVF.woff',
      style: 'normal',
    }
  ],
  display: 'swap',
  preload: true,
  fallback: ['system-ui', 'sans-serif'],
});

const geistMono = localFont({
  src: [
    {
      path: './fonts/GeistMonoVF.woff',
      style: 'normal',
    }
  ],
  display: 'swap',
  preload: true,
  fallback: ['monospace'],
});

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // Use try-catch to handle potential font loading issues
  try {
    return (
      <html lang="en">
        <body className={`font-sans antialiased ${geistSans?.className || ''} ${geistMono?.className || ''}`}>
          {children}
        </body>
      </html>
    );
  } catch (error) {
    console.error("Error loading font:", error);
    // Fallback rendering if font loading fails
    return (
      <html lang="en">
        <body className="font-sans antialiased">
          {children}
        </body>
      </html>
    );
  }
}