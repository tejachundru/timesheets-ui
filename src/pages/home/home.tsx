import { ContentLayout } from "@/components/admin-panel/content-layout";
import { useTranslation } from "react-i18next";

const Home: React.FC = () => {
  const { t } = useTranslation();

  return (
    <ContentLayout title={t("home.title")}>
      <div className="text-center h-screen flex flex-col items-center justify-center">
        <h1 className="mb-4 text-6xl font-semibold text-slate-600">
          {t("home.greeting")}
          <br />
        </h1>
      </div>
    </ContentLayout>
  );
};

export default Home;
