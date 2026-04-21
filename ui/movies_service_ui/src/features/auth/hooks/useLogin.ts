import { useMutation } from "@tanstack/react-query"
import { ensureLogin } from "../services/loginService"
import type { UserLogin } from "../types/UserLogin"
import { useAuth } from "../../../shared/hooks/useAuth";
import { useToast } from "@/shared/hooks/useToast";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

export const useLogin = () => {
    
    const {login,isAuthenticated} = useAuth();
    const {showToast} = useToast();
    const navigate = useNavigate();
    
    useEffect(() => {
        if(isAuthenticated){
            navigate("/")
        }
    }, [isAuthenticated]);

    const {mutate: mutate, isPending} = useMutation({
        mutationFn: async (user: UserLogin) =>  {
            let response = await ensureLogin(user);
            if(!response){
                showToast({status:"error", title: `Failed login`})
            }
            return response;
        },
        onError: (message: string) => {
            showToast({status:"error", title: `${message}`})
            return;
        }, 
        onSuccess: (token:string) => {
            showToast({status:"success", title: `Succesfully log in`})
            login(token);
            navigate
        }
    })

    const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        
        if(isPending){ return; }
        e.preventDefault();

        const currForm = e.currentTarget;

        const pass = currForm.Password.value;
        const email = currForm.Email.value;

        if( email.length > 50 || pass.length > 50 ){
            showToast({status:"error", title: `Invalid credentials length`})
            return;
        }

        const user: UserLogin = {
            Email: email,
            Password: pass,
        }

        mutate(user);
    }

    return {onSubmit,isPending}
}