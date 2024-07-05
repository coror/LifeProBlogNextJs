import Navbar from '@/components/Navbar';
import '@/assets/styles/globals.css';
import Footer from '@/components/Footer';
import { LanguageProvider } from './contexts/LanguageContext';

export const metadata = {
  title: 'LifePlus | Home',
  description: 'Find your dream blog read',
  metadataBase: process.env.NEXT_PUBLIC_DOMAIN,
  // openGraph: {
  //   images: [
  //     {
  //       url: 'https://nextjs.org/og.png', // Must be an absolute URL. UPDATE THIS!!
  //       width: 800,
  //       height: 600,
  //       alt: 'something',
  //     },
  //   ],
  // },
};

const MainLayout = ({ children }) => {
  return (
    <html lang='en'>
      <body>
        <LanguageProvider>
          <Navbar />
          <main>{children}</main>
          <Footer />
        </LanguageProvider>
      </body>
    </html>
  );
};

export default MainLayout;
