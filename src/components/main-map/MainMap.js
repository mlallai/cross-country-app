import React, { useState } from 'react'
import ReactMapGL, { Marker } from 'react-map-gl'
import PolylineOverlay from './PolylineOverlay'

const MainMap = ({ markers = [], onChangeMarker }) => {
    const [loading, setLoading] = useState(false)

    // Set initial central viewport of map
    const [viewport, setViewport] = useState({
        latitude: 48.864716,
        longitude: 2.349,
        width: "100%",
        height: "100vh",
        zoom: 10
    })

    // save clicked point
    const handleClick = (event) => {
        setLoading(true)
        const { lngLat } = event
        const marker = {
            latitude: lngLat[1],
            longitude: lngLat[0],
            id: Math.floor((Math.random() * 1000000) + 1)
        }
        onChangeMarker(marker)
        setLoading(false)
    }

    return (
        <div>
            <ReactMapGL
                {...viewport}
                onClick={(event) => {
                    if (!loading) {
                        handleClick(event)
                    }
                }}
                mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_TOKEN}
                onViewportChange={viewport => {
                    setViewport(viewport)
                }}
            >
                <>
                    <PolylineOverlay points={markers} />
                    {
                        markers.map((marker, index) => {
                            const markerStep = index + 1
                            return (
                                <Marker
                                    on
                                    key={marker.id}
                                    latitude={marker.latitude}
                                    longitude={marker.longitude}
                                >
                                    <span className="markerStep">{markerStep}
                                    </span>
                                </Marker>
                            )
                        })
                    }
                </>

            </ReactMapGL>
        </div>
    )
}

export default MainMap