"use client";

import "../map.css";

import React, { useRef, useEffect, useState } from "react";
import maplibregl from "maplibre-gl";
import "maplibre-gl/dist/maplibre-gl.css";
import Header from "../components/Header";
import * as THREE from "three";
import { OBJLoader } from "three/examples/jsm/loaders/OBJLoader"; // Import OBJLoader from 'three/examples/jsm/loaders/OBJLoader'
import { MTLLoader } from "three/examples/jsm/loaders/MTLLoader"; // Import MTLLoader from 'three/examples/jsm/loaders/MTLLoader'

export default function Home() {
  const mapContainer = useRef(null);
  const [zoom] = useState(20);
  const [API_KEY] = useState("0OwvauUkDP7wGwh11RM9");

  useEffect(() => {
    let map = new maplibregl.Map({
      container: mapContainer.current,
      style: `https://api.maptiler.com/maps/streets-v2/style.json?key=${API_KEY}`,
      zoom: zoom,
      center: [lng, lat],
      pitch: 50,
      antialias: false,
    });

    map.on("load", () => {
      // Load OBJ model with texture
      const modelOrigin = [99.0856998, 9.9487982];
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
        scale: modelAsMercatorCoordinate.meterInMercatorCoordinateUnits(),
      };

      let customLayer = {
        id: "3d-model",
        type: "custom",
        renderingMode: "3d",
        onAdd(map, gl) {
          this.camera = new THREE.Camera();
          this.scene = new THREE.Scene();

          const directionalLight = new THREE.DirectionalLight(0xffffff, 2);
          directionalLight.position.set(0, -100, 10).normalize();
          directionalLight.castShadow = false; // Disable shadow casting
          this.scene.add(directionalLight);

          const directionalLight2 = new THREE.DirectionalLight(0xffffff, 2);
          directionalLight2.position.set(0, 100, 10).normalize();
          directionalLight2.castShadow = false; // Disable shadow casting
          this.scene.add(directionalLight2);

          const directionalLight3 = new THREE.DirectionalLight(0xffffff, 2);
          directionalLight3.position.set(100, 0, 10).normalize();
          directionalLight3.castShadow = false; // Disable shadow casting
          this.scene.add(directionalLight3);

          const mtlLoader = new MTLLoader();
          mtlLoader.load("./ssw_model.mtl", (mtl) => {
            mtl.preload();
            const objLoader = new OBJLoader();
            objLoader.setMaterials(mtl);
            objLoader.load("./ssw_model.obj", (OBJ) => {
              this.scene.add(OBJ);
            });
          });

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
        },
      };

      map.addLayer(customLayer); // Added layer to the map

      //SSW Logo
      map.loadImage(
        "https://cdn.discordapp.com/attachments/1087745142951256134/1200722420571578368/1.png?ex=65ec20e5&is=65d9abe5&hm=6ece3197a77950df34e175cf606c2385266e9871d951ab6ee002e7ab81e96a7f&",
        (error, image) => {
          //handle err
          if (error) {
            console.log(error);
          }

          //set logo ssw
          map.addImage("ssw", image);

          //set ssw logo position
          map.addSource("point", {
            type: "geojson",
            data: {
              type: "FeatureCollection",
              features: [
                {
                  type: "Feature",
                  geometry: {
                    type: "Point",
                    coordinates: [99.0852798, 9.9485982],
                  },
                },
              ],
            },
          });

          map.addLayer({
            id: "points",
            type: "symbol",
            source: "point",
            layout: {
              "icon-image": "ssw",
              "icon-size": 0.3,
            },
          });
        }
      ); //image Load

      //Marker set
      if (makerLng && makerLat) {
        new maplibregl.Marker().setLngLat([makerLng, makerLat]).addTo(map);
      }
    }); // end map load
  }, [API_KEY, lng, lat, zoom, makerLng, makerLat]);

  return (
    <>
      <div className="bg-zinc-950">
        <Header
          setLng={setLng}
          setLat={setLat}
          setMakerLat={setMakerLat}
          setMakerLng={setMakerLng}
        />
        <div className="map-wrap">
          <div ref={mapContainer} className="map" />
        </div>
      </div>
    </>
  );
}
