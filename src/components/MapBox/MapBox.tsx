import { FC, useState, useEffect, useMemo } from 'react';
import ReactMapGL, {
	GeolocateControl,
	Marker,
	Popup,
	ViewState,
} from 'react-map-gl';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHouse } from '@fortawesome/free-solid-svg-icons';
import Link from 'next/link';

type Coord = {
	longitude?: number;
	latitude?: number;
	name?: string;
	address?: string;
	id?: string;
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


const MapBox: FC<MapBoxProps> = ({ markers }) => {
	const [togglePopup, setTogglePopup] = useState<boolean[]>([])
	const [currentAddress, setCurrentAddress] = useState<Address>({
		address: 'Ho Chi Minh City, Vietnam',
		latitude: 10.7758439,
		longitude: 106.7017555,
		zoom: 15,
	});


	const createInitToggleStatus = (marker: Coord[]) => {
		const toggleInit = marker.map(() => false)
		setTogglePopup(toggleInit)
	}

	useEffect(() => {
		if (markers) {
			let zoom = 12
			createInitToggleStatus(markers)
			const center = (positions: Coord[]) => {
				if (!positions.length) {
					return null;
				}

				const lng_sum = positions.reduce((sum, coordinate) => sum + (coordinate?.longitude || 0), 0);
				const lat_sum = positions.reduce((sum, coordinate) => sum + (coordinate?.latitude || 0), 0);
				return { longitude: lng_sum / positions.length, latitude: lat_sum / positions.length, zoom: 9 };
			};
			const adjustMarker = markers.filter(m => !!m.latitude && !!m.longitude)
			// console.log(adjustMarker)
			if (adjustMarker.length > 0) {
				const positionCenter = center(adjustMarker)
				setCurrentAddress({ ...positionCenter, zoom })

			}
		}
	}, [markers])

	const onChangeStatusPopup = (idx: number|undefined, status: boolean) => {
		
		if(idx || idx == 0){
			const newTogglePopup = [...togglePopup]
			newTogglePopup[idx] = status
			setTogglePopup(newTogglePopup)
		}
	}
	console.log(77, togglePopup)

	return (
		<ReactMapGL
			{...currentAddress}
			mapboxAccessToken={process.env.NEXT_PUBLIC_MAPBOX_API_TOKEN}
			// initialViewState={{
			// }}
			onMove={evt => setCurrentAddress(evt.viewState)}
			style={{ width: '100%' }}
			// mapStyle="mapbox://styles/mapbox/satellite-streets-v12"
			mapStyle="mapbox://styles/mapbox/streets-v12"
		>
			{/* <GeolocateControl /> */}
			{markers && markers.map((marker, idx: number) => {
				if (marker.latitude && marker.longitude) {

					return (
						<>
							{togglePopup[idx] &&
								<Popup
									latitude={marker.latitude}
									longitude={marker.longitude}
									closeButton={true}
									closeOnClick={false}
									closeOnMove={true}
									onClose={() => onChangeStatusPopup(idx,false)}
									anchor='top-right'
								>
									<Link href={`/posts/${marker.id}`}><b className="cursor-pointer">{marker.name}</b></Link>
									<div><b>Địa chỉ:</b> <span>{marker.address}</span></div>
								</Popup>
							}
							<Marker longitude={marker.longitude} latitude={marker.latitude} anchor="bottom" >
								<img onClick={() => onChangeStatusPopup(idx, true)} style={{ width: '50px', height: '50px' }} src={'https://firebasestorage.googleapis.com/v0/b/hommie-thanhtc.appspot.com/o/icons8-home-48.png?alt=media&token=0c6355e2-e53d-4bd2-bd50-565f5e7ab1ac'} />
							</Marker>
						</>
					)
				}
			})
			}

		</ReactMapGL>
	);
};

export default MapBox;
