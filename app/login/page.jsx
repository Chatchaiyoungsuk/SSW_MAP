"use client";

import Link from 'next/link';
import { useForm } from "react-hook-form";
import { login } from "../action/action";
import { useRouter } from "next/navigation";
import Header from '../components/Header';
import { Button } from "@/components/ui/button";

export default function Page() {
    
    const { register, handleSubmit } = useForm();
    const router = useRouter();

    const registerHandle = async (data) => {
        const { email , password } = data;
        const formData = new FormData();
        formData.append("email", email);
        formData.append("password", password);
        const res = await login(formData);
        if (res.status === "false") {
            alert("ข้อมูลไม่ถูกต้อง");
        } else {
            alert(`เข้าสู่ระบบเรียบร้อย`);
            router.push("/map");
        }
    }

    return (
        <>
            <div className="p-4 flex justify-center items-center my-10">
                <form className='max-w-xl p-4 border border-zinc-800 mx-auto w-full rounded-xl' onSubmit={handleSubmit(registerHandle)} >
                    <h1 className='text-2xl font-bold'>เข้าสู่ระบบ</h1>
                    <div className="my-4">
                        <label htmlFor="email" className='mb-2 block'>อีเมล</label>
                        <input {...register("email")} id='email' required type="email" className='outline-none p-2 bg-zinc-900 rounded-lg text-sm w-full focus:outline focus:outline-green-500' />
                    </div>
                    <div className="my-4">
                        <label htmlFor="password" className='mb-2 block'>รหัสผ่าน</label>
                        <input id='password' {...register("password")} required type="password" className='outline-none p-2 bg-zinc-900 rounded-lg text-sm w-full focus:outline focus:outline-green-500' />
                    </div>
                    <button type="submit" className='p-2 inline-block bg-gradient-to-tr from-green-400 to bg-yellow-400 font-bold text-black hover:shadow-lg hover:shadow-green-500/80 rounded-xl'>เข้าสู่ระบบ</button>
                    <label className='max-w mx-auto w-full margin' style={{ marginLeft: 15 + 'px' }}>ยังไม่มีบัญชี?</label>
                    <Link href="/register" className="inline-block hover:underline border-green-400 ml-2 bg-gradient-to-tr from-green-400 to bg-yellow-400 font-bold bg-clip-text text-md text-transparent">สมัครสมาชิก</Link>
                    <Link href="/" className="block mt-4 hover:underline border-green-400 ml-2 bg-gradient-to-tr from-green-400 to bg-yellow-400 font-bold bg-clip-text text-md text-transparent">กลับหน้าหลัก</Link>
                </form>
            </div>
        </>
    )
}
