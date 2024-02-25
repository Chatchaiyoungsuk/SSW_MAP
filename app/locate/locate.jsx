import React, { useRef, useEffect, useState } from "react";
import maplibregl from "maplibre-gl";
import "maplibre-gl/dist/maplibre-gl.css";
import map from "map";

export default function Locate() {

    map.on("load", () => {
      setMap(map);
      map.addControl(
        new maplibregl.GeolocateControl({
          positionOptions: {
            enableHighAccuracy: true,
          },
          trackUserLocation: true,
        })
      );
    });

    return () => map.remove(); // Cleanup function
  }, []);

  return <div ref={mapContainer} style={{ width: "100%", height: "100vh" }} />;
}
