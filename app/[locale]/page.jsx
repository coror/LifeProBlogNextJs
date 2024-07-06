import initTranslations from '../u18n';
import TranslationsProvider from '@/components/TranslationsProvider';
import HomePageComponent from '@/components/HomePageComponent';

const i18nNamespaces = ['home', 'common'];

const HomePage = async ({ params: { locale } }) => {
  const { t, resources } = await initTranslations(locale, i18nNamespaces);

  return (
    <TranslationsProvider
      resources={resources}
      locale={locale}
      namespaces={i18nNamespaces}
    >
      <HomePageComponent currentLocale={locale}/>
    </TranslationsProvider>
  );
};

export default HomePage;
