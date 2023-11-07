import { FC, useEffect, useState, useRef } from 'react';
import { Loader } from '@googlemaps/js-api-loader';

interface MapProps {
  
}


const Map: FC<MapProps> = () => {

  const mapRef = useRef<HTMLDivElement>(null);

  useEffect(()=> {
    const initMap = async () => {
      const loader = new Loader({
        apiKey: process.env.NEXT_PUBLIC_MAPS_API_KEY || "",
        version: 'weekly',
      })

      const { Map } = await loader.importLibrary('maps')

      const {Place} = await loader.importLibrary('places') as google.maps.PlacesLibrary

      //init marker
      const { Marker } = await loader.importLibrary('marker') as google.maps.MarkerLibrary

      const position = {
        lat: 10.783291,
        lng: 106.668164
      }
      const mapOptions: google.maps.MapOptions = {
        center: position,
        zoom: 17,
        mapId: 'Homie_Map_Id',
        clickableIcons: true
      }

      const map = new Map(mapRef.current as HTMLDivElement, mapOptions )

      const marker = new Marker({
        map: map,
        position: position
      })

      const place = new Place({
        
      })
      place.
    }
    
    initMap()
  },[])

  return (
    <div style={{height: '600px'}} ref={mapRef}></div>
  )
};

Map.defaultProps = {
  
};

export default Map;
