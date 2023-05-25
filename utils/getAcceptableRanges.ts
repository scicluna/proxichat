export default function getAcceptableRanges(range: number, lat: number, lon: number) {
    console.log(range, lat, lon)

    const R = 3958.8; // Earth's radius in miles

    // Change in coordinates
    let deltaLat = range / R;
    let deltaLon = range / (R * Math.cos(Math.PI * lat / 180));


    // Minimum and maximum latitudes for bounding box
    let minLat = lat - deltaLat;
    let maxLat = lat + deltaLat;

    // Minimum and maximum longitudes for bounding box
    let minLon = lon - deltaLon;
    let maxLon = lon + deltaLon;

    return { minLatitude: minLat, maxLatitude: maxLat, minLongitude: minLon, maxLongitude: maxLon }
}