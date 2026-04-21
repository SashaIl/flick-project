import type { UserLogin } from "../types/UserLogin";

export const ensureLogin = async (user: UserLogin): Promise<string> => {
    const request = await fetch(`http://localhost:7159/api/user/login`, {
        method: "POST",
        headers: {
            'Content-Type': 'application/json',
            "Authorization": "Bearer"
        },
        body: JSON.stringify({
            email: user.Email,
            password: user.Password
        })
    })

    if(request.ok){
        return (await request.json())["data"]

    }
    else{
        const error = (await request.json())["message"];
        throw new Error(error);
    }    
}