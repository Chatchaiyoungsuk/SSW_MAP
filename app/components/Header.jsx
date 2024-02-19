"use client"

import Link from 'next/link'
import { User , MapPinned } from 'lucide-react'
import { useEffect, useState } from "react"
import { LngLat } from 'maplibre-gl'

export default function Header(props) {

    const { setlng , setlat , setMakerLat , setMakerLng } = props

 function setPosition(lng,lat){
        setlng(lng)
        setlat(lat)
        setMakerLat(lat)
        setMakerLng(lng)
    }

    const [ search , setSearch ] = useState("")
    
    const [ filteredItems , setFilteredItems ] = useState([])

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

    useEffect(()=>{
        setFilteredItems([])
    },[])

    useEffect(()=>{
        if(search != ""){
            setFilteredItems(adresses.filter((user) => user.name.toLowerCase().includes(search.toLowerCase())))
        }
        else{
            setFilteredItems([])
        }
    },[search])


    return (       
        <>
            <div className='z-50 w-full sticky top-0'>
                <div className="flex items-center justify-between p-4 bg-zinc-950/50 backdrop-blur-lg shadow-md shadow-green-400/50">
                    <Link href={"/"} >
                        <h1><MapPinned color='#fff' size={"1.5em"} /></h1>
                    </Link>
{/* ต้องมาแกะโค้ดไอปักษ์เพื่อทำMarker */}
                    <div className='flex items-center'>
                        <div className="relative">
                            <input type="text"
                                value={search}
                                onChange={(e) => {setSearch(e.target.value)}}
                                placeholder="ค้นหา"
                                className="max-w-full outline-none p-2 rounded-md bg-zinc-800 font-bold text-white focus:outline focus:outline-green-500" 
                            />
                            {filteredItems.length > 0 && (
                                <div className="z-[99999999999999] block absolute mt-4 bg-zinc-800 min-w-[250px] right-0 p-2 text-white rounded-lg">
                                    {filteredItems.map((data,i) => (
                                    <button key={i} onClick={()=>{setPosition(data.lng,data.lat)}} className="block w-full text-start mt-2 hover:bg-zinc-600 p-2 px-4 rounded-lg">
                                    {data.name}
                                    </button>
                                    ))} 
                                </div>
                            )}
{/* ///////// */}
                        </div>
                        <Link href={"/dashboard"} className='text-white block bg-zinc-800 rounded-md p-2 ml-2 outline-none focus:outline-green-500'><User /></Link>
                    </div>
                </div>
            </div>
        </>
    )
}