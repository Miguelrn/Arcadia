import { createContext } from "react";

export type accessTokenContent = {
    accessToken: string
    setAccessToken:(c: string) => void
  }

export const UserContext = createContext<accessTokenContent>({
    accessToken: '',
    setAccessToken: () => {},
  });
