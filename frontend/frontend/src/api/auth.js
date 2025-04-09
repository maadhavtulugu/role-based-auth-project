
const BASE_URL="http://localhost:8080/auth";

export const loginUser=async(email,password)=>{
    const res=await fetch(`${BASE_URL}/login`,{
        method:"POST",
        headers:{"Content-Type":"application/json"},
        body:JSON.stringify({email,password})
    });

    if(!res.ok){
        const errText=await res.text();
        throw new Error(errText || "Login Failed");
    }
    
    return await res.json();
}

export const registerUser =async(username,email,password,role)=>{

    const res=await fetch("http://localhost:8080/auth/register",{
        method:"POST",
        headers:{"Content-Type": "application/json" },
        body:JSON.stringify({username,email,password,role}),
    });

    if(!res.ok){
        const errText=await res.text();
        throw new Error(errText || "Registration failed");
    }
    return await res.json();
}