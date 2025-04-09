import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import {registerUser} from "../api/auth";

const RegisterForm = () => {

  const [username,setUserName]=useState("");
  const [email,setEmail]=useState("");
  const [password,setPassword]=useState("");
  const [role,setRole]=useState("USER");
  const [errorMsg,setErrorMsg]=useState("");

  const navigate=useNavigate();
  
  const handleSubmit=async(e)=>{
    e.preventDefault();
    setErrorMsg("");

    try{
      const res = await registerUser(username, email, password, role);
      localStorage.setItem("token", res.token);
      navigate("/dashboard");
    }catch(err){
      setErrorMsg(err.message);
    }
  };

  return (


    <div className="min-h-screen bg-[#fafafa] flex items-center justify-center">
      <div className="bg-white p-10 w-96 border border-gray-300 rounded-lg shadow-md">
        <h2 className="text-3xl font-bold text-center mb-6">Instagram</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
                type="text"
                placeholder="Username"
                value={username}
                onChange={(e) => setUserName(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded text-sm focus:outline-none focus:ring-1 focus:ring-gray-400"
                required
          />

          <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded text-sm focus:outline-none focus:ring-1 focus:ring-gray-400"
              required
          /> 

          <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded text-sm focus:outline-none focus:ring-1 focus:ring-gray-400"
              required
          />  

          <select
            value={role}
            onChange={(e) => setRole(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded text-sm bg-white"
          >
            <option value="">Select role</option>
            <option value="USER">User</option>
            <option value="ADMIN">Admin</option>
          </select>

          <button
            type="submit"
            className="w-full bg-[#3897f0] text-white py-2 font-semibold rounded hover:bg-[#318ce7]"
          >
            Register
          </button>

          {errorMsg && (
            <p >{errorMsg}</p>
          )}
          
          <p className="text-sm text-center">
            Already have an account?{" "}
            <Link to="/login" className="text-blue-600 hover:underline" >
              Login
            </Link>
          </p>
        </form>
      </div>
    </div>

   






    // <form
    //   onSubmit={handleSubmit}
    //   className="bg-white p-8 shadow-md rounded-lg w-80 space-y-4"
    // >

    //   <h2 className="text-2xl font-bold text-center">Register</h2>
      
    //   <input
    //     type='text'
    //     placeholder='Name'
    //     value={username}
    //     onChange={(e)=>setUserName(e.target.value)}
    //     className="w-full border px-3 py-2 rounded"
    //     required
    //   >
    //   </input>

    //   <input
    //     type="email"
    //     placeholder="Email"
    //     value={email}
    //     onChange={(e) => setEmail(e.target.value)}
    //     className="w-full border px-3 py-2 rounded"
    //     required
    //   />

    //   <input
    //     type="password"
    //     placeholder="Password"
    //     value={password}
    //     onChange={(e) => setPassword(e.target.value)}
    //     className="w-full border px-3 py-2 rounded"
    //     required
    //   />

    //   <select
    //   value={role}
    //   onChange={(e)=>setRole(e.target.value)}
    //   className="w-full border px-3 py-2 rounded"
    //   >
    //     <option value="">Select role</option>
    //     <option value="USER">User</option>
    //     <option value="ADMIN">Admin</option>
    //   </select>

    //   <button
    //     type='submit'
    //     className="w-full bg-green-500 text-white py-2 font-semibold rounded hover:bg-green-600"
    //   >
    //     Register
    //   </button>

    //   {errorMsg && (
    //     <p >{errorMsg}</p>
    //   )}
      
    //   <p className="text-sm text-center">
    //     Already have an account?{" "}
    //     <Link to="/login" className="text-blue-600 hover:underline" >
    //       Login
    //     </Link>
    //   </p>
    // </form>
  )

}

export default RegisterForm