/* eslint-disable @typescript-eslint/no-explicit-any */
import type { EndpointBuilder } from "@reduxjs/toolkit/query";
import type { IRole } from "./types";
import type { BaseResponse, PaginationPayload } from "../types";

type RolesResponse = BaseResponse & {
  message: string;
  data: Array<IRole>;
  total: number;
};

const getRoles = (endpoint: EndpointBuilder<any, any, any>) =>
  endpoint.query<
    RolesResponse,
    | {
        pagination?: PaginationPayload;
      }
    | undefined
  >({
    query: () => {
      return {
        url: "/role",
        method: "GET",
      };
    },
  });

export default getRoles;
