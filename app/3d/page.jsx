"use client"

import '../map.css'

import * as THREE from 'three'
import React, { useRef, useEffect, useState } from 'react';
import maplibregl from 'maplibre-gl';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
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
        style: `https://api.maptiler.com/maps/streets-v2/style.json?key=${API_KEY}`,
        zoom: 18,
        center: [148.9819, -35.3981],
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
            render(gl, matrix) {
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

                this.camera.projectionMatrix = m.multiply(l);
                this.renderer.resetState();
                this.renderer.render(this.scene, this.camera);
                this.map.triggerRepaint();
            }
        };

        Map.on('style.load', () => {
            Map.addLayer(customLayer);
        });

        return () => Map.remove();

    
  
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
