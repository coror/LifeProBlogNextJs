import Navbar from '@/components/Navbar';
import '@/assets/styles/globals.css';
import Footer from '@/components/Footer';

export const metadata = {
  title: 'LifePlus | Home',
  description: 'Find your dream blog read',
  keywords: 'blog, fintness, health, lifestyle',
};

const MainLayout = ({ children }) => {
  return (
    <html lang='en'>
      <body>
        <Navbar />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
};

export default MainLayout;
