import { api } from "..";
import getTimeSheetByDates from "./get-timesheet-by-dates";

export const timesheetApi = api.injectEndpoints({
  endpoints: (build) => ({
    getTimeSheetByDates: getTimeSheetByDates(build),
  }),
  overrideExisting: false,
});

export const { useLazyGetTimeSheetByDatesQuery } = timesheetApi;
