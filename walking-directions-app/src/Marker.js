import {useState} from "react";
import {Review} from "./Review";

export const MarkerSetup = () =>{
    const {reviewingBoxDroppedMarker} = Review();

    /// <summary>
    // This function drops and creates a marker
    /// </summary>
    /// <param name="lat">latitude of marker</param>
    /// <param name="lng">longitude of marker</param>
    /// <param name="mapInstance">The overall Map</param>
    /// <param name="setMarkers">Markers array</param>
    /// <param name="markers">Markers array</param>
    const droppingMarkers = (lat, lng, mapInstance, setMarkers, markers) => {
        // Creates the marker
        const placement = {lat: lat, lng: lng};
        const marker = new window.google.maps.Marker({
            position: placement,
            map: mapInstance,
        });

        // Listener for whenever there is a single click
        marker.addListener('click', function () {
            reviewingBoxDroppedMarker(mapInstance, marker, lng, lat)
        })

        // Adds the new marker into the Array
        setMarkers([...markers, marker]);

        // If a double click on an existing marker, then make the marker invisible
        marker.addListener('dblclick', function () {
            console.log('Marker Invisible');
            marker.setMap(null);
        });
    }
    return{droppingMarkers};
}
