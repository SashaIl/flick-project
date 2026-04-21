import { useContext } from "react"
import type { AuthContextValue } from "../types/AuthContextValue"
import { AuthContext } from "../contexts/AuthContext"

export const useAuthContext = () => {
    const ctx = useContext<AuthContextValue | null>(AuthContext);
    if(!ctx){
        throw new Error("Context is missing!");
    }
    return ctx;
}