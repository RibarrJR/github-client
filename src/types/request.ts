import { GitUserResponse } from "./git";

export type ResponseError = {
    status: number;
    message: string;
  };

  export type ResponseSuccess = {
    data: Partial<GitUserResponse>;
    status: number;
  };