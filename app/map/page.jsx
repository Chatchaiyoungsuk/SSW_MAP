"use client"

import '../map.css'

import React, { useRef, useEffect, useState } from 'react';
import maplibregl from 'maplibre-gl';
import 'maplibre-gl/dist/maplibre-gl.css';
import Header from "../components/Header";

export default function Home() {

  const mapContainer = useRef(null);
  const [lng , setlng] = useState(99.0852798);
  const [lat , setlat] = useState(9.9485982);
  const [zoom] = useState(20);
  const [API_KEY] = useState('0OwvauUkDP7wGwh11RM9');

  const [makerLng , setMakerLng] = useState(0)
  const [makerLat , setMakerLat] = useState(0)
  
  useEffect(() => {
      
    let Map = new maplibregl.Map({
        container: mapContainer.current,
        style: `https://api.maptiler.com/maps/streets-v2/style.json?key=${API_KEY}`,
        zoom: zoom,
        center: [lng, lat],
        pitch: 60,
        antialias: true
    });

    Map.on('load',(() => {

        //SSW Loago 
        Map.loadImage('https://cdn.discordapp.com/attachments/1087745142951256134/1200722420571578368/1.png?ex=65c736e5&is=65b4c1e5&hm=a04258acb0756c1479f4c75a2ac58a08d92bf0c42165a42c101ed0087b860fe0&',
        (error,image) => {
            
            //handle err
            if (error){
            console.log(error);
            }

            //set logo ssw
            Map.addImage('ssw',image)

            //set ssw logo position
            Map.addSource('point', {
            'type': 'geojson',
            'data': {
                'type': 'FeatureCollection',
                'features': [
                    {
                        'type': 'Feature',
                        'geometry': {
                            'type': 'Point',
                            'coordinates': [99.0852798, 9.9485982]
                        }
                    }
                ]
            }
            });

            Map.addLayer({
                'id': 'points',
                'type': 'symbol',
                'source': 'point',
                'layout': {
                    'icon-image': 'cat',
                    'icon-size': 0.3,
                }
            });

        })//image Load

        //Marker set
        if(makerLng && makerLat){
            let Marker = new maplibregl.Marker().setLngLat([makerLng,makerLat]).addTo(Map)
        }

    })
    )// end map load


  }, [ API_KEY , lng , lat , zoom , makerLng , makerLat ]);
 
  return (
    <>
      <div className="bg-zinc-950">
        <Header setlng={setlng} setlat={setlat} setMakerLat={setMakerLat} setMakerLng={setMakerLng} />
        <div className="map-wrap">
          <div ref={mapContainer} className="map" />
        </div>
      </div>
    </>
  );
}
