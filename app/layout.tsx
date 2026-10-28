import type { Metadata } from 'next';
import './globals.css';
export const metadata: Metadata = { title: 'M.P.Kamesh & P.Tharani | Flower Ceremony', description: 'With love and blessings, you are invited to our flower ceremony in Madurai.' };
export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
 return <html lang="en"><body>{children}</body></html>;
}
