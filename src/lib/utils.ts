import type { IUserState } from "@/store/slice/user.slice";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * A utility function that merges multiple class names into one.
 */
export function cn(...inputs: Array<ClassValue>): string {
  return twMerge(clsx(inputs));
}

/**
 * Checks if the current environment is production.
 *
 * @returns {boolean} True if the current environment is production, false otherwise.
 */
export const isProduction = import.meta.env.MODE === "production";

export const getUserDetails = (): IUserState => {
  const userDetails = localStorage.getItem("user_details");

  if (userDetails && typeof userDetails === "string") {
    return JSON.parse(userDetails) as IUserState;
  }
  return {
    fullname: "",
    email: "",
    uid: "",
    accessToken: "",
    expiresIn: 0,
    tokenType: "",
    isAuthenticated: true,
  };
};

export const setUserDetails = (userDetails: IUserState) => {
  localStorage.setItem("user_details", JSON.stringify(userDetails));
};

export const removeUser = () => {
  localStorage.removeItem("user_details");
};
