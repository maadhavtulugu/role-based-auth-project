import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { loginUser } from '../api/auth';

const LoginForm = () => {

    const [email,setEmail] =useState("");
    const [password,setPassword]=useState("");
    const [errorMsg,setErrorMsg]=useState("");

    const navigate=useNavigate();

    const handleSubmit= async (e)=>{
        e.preventDefault();
        setErrorMsg("");

        try{
            const data=await loginUser(email,password);
            localStorage.setItem("token",data.token);
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

        <button
          type="submit"
          className="w-full bg-[#3897f0] text-white py-2 font-semibold rounded hover:bg-[#318ce7]"
        >
          Login
        </button>

        {errorMsg && (
          <p className="text-red-600 text-sm text-center">{errorMsg}</p>
        )}

        <p className="text-sm text-center mt-4">
            Don't have an account?{' '}
            <Link to="/register" className="text-blue-600 hover:underline">
            Register
            </Link>
        </p>
      </form>

     
    </div>
  </div>


    // <form
    //     onSubmit={handleSubmit} 
    //     className="bg-white p-8 shadow-md rounded-lg w-80 space-y-4">
       
    //    <h2 className="text-center text-2xl font-bold">Instagram</h2> 

    //    <input
    //         type='email'
    //         placeholder='Email'
    //         value={email}
    //         onChange={e=>setEmail(e.target.value)}
    //         className="w-full border px-3 py-2 rounded"
    //         required
    //    />

    //    <input
    //         type='password'
    //         placeholder='Password'
    //         value={password}
    //         onChange={(e)=> setPassword(e.target.value)}
    //         className="w-full border px-3 py-2 rounded"
    //         required
    //    />
    //    <button
    //         type='submit'
    //         className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 font-semibold"
    //    >
    //         Log In
    //    </button>

    //    <p className="text-sm text-center">
    //         Don't have an account?{" "}
    //         <Link to="/register" className="text-blue-500 hover:underline">
    //             Register
    //         </Link>
    //    </p>

    //    {errorMsg && (
    //     <p className="text-red-500 text-center text-sm">{errorMsg}</p>
    //    )}
    // </form>
  )
}

export default LoginForm