import { useContext } from "react"
import type { ToastContextValue } from "../types/ToastContextValue"
import { ToastContext } from "../contexts/ToastContext"

export const useToastContext = () => {
    const ctx = useContext<ToastContextValue|null>(ToastContext);
    if(!ctx){
        throw new Error("Context is missing!");
    }
    return ctx;
}