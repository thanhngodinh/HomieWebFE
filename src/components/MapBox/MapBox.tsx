import { FC, useState } from 'react';
import ReactMapGL, {
    GeolocateControl,
    Marker,
    Popup,
    ViewState,
} from 'react-map-gl';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLocationDot } from '@fortawesome/free-solid-svg-icons';


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

    const center = () => {
        if (!markers.length) {
          return null;
        }
    
        const lng_sum = markers.reduce((sum, coordinate) => sum + (coordinate?.longitude || 0), 0);
        const lat_sum = markers.reduce((sum, coordinate) => sum + (coordinate?.latitude || 0), 0);
        return { longitude: lng_sum / markers.length, latitude: lat_sum / markers.length, zoom: 15 };
      };

    
  return (
    <ReactMapGL
        {...center()}
        mapLib={import('mapbox-gl')}
        mapboxAccessToken={process.env.NEXT_PUBLIC_MAPBOX_API_TOKEN}
        initialViewState={{
          longitude: -100,
          latitude: 40,
          zoom: 17
        }}
        onMove={evt => setCurrentAddress(evt.viewState)}
        style={{width: '100%', height: '600px'}}
        // mapStyle="mapbox://styles/mapbox/satellite-streets-v12"
        mapStyle="mapbox://styles/mapbox/streets-v12"

      >
        <GeolocateControl />
        {markers && markers.map((marker) =>{
            if(marker.latitude && marker.longitude){
                return (
                    <Marker longitude={marker.longitude} latitude={marker.latitude} anchor="bottom" >
                        <FontAwesomeIcon icon={faLocationDot} style={{"--fa-primary-color": "#ff0000", "--fa-primary-opacity": "0.4", "--fa-secondary-color": "#ff0000", "--fa-secondary-opacity": "1",} as any} />
                    </Marker>
                )
            }
            })
        }
        
    </ReactMapGL>
  );
};

export default MapBox;
