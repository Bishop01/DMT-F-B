import { MarkerF } from '@react-google-maps/api'
import React, { useEffect, useRef, useState } from 'react'
import { useAuth } from "../../Auth/AuthContext";
import io, { Socket } from "socket.io-client"

const MarkerComponent = ({ position }) => {

    // const [markerPos, setMarkerPos] = useState(position)
    const [newLocation, setNewLocation] = useState(null)
    // const [currentPos, setCurrentPos] = useState(null)

    const markerRef = useRef()

    //let newLocation = null
    let currentLocation = position
    //let markerpos = position

    const establishConnection = e => {
        const localhost = io("https://localhost:3001", { 'reconnection': false })
        localhost.on("broadcastLocalhost", data => {
            setNewLocation(data)
        })
    }

    useEffect(() => {
        establishConnection()
    }, [])

    useEffect(() => {
        console.log(markerRef.current)
        //setMarkerPos(1)
        if (markerRef.current)
            currentLocation = markerRef.current.position
        if (newLocation && markerRef.current)
            moveMarker(markerRef.current, 10)
    }, [newLocation])

    const moveMarker = (marker, n) => {
        debugger
        var lat = currentLocation.lat();
        var lng = currentLocation.lng();

        var deltalat = (newLocation.lat - currentLocation.lat()) / 200;
        var deltalng = (newLocation.lng - currentLocation.lng()) / 200;

        for (var i = 0; i < 200; i++) {
            (function (ind) {
                setTimeout(
                    function () {
                        var lat = marker.position.lat();
                        var lng = marker.position.lng();

                        lat += deltalat;
                        lng += deltalng;
                        var latlng = new window.google.maps.LatLng(lat, lng);
                        marker.setPosition(latlng);
                        //currentPos = marker.position;
                    }, 10 * ind
                );
            })(i)
        }
    }

    const onLoad = e => {
        markerRef.current = e
    }

    return (
        <div>
            <MarkerF onLoad={onLoad} position={currentLocation}
                icon={{
                    url: require('../../assets/train.png'),
                    scaledSize: new window.google.maps.Size(40, 40)
                }} />
        </div>
    )
}

export default MarkerComponent