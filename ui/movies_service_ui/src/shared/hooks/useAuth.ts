import { useAuthContext } from "@/shared/hooks/useAuthContext";

export const useAuth = () => {
    const {user, login, logout} = useAuthContext();

    return {
        user,
        isAuthenticated: Boolean(user),
        login,
        logout
    }
}