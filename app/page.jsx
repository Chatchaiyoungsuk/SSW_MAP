"use client"

import Link from 'next/link'

export default function Page(){
    return(
        <>
        <div className="p-4">
            <div className="container max-w-6xl mx-auto my-28">
                <h1 className="mb-2 font-bold text-5xl inline-block bg-gradient-to-tr from-green-400 to bg-yellow-400 bg-clip-text text-transparent">3D Map SSW</h1>
                <p className="text-lg mb-10">แผนที่โรงเรียนสวนศรีวิทยาแบบ 3มิติ ที่จะทำให้ชีวิตในโรงเรียนของคุณดีขึ้น</p>
                <div className="flex">
                    <Link href={"/map"} className='inline-block bg-gradient-to-tr from-green-400 to bg-yellow-400 px-4 font-bold text-black hover:shadow-lg hover:shadow-green-500/80 py-2 rounded-full text-xl'>เริ่มกันเลย</Link>
                </div>
            </div>
            <div className='container max-w-6xl mx-auto my-28 '>
                <p>Made by <span className='bg-gradient-to-tr from-green-400 to bg-yellow-400 bg-clip-text text-transparent font-bold'> เจองูอย่าเอาไม้ตี Team</span>.</p>
                <p>Powered by <span className='bg-gradient-to-tr from-blue-300 to bg-blue-600 bg-clip-text text-transparent font-bold'>RelaxZone</span>.</p>
            </div>
        </div>
        </>
    )
}
