// Login Component
import React from 'react';
import background from "../Utilis/cinema-movie-concept_1302-12571.jpg";
import { useState } from "react";
import { useLogin } from "../hooks/useLogin"
import Header from "./Header"


const Login = () => {
    
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const { login, error, isLoading } = useLogin()

    const handleSubmit = async (e) => {
        e.preventDefault()

        await login(email, password)
    }
    return (

        <div className="relative">
            <Header />
            <div
                className="bg-cover bg-center h-screen flex items-center justify-center"
                style={{ backgroundImage: `url(${background})` }}
            >
                <div className="bg-gray-800 bg-opacity-75 p-8 rounded-lg w-96 text-white">
                    <h1 className="text-3xl font-bold mb-4">Sign In</h1>
                    <input
                        type="email"
                        onChange={(e) => setEmail(e.target.value)}
                        value={email} 
                        placeholder="Email"
                        className="mb-4 p-3 w-full border border-gray-600 rounded-md bg-gray-700 placeholder-gray-300"
                    />
                    <input
                        type="password"
                        onChange={(e) => setPassword(e.target.value)}
                        value={password} 
                        placeholder="Password"
                        className="mb-4 p-3 w-full border border-gray-600 rounded-md bg-gray-700 placeholder-gray-300"
                    />
                    <button
                        onClick={handleSubmit}
                        className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:shadow-outline-blue"
                    >
                        Sign In
                    </button>
                    <div>
                        {error && <div className="error">{error}</div>}
                    </div>
                    
                </div>
            </div>
        </div>
    );
};

export default Login;
