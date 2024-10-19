/* eslint-disable @typescript-eslint/no-explicit-any */
import type { EndpointBuilder } from "@reduxjs/toolkit/query";
import type { IUser } from "./types";
import type { BaseResponse, PaginationPayload } from "../types";

type UsersResponse = BaseResponse & {
  data: Array<IUser>;
  total: number;
};

const getUsers = (endpoint: EndpointBuilder<any, any, any>) =>
  endpoint.query<
    UsersResponse,
    | {
        pagination?: PaginationPayload;
      }
    | undefined
  >({
    query: () => {
      return {
        url: "/user",
        method: "GET",
      };
    },
  });

export default getUsers;
