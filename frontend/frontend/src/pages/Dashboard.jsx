import React, {  useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {

    const [user, setUser]=useState(null);
    const navigate=useNavigate();

    const fetchUser = async()=>{
        const token=localStorage.getItem("token");
        if(!token){
            navigate("/login");
            return;
        }
        
        try{
            const res=await fetch("http://localhost:8080/user/me",{
                headers:{
                    Authorization:`Bearer ${token}`,
                },
            });
            if(!res.ok){
                throw new Error("Unauthorized");
            }

            const data=await res.json();
            setUser(data);
        }catch(err){
            console.error(err.message);
            navigate("/login");
        }

    };

    useEffect(()=>{
        fetchUser();
    },[]);

    if(!user) return <p className="text-center mt-8">Loading....</p>

  return (
    <div className="max-w-md mx-auto mt-10 bg-white p-6 rounded-lg shadow">
        <h1 className="text-2xl font-bold mb-4">Welcome, {user.name}</h1>
        <p className="text-gray-700">Email: {user.email}</p>
        <p className="text-gray-700">Role: {user.role}</p>   
    </div>
  )
}

export default Dashboard