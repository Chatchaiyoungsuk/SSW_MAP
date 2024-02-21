"use client"
import Link from 'next/link'
import { useForm } from "react-hook-form";
import { login } from "../action/action"
import Header from '../components/Header';

export default function Page(){
    
    const { register, handleSubmit } = useForm();

    const registerHanddle = async (data) => {
        const { email , password } = data
        const formData = new FormData()
        await formData.append("email",email)
        await formData.append("password",password)
        const res = await login(formData)
        if(res.status == "false"){
            alert("ข้อมูลไม่ถูกจ้อง")
        }else{
            alert(`เข้าสู่ระบบเรียบร้อย ${JSON.stringify(res)}`)
        }
    }

    return(
        <>
        <Header />
        <div className="p-4 flex justify-center items-center my-10">
            <form className='max-w-xl p-4 border border-zinc-800 mx-auto w-full rounded-xl' onSubmit={handleSubmit(registerHanddle)} >
                <h1 className='text-2xl font-bold'>เข้าสู่ระบบ</h1>
                <div className="my-4">
                    <label htmlFor="email" className='mb-2 block'>อีเมล</label>
                    <input {...register("email")} id='email' required type="email" className='outline-none p-2 bg-zinc-900 rounded-lg text-sm w-full focus:outline focus:outline-green-500' />
                </div>
                <div className="my-4">
                    <label htmlFor="password" className='mb-2 block'>รหัสผ่าน</label>
                    <input id='password' {...register("password")} required type="password" className='outline-none p-2 bg-zinc-900 rounded-lg text-sm w-full focus:outline focus:outline-green-500' />
                </div>
                <button className='p-2 inline-block bg-gradient-to-tr from-green-400 to bg-yellow-400 font-bold text-black hover:shadow-lg hover:shadow-green-500/80 rounded-xl'>เข้าสู่ระบบ</button>
            </form>
        </div>
        </>

    )
}