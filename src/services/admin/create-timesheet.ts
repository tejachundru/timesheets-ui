/* eslint-disable @typescript-eslint/no-explicit-any */
import type { EndpointBuilder } from "@reduxjs/toolkit/query";

export type CreateTimesheetPayload = {
  user_id: string;
  project_id: string;
  date: Date;
  work_type: string;
  description: string;
  hours: number;
};

const createTimesheet = (endpoint: EndpointBuilder<any, any, any>) =>
  endpoint.mutation<any, CreateTimesheetPayload>({
    query: (data) => ({
      url: "/timesheet",
      method: "POST",
      body: data,
    }),
  });

export default createTimesheet;
