export type IRole = {
  id: string;
  name: string;
  created_at: string;
  updated_at: string;
  deleted_at: string | null;
};

export type IUser = {
  id: string;
  created_at: string;
  updated_at: string;
  deleted_at: string | null;
  fullname: string;
  email: string;
  phone: string | null;
  is_active: boolean;
  is_blocked: boolean;
  role_id: string;
  team_id: string | null;
  upload_id: string | null;
  role: IRole;
  upload: null;
  sessions: Array<{
    id: string;
    created_at: string;
    updated_at: string;
    user_id: string;
    token: string;
    ip_address: string;
    device: string;
    platform: string;
    latitude: string | null;
    longitude: string | null;
  }>;
};

export type ITeam = IRole & {
  description: string;
  team_lead: string;
};

export type IProject = IRole & {
  description: string;
};

// "data": {
//     "id": "bb0fe7e5-4dab-4e11-b725-2ca00857a001",
//     "user_id": "ea4f473e-0499-428c-8a89-ad01ed4ccabc",
//     "project_id": "2e79e8b2-e25f-4f7d-a0cc-77dc75cb3eff",
//     "date": "2022-06-17T11:06:50.369Z",
//     "work_type": "WFH",
//     "description": "sample",
//     "hours": 3,
//     "updated_at": "2024-10-20T08:09:33.548Z",
//     "created_at": "2024-10-20T08:09:33.548Z",
//     "deleted_at": null
//   }

export type ITimesheet = Omit<IRole, "name"> & {
  user_id: string;
  project_id: string;
  date: string;
  work_type: string;
  description: string;
  hours: number;
};
