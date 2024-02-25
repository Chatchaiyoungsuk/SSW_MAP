'use client'

import { useContext , useState , useEffect } from "react"
import { PositionContext } from "../Provider/PositionProvider"
import { GetRoom , GetSiteData } from "../action/action"


export default function SearchByRoom(){
    
    const [ roomData , setRoomdata ] = useState({})
    const { setPosition } = useContext(PositionContext)
    const [ search , setSearch ] = useState("")
    
    const searchHandle = (e) => {
        setSearch(e.target.value)
    }
    
        useEffect(() => {
            getRoomPosition()
        }, [search]);

    async function getRoomPosition(){
        try{
            const roomData = await getRoomDetail(search)
            await setRoomdata(roomData)
        }
        catch(err){
            console.log("ไม่พบข้อมูล");
        }
    }

    async function getRoomDetail(s) {
        try {
            const room = await GetRoom(s);
            return room
        } catch (error) {
            console.error("Error fetching sites:", error);
        }
    }

    async function BTNHanddle(siteName){
        console.log(siteName);
        const data = await GetSiteData(siteName)
        console.log(data);
        setPosition(data.lng,data.lat)
    }

    return(
        <>
            <div>
                <input type="text" placeholder="ใส่ชื่อห้อง" value={search} onChange={searchHandle} className="mb-2 bg-zinc-900 outline-none w-full rounded-xl p-2 focus:outline focus:outline-green-400" />
            </div>
            <div>
                <div className="block  mt-4 bg-zinc-800 min-w-[250px] text-white rounded-lg">
                    {roomData?.roomnumber && (
                        <button onClick={() => {BTNHanddle(roomData.site)}} className="block w-full text-start mt-2 hover:bg-zinc-600 p-2 px-4 rounded-lg">
                           <h2 className="font-bold">ห้อง {roomData.roomnumber}</h2>
                           <p className="text-sm text-zinc-400">อาคาร {roomData.site}</p>
                        </button>
                    )}
                </div>
            </div>
        </>
    )
}