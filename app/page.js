import useTranslation from "./translator/useTranslator";

export default function Home() {
  const t = useTranslation('en');
  return (
    <>
    <h1>{t('heading')}</h1>
    </>
  )
}
