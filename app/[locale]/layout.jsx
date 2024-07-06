import Navbar from '@/components/Navbar';
import '@/assets/styles/globals.css';
import Footer from '@/components/Footer';
import LanguageChanger from '@/components/LanguageChanger';
import TranslationsProvider from '@/components/TranslationsProvider';
import initTranslations from '../u18n';

const i18nNamespaces = ['home', 'common', 'navbar'];

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

const MainLayout = async ({ children, params: { locale } }) => {
  const { t, resources } = await initTranslations(locale, i18nNamespaces);

  return (
    <TranslationsProvider
      resources={resources}
      locale={locale}
      namespaces={i18nNamespaces}
    >
      <html lang='en-US'>
        <body>
          <Navbar />
          <main>{children}</main>
          <Footer />
        </body>
      </html>
    </TranslationsProvider>
  );
};

export default MainLayout;
