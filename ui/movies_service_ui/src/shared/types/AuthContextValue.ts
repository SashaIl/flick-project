import type { UserType } from "./UserType";

export type AuthContextValue = {
    user: UserType | null,
    login: (token: string) => void,
    logout: () => void
}