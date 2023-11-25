// Login Component
import React from 'react';
import background from "../Utilis/cinema-movie-concept_1302-12571.jpg";
import { useSignup } from "../hooks/useSignup"
import { useState } from "react"


const Signup = () => {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const { signup, error, isLoading } = useSignup()

   
    const handleSubmit = async (e) => {
        e.preventDefault()

        await signup(name,email, password)
    }

    return (
        <div className="relative">
            <div
                className="bg-cover bg-center h-screen flex items-center justify-center"
                style={{ backgroundImage: `url(${background})` }}
            >
                <div className="bg-gray-800 bg-opacity-75 p-8 rounded-lg w-96 text-white">
                    <h1 className="text-3xl font-bold mb-4">Sign Up</h1>
                    <input
                        type="text"
                        onChange={(e) => setName(e.target.value)}
                        value={name} 
                        placeholder="Name"
                        className="mb-4 p-3 w-full border border-gray-600 rounded-md bg-gray-700 placeholder-gray-300"
                    />
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
                        disabled={isLoading}
                        onClick={handleSubmit}
                        className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:shadow-outline-blue"
                    >
                        Sign Up
                    </button>
                    <div>
                        {error && <div className="error">{error}</div>}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Signup;
