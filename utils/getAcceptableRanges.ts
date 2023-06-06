import * as turf from '@turf/turf';

// This function will return a bounding box around a point
export default function getAcceptableRanges(range: number, lat: number, lon: number) {

    let newRange: number;
    if (range == 0) {
        newRange = .01
    } else newRange = range

    // Create the point from your longitude and latitude
    const center = turf.point([lon, lat]);

    // Convert range to kilo
    const kiloRange = newRange * 1.609344

    // Create a circular polygon around the point with the specified range.
    const circle = turf.circle(center, kiloRange, { units: 'kilometers' });

    // Now get the bounding box of that circle, this will return an array [minX, minY, maxX, maxY]
    // which is equivalent to [minLon, minLat, maxLon, maxLat]
    const boundingBox = turf.bbox(circle);

    // Now you can return the bounding box or destructure it as per your needs
    const [minLongitude, minLatitude, maxLongitude, maxLatitude] = boundingBox;
    return { minLatitude, maxLatitude, minLongitude, maxLongitude };
}
