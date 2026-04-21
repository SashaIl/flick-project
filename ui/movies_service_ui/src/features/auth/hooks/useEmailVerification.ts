import { useEffect, useRef, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom"
import { fetchCheckVerificationCode, fetchSendVerificationCode, IsStringGuid } from "../services/emailVerificationService";
import { useMutation } from "@tanstack/react-query";
import { useToast } from "@/shared/hooks/useToast";
import { useAuth } from "@/shared/hooks/useAuth";

const CODE_LENGTH = 6;

export const useEmailVerification = () => {

    const {logout} = useAuth();
    const navigate = useNavigate();
    const [searchParam] = useSearchParams();
    const {showToast} = useToast();
    
    const [token, setToken] = useState<string | null>();
    const [isTokenValid, setIsTokenValid] = useState<boolean>(false);
    const [code, setCode] = useState(Array(6).fill(""));

    const inputRefs = useRef<(HTMLInputElement | null)[]>([]);
    
    useEffect(() => {
        const row = searchParam.get("token") ?? "";
        const isValid = IsStringGuid(row);
        setIsTokenValid(isValid);
        setToken(isValid ? row : null);

    }, [searchParam]);


    const checkVerCode = useMutation({
        mutationFn: (code:string) => fetchCheckVerificationCode(token!,code),
        onError: (error: Error) => showToast({status:"error", title: error.message}),
        onSuccess: () => {
            showToast({status: "success", title: "Email verified"});
            logout();
            navigate("/login")
        }
    })

    const {mutate: sendVerificationCode} = useMutation({
        mutationFn: () => fetchSendVerificationCode(token!),
        onError: (error: Error) => showToast({status:"error", title: error.message}),
        onSuccess: () => showToast({status: "success", title: "Code sent"})
    })


    const onChange = (id: number, value: string) => {
        
        const char = value.replace(/\D/g, "").slice(-1);
        const next = [...code];
        next[id] = char;
        setCode(next);

        if (char && id < CODE_LENGTH - 1) {
            inputRefs.current[id + 1]?.focus();
        }
    }

    const onPaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
        e.preventDefault();

        const text = e.clipboardData?.getData("text").replace(/\D/g, "").slice(0,6);
        const next = [...code];
        text?.split("").forEach((char, i) => {
            next[i] = char
        })

        setCode(next);
        inputRefs.current[5]?.focus();
    }

    const onClick = () => {
        console.log(code);
        if(checkVerCode.isPending){return;}
        
        if(code.some((x) => x == "")){
            showToast({status: "error", title: "Enter valid code"})
            return;
        }
        checkVerCode.mutate(code.join(""));
    }

    const isPending = checkVerCode.isPending;
    return {
        isTokenValid,
        code,
        isPending,
        inputRefs,
        onChange,
        onClick,
        onPaste,
        sendVerificationCode
    }
}