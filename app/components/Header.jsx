import Link from 'next/link';
import { User , MapPinned } from 'lucide-react';
import { useEffect, useState } from "react";
import { LngLat } from 'maplibre-gl'
import SearchOverlay from './SearchOverlay';

export default function Header(props) {

    return (       
        <div className='z-50 w-full sticky top-0'>
            <SearchOverlay />
            <div className="flex items-center justify-between p-4 bg-zinc-950/50 backdrop-blur-lg shadow-md shadow-green-400/50">
                <Link href={"/"} >
                    <h1><MapPinned color='#fff' size={"1.5em"} /></h1>
                </Link>
                <div className='flex items-center'>
                    <div className="relative">
                        <input
                            type="text"
                            placeholder="ค้นหา"
                            className="max-w-full outline-none p-2 rounded-md bg-zinc-800 font-bold text-white focus:outline focus:outline-green-500" 
                        />
                        
                    </div>
                    <Link href={"/register"} className='text-white block bg-zinc-800 rounded-md p-2 ml-2 outline-none focus:outline-green-500'><User /></Link>
                </div>
            </div>
        </div>
    );
}
