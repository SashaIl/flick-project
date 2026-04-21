
export const sendCodeService = async (userId: number) => {
    const request = await fetch(`http://localhost:7159/api/user/send_verification_code?userId=${userId}`,{
        method: "GET",
        headers: {
            'Content-Type': 'application/json',
            "Authorization": "Bearer"
        }
    })

    const response = await request.json()
    
    if(!request.ok){
        throw new Error(response["message"] ?? "Fetch error");
    }

    return response["data"];
} 