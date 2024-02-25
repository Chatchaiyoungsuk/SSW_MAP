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
   
      // model นะจ้ะ
          const modelOrigin = [148.9819, -35.39847];
          const modelAltitude = 0;
          const modelRotate = [Math.PI / 2, 0, 0];
              
          const modelAsMercatorCoordinate = maplibregl.MercatorCoordinate.fromLngLat(
              modelOrigin,
              modelAltitude
          );
          
          const modelTransform = {
              translateX: modelAsMercatorCoordinate.x,
              translateY: modelAsMercatorCoordinate.y,
              translateZ: modelAsMercatorCoordinate.z,
              rotateX: modelRotate[0],
              rotateY: modelRotate[1],
              rotateZ: modelRotate[2],
              scale: modelAsMercatorCoordinate.meterInMercatorCoordinateUnits()
          };
          
          let customLayer = {
              id: '3d-model',
              type: 'custom',
              renderingMode: '3d',
              onAdd(map, gl) {
                  this.camera = new THREE.Camera();
                  this.scene = new THREE.Scene();
              
                  const directionalLight = new THREE.DirectionalLight(0xffffff);
                  directionalLight.position.set(0, -70, 100).normalize();
                  this.scene.add(directionalLight);
              
                  const directionalLight2 = new THREE.DirectionalLight(0xffffff);
                  directionalLight2.position.set(0, 70, 100).normalize();
                  this.scene.add(directionalLight2);
              
                  const loader = new GLTFLoader();
                  loader.load(
                      'https://maplibre.org/maplibre-gl-js/docs/assets/34M_17/34M_17.gltf',
                      (gltf) => {
                          this.scene.add(gltf.scene);
                      }
                      
                  );
                  this.map = map;
                    
                  this.renderer = new THREE.WebGLRenderer({
                      canvas: map.getCanvas(),
                      context: gl,
                      antialias: true
                  });
                
                  this.renderer.autoClear = false;
              },
          }
              render(gl, matrix); {
                  const rotationX = new THREE.Matrix4().makeRotationAxis(
                      new THREE.Vector3(1, 0, 0),
                      modelTransform.rotateX
                  );
                  const rotationY = new THREE.Matrix4().makeRotationAxis(
                      new THREE.Vector3(0, 1, 0),
                      modelTransform.rotateY
                  );
                  const rotationZ = new THREE.Matrix4().makeRotationAxis(
                      new THREE.Vector3(0, 0, 1),
                      modelTransform.rotateZ
                  );
                  
                  const m = new THREE.Matrix4().fromArray(matrix);
                  const l = new THREE.Matrix4()
                      .makeTranslation(
                          modelTransform.translateX,
                          modelTransform.translateY,
                          modelTransform.translateZ
                      )
                      .scale(
                          new THREE.Vector3(
                              modelTransform.scale,
                              -modelTransform.scale,
                              modelTransform.scale
                          )
                      )
                      .multiply(rotationX)
                      .multiply(rotationY)
                      .multiply(rotationZ);
              }           
          Map.on('load',(() => {
          
                  this.camera.projectionMatrix = m.multiply(l);
                  this.renderer.resetState();
                  this.renderer.render(this.scene, this.camera);
                  this.map.triggerRepaint();
          }))   

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
                    'icon-image': 'ssw',
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