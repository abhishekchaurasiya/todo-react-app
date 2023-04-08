import React, { useContext, useEffect, useState } from 'react'
import { NavLink, Navigate } from 'react-router-dom'
import { AppContext } from '../context/AppContextProvider'
import axios from 'axios'
import { baseUrl } from '../baseUrl'
import { toast } from 'react-hot-toast'

const LoginPage = () => {

    const { setLoading, isAuthenticated, setIsAuthenticated, loading } = useContext(AppContext)
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const submitHandler = async (e) => {
        e.preventDefault();
        setLoading(true)
        try {
            const response = await axios.post(`${baseUrl}/users/login`, {
                email, password
            }, {
                headers: {
                    "Content-Type": "application/json"
                },
                withCredentials: true
            });

            toast.success(response.data.message);
            setIsAuthenticated(true)
            setLoading(false)

        } catch (error) {
            toast.error(error.response.data.message)
            setIsAuthenticated(false)
            setLoading(false)
        }
    };

    if (isAuthenticated) return <Navigate to={"/"} />;

    return (
        <div className='flex items-center justify-center w-full h-[80vh] '>
            <section className='shadow-[0px_10px_1px_rgba(221,_221,_221,_1),_0_10px_20px_rgba(204,_204,_204,_1)] py-5 px-14 rounded-md'>
                <form className='flex flex-col items-center gap-y-1' onSubmit={submitHandler}>
                    <label>
                        <p className='text-gray-700 font-bold text-[18px] py-1 hover:animate-bounce hover:text-red-950 transition delay-300 ease-in w-20'>
                            Email<sup className='text-red-500'>*</sup></p>
                        <input
                            type="email"
                            placeholder='Enter your email...'
                            required
                            value={email}
                            onChange={(event) => setEmail(event.target.value)}
                            className=" bg-blue-950 text-white rounded-md outline-none border-2 border-black p-1 w-[300px] px-2 "
                        />
                    </label>
                    <label>
                        <p className='text-gray-700 font-bold text-[18px] py-1 hover:animate-bounce hover:text-red-950 transition delay-300 ease-in w-20'>
                            Password<sup className='text-red-500'>*</sup></p>
                        <input
                            type="password"
                            placeholder='Enter your email...'
                            required
                            value={password}
                            onChange={(event) => setPassword(event.target.value)}
                            className=" bg-blue-950 text-white rounded-md outline-none border-2 border-black p-1 w-[300px] px-2"
                        />

                    </label>
                    <div>
                        <button disabled={loading} type='submit'
                            className='bg-blue-950 py-1 px-10 rounded-full mt-2 text-slate-100 font-semibold'
                        >Login</button>
                    </div>
                    <div className='flex items-center gap-x-2'>
                        <div className='w-[40px] h-0 border-blue-950 border border-y-[1px]'></div>
                        <h4 className='text-[10px] font-semibold'>Or</h4>
                        <div className='w-[40px] h-0 border-blue-950 border border-y-[1px]'></div>
                    </div>

                    <div>
                        <p className='bg-blue-950 py-1 px-8 rounded-full mt-1 text-slate-100 font-semibold'>
                            <NavLink to="/register">Sign Up</NavLink>
                        </p>
                    </div>
                </form>
            </section>
        </div>
    )
}

export default LoginPage
