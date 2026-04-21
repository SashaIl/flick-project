
export const changePassService = async (userId:number, oldPass: string, newPass: string): Promise<string>  => {
    const request = await fetch("http://localhost:7159/api/user/change_password",{
        method: "POST",
        body: JSON.stringify({
            userId: userId,
            oldPass: oldPass,
            newPass: newPass
        }),
        headers: {
            'Content-Type': 'application/json',
            "Authorization": "Bearer"
        },
    })
    
    if(request.ok){
        return ""
    }
    else{
        let data = (await request.json())["message"];
        
        throw new Error(data);
    }
}