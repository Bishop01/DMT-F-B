import React, { useEffect, useState } from 'react'
import io from "socket.io-client"
import { useAuth } from '../../Auth/AuthContext'
import Loader from '../common/Loader'

const Train = () => {

    const localhost = io("https://localhost:3001", { 'reconnection': false })
    const android = io("https://192.168.0.104:3002", { 'reconnection': false })
    const { mode } = useAuth()

    let coords = {
        lat: null,
        lng: null
    }
    const [location, setLocation] = useState(coords)

    const [loaded, setLoaded] = useState(false)
    const [error, setError] = useState("")

    const fixedLocation = [
        { lat: 23.8073343, lng: 90.3688909 },
        { lat: 23.8198167, lng: 90.3646337 },
        { lat: 23.825528, lng: 90.364117 },
        { lat: 23.8198167, lng: 90.3646337 },
        { lat: 23.8073343, lng: 90.3688909 },
        { lat: 23.7970495, lng: 90.3729062 },
        { lat: 23.788592, lng: 90.376480 },
    ]
    const maxCount = 7;
    let count = 0;
    let reverse = false

    useEffect(() => {
        if (mode == 0) {
            android.disconnect()
            localhost.connect("https://localhost:3001")
            localhost.on("connect", () => {
                setInterval(() => {
                    if (!reverse) {
                        if (count < maxCount - 1)
                            localhost.emit("sendViaLocalhost", fixedLocation[count++])
                        else
                            reverse = true
                    }
                    else {
                        if (count > 0)
                            localhost.emit("sendViaLocalhost", fixedLocation[count--])
                        else
                            reverse = false
                    }
                }, 2000)
            })
        }
        if (mode == 1) {
            android.connect()
            localhost.disconnect()
        }

        return () => { localhost.disconnect(); android.disconnect() }
    }, [mode])

    useEffect(() => {
        const interval = setInterval(() => {
            if (coords.lat && coords.lng)
                setLoaded(true)
            //console.log('This will run every second!');
            navigator.geolocation.getCurrentPosition(function (position) {
                //console.log(position)
                coords.lat = position.coords.latitude
                coords.lng = position.coords.longitude
                android.emit("send", coords)
            }, showError);

            setLocation(coords)
        }, 5000);
        return () => clearInterval(interval);
    }, []);

    function showError(error) {
        switch (error.code) {
            case error.PERMISSION_DENIED:
                setError("User denied the request for Geolocation.")
                console.log("asd")
                break;
            case error.POSITION_UNAVAILABLE:
                setError("Location information is unavailable.")
                break;
            case error.TIMEOUT:
                setError("The request to get user location timed out.")
                break;
            case error.UNKNOWN_ERROR:
                setError("An unknown error occurred.")
                break;
        }
    }

    return error ? <div>{error}</div> : <div>{location.lat} {location.lng}</div>
}

export default Train