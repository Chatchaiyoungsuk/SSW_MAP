"use client";

import Link from 'next/link'
import { Button } from "@/components/ui/button"
import { useForm } from "react-hook-form";
import { createUser } from "../action/action"
import Header from '../components/Header';
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function Page(){
    
    const { register, handleSubmit } = useForm();
    const router = useRouter();

    const registerHanddle = async (data) => {
        const { name , email , password } = data
        const formData = new FormData()
        await formData.append("name",name)
        await formData.append("email",email)
        await formData.append("password",password)
        const res = await createUser(formData)
        if(res.status == "error"){
            alert("เกิดข้อผิดพลาด")
        }
        else{
            alert('สมัครเรียบร้อย')
            router.push("/map");
        }
    }

    return(
        <>
        <Header />
        <div className="p-4 flex justify-center items-center my-10">
            <form className='max-w-xl p-4 border border-zinc-800 mx-auto w-full rounded-xl' onSubmit={handleSubmit(registerHanddle)} >
                <h1 className='text-2xl font-bold'>สมัครสมาชิก</h1>
                <div className="my-4">
                    <label htmlFor="name" className='mb-2 block'>ชื่อ</label>
                    <input {...register("name")} id='name' type="text" required className='outline-none p-2 bg-zinc-900 rounded-lg text-sm w-full focus:outline focus:outline-green-500' />
                </div>
                <div className="my-4">
                    <label htmlFor="email" className='mb-2 block'>อีเมล</label>
                    <input {...register("email")} id='email' required type="email" className='outline-none p-2 bg-zinc-900 rounded-lg text-sm w-full focus:outline focus:outline-green-500' />
                </div>
                <div className="my-4">
                    <label htmlFor="password" className='mb-2 block'>รหัสผ่าน</label>
                    <input id='password' {...register("password")} required type="password" className='outline-none p-2 bg-zinc-900 rounded-lg text-sm w-full focus:outline focus:outline-green-500' />
                </div>
                <button type='submit' className='p-2 inline-block bg-gradient-to-tr from-green-400 to bg-yellow-400 font-bold text-black hover:shadow-lg hover:shadow-green-500/80 rounded-xl'>สมัครสมาชิก</button>
                 <label className='max-w mx-auto w-full margin ' style={{marginLeft : 15 + 'px'}}>มีบัญชีแล้ว?</label>
                 <Button asChild href={"/login"} variant="link" style={{color : '#3DBD55'}}>
                 <Link href="/login">LOG IN</Link>
                </Button>
            </form>
        </div>
        </>

    )
}