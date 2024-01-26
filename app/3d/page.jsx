"use client"

import '../map.css'

import * as THREE from 'three'
import React, { useRef, useEffect, useState } from 'react';
import maplibregl from 'maplibre-gl';
import 'maplibre-gl/dist/maplibre-gl.css';

export default function Home() {

  const mapContainer = useRef(null);
  const map = useRef(null);
  const [lng] = useState(99.0852798);
  const [lat] = useState(9.9485982);
  const [zoom] = useState(17);
  const [API_KEY] = useState('i7D8iwguS9FuX21bSzzP');

  useEffect(() => {
  
    let Map = new maplibregl.Map({
        container: mapContainer.current,
        style: 'https://api.maptiler.com/maps/basic/style.json?key=get_your_own_OpIi9ZULNHzrESv6T2vL',
        zoom: 18,
        center: [lng, lat],
        pitch: 60,
        antialias: true
    });

    Map.on('load',(() => {
      Map.loadImage('https://png.pngtree.com/png-clipart/20230511/ourmid/pngtree-isolated-cat-on-white-background-png-image_7094927.png',(error,image) => {
        if (error){
          console.log(error);
        }
        Map.addImage('cat',image)

        Map.addSource('point', {
          'type': 'geojson',
          'data': {
              'type': 'FeatureCollection',
              'features': [
                  {
                      'type': 'Feature',
                      'geometry': {
                          'type': 'Point',
                          'coordinates': [lng, lat]
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
            'icon-size': 0.25
        }
    });
      })
    }))

    
  
  }, [API_KEY, lng, lat, zoom]);

  return (
    <>
      <div className="bg-zinc-950">
        <h1 className="bg-gradient-to-r from-green-500 inline-block p-4 to-yellow-600 bg-clip-text text-transparent font-bold text-3xl">SSW Map</h1>
        <div className="map-wrap">
          <div ref={mapContainer} className="map" />
        </div>
      </div>
    </> 
  );
}
