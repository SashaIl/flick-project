import type { UserSignup } from "../types/UserSignup";

export const ensureSignup = async (user: UserSignup): Promise<string> =>  {
    const request = await fetch(`http://localhost:7159/api/user/create_user`, {
        method: "POST",
        headers: {
            'Content-Type': 'application/json',
            "Authorization": "Bearer"
        },
        body: JSON.stringify({
            name: user.Name,
            surname: user.Surname,
            email: user.Email,
            password: user.Password
        })
    })

    if(request.ok){
        console.log(request);
        
        return (await request.json())["data"]

    }
    else{
        const error = (await request.json())["message"];
        console.log(error);
        
        throw new Error(error);
    }
}