import React, { useEffect, useState } from 'react'
import { useAuth } from '../../Auth/AuthContext'
import Map from '../Dashboard/Map'
import MapToolkit from '../Dashboard/MapToolkit'


const Dashboard = () => {

    const { setStationData, onChangeMode, stations, mode } = useAuth()
    const [loaded, setLoaded] = useState(false)

    const [destination, setDestination] = useState("")
    const [pickup, setPickup] = useState("")

    const load = async e => {
        const rs = await setStationData()
        setLoaded(rs)
    }

    // socket.on("broadcast", (data) => {
    //     setCoords(data)
    // })

    const onChangeDestination = e => {
        stations.map((station) => {
            if (station.id === e.target.value) {
                const d = { lat: station.latitude, lng: station.longitude }
                setDestination(d)
            }
        })
    }
    const onChangePickup = e => {
        stations.map((station) => {
            if (station.id === e.target.value) {
                const d = { lat: station.latitude, lng: station.longitude }
                setPickup(d)
            }
        })
    }

    // useEffect(() => {
    //     debugger
    //     if (stations)
    //         setCoords({ lat: stations[0].latitude, lng: stations[0].longitude })

    // }, [stations])

    useEffect((e => {
        load()
    }), [])

    return (
        <div className='flex p-5 flex-col w-full h-full relative'>
            <div className='flex relative w-full h-full justify-center'>
                <Map loaded={loaded} stations={stations} destination={destination} pickup={pickup} />
            </div>
            <MapToolkit mode={mode} onChangeDestination={onChangeDestination} onChangePickup={onChangePickup} onModeChange={onChangeMode} />
        </div>
    )
}

export default Dashboard