'use state'

import { createContext } from "react"

function PositionProvider({children}) {

    const PositionContext = createContext()

    const [lng, setLng] = useState(99.0852798);
    const [lat, setLat] = useState(9.9485982);
    const [makerLng, setMakerLng] = useState(0);
    const [makerLat, setMakerLat] = useState(0);

    function setPosition(lng,lat) {
        setLng(lng);
        setLat(lat);
        setMakerLat(lat);
        setMakerLng(lng);
    }

    return(
        <PositionContext.Provider value={{ setPosition , lng , setLng , lat , setLat , makerLng , setMakerLng , setMakerLat,makerLat }}>
            {children}
        </PositionContext.Provider>
    )
}

export { PositionContext }
export default PositionProvider
