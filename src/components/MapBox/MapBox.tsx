import { FC, useState, useEffect } from 'react';
import ReactMapGL, {
    GeolocateControl,
    Marker,
    Popup,
    ViewState,
} from 'react-map-gl';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHouse } from '@fortawesome/free-solid-svg-icons';
import 'mapbox-gl/dist/mapbox-gl.css';

type Coord = {
    longitude?: number;
    latitude?: number;
}

interface MapBoxProps {
    markers: Coord[]
}

type Address = {
    address?: string;
    latitude?: number;
    longitude?: number;
    zoom?: number;
    placeId?: string
};
  

const MapBox: FC<MapBoxProps> = ({markers}) => {
    const [currentAddress, setCurrentAddress] = useState<Address>({
        address: 'Ho Chi Minh City, Vietnam',
        latitude: 10.7758439,
        longitude: 106.7017555,
        zoom: 15,
    });

    

    useEffect(()=>{
        if(markers){
            const center = (positions: Coord[]) => {
                if (!positions.length) {
                  return null;
                }
            
                const lng_sum = positions.reduce((sum, coordinate) => sum + (coordinate?.longitude || 0), 0);
                const lat_sum = positions.reduce((sum, coordinate) => sum + (coordinate?.latitude || 0), 0);
                return { longitude: lng_sum / positions.length, latitude: lat_sum / positions.length, zoom: 5 };
            };
            const adjustMarker = markers.filter(m => !!m.latitude && !!m.longitude)
            console.log(adjustMarker)
            if(adjustMarker.length > 0){
                const positionCenter = center(adjustMarker)
                setCurrentAddress({...positionCenter})
            }
            
        }
    },[])

    
  return (
    <ReactMapGL
        {...currentAddress}
        mapLib={import('mapbox-gl')}
        mapboxAccessToken={process.env.NEXT_PUBLIC_MAPBOX_API_TOKEN}
        // initialViewState={{
        // }}
        onMove={evt => setCurrentAddress(evt.viewState)}
        style={{width: '100%'}}
        // mapStyle="mapbox://styles/mapbox/satellite-streets-v12"
        mapStyle="mapbox://styles/mapbox/streets-v12"
      >
        {/* <GeolocateControl /> */}
        {markers && markers.map((marker) =>{
            if(marker.latitude && marker.longitude){
                return (
                    <Marker longitude={marker.longitude} latitude={marker.latitude} anchor="bottom" >
                        <FontAwesomeIcon icon={faHouse} style={{color: "#b82500",}} />
                    </Marker>
                )
            }
            })
        }
        
    </ReactMapGL>
  );
};

export default MapBox;
