import initTranslations from '../u18n';
import TranslationsProvider from '@/components/TranslationsProvider';
import HomePageComponent from '@/components/HomePageComponent';
import LanguageChanger from '@/components/LanguageChanger';

const i18nNamespaces = ['home', 'common'];

const HomePage = async ({ params: { locale } }) => {
  const { t, resources } = await initTranslations(locale, i18nNamespaces);

  return (
    <TranslationsProvider
      resources={resources}
      locale={locale}
      namespaces={i18nNamespaces}
    >
      <HomePageComponent />
    </TranslationsProvider>
  );
};

export default HomePage;
