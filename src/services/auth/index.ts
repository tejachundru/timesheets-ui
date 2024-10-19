import { api } from "..";
import signIn from "./sign-in";

export const authApi = api.injectEndpoints({
  endpoints: (build) => ({
    signIn: signIn(build),
  }),
  overrideExisting: false,
});

export const { useSignInMutation } = authApi;
