/* eslint-disable @typescript-eslint/no-explicit-any */
import type { EndpointBuilder } from "@reduxjs/toolkit/query";
import type { BaseResponse } from "../types";

type LoginResponse = BaseResponse & {
  accessToken: string;
  expiresIn: number;
  tokenType: string;
  user: {
    uid: string;
  };
  fullname: string;
  email: string;
};

const signIn = (endpoint: EndpointBuilder<any, any, any>) =>
  endpoint.mutation<LoginResponse, { email: string; password: string }>({
    query: (credentials) => ({
      url: "/auth/sign-in",
      method: "POST",
      body: {
        email: credentials.email,
        password: credentials.password,
        latitude: null,
        longitude: null,
      },
    }),
  });

export default signIn;
