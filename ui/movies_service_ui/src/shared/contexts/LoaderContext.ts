import { createContext } from "react";
import type { LoaderContextValue } from "../types/LoaderContextValue";

export const LoaderContext = createContext<LoaderContextValue | null>(null);