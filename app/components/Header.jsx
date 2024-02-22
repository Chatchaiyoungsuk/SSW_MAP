import { GetSites } from '../action/action';
import Link from 'next/link';
import { User , MapPinned } from 'lucide-react';
import { useEffect, useState } from "react";
import { LngLat } from 'maplibre-gl'

export default function Header(props) {

    const { setLng , setLat , setMakerLat , setMakerLng } = props;

    function setPosition(lng,lat) {
        setLng(lng);
        setLat(lat);
        setMakerLat(lat);
        setMakerLng(lng);
    }

    const [ adresses , setAdresses ] = useState([]);
    const [ search , setSearch ] = useState("");
    const [ filteredItems , setFilteredItems ] = useState([]);

    async function getAdresses() {
        try {
            const sites = await GetSites();
            setAdresses(sites);
        } catch (error) {
            console.error("Error fetching sites:", error);
        }
    }

    useEffect(() => {
        setFilteredItems([]);
        getAdresses();
    }, []);

    useEffect(() => {
        if (search !== "") {
            setFilteredItems(adresses.filter((user) => user.name.toLowerCase().includes(search.toLowerCase())));
        } else {
            setFilteredItems([]);
        }
    }, [search, adresses]);

    return (       
        <div className='z-50 w-full sticky top-0'>
            <div className="flex items-center justify-between p-4 bg-zinc-950/50 backdrop-blur-lg shadow-md shadow-green-400/50">
                <Link href={"/"} >
                    <h1><MapPinned color='#fff' size={"1.5em"} /></h1>
                </Link>
                <div className='flex items-center'>
                    <div className="relative">
                        <input
                            type="text"
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            placeholder="ค้นหา"
                            className="max-w-full outline-none p-2 rounded-md bg-zinc-800 font-bold text-white focus:outline focus:outline-green-500" 
                        />
                        {filteredItems.length > 0 && (
                            <div className="z-[99999999999999] block absolute mt-4 bg-zinc-800 min-w-[250px] right-0 p-2 text-white rounded-lg">
                                {filteredItems.map((data, i) => (
                                    <button key={i} onClick={() => setPosition(data.lng, data.lat)} className="block w-full text-start mt-2 hover:bg-zinc-600 p-2 px-4 rounded-lg">
                                        {data.name}
                                    </button>
                                ))} 
                            </div>
                        )}
                    </div>
                    <Link href={"/register"} className='text-white block bg-zinc-800 rounded-md p-2 ml-2 outline-none focus:outline-green-500'><User /></Link>
                </div>
            </div>
        </div>
    );
}
