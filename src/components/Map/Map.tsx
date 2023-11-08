import { FC, useEffect, useState, useRef } from 'react';
import { Loader } from '@googlemaps/js-api-loader';
import { getGeocode, getLatLng } from 'use-places-autocomplete';

interface MapProps {
  address?: string
  lat?: number
  lng?: number
}


const Map: FC<MapProps> = ({address, lat,lng}) => {
  const [map, setMap] = useState<any>(null);
  const [marker, setMarker] = useState<any>(null);

  const mapRef = useRef<HTMLDivElement>(null);

  const changeMapCenter = (lat: number, lng: number) => {
    if (map && marker) {
     
      marker.setAnimation(google.maps.Animation.BOUNCE);

      // Đặt thời gian animation (milliseconds)
      setTimeout(() => {
        marker.setAnimation(null); // Loại bỏ animation
      }, 2000); // Ví dụ: Animation trong 2 giây

      map.setCenter({ lat, lng });

      // Cập nhật vị trí của marker
      marker.setPosition({ lat, lng });
    }
  };

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

      const mapObject = new Map(mapRef.current as HTMLDivElement, mapOptions )
      setMap(map as any)

      const marker = new Marker({
        map: mapObject,
        position: position,
      })
      setMarker(marker)

      // const place = new Place({
        
      // })
      // place.
    }
    
    initMap()
  },[])

  useEffect(()=> {
    console.log(address)
    if(lat && lng){
      changeMapCenter(lat,lng)
    }else if(map && address){
      getGeocode({ address: address }).then((results) => {
        const coordinates = getLatLng(results[0]);
        changeMapCenter(coordinates.lat, coordinates.lng)
        console.log("📍 Coordinates: ",  coordinates.lat, coordinates.lng );
      });
    }
    
  },[address])


  

  return (
    <div style={{height: '600px'}} ref={mapRef}></div>
  )
};

Map.defaultProps = {
  
};

export default Map;
