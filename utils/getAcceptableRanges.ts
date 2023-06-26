import * as turf from '@turf/turf';

// This function will return a bounding box around a point
export default function getAcceptableRanges(range: number, lat: number, lon: number) {
    let newRange: number;
    if (range == 0) {
        newRange = .01
    } else newRange = range

    const center = turf.point([lon, lat]);

    // Convert range to kilo
    const kiloRange = newRange * 1.609344

    const circle = turf.circle(center, kiloRange, { units: 'kilometers' });
    const boundingBox = turf.bbox(circle);

    const [minLongitude, minLatitude, maxLongitude, maxLatitude] = boundingBox;
    return { minLatitude, maxLatitude, minLongitude, maxLongitude };
}
