/* eslint-disable @typescript-eslint/no-explicit-any */
import type { EndpointBuilder } from "@reduxjs/toolkit/query";
import type { ITeam } from "./types";
import type { BaseResponse, PaginationPayload } from "../types";

type RolesResponse = BaseResponse & {
  message: string;
  data: Array<ITeam>;
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
        url: "/team",
        method: "GET",
      };
    },
  });

export default getRoles;
