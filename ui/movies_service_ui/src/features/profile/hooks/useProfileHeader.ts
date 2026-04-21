import { useAuth } from "@/shared/hooks/useAuth";
import { useMutation } from "@tanstack/react-query";
import { sendCodeService } from "../services/sendCodeService";
import { useToast } from "@/shared/hooks/useToast";
import { useNavigate } from "react-router-dom";

export const useProfileHeader = () => {
    const {user} = useAuth();
    const {showToast} = useToast()
    const navigate = useNavigate();

    const {mutate: sendCode, isPending, isError} = useMutation({
        mutationFn: () =>  sendCodeService(user?.Id!),
        onSuccess: (token) => {
            showToast({status: "success", title: "Code has sent", description: "You will have to log in again"});
            navigate(`/verifyEmail?token=${token}`);
        },
        onError: (error) => {
            showToast({status: "error", title: `${error}`});
            return;
        } 
    })
    
    const onClick = () => {
        if(isPending) {return;}
        sendCode();
        if(isError){return;}
    }
    
    return {
        isEmailVerified: user?.IsEmailVerified,
        isPending,
        onClick
    }
}