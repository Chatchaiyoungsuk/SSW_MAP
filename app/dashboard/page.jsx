import Link from 'next/link'

export default function Page(){
    return(
        <>
        <div className="max-w-screen min-h-screen bg-gradient-to-tr from-green-400 to bg-yellow-400 flex justify-center items-center">
            <div>
                <h1 className="text-black font-bold text-3xl">ไม่รู้ไอเดียวจะทำไร แต่ไกปู</h1>
                <Link href={"/"}>กลับหน้าแรก คลิ๊ก</Link>
            </div>

        </div>
        </>
    )
}