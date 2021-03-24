import React, { useRef } from 'react'

import Delete from '../../assets/icons/delete.svg';
import Menu from '../../assets/icons/menu.svg';

import { createGpx } from '../../utils/createGpxFile'

const List = ({ markers = [], onDeleteMarker, updateMarkers }) => {

    const draggingItem = useRef();
    const dragOverItem = useRef();
    const deleteMarker = (marker) => onDeleteMarker(marker)

    const handleDragStart = (e, position) => {
        draggingItem.current = position;
    };

    const handleDragEnter = (e, position) => {
        dragOverItem.current = position;
        const markersCopy = [...markers];

        const draggingItemContent = markersCopy[draggingItem.current];
        markersCopy.splice(draggingItem.current, 1);
        markersCopy.splice(dragOverItem.current, 0, draggingItemContent);

        draggingItem.current = dragOverItem.current;
        dragOverItem.current = null;
        updateMarkers(markersCopy);
    };


    const fileDownloadUrl = () => {
        if (markers.length < 1) {
            return null
        }
        const gpx = createGpx(markers)
        return URL.createObjectURL(new Blob([gpx], { type: "application/xml" }))
    }

    return (
        <>
            <div>
                <div>
                    <h1>Route Builder</h1>
                    <hr className="divider" />
                </div>
                <div>
                    {
                        markers.length < 1 && (
                            <div>
                                Please add your first waypoint.
                            </div>
                        )
                    }
                    <ul>
                        {
                            markers.map((marker, index) => {
                                const markerPosition = index + 1
                                return (
                                    <li
                                        key={marker.id}
                                        className="listItem"
                                        draggable
                                        onDragStart={(e) => handleDragStart(e, index)}
                                        onDragOver={(e) => e.preventDefault()}
                                        onDragEnter={(e) => handleDragEnter(e, index)}
                                    >
                                        <div>
                                            <img
                                                alt="menu"
                                                className="icon"
                                                src={Menu} />
                                        </div>
                                        <div>
                                            {`Waypoint ${markerPosition}`}
                                        </div>
                                        <div>
                                            <button onClick={() => deleteMarker(marker)}>
                                                <img
                                                    alt="delete"
                                                    className="icon"
                                                    src={Delete} />
                                            </button>
                                        </div>
                                    </li>
                                )
                            })
                        }
                    </ul>
                </div>
            </div>
            <div className="downloadBtnSection">
                <a
                    className="downloadBtn"
                    href={fileDownloadUrl()}
                    download="Route"
                >
                    <span style={{
                        color: '#000',
                        textDecoration: "none"
                    }}>Download your Route</span>
                </a>
            </div>
        </>
    )
}

export default List