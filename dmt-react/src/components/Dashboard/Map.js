import { GoogleMap, useJsApiLoader, MarkerF, DirectionsRenderer } from "@react-google-maps/api"
import Details from "./Details"
import Loader from "../common/Loader"
import { useCallback, useEffect, useRef, useState } from "react";
import MarkerComponent from "../common/MarkerComponent"

const GMap = ({ stations, destination, pickup }) => {

    const center = {
        lat: parseFloat(stations[0].latitude),
        lng: parseFloat(stations[0].longitude)
    };

    const [map, setMap] = useState(null)

    const onLoad = useCallback(function callback(map) {
        setMap(map)
    }, [])

    const onUnmount = useCallback(function callback() {
        setMap(null)
    }, [])

    useEffect(() => {
        console.log(stations)
    })

    return <>
        <GoogleMap
            zoom={16}
            center={center}
            mapContainerClassName={"w-full h-full"}
            onLoad={onLoad}
            onUnmount={onUnmount}
            options={{
                disableDefaultUI: true, styles: [{
                    featureType: "poi", stylers: [
                        { visibility: "off" }
                    ]
                },
                {
                    featureType: "transit",
                    stylers: [{ "visibility": "off" }]
                },
                {
                    featureType: "administrative.neighborhood",
                    stylers: [{ "visibility": "off" }]
                },
                {
                    featureType: "road.local",
                    stylers: [{ "visibility": "off" }]
                },
                {
                    featureType: "road",
                    elementType: "labels",
                    stylers: [{ "visibility": "off" }]
                },
                ]
            }}
        >
            {map && stations.map((data, index) => {
                return <MarkerF
                    key={index}
                    icon={{
                        url: "https://cdn-icons-png.flaticon.com/512/8059/8059120.png",
                        scaledSize: new window.google.maps.Size(40, 40)
                    }}
                    position={{ lat: parseFloat(data.latitude), lng: parseFloat(data.longitude) }}
                    title={data.id}
                />
            })}
            <MarkerComponent position={center} />
        </GoogleMap>
        <div className="flex items-center justify-center absolute bottom-0 z-50 mb-20 w-auto h-[8%]">
            <Details key={1} />
        </div>
    </>
}

const Map = ({ loaded, stations, destination, pickup }) => {

    const { isLoaded } = useJsApiLoader({
        id: "google-map-script",
        googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
    });

    if (!isLoaded || !loaded) return <Loader />
    return <GMap stations={stations} destination={destination} pickup={pickup} />
}

export default Map