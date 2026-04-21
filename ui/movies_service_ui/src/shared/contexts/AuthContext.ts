import { createContext } from "react";
import type { AuthContextValue } from "../types/AuthContextValue";

export const AuthContext = createContext<AuthContextValue | null>(null);