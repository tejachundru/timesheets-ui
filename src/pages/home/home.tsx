import { ContentLayout } from "@/components/admin-panel/content-layout";
import { Calendar } from "@/components/ui/calendar";
import { useTranslation } from "react-i18next";
import { lastDayOfMonth } from "date-fns";
import { useLazyGetTimeSheetByDatesQuery } from "@/services/timesheet";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import type { RootState } from "@/store";

const Home: React.FC = () => {
  const { t } = useTranslation();
  const [getTimesheet, isLoading] = useLazyGetTimeSheetByDatesQuery();
  const { uid } = useSelector((state: RootState) => state.user);
  const [selectedDates, setSelectedDates] = useState<Array<Date>>([]);

  const getTimesheetByDates = (startDate: string, endDate: string) => {
    void getTimesheet({
      userId: uid,
      startDate,
      endDate,
    }).then((response) => {
      const { data } = response;
      if (data?.code === 200) {
        setSelectedDates(
          data.data.map((item: { date: string }) => new Date(item.date))
        );
      }
    });
  };

  useEffect(() => {
    const lastDay = lastDayOfMonth(new Date());
    const firstDayOfMonth = new Date(new Date().setDate(1));
    getTimesheetByDates(firstDayOfMonth.toISOString(), lastDay.toISOString());
  }, []);

  return (
    <ContentLayout title={t("home.title")}>
      <h3 className="text-2xl">
        {t("home.thisMonth")} ({selectedDates.length}
        <small className="text-sm"> filled</small>){" "}
      </h3>
      <div className="mt-4">
        <Calendar
          className="border-2 border-primary/30 rounded-md w-fit"
          defaultMonth={new Date()}
          mode="multiple"
          selected={selectedDates}
          showOutsideDays={false}
          classNames={{
            // eslint-disable-next-line camelcase
            day_selected: "border-2 border-green-500",
          }}
          disabled={{
            after: new Date(),
          }}
          onMonthChange={(date) => {
            getTimesheetByDates(
              new Date(date.setDate(1)).toISOString(),
              lastDayOfMonth(date).toISOString()
            );
          }}
        />
      </div>
    </ContentLayout>
  );
};

export default Home;
