'use client'

import { X } from 'lucide-react'
import { useState , useContext } from 'react'
import { PositionContext } from '../Provider/PositionProvider'
import SearchByBuilding from './SearchByBuilding'
import SearchByRoom from './SearchByRooms'

export default function SearchOverlay(){

    const { setSearchModal } = useContext(PositionContext)
    const [ searchBy , setSearchBy ] = useState("building")

    function onSearchChange(e) {
        setSearchBy(e.target.value)
    }

    return(
        <div className="w-screen h-screen bg-zinc-900/80 backdrop-blur-xl fixed top-0 z-50 flex justify-center items-center p-4">
            <div className='max-w-[350px] p-4 w-full bg-zinc-950 max-h-80vh rounded-xl'>
                <div className="flex justify-between items-center mb-2">
                    <div className="font-bold">ค้นหา</div>
                    <button onClick={()=>{setSearchModal(false)}}><X /></button>
                </div>
                <hr className="border border-zinc-900 my-2" />
                <div style={{ fontSize: '14px' }} className="mb-2 text-red-400">หมายเหตุ กรุณารอสักครู่หากท่านค้นหาด้วยชื่อห้องเนื่องจากข้อมูลมีจำนวนมาก ทำให้การโหลดล่าช้า และหากไม่พบข้อมูล กรุณาค้นหาด้วยชื่อห้องเต็ม เช่น กลุ่มสาระการเรียนรู้ภาษาไทย</div>
                <div className="flex mb-2">
                    <select value={searchBy} onChange={onSearchChange} className="mb-2 bg-zinc-900 outline-none w-full rounded-xl p-2 focus:outline focus:outline-green-400">
                        <option value="building">หาโดยชื่ออาคาร</option>
                        <option value="room">หาโดยชื่อห้องเรียน</option>
                    </select>
                </div>
                {searchBy === "building" && (
                <div>
                    <SearchByBuilding />
                </div>
                )}
                {searchBy === "room" && (
                <div>
                    <SearchByRoom />
                </div>
                )}
            </div>
        </div>
    )
}
