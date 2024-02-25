'use client'

import { createContext , useState } from "react"
const PositionContext = createContext()

function PositionProvider({children}) {

    const debug = "read"

    const [lng, setLng] = useState(99.0852798);
    const [lat, setLat] = useState(9.9485982);
    const [makerLng, setMakerLng] = useState(0);
    const [makerLat, setMakerLat] = useState(0);
    const [ isActiveSearchModal , setSearchModal ] = useState(false)

    function setPosition(lng,lat) {
        setLng(lng);
        setLat(lat);
        setMakerLat(lat);
        setMakerLng(lng);
        setSearchModal(false)
    }

    return(
        <PositionContext.Provider value={{ setPosition , lng , setLng , lat , setLat , makerLng , setMakerLng , setMakerLat,makerLat , debug , isActiveSearchModal , setSearchModal }}>
            {children}
        </PositionContext.Provider>
    )
}

export { PositionContext }
export default PositionProvider
