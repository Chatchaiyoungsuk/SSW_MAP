'use client'

import { useContext , useState , useEffect } from "react"
import { PositionContext } from "../Provider/PositionProvider"
import { GetRoom } from "../action/action"

export default function SearchByRoom(){
    
    const { setPosition } = useContext(PositionContext)
    const [ search , setSearch ] = useState("")
    
    const searchHandle = (e) => {
        setSearch(e.target.value)
    }
    
        useEffect(() => {
            console.log(search);
        }, [search]);

    async function getRoomDetail(s) {
        console.log(s);
        try {
            const room = await GetRoom(s);
            console.log(room);
        } catch (error) {
            console.error("Error fetching sites:", error);
        }
    }

    return(
        <>
            <div>
                <input type="text" placeholder="ใส่ชื่อห้อง" value={search} onChange={searchHandle} className="mb-2 bg-zinc-900 outline-none w-full rounded-xl p-2 focus:outline focus:outline-green-400" />
            </div>
            <div>

                <div className="block  mt-4 bg-zinc-800 min-w-[250px] text-white rounded-lg">

                        <button className="block w-full text-start mt-2 hover:bg-zinc-600 p-2 px-4 rounded-lg">
                           <h2 className="font-bold">ห้อง ...</h2>
                           <p className="text-sm text-zinc-400">อาคาร ...</p>
                        </button>

                </div>

            </div>
        </>
    )
}