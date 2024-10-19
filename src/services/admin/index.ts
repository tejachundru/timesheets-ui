import { api } from "..";
import getRoles from "./get-roles";
import getUsers from "./get-users";
import getTeams from "./get-teams";
import getProjects from "./get-projects";

export const userApi = api.injectEndpoints({
  endpoints: (build) => ({
    getRoles: getRoles(build),
    getUsers: getUsers(build),
    getTeams: getTeams(build),
    getProjects: getProjects(build),
  }),
  overrideExisting: false,
});

export const {
  useLazyGetRolesQuery,
  useLazyGetUsersQuery,
  useLazyGetTeamsQuery,
  useLazyGetProjectsQuery,
} = userApi;
