"use client"

import { User } from 'lucide-react'
import { useEffect, useState } from "react"

export default function Header(props) {

    const { setlng , setlat } = props

    function setPosition(lng,lat){
        setlng(lng)
        setlat(lat)
    }

    const [ search , setSearch ] = useState("")
    
    let filteredItems = []

    const [adresses] = useState([
        {
            name: "มะเดื่อ",
            lng: 99.0856236,
            lat: 9.9487238
        },
        {
            name: "หอสมุด",
            lng: 99.0857319,
            lat: 9.9493060
        },
        {
            name: "โรงยิม",
            lng: 99.0862010,
            lat: 9.9493278
        },
        {
            name: "ตึกสังคม",
            lng: 99.0855921,
            lat: 9.9485788
        },
        {
            name: "ตึกคณิต",
            lng: 99.0855432,
            lat: 9.9484163
        },
        {
            name: "ตึกคอม",
            lng: 99.0855629,
            lat: 9.9480937
        },
        {
            name: "ตึกวิทย์",
            lng: 99.0854328,
            lat: 9.9478533
        },
    ])

    if(search != ""){
        filteredItems = adresses.filter((user) => user.name.toLowerCase().includes(search.toLowerCase()));
    }
    else{
        filteredItems = []
    }
    
    return (
        <>
            <div className="flex items-center justify-between px-4">
                <h1 className="bg-gradient-to-r from-green-500 inline-block p-4 to-yellow-600 bg-clip-text text-transparent font-bold text-3xl">SSW Map</h1>
                <div className="relative">
                    <input type="text"
                        value={search}
                        onChange={(e) => {setSearch(e.target.value)}}
                        placeholder="Search..."
                        className="outline-none p-2 rounded-md bg-zinc-800 text-white focus:outline focus:outline-green-500" />
                    {filteredItems.length > 0 && (
                        <div className="z-50 block absolute mt-4 bg-zinc-800 min-w-[250px] right-0 py-2 text-white rounded-lg">
                            {filteredItems.map((data,i) => (
                            <button key={i} onClick={()=>setPosition(data.lng,data.lat)} className="block w-full text-start mt-2 hover:bg-zinc-600 p-2 px-4 rounded-lg">
                            {data.name}
                            </button>
                            ))} 
                        </div>
                    )}

                    <button><User className='text-white p-1 ml-1 block bg-zinc-800 rounded-md' /></button>

                </div>
            </div>
        </>
    )
}