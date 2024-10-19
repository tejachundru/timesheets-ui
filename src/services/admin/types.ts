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
