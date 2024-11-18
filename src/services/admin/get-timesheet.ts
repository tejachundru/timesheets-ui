/* eslint-disable @typescript-eslint/no-explicit-any */
import type { EndpointBuilder } from "@reduxjs/toolkit/query";
import type { ITimesheet } from "./types";
import type { BaseResponse, PaginationPayload } from "../types";

type TimesheetResponse = BaseResponse & {
  message: string;
  data: Array<ITimesheet>;
  total: number;
};

const getTimesheet = (endpoint: EndpointBuilder<any, any, any>) =>
  endpoint.query<
    TimesheetResponse,
    {
      pagination?: PaginationPayload;
      userId: string;
    }
  >({
    query: ({ userId, pagination }) => {
      return {
        url: "/timesheet",
        method: "GET",
        params: {
          filtered: JSON.stringify([{ id: "user_id", value: userId ?? "" }]),
          page: pagination?.pageIndex ?? 1,
          pageSize: pagination?.pageSize ?? 10,
        },
      };
    },
  });

export default getTimesheet;
