/* eslint-disable @typescript-eslint/no-explicit-any */
import type { EndpointBuilder } from "@reduxjs/toolkit/query";
import type { IProject } from "./types";
import type { BaseResponse, PaginationPayload } from "../types";

type ProjectsResponse = BaseResponse & {
  message: string;
  data: Array<IProject>;
  total: number;
};

const getProjects = (endpoint: EndpointBuilder<any, any, any>) =>
  endpoint.query<
    ProjectsResponse,
    | {
        pagination?: PaginationPayload;
      }
    | undefined
  >({
    query: () => {
      return {
        url: "/project",
        method: "GET",
      };
    },
  });

export default getProjects;
