'use client'

import { X } from 'lucide-react'
import { useState } from 'react'
import SearchByBuilding from './SearchByBuilding'

export default function SearchOverlay(){

    const [ searchBy , setSearchBy ] = useState("building")

    function onSearchChange(e) {
        setSearchBy(e.target.value)
    }

    return(
        <div className="w-screen h-screen bg-zinc-900/80 backdrop-blur-xl fixed top-0 z-50 flex justify-center items-center p-4">
            <div className='max-w-[350px] p-4 w-full bg-zinc-950 max-h-80vh rounded-xl'>
                <div className="flex justify-between items-center mb-2">
                    <div className="font-bold">ค้นหา</div>
                    <button><X></X></button>
                </div>
                <hr className="border border-zinc-900 my-2" />
                <div className="flex">
                    <select value={searchBy} onChange={onSearchChange} className="mb-2 bg-zinc-900 outline-none w-full rounded-xl p-2 focus:outline focus:outline-green-400">
                        <option select value="building">หาโดยชื่ออาคาร</option>
                        <option value="room">หาโดยชื่อห้องเรียน</option>
                    </select>
                </div>
                <div>
                    <SearchByBuilding />
                </div>
            </div>
        </div>
    )
}