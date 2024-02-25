import { useState , useContext } from "react"
import { useEffect } from "react"
import { GetSites } from '../action/action';
import { PositionContext } from "../Provider/PositionProvider"; 

export default function SearchByBuilding(){

    const { setPosition } = useContext(PositionContext)
    const [ search , setSearch ] = useState("")

    const searchHandle = (e) => {
        setSearch(e.target.value)
    }

    const [ adresses , setAdresses ] = useState([]);
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

    

    return(
        <>
            <div>
                <input type="text" placeholder="ใส่ชื่ออาคาร" value={search} onChange={searchHandle} className="mb-2 bg-zinc-900 outline-none w-full rounded-xl p-2 focus:outline focus:outline-green-400" />
            </div>
            <div>
            {filteredItems.length > 0 && (
                    <div className="block  mt-4 bg-zinc-800 min-w-[250px] text-white rounded-lg">
                        {filteredItems.slice(0, 5).map((data, i) => (
                            <button key={i} onClick={() => setPosition(data.lng, data.lat)} className="block w-full text-start mt-2 hover:bg-zinc-600 p-2 px-4 rounded-lg">
                                {data.name}
                            </button>
                        ))} 
                    </div>
            )}
            </div>
        </>
    )
}