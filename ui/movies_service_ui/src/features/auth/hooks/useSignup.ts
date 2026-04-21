import { useMutation } from "@tanstack/react-query"
import { ensureSignup } from "../services/signupService"
import type { UserSignup } from "../types/UserSignup"
import { useNavigate } from "react-router-dom"
import { useToast } from "@/shared/hooks/useToast"
import { useEffect } from "react"
import { useAuth } from "@/shared/hooks/useAuth"

export const useSignup = () => {

    const {isAuthenticated} = useAuth();
    const {showToast} = useToast();
    const navigate = useNavigate();

    
    useEffect(() => {
        if(isAuthenticated){
            navigate("/")
        }
    }, []);

    const {mutate: mutate, isPending} = useMutation({
        mutationFn: async (user: UserSignup) => {
            let response = await ensureSignup(user);
            if(!response){
                showToast({status: "success", title: `Error`, description:"Failed to signup"})
            }
            return response;
        },
        onError: (message: string) => {
            showToast({status: "error", title: `Error`, description: `${message}`})
            return;
        },
        onSuccess: (data) => {
            showToast({status: "success", title: "Succesfully signed up"})
            navigate(`/verifyEmail?token=${data}`)
        }
    })

    const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        
        if(isPending){ return }
        e.preventDefault();
        const currForm = e.currentTarget;
        
        const pass:string = currForm.Password.value.trim();
        const email:string = currForm.Email.value.trim();
        const name:string = currForm.Name.value.trim();
        const surname:string = currForm.Surname.value.trim();

        if(name.length < 2){
            showToast({status: "error", title: "Error", description: "Name must be at least 2 characters long"});
            return;
        }
        if(surname.length < 2){
            showToast({status: "error", title: "Error", description: "Surname must be at least 2 characters long"});
            return;
        }

        if( name.length > 20 || 
            surname.length > 20 ||
            email.length > 50 ||
            pass.length > 50    
        ){
            showToast({status: "error", title: "Error", description: "Invalid data Length"});
            return;
        }
        else if(/\d/.test(name)){
            showToast({status: "error", title: "Error", description: "Name cannot contain numbers"});
            return;
        }
        else if(/\d/.test(surname)){
            showToast({status: "error", title: "Error", description: "Surname cannot contain numbers"});
            return;
        }
        const user: UserSignup = {
            Surname: surname ,
            Name: name,
            Email: email,
            Password: pass,
        }

        mutate(user);
    }

    return {onSubmit,isPending}
}