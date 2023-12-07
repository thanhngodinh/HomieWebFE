import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import ReactMapGL, {
  GeolocateControl,
  Marker,
  Popup,
  ViewState,
} from 'react-map-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
// import { HousesQuery_houses } from "src/generated/HousesQuery";
import axiosClient from '../../api/axiosClient';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLocationDot } from '@fortawesome/free-solid-svg-icons';

interface IProps {
  address: string;
  height?: string;
}

type Address = {
  address?: string;
  latitude?: number;
  longitude?: number;
  zoom?: number;
  placeId?: string
};

export default function Map({ address,height }: IProps) {
  // const [selected, setSelected] = useState<any | null>(null);
  // const mapRef = useRef<any | null>(null);
  // const [currentAddress, setCurrentAddress] = useState<Address>({
  //   address: 'Ho Chi Minh City, Vietnam',
  //   latitude: 10.7758439,
  //   longitude: 106.7017555,
  //   zoom: 15,
  // });

  // useEffect(() => {
  //   (async () => {
  //     const getCoord = (address: string): Promise<any> => {
  //       const url = `https://rsapi.goong.io/geocode?address=${encodeURIComponent(
  //         address
  //       )}&api_key=${process.env.NEXT_PUBLIC_MAPBOX_API_TOKEN}`;
  //       return axiosClient.get(url);
  //     };
  //     try {
  //       const coord = await getCoord(address);
  //       console.log('coord', address);
  //       const position = {
  //         address: coord.results[0].formatted_address,
  //         placeId: coord.results[0].place_id,
  //         longitude: coord.results[0].geometry.location.lng,
  //         latitude: coord.results[0].geometry.location.lng,
  //       };
  //       setCurrentAddress(position);
  //       setMarkerAddress(position);
  //     } catch (error) {}
  //   })();
  // }, [address]);

  return (
    <div className="text-black relative">
      {/* <ReactMapGL
        {...currentAddress}
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
        {markerAddress && 
        <Marker longitude={markerAddress.longitude || 0} latitude={markerAddress.latitude || 0} anchor="bottom" >
          <FontAwesomeIcon icon={faLocationDot} style={{"--fa-primary-color": "#ff0000", "--fa-primary-opacity": "0.4", "--fa-secondary-color": "#ff0000", "--fa-secondary-opacity": "1",} as any} />
        </Marker>
        }
        
      </ReactMapGL> */}
      <iframe
        width="100%"
        height={height|| 600}
        loading="lazy"
        
        src={`https://www.google.com/maps/embed/v1/place?key=${process.env.NEXT_PUBLIC_MAPS_API_KEY}
        &q=${address}`}
      ></iframe>
    </div>
  );
}
