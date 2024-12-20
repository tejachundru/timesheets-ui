import { api } from "..";
import getRoles from "./get-roles";
import getUsers from "./get-users";
import getTeams from "./get-teams";
import getProjects from "./get-projects";
import getTimesheet from "./get-timesheet";
import createTimesheet from "./create-timesheet";

export const adminApi = api.injectEndpoints({
  endpoints: (build) => ({
    getRoles: getRoles(build),
    getUsers: getUsers(build),
    getTeams: getTeams(build),
    getProjects: getProjects(build),
    getTimesheet: getTimesheet(build),
    createTimesheet: createTimesheet(build),
  }),
  overrideExisting: false,
});

export const {
  useLazyGetRolesQuery,
  useLazyGetUsersQuery,
  useLazyGetTeamsQuery,
  useLazyGetProjectsQuery,
  useLazyGetTimesheetQuery,
  useCreateTimesheetMutation,
} = adminApi;
