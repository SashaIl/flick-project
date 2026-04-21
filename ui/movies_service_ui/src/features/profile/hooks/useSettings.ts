import { useAuth } from "@/shared/hooks/useAuth";
import { useMutation } from "@tanstack/react-query";
import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { changePassService } from "../services/changePassService";
import { useToast } from "@/shared/hooks/useToast";

export const useSettings = () => {

    const {logout, user} = useAuth();
    const navigate = useNavigate();
    const {showToast} = useToast();

    const [passwordOpen, setPasswordOpen] = useState(false);
    const [logoutConfirm, setLogoutConfirm] = useState(false);
    const [showCurrent, setShowCurrent] = useState(false);
    const [showNew, setShowNew] = useState(false);
    const [showConfirm, setShowConfirm] = useState(false);


    const changePassInfo = useMemo(()=>(
        [
            { name: "oldPass", label: "Current password", show: showCurrent, toggle: () => setShowCurrent(!showCurrent) },
            { name: "newPass", label: "New password", show: showNew, toggle: () => setShowNew(!showNew) },
            { name: "confirmedNewPass", label: "Confirm new password", show: showConfirm, toggle: () => setShowConfirm(!showConfirm) },
        ]
    ),[showCurrent,showNew,showConfirm])

    const { mutate, isPending } = useMutation({
        mutationFn: async ({ oldPass, newPass, userId }: { oldPass: string; newPass: string, userId: number }) =>
            await changePassService(userId, oldPass, newPass),
        onError: (error: Error) => {
            showToast({status:"error",title:error.message});
            return;
        },
        onSuccess: () => {
            showToast({status:"success",title:"Successfully changed"});
            return;
        }
    })


    const handleLogout = () => {
        logout();
        navigate("/");
    }

    const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        console.log("submit");
        e.preventDefault();

        if(isPending){ return; }

        const currForm = e.currentTarget;

        
        const oldPass: string = currForm.oldPass.value;
        const newPass: string = currForm.newPass.value;
        const confirmedNewPass: string = currForm.confirmedNewPass.value;

        if(oldPass.length < 6 || oldPass.length > 50){
            showToast({status:"error", title: "Invalid old password length"})
            return;
        }
        else if(newPass != confirmedNewPass){
            showToast({status:"error", title: "The passwords do not match"})
            return;
        }
        mutate({oldPass: oldPass, newPass: newPass, userId: user?.Id!});
    } 

    return {
        passwordOpen, 
        setPasswordOpen,
        logoutConfirm,
        setLogoutConfirm,
        changePassInfo,
        handleLogout,
        onSubmit
    }
} 