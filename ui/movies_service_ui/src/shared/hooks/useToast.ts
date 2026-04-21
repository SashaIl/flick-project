import { useToastContext } from "./useToastContext"

export const useToast = () => {
    const {showToast} = useToastContext();
    return {showToast};
}