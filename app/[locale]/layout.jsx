import Navbar from '@/components/Navbar';
import '@/assets/styles/globals.css';
import Footer from '@/components/Footer';
import LanguageChanger from '@/components/LanguageChanger';
import TranslationsProvider from '@/components/TranslationsProvider';
import initTranslations from '../u18n';
import { dir } from 'i18next';
import i18nConfig from '@/i18nConfig';

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

export function generateStaticParams() {
  return i18nConfig.locales.map((locale) => ({ locale }));
}

const MainLayout = async ({ children, params: { locale } }) => {
  const { t, resources } = await initTranslations(locale, i18nNamespaces);

  return (
    <TranslationsProvider
      resources={resources}
      locale={locale}
      namespaces={i18nNamespaces}
    >
      <html lang={locale} dir={dir(locale)}>
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
