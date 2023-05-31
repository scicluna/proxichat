export default function getAcceptableRanges(range: number, lat: number, lon: number) {
    const R = 3958.8; // Earth's radius in miles

    console.log(range)

    let newRange: number
    if (range == 0) {
        newRange = 1
    } else {
        newRange = range
    }

    console.log(newRange, "new range")

    // convert latitude into radians
    let latR = lat * Math.PI / 180;

    // Change in coordinates
    let deltaLat = newRange / R;
    let deltaLon = newRange / (R * Math.cos(latR));

    // convert deltas back to degrees
    deltaLat = deltaLat * 180 / Math.PI;
    deltaLon = deltaLon * 180 / Math.PI;

    // Minimum and maximum latitudes for bounding box
    let minLat = lat - deltaLat;
    let maxLat = lat + deltaLat;

    // Minimum and maximum longitudes for bounding box
    let minLon = lon - deltaLon;
    let maxLon = lon + deltaLon;

    return { minLatitude: minLat, maxLatitude: maxLat, minLongitude: minLon, maxLongitude: maxLon }
}
