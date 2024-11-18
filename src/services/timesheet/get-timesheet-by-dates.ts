/* eslint-disable camelcase */
/* eslint-disable @typescript-eslint/no-explicit-any */
import type { EndpointBuilder } from "@reduxjs/toolkit/query";
import type { BaseResponse } from "../types";
import type { ITimesheet } from "../admin/types";

type TimesheetResponse = BaseResponse & {
  message: string;
  data: Array<Pick<ITimesheet, "id" | "date">>;
};

const getTimesheetByDates = (endpoint: EndpointBuilder<any, any, any>) =>
  endpoint.query<
    TimesheetResponse,
    {
      userId: string;
      startDate: string;
      endDate: string;
    }
  >({
    query: ({ userId, startDate, endDate }) => {
      return {
        url: "/timesheet/find/id-for-user-between-dates",
        method: "GET",
        params: {
          user_id: userId,
          start_date: startDate,
          end_date: endDate,
        },
      };
    },
  });

export default getTimesheetByDates;
