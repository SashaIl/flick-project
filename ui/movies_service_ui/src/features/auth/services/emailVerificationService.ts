export const IsStringGuid = (str: string): boolean => {
    const regex = new RegExp(/^[{]?[0-9a-fA-F]{8}-([0-9a-fA-F]{4}-){3}[0-9a-fA-F]{12}[}]?$/);
    
    if(str == null){return false;}

    return regex.test(str);
}

export const fetchCheckVerificationCode = async (token: string, code: string) => {

    const request = await fetch(`http://localhost:7159/api/user/check_verification?token=${token}&code=${code}`,{
        method: "GET",
        headers: {
            'Content-Type': 'application/json',
            "Authorization": "Bearer"
        }
    });
    const response = await request.json()
    
    if(!request.ok){
        throw new Error(response["message"] ?? "Fetch error");
    }

    return response["data"];
}

export const fetchSendVerificationCode = async (token: string) => {
debugger
    const request = await fetch(`http://localhost:7159/api/user/send_verification_code?token=${token}`,{
        method: "GET",
        headers: {
            'Content-Type': 'application/json',
            "Authorization": "Bearer"
        }
    });
    const response = await request.json()
    
    if(!request.ok){
        throw new Error(response["message"] ?? "Fetch error");
    }

    return response["data"];
}