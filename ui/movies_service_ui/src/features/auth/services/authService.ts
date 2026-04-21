import type { UserType } from "@/shared/types/UserType";

const TOKEN_NAME = "t";

export const getUserByToken = (): UserType | null => {
    
    
    const token = localStorage.getItem(TOKEN_NAME) ;

    if(!token){
        return null;
    }
    try{
        const payloadBase64 = token.split(".")[1];
        const payloadJson = atob(payloadBase64);
        const response = payloadJson ? JSON.parse(payloadJson) : null;
        console.log(response);
        
        const user: UserType = {
            Id: response.sub,
            Email: response.email,
            Name: response.name,
            Surname: response.surname,
            IsEmailVerified: response.isEmailVerified === "True" ? true : false
        };
        return user;
    }
    catch(error){
        console.log(error);
    }
    return null;
}


export const setToken = (token: string): void => {
    if(token){
        localStorage.setItem(TOKEN_NAME, token);
    }
    else{
        throw new Error("Token equals zero!")
    }
}

export const removeToken = () => {
    localStorage.removeItem(TOKEN_NAME);
}
