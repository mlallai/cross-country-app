import xml from 'xml'

export const createGpx = (markers) => {
    return xml(
        {
            gpx: [
                {
                    _attr: {
                        // version: "1.1",
                        // xmlns: "http://www.w3.org/2001/XMLSchema-instance",
                        // "xmlns:xsi": "http://www.w3.org/2001/XMLSchema-instance",
                        // "xsi:schemaLocation": "http://www.topografix.com/GPX/1/1 http://www.topografix.com/GPX/1/1/gpx.xsd",
                        "version": "1.1",
                        "creator": "nodomain.freeyourgadget.gadgetbridge.GBApplication 0.35.2",
                        "xmlns": "http://www.topografix.com/GPX/1/1",
                        "xmlns:xsi": "http://www.w3.org/2001/XMLSchema-instance",
                        "xsi:schemaLocation": "http://www.topografix.com/GPX/1/1 http://www.topografix.com/GPX/1/1/gpx.xsd",
                        "xmlns:gpxtpx": "http://www.garmin.com/xmlschemas/TrackPointExtension/v1"
                    }
                },
                { metadata: [{ name: "My Route" }] },
                { trk: [{ name: "My Route" }, { trkseg: markers.map(getOnePoint) }] },
            ]
        },
        { declaration: true, indent: "  " },
    )
}

const getOnePoint = (marker) => ({
    trkpt: [{ _attr: { lat: marker.latitude, lon: marker.longitude } }]
})