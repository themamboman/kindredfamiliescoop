import './globals.css';
import type { ReactNode } from "react";
import { Merriweather, Open_Sans } from 'next/font/google';

const headingFont = Merriweather({
  weight: ['400', '700'],
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-heading',
});

const bodyFont = Open_Sans({
  weight: ['400', '600'],
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-body',
});

interface RootLayoutProps {
  children: ReactNode;
};

export const metadata = {
  title: 'Kindred Families Homeschool Co-op',
  description: 'A supportive community for homeschooling families.',
};

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en" className={`${headingFont.variable} ${bodyFont.variable}`}>
      <body className="font-body bg-gray-100 text-gray-800">{children}</body>
    </html>
  );
}
/*
export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${headingFont.variable} ${bodyFont.variable}`}>
      <body className="font-body bg-gray-100 text-gray-800">{children}</body>
    </html>
  )
};
*/
