import {
  getUserDetails,
  removeUser,
  setUserDetails as userDetails,
} from "@/lib/utils";
import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

export type IUserState = {
  fullname: string;
  email: string;
  uid: string;
  accessToken: string;
  expiresIn: number;
  tokenType: string;
  isAuthenticated: boolean;
};

const initialState: IUserState = getUserDetails();

const userSlice = createSlice({
  name: "theme",
  initialState,
  reducers: {
    setLoginDetails: (state, action: PayloadAction<IUserState>) => {
      state.fullname = action.payload.fullname;
      state.email = action.payload.email;
      state.uid = action.payload.uid;
      state.accessToken = action.payload.accessToken;
      state.expiresIn = action.payload.expiresIn;
      state.tokenType = action.payload.tokenType;
      if (state.accessToken) state.isAuthenticated = true;
      userDetails(state);
    },
    setUserDetails: (state, action: PayloadAction<IUserState>) => {
      state.fullname = action.payload.fullname;
      state.uid = action.payload.uid;
    },
    logoutUser: (state) => {
      console.log("logging out");
      state.fullname = "";
      state.email = "";
      state.uid = "";
      state.accessToken = "";
      state.expiresIn = 0;
      state.tokenType = "";
      state.isAuthenticated = false;
      removeUser();
    },
  },
});

export const { setLoginDetails, setUserDetails, logoutUser } =
  userSlice.actions;
export default userSlice.reducer;
