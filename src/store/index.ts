import { api } from "@/services";
import { combineReducers, configureStore } from "@reduxjs/toolkit";
import {
  useSelector as useReduxSelector,
  type TypedUseSelectorHook,
} from "react-redux";

// ======== Slices ======== //
import themeSlice from "@/store/slice/theme.slice";
import userSlice from "@/store/slice/user.slice";

/**
 * Combine all slices into one
 */
const rootReducer = combineReducers({
  // add your reducers here ..
  theme: themeSlice,
  user: userSlice,

  //App service reducer
  [api.reducerPath]: api.reducer,
});

const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(api.middleware),
});

export default store;
export type RootState = ReturnType<typeof store.getState>;

export const useSelector: TypedUseSelectorHook<RootState> = useReduxSelector;
