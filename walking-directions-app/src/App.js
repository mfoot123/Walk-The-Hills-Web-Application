import React, { useRef, useState, useEffect } from 'react';
import {
    GoogleMap,
    LoadScript,
    Autocomplete,
    useJsApiLoader,
} from '@react-google-maps/api';
import { WiMoonWaningCrescent3, WiMoonFirstQuarter } from "react-icons/wi";
import { IoMenu } from "react-icons/io5";
import { FaDirections } from "react-icons/fa";
import { BiFontSize, BiSolidDirections } from "react-icons/bi";

import './App.css'
import './Menu.css'
import {Display} from './DarkMode';
import {MarkerSetup} from './Marker';
import { Review, ratingCheckBox, timeOfDayCheckBox } from "./Review";

// Links for Icons https://react-icons.github.io/react-icons/

/* global google */

const googleMapsApiKey = ''; //API Key
const center = { lat: 46.7304716, lng: -117.1934581 } //Pullman
const METERS2FEET = 3.28084; // Conversion from meters to feet
const METERS2MILES = 0.000621371;
const libraries = ['places', 'directions', 'elevation'];

const App = () => {
    const {isDarkMode, toggleDarkMode, currentMode, lightMode, darkMode} = Display();
    const {droppingMarkers} = MarkerSetup();
    const { convertPackageToUnique, checkBoxChecker, clearPath } = Review();
    const [isSidePanelOpen, setIsSidePanelOpen] = useState(false);
    const [markers, setMarkers] = useState([]);
    const [selectedMarkers, setSelectedMarkers] = useState([]);
    const [destination, setDestination] = useState('');
    const [directions, setDirections] = useState({ route: [] });
    const [elevationGain, setElevationGain] = useState(null);
    const [mapInstance, setMapInstance] = useState(null);
    const [polylines, setPolylines] = useState([]);
    const [isAddingStop, setIsAddingStop] = useState(false);
    const [stopLocation, setStopLocation] = useState('');
    const [stopMarkers, setStopMarkers] = useState([]);
    const [directionsReceived, setDirectionsReceived] = useState(false);
    const [showStopButton, setShowStopButton] = useState(false);
    const [totalDistance, setTotalDistance] = useState(0);
    const [checkboxForShortestDistance, setCheckboxForShortestDistance] = useState(false);
    const [checkboxForHighestElevation, setCheckboxForHighestElevation] = useState(false);
    const [elevationEnabled, setElevationEnabled] = useState(false);
    const [optionsSelected, setOptionsSelected] = useState(false);
    const [distanceEnabled, setDistanceEnabled] = useState(false);
    const [selectedRouteIndex, setSelectedRouteIndex] = useState(null);
    const [action, setAction] = useState();
    const [currentLocation, setCurrentLocation] = useState('');
    const [isGettingLocation, setIsGettingLocation] = useState(false);
    const [locationFound, setLocationFound] = useState(false);
    const [userMarker, setUserMarker] = useState(null);
    const [showPlanRouteTextbox, setShowPlanRouteTextbox] = useState(true);
    
    const timerRef = useRef();
    const isLongPress = useRef(false);
    let specificReview = 0;
    let currentReviewBox = null;
    let polyline;

    let reviewPath = null;
    let markerArray = [];
    let polylineArray = [];

    /// <summary>
    /// Handles the loading of our Google Map
    /// </summary>
    /// <param name="isLoaded">state that tells whether map is loaded or not.</param>
    /// <param name="loadError">state that tells the loading error.</param>
    const { isLoaded, loadError } = useJsApiLoader({

        // the ID for our script
        id: 'google-map-script',

        // our api key
        googleMapsApiKey: googleMapsApiKey,

        // our list of libraries
        libraries: libraries
    });

    /// <summary>
    /// Displays error and loading from our Google Map loadding
    /// </summary>
    /// <returns>div error or loading content.</returns>
    const handleMapLoading = () => {
        // if there is a load error, display to user
        if (loadError) {
            return <div>Error loading maps</div>;
        }
    
        // display if map is currently loading
        if (!isLoaded) {
            return <div>Loading Maps...</div>;
        }
    };

    // use effect hook
    useEffect(() => {

        // if we are currently grabbing the users location
        if (isGettingLocation) {

        // define userMarker state and setUserMarker function
        let userMarker = null;

        /// <summary>
        /// Sets the user marker to our custom marker defined later
        /// </summary>
        /// <param name="marker">marker that we are setting as the user marker.</param>
        const setUserMarker = (marker) => {
            userMarker = marker;
        };

        /// <summary>
        /// Tracks the location of the user, updating our marker every 5 seconds on the map
        /// </summary>
        const trackLocation = () => {

            /// <summary>
            /// Gets the location of the user, sets initial marker position on map
            /// </summary>
            const getLocation = () => {

                // get users current location (lat, long)
                navigator.geolocation.getCurrentPosition(
                    ({ coords: { latitude, longitude } }) => {
                        
                        // set that location, store in a state
                        setCurrentLocation(`${latitude}, ${longitude}`);

                        // create/update marker position
                        const userLocation = new window.google.maps.LatLng(latitude, longitude);

                        // if marker doesn't exist, create it
                        if (!userMarker) {
                            const marker = new window.google.maps.Marker({

                                // set position to be user location
                                position: userLocation,

                                // place it on our current map instance
                                map: mapInstance,

                                // use icon from google
                                icon: {
                                    url: 'https://maps.google.com/mapfiles/ms/icons/yellow-dot.png',

                                    // scale icon to make it stand out more
                                    scaledSize: new window.google.maps.Size(40, 40),
                                },
                            });

                            // set the user marker state with our custom marker
                            setUserMarker(marker);

                        // if marker already exists, update its position
                        } else {
                            userMarker.setPosition(userLocation);
                        }

                        // update that we have found the users location
                        setLocationFound(true);
                    },

                    // if we cant get the users location, print appropriate errors
                    (err) => {

                        // print errors to help with debugging
                        console.error('Error getting current location:', err);
                        console.error('Error code:', err.code);
                        console.error('Error message:', err.message);

                        // timeout error:
                        // if we are supposed to check every 5 seconds but it takes longer, an error will occur
                        if (err.code === 3) {
                            console.error('Timeout expired');

                            // retry every 5 seconds to establish connection
                            setTimeout(getLocation, 5000);
                        }
                    },
                    
                    // define certain necessary settings
                    { enableHighAccuracy: true, timeout: 5000, maximumAge: 0 }
                );
            };

            // get users initial location
            getLocation();

            // set interval to ping location every 5 seconds
            const intervalId = setInterval(() => {
                getLocation();
            }, 5000);

            // clean up the interval when the component unmounts
            return () => {
                clearInterval(intervalId);
            };
        };

        // call the function on component mount
        trackLocation();

        // clear userMarker on component refresh
        if (userMarker) {

            // remove marker from the map
            userMarker.setMap(null);
        }
    }

    // states that we use/need access to modify
}, [isGettingLocation, mapInstance]);


    /// <summary>
    /// Used to set the state needed for defining whether we are currently getting a users location
    /// </summary>
    const handleGetCurrentLocation = () => {

        // set state to true to indicate we are tracking the users location
        setIsGettingLocation(true); 
    };

    /// <summary>
    /// Used to set the state needed for defining whether the planning routes text box is being shown
    /// </summary>
    const handlePlanRouteClick = () => {
        setShowPlanRouteTextbox(false);
    };

    /// <summary>
    /// Used to set the state needed for defining whether the planning routes text box is being hidden
    /// </summary>
    const handleHideClick = () => {
        setShowPlanRouteTextbox(true);
    };
    
    /// <summary>
    /// Used to set the state needed for defining whether the planning side(top) panel is open
    /// </summary>
    const toggleSidePanel = () => {
        setIsSidePanelOpen(!isSidePanelOpen);
    };

    /// <summary>
    /// Handles the kind of click the user makes on our map, needed for placing markers
    /// </summary>
    /// <param name="e">event object.</param>
    const handleMapClick = (e) => {

        // print to the console the function is running
        console.log("HandleMapClick");

        // if the user is crrently long pressing
        if (isLongPress.current) {

            // print it is a long press and its the map thats been clicked
            console.log("it is a long press!");
            console.log("Map is clicked");

            // set our clicks position
            const clickPosition = e.latLng;

            // convert that to a lat and long value
            const lat = clickPosition.lat();
            const lng = clickPosition.lng();

            // print them to the console
            console.log(clickPosition.lat(), clickPosition.lng())

            // calls function drop markers
            droppingMarkers(lat, lng, mapInstance, setMarkers, markers);
        }
    }

    /// <summary>
    /// Defines the kind of click the user makes on our map
    /// </summary>
    // Source: https://www.youtube.com/watch?v=mfaUfH6mo3U
    const handleOnMouseDown = () =>{
        console.log("onMouseDwon");
        startPressTimer();
    }

    /// <summary>
    /// Defines the kind of click the user makes on our map
    /// </summary>
    // Source: https://www.youtube.com/watch?v=mfaUfH6mo3U
    const handleOnMouseUp = () =>{
        console.log("onMouseUp");
        clearTimeout(timerRef.current);
    }

    /// <summary>
    /// Defines the kind of click the user makes on our map
    /// </summary>
    // Source: https://www.youtube.com/watch?v=mfaUfH6mo3U
    const handleOnTouchStart = () =>{
        console.log("onTouchStart");
        startPressTimer();
    }

    /// <summary>
    /// Defines the kind of click the user makes on our map
    /// </summary>
    // Source: https://www.youtube.com/watch?v=mfaUfH6mo3U
    const handleOnTouchEnd = () =>{
        console.log("onTouchEnd");
        clearTimeout(timerRef.current);
    }

    /// <summary>
    /// Defines how long a press has been, to determine if its been "long"
    /// </summary>
    // Source: https://www.youtube.com/watch?v=mfaUfH6mo3U
    const startPressTimer = () => {
        isLongPress.current = false;
        timerRef.current = setTimeout(() => {
            setAction('longpress');
            isLongPress.current = true;
        }, 300);
    }

    /// <summary>
    /// function to strip HTML tags from directions, it places a div element over stylizing tags and eliminates those from the string
    /// </summary>
    /// <param name="htmlString">string of html code we need to strip.</param>
    /// <returns>div text content.</returns>
    function stripHtmlTags(htmlString) {
        const div = document.createElement("div");
        div.innerHTML = htmlString;
        return div.textContent || div.innerText || "";
    }

    /// <summary>
    /// sets our destination state to our new destination when it changes
    /// </summary>
    /// <param name="value">new destination value.</param>
    /// <returns> new destination value.</returns>
    const handleDestinationChange = (value) => {
        setDestination(value);
        return value;
    };

    /// <summary>
    /// sets our current location state to our new destination when it changes
    /// </summary>
    /// <param name="value">new current location value.</param>
    /// <returns> new current location value.</returns>
    const handleCurrentLocationChange = (value) => {
        setCurrentLocation(value);
    };

    /// <summary>
    /// sets our elevation checkbox if shortest distance is unchecked
    /// </summary>
    const handleElevationCheckboxChange = () => {

        // sets state variables for elevation and options
        setElevationEnabled(!elevationEnabled);
        setOptionsSelected(!optionsSelected)
        if (!elevationEnabled && distanceEnabled) {

            // uncheck shortest route if elevation is checked
            setDistanceEnabled(false);
        }
    };

    /// <summary>
    /// sets our distance checkbox if elevation is unchecked
    /// </summary>
    const handleDistanceCheckboxChange = () => {

        // sets state variables for distance and options
        setDistanceEnabled(!distanceEnabled);
        setOptionsSelected(!optionsSelected)

        if (!distanceEnabled && elevationEnabled) {
            
            // uncheck elevation if fastest is checked
            setElevationEnabled(false);
        }
    };

    /// <summary>
    /// handles adding a stop to our already defined route
    /// </summary>
    const handleAddStop = () => {

        // check if polylines already exist on our map
        if(isAddingStop == false)
        {
            // remove the polyline if one exists
            removeFirstPolyline();
        }

        // set a state to say we are adding stops/stops have been added
        setIsAddingStop(true);

        // check for blank input in array, trim removes whitespace
        if (stopLocation.trim() !== '') {

            // create new geocoder object
            const geocoder = new window.google.maps.Geocoder();

            // use the geocoder service to find geographic data based on the address specified in our stops location
            geocoder.geocode({ address: stopLocation }, (results, status) => {

                // if status returns ok and the results exist
                if (status === 'OK' && results && results[0] && results[0].formatted_address) {

                    // retrieve the formatted address
                    const newStopAddress = results[0].formatted_address;

                    // clear old polylines and markers
                    clearMap(mapInstance);

                    // make a copy of the current stops array
                    const currentStops = [...stopMarkers];

                    // add new stop address to the array
                    currentStops.push(newStopAddress);

                    // update the state/array with the new stop markers
                    setStopMarkers(currentStops);

                    // print the updated array
                    const updatedAddressesArray = createAddressesArray(
                        currentLocation,
                        currentStops,
                        destination
                    );
                    console.log(updatedAddressesArray);

                    // draw polylines for the route
                    drawMultiplePolylines(updatedAddressesArray, mapInstance);

                // error handling for debugging
                } else {
                    console.error('Error geocoding stop location:', status);
                    alert('Error geocoding stop location. Please enter a valid address.');
                }
            });
        }
    };

    /// <summary>
    /// open/closing of the textbox
    /// </summary>
    const toggleStopTextBox = () => {
        setIsAddingStop(!isAddingStop);
    };

    /// <summary>
    /// function to clear polylines and markers (our map)
    /// </summary>
    /// <param name="mapInstance">our current map instance.</param>
    const clearMap = (mapInstance) => {

        // log that we have entered the clear map function
        console.log("clearMap Function");

        // go through polyline array and clear each one
        polylines.forEach(polyline => {
            polyline.setMap(null);
        });

        // go through marker array and clear each one
        markers.forEach(marker => {
            marker.setMap(null);
        });

        // go through secondary marker array and clear each one
        markerArray.forEach(marker => {
                marker.setMap(null);
            });

        // ensure each array is empty
        setPolylines([]);
        setMarkers([]);
    };
    
    /// <summary>
    /// takes in an array of addresses and draws polylines between each address adjacent in the array
    /// </summary>
    /// <param name="addressesArray">our current array of addresses.</param>
    /// <param name="map">our map object.</param>
    const drawMultiplePolylines = async (addressesArray, map) => {

        // new directions service object
        const directionsService = new window.google.maps.DirectionsService();

        try {

            // loop through the array of addresses
            for (let i = 0; i < addressesArray.length - 1; i++) {

                // current location should be first index
                const origin = addressesArray[i];

                // "destination" should be second index
                // this isnt our actual final destination, but is easier to cenceptualize
                // in the context of how the directionsService/polylines work
                // in this case we are creating multiple polylines between multiple origins and destinations
                const destination = addressesArray[i + 1];

                // get the path for the current segment
                const result = await new Promise((resolve, reject) => {

                    // create a new route
                    directionsService.route(
                        {
                            origin: origin,
                            destination: destination,
                            travelMode: 'WALKING',
                        },
                        (result, status) => {
                            if (status === 'OK') {
                                resolve(result);
                            } else {
                                reject(status);
                            }
                        }
                    );
                });
                // create a new polyline for that path
                createPolylineFromPath(result.routes[0].overview_path, [], map, result);

                // handle the directions result here if needed
                setDirections(result);
                setDirectionsReceived(true);
                createMarkersForSteps(result.routes[0].legs[0].steps,mapInstance, map, result)
            }

        // error handling
        } catch (error) {
            console.error('Error fetching directions:', error);
            alert('Error fetching directions. Please try again.');
        }
    };

    /// <summary>
    /// takes in an array of addresses and draws polylines between each address adjacent in the array
    /// </summary>
    /// <param name="path">our path we want a polyline for.</param>
    /// <param name="steps">steps in our route.</param>
    /// <param name="mapInstance">our current map instance.</param>
    const createPolylineFromPath = (path, steps, mapInstance) => {

        // get a random color for the polyline
        let currentColor = getRandomColor();

        // create current path var
        let currentPath = [];

        // for the length of the path
        for (let i = 0; i < path.length; i++) {

            // connect each marker with the polyline
            currentPath.push(path[i]);

            // create markers and polylines when reaching the end/last point
            if (i === path.length - 1 || steps[i + 1]) {

                // create new polyline object
                const currentPolyline = new window.google.maps.Polyline({
                    path: currentPath,
                    strokeColor: currentColor,
                    strokeOpacity: 1,
                    strokeWeight: 5,
                    map: mapInstance,
                });

                // store the polyline in our array
                polylineArray.push(currentPolyline);
            }
        }

        // update the polylines array with the new polylines
        setPolylines((prevPolylines) => [...prevPolylines, ...polylineArray]);
    };

    /// <summary>
    /// takes in an array of addresses and draws polylines between each address adjacent in the array
    /// </summary>
    /// <param name="currentLocation">current location of our user.</param>
    /// <param name="stops">stops in our route.</param>
    /// <param name="destination">our users wanted destination.</param>
    /// <returns> an array, either blank or full of addresses.</returns>
    const createAddressesArray = (currentLocation, stops, destination) => {

        // make sure all inputs are not empty (example " ")
        if (!currentLocation || !destination) {
            console.error('Invalid input. Please provide all required addresses.');
            return [];
        }
        // convert stops to an array only if it's a string and not already an array
        const stopsArray = Array.isArray(stops) ? stops : [stops];
        // filter out empty strings in stopsArray
        const filteredStops = stopsArray.filter(stop => stop.trim() !== '');
        // combine addresses into an array with the desired order
        // desired order: currentLocation, stops..., destination
        const addressesArray = [currentLocation, ...filteredStops, destination];
        // return updated array
        return addressesArray;
    };

    /// <summary>
    /// gets a random color for our polyline.
    /// </summary>
    // credit: https://stackoverflow.com/questions/1484506/random-color-generator
    const getRandomColor = () => {
        var letters = '0123456789ABCDEF';
        var color = '#';
        for (var i = 0; i < 6; i++) {
            color += letters[Math.floor(Math.random() * 16)];
        }
        return color;
    };


    /// <summary>
    /// handles the removal of a polyline, primarily the first one in our array
    /// </summary>
    const removeFirstPolyline = () => {

        // make sure the array is full
        if (polylines.length > 0) {

            // shift the array so the first is removed
            const removedPolyline = polylines.shift();

            // remove the markers from the array
            const removedMarkers = markers.splice(0, removedPolyline.getPath().getLength());

            // update the states
            setPolylines([...polylines]);
            setMarkers([...markers]);

            // remove from the map
            removedPolyline.setMap(null);
            removedMarkers.forEach((marker) => marker.setMap(null));
        }
    };

    /// <summary>
    /// takes in an array of addresses and draws polylines between each address adjacent in the array
    /// </summary>
    /// <param name="steps">steps along our route.</param>
    /// <param name="routeIndex">index of the route within our array.</param>
    /// <param name="result">a path.</param>
    /// <returns> a selected route.</returns>
    const createMarkersForSteps = (steps, routeIndex, result) => {

        // create new markers based on given steps
        const newMarkers = steps.map((step) => {

            // create new marker
            const marker = new window.google.maps.Marker({
                position: step.start_location,
                map: mapInstance,
                directions: step.instructions, // Assign the directions to the marker
            });

            // when a marker is clicked, display the directions
            marker.addListener('click', () => {
                
                // clear selection if one marker is already selected and no specific review mode is active
                if (selectedMarkers.length === 1 && specificReview === 0) {
                    selectedMarkers.length = 0;
                }

                // add the position of the clicked marker to the selection
                selectedMarkers.push(marker.getPosition());

                // ff two markers are selected and specific review mode is active, create a path between them
                if (selectedMarkers.length === 2 && specificReview === 1) {
                    createPath(selectedMarkers[0], selectedMarkers[1]);
                    selectedMarkers.length = 0;
                    specificReview = 0;
                }

                // open the review option when a marker is clicked
                else {
                    console.log("Review option open");
                    reviewingBoxPathMarkers(mapInstance, step, marker, result);
                }
            });

            // return newly created marker
            return marker;
        });

        // add all new markers to the markerArray.
        markerArray.push(...newMarkers);

        // update the markers state with the new array of markers.
        setMarkers(markerArray);

    }

    /// <summary>
    /// handles getting directions between two points on our map
    /// </summary>
    /// <returns> a route selected by the user based off of their parameters.</returns>
    const handleGetDirections = () => {
        
        // new directions service object
        const directionsService = new window.google.maps.DirectionsService();
    
        // clear map
        clearMap(mapInstance);
    
        // create a directions object with additional options based on checkboxes
        const directionsRequest = {
            origin: currentLocation,
            destination: destination,
            travelMode: 'WALKING',
            provideRouteAlternatives: true, // give more than one route
        };
    
        // make the directions request with the updated options
        directionsService.route(directionsRequest, async (result, status) => {
    
            // if status returns ok
            if (status === 'OK') {
    
                // clear previous directions
                setDirections(result); // change to []
    
                // initialize arrays to store routes with elevation and distance.
                const routesWithElevation = [];
                const routesWithDistance = [];
    
                // loop through the routes and calculate total distance and elevation for each
                for (let i = 0; i < result.routes.length; i++) {
    
                    // grab a route
                    const route = result.routes[i];
    
                    // calculate totalDistance
                    const totalDistance = calculateTotalDistance(route);
    
                    // calculate total elevation gain
                    const totalElevationGain = await calculateTotalElevationGain(route);
    
                    // store route information in respective arrays.
                    routesWithElevation.push({ index: i, elevationGain: totalElevationGain });
                    routesWithDistance.push({ index: i, distance: totalDistance });
                }
    
                // sort arrays based elevation gain and distance (least to greatest)
                routesWithElevation.sort((a, b) => a.elevationGain - b.elevationGain);
                routesWithDistance.sort((a, b) => a.distance - b.distance);
    
                // Determine the selected route index based on users' preferences
                let selectedRouteIndex;

                // if elevation
                if (elevationEnabled) {

                    // find the first route with the lowest elevation that is not the same as the one at index 0
                    for (let i = 1; i < routesWithElevation.length; i++) {
                        if (routesWithElevation[i].elevationGain === routesWithElevation[0].elevationGain) {
                            selectedRouteIndex = routesWithElevation[i].index;
                            break;
                        }
                    }

                    // if no alternative route with the same elevation, choose the one at index 0
                    if (selectedRouteIndex === undefined) {
                        selectedRouteIndex = routesWithElevation[0].index;
                    }
                } else {

                    // find the first route with the shortest distance that is not the same as the one at index 0
                    for (let i = 1; i < routesWithDistance.length; i++) {
                        if (routesWithDistance[i].distance === routesWithDistance[0].distance) {
                            selectedRouteIndex = routesWithDistance[i].index;
                            break;
                        }
                    }
                    // if no alternative route with the same distance, choose the one at index 0
                    if (selectedRouteIndex === undefined) {
                        selectedRouteIndex = routesWithDistance[0].index;
                    }
                }
    
                // define the route selected for the user
                const selectedRoute = result.routes[selectedRouteIndex];
    
                // update the distance and elevation display based on selected route
                setTotalDistance(Number((selectedRoute.legs.reduce((acc, leg) => acc + leg.distance.value, 0) * METERS2MILES).toFixed(3)));
                setElevationGain(routesWithElevation.find((route) => route.index === selectedRouteIndex).elevationGain);
    
                // create markers, set the route, and create the polyline
                createMarkersForSteps(selectedRoute.legs[0].steps, selectedRouteIndex, result);
                setSelectedRouteIndex(selectedRouteIndex);
                createPolylineFromPath(selectedRoute.overview_path, selectedRoute.legs[0].steps, mapInstance);
    
                // enable the stop button so users can add stops
                setShowStopButton(true);
    
                // return the selected route
                return selectedRoute;
    
            // error handling
            } else {
                console.error('Error fetching directions:', status);
            }
        });
    };    

    /// <summary>
    /// Function to calculate total distance for a route.
    /// </summary>
    /// <param name="route">route we need to calculate the distance for.</param>
    /// <returns> total distance of a route in miles.</returns>
    const calculateTotalDistance = (route) => {

        // create var for distance in meters
        let totalDistanceMeters = 0;

        // go through each leg of the route, adding the value in meters to our var
        for (let i = 0; i < route.legs.length; i++) {
            totalDistanceMeters += route.legs[i].distance.value;
        }

        // convert total distance from meters to miles
        const totalDistanceMiles = totalDistanceMeters * METERS2MILES;

        // update state with total distance in miles
        setTotalDistance(totalDistanceMiles);

        // return the total distance of the route in miles
        return totalDistanceMiles;
    };

    /// <summary>
    /// Function to calculate total elevation gain for a route.
    /// </summary>
    /// <param name="route">route we need to calculate the total elevation gain for.</param>
    /// <returns> total elevation gain of a route.</returns>
    const calculateTotalElevationGain = async (route) => {

        // create total elevation gain var
        let totalElevationGain = 0;

        // walk our route
        for (let i = 0; i < route.legs[0].steps.length; i++) {

            // keep track of each step
            const step = route.legs[0].steps[i];

            // make sure the step is valid
            if (step.start_location && step.end_location) {

                // calculate elevation gain for each step
                const elevationPath = [step.start_location, step.end_location];
                const stepElevationGain = await calculateElevationGain(elevationPath);

                // add our result to our total
                totalElevationGain += stepElevationGain;
            }
        }

        // update our elevation gain state
        setElevationGain(totalElevationGain);

        // return the total elevation gain for the route
        return totalElevationGain;
    };

    /// <summary>
    /// Function to calculate elevation gain data along a given path.
    /// </summary>
    /// <param name="path">path on our route we need to calculate elevation gain for.</param>
    /// <returns> promise of the elevation gain of the path of a route.</returns>
    const calculateElevationGain = (path) => {

        // create a new Promise to handle asynchronous elevation data retrieval
        return new Promise((resolve, reject) => {

            // create a new elevation service object
            const elevationService = new window.google.maps.ElevationService();

            // make a request to get elevation data along a path
            elevationService.getElevationAlongPath(
                {
                    path: path,

                    // # of elevation samples along the path
                    samples: 256,
                },

                // handle the response
                (elevationData, elevationStatus) => {

                    // if response is ok
                    if (elevationStatus === 'OK') {

                        // elevation gain variab;e
                        let elevationGain = 0;

                        // calculate elevation gain from elevation data
                        for (let i = 1; i < elevationData.length; i++) {
                            const gain = elevationData[i].elevation - elevationData[i - 1].elevation;
                            if (gain > 0) {
                                elevationGain += gain;
                            }
                        }

                        // convert elevation gain from meters to feet
                        const elevationGainFeet = elevationGain * METERS2FEET;

                        // resolve promise
                        resolve(elevationGainFeet);

                    // error handling
                    } else {
                        console.error('Error fetching elevation data:', elevationStatus);
                        reject('Error fetching elevation data');
                    }
                }
            );
        });
    };

    /// <summary>
    /// Inside the createPolyline function, this function is used for reviewing a path
    /// </summary>
    /// <param name="position1">first step along the route.</param>
    /// <param name="position2">second step along the route.</param>
    const createPath = (position1, position2) => {
        const directionsService = new window.google.maps.DirectionsService();
        directionsService.route(
            {
                origin: position1,
                destination: position2,
                travelMode: 'WALKING',
            },
            (result, status) => {
                if (status === 'OK') {
                    if (reviewPath) {
                        reviewPath.setMap(null);
                    }
                    const pathCoordinates = result.routes[0].overview_path;
                    const path = new window.google.maps.Polyline({
                        path: pathCoordinates,
                        geodesic: true,
                        strokeColor: '#0000FF', // Blue color
                        strokeOpacity: 1.0,
                        strokeWeight: 8, // Thickness of the line
                        map: mapInstance,
                        visible: false // make true if you want to see the path that are being reviewed.
                    });
                    reviewPath = path;
                    result.routes[0].legs[0].steps.forEach(step => {
                        const marker = new window.google.maps.Marker({
                            position: step.start_location,
                            map: mapInstance,
                            visible: false,
                        });
                        reviewingBoxRouteMarker(mapInstance, step, marker, result);
                        return marker;
                    });
                } else {
                    console.error('Error fetching directions:', status);
                }
            }
        );
    };

    /// <summary>
    // This function is the review box for the markers that are ALREADY on the route    
    /// </summary>
    /// <param name="mapInstance">The overall Map</param>
    /// <param name="step">steps along our route</param>
    /// <param name="marker">The marker selected</param>
    /// <param name="result">the path</param>
    /// <returns> A string that is converted to tokenize the data </returns>
    const reviewingBoxRouteMarker = (mapInstance, step, marker, result) => {
        // Checks to see if a text box is already open
        if (currentReviewBox) {
            currentReviewBox.close();
        }

        // Representing the text boxes that will be checked off in the review
        const timeDiv = timeOfDayCheckBox;
        const ratingDiv = ratingCheckBox;
        let text = new window.google.maps.InfoWindow();
        currentReviewBox = text;
        //https://stackoverflow.com/questions/5656392/how-to-create-input-type-text-dynamically
        // create elements
        const inst = step.instructions;
        const paragraph = document.createElement('h2');
        const content = document.createElement('div');
        const rating = document.createElement('div');
        const time = document.createElement('div');
        const ratingTitle = document.createElement('h4');
        const timeTitle = document.createElement('h4');
        const reviewTitle = document.createElement('h4');
        const inputField = document.createElement('textarea');
        const submitButton = document.createElement('button');

        // Assigning elements
        paragraph.innerHTML = inst;
        inputField.id = 'inputField';
        inputField.rows = 5;
        inputField.placeholder = 'Type Here...';
        inputField.style.width = '300px';
        inputField.style.resize = 'none';
        rating.innerHTML = ratingDiv;
        ratingTitle.textContent = 'RATING';
        timeTitle.textContent = 'TIME OF DAY';
        reviewTitle.textContent = 'Leave a Review';
        time.innerHTML = timeDiv;
        submitButton.textContent = 'Submit';
        submitButton.id = 'submitButton';

        // Adding them to the content div
        content.appendChild(paragraph);
        content.appendChild(timeTitle);
        content.appendChild(time);
        content.appendChild(ratingTitle);
        content.appendChild(rating);
        content.appendChild(reviewTitle);
        content.appendChild(inputField);
        content.appendChild(submitButton);

        // Set the content of the review box to the dynamically created content
        text.setContent(content);

        // Open the review box on the map at the marker's position
        text.open(mapInstance, marker);

        // Creating an event listener to see when the closed butten is clicked
        window.google.maps.event.addListener(text, 'closeclick', () => {
            selectedMarkers.length = 0;
            specificReview = 0;
        });
        // Once submit is pressed, return the packaged data with the route, and review
        submitButton.addEventListener('click', function () {
            clearPath(polyline); // Clears the path on the map that is being reviewed

            // Collecting the checkboxes related to options
            const checkboxes = document.querySelectorAll('input[type="checkbox"][name="option"]');
            const checkboxes_2 = document.querySelectorAll('input[type="checkbox"][name="timeOfDay"]');

            // Collect the value entered in the review box
            const enteredValue = inputField.value;

            // Assigning the checkboxes to a value
            const levelOfSafety = checkBoxChecker(checkboxes);
            const timeOfDay = checkBoxChecker(checkboxes_2);

            // Collecting the path that is reviewed
            const packagedData = result.routes[0].overview_path;

            // Printing to the console what is being returned
            console.log('Packaged data: ' + convertPackageToUnique(packagedData, enteredValue, levelOfSafety, timeOfDay));
            text.close(); // Close text

            // Calling function to convert the data into it's unique string for the database
            return convertPackageToUnique(packagedData, enteredValue, levelOfSafety, timeOfDay);
        });
    }

    /// <summary>
    // Reviewing a specific path within the route    
    /// </summary>
    /// <param name="mapInstance">The overall Map</param>
    /// <param name="step">steps along our route</param>
    /// <param name="marker">The marker selected</param>
    /// <param name="result">the path</param>
    /// <returns> A string that is converted to tokenize the data </returns>
    const reviewingBoxPathMarkers = (mapInstance, step, marker, result) =>{
        // Checking to see if there are any other boxes open
        if (currentReviewBox) {
            console.log("Close Review Box");
            currentReviewBox.close();
        }
        let questionBox = new window.google.maps.InfoWindow();
        currentReviewBox = questionBox;

        // Creating elements
        const instructions = step.instructions;
        const paragraph = document.createElement('h2');
        const content = document.createElement('div');
        const reviewWholeRoute = document.createElement('button');
        const reviewSpecificPath = document.createElement('button');

        // Assigning elements
        paragraph.innerHTML = instructions;
        reviewWholeRoute.textContent = 'Review Whole Route';
        reviewWholeRoute.id = 'reviewWholeRoute';
        reviewSpecificPath.textContent = 'Review Specific Path';
        reviewSpecificPath.id = 'reviewSpecificPath';

        // adding elements to the content div
        content.appendChild(paragraph);
        content.appendChild(reviewWholeRoute);
        content.appendChild(reviewSpecificPath);

        // Set the content of the review box to the dynamically created content
        questionBox.setContent(content);
                // Open the review box on the map at the marker's position

        questionBox.open(mapInstance, marker);

        window.google.maps.event.addListener(questionBox, 'closeclick', () => {
            selectedMarkers.length = 0;
            specificReview = 0;
        });
        // User selects they want to review the whole route
        reviewWholeRoute.addEventListener('click', () =>{
            console.log("Reviewing whole route");
            questionBox.close();
            //selectedMarkers.length = 0;
            reviewingBoxRouteMarker(mapInstance, step, marker, result);
        });
        // They only want to review a specific path within the route
        reviewSpecificPath.addEventListener('click', () =>{
            console.log("review specific route clicked");
            specificReview = 1;
            questionBox.close();
        });        
    }

    return (
        <div className="App">
            {handleMapLoading()} {/* Display loading/error message */}
        {isLoaded && (
            //<LoadScript googleMapsApiKey={googleMapsApiKey} libraries={libraries}>
            <div className="map-container">
                {/* Map */}
                {isLoaded && (
                    // Google map object with parameters we've defined
                    <GoogleMap
                        center={center}
                        mapContainerStyle={currentMode}
                        zoom={14}
                        onLoad={(map) => setMapInstance(map)}
                        options={{
                            zoomControl: true,
                            streetViewControl: false,
                            mapTypeControl: false,
                            fullscreenControl: false,
                            styles: isDarkMode ? darkMode.styles : lightMode.styles,
                        }}
                        onClick={handleMapClick}
                        onMouseDown={handleOnMouseDown}
                        onMouseUp={handleOnMouseUp}
                        onTouchStart = {handleOnTouchStart}
                        onTouchEnd={handleOnTouchEnd}
                        >
                        {totalDistance !== null && elevationGain !== null && (
                            <div className='report-container'>
                                {isSidePanelOpen && directions && directions.routes && directions.routes.length > 0 && (
                                    // our report box containing directions, elevation gain, and distance of the route
                                    <div className="directions-content">
                                        <p>Total Distance: {totalDistance} miles </p>
                                        <p>Total Elevation (Positive): {elevationGain.toFixed(2)} feet </p>
                                        <h2>Step-by-Step Directions:</h2>
                                        {/* Use Markers text directions for the directions in our text box*/}
                                        <ol>
                                            {markers.map((marker, index) => (
                                                <li key={index}>{stripHtmlTags(marker.directions)}</li>
                                            ))}
                                        </ol>
                                    </div>
                                )}
                            </div>
                        )}
                    </GoogleMap>
                )}
                {/* Controls */}
                <div className="controls-container">
                    {/* Input boxes for destination and current location */}
                    <div className="input-container">
                        <div className="input-item">
                            {/* Autocomplete around input boxes so user doesnt have to input the entire address */}
                            <Autocomplete
                                onLoad={(autocomplete) => {
                                    autocomplete.addListener('place_changed', () => {
                                        const place = autocomplete.getPlace();
                                        if (place && place.geometry) {
                                            handleDestinationChange(place.formatted_address);
                                        }
                                    });
                                }}
                            >
                                <input
                                    type="text"
                                    id="destination"
                                    className="custom-input"
                                    placeholder="Enter Destination"
                                    value={destination}
                                    onChange={(e) => setDestination(e.target.value)}
                                />
                            </Autocomplete>
                        </div>
                        <div>
                        {!locationFound && !showPlanRouteTextbox && (
                            <div className="input-item">
                                <Autocomplete
                                    onLoad={(autocomplete) => {
                                        autocomplete.addListener('place_changed', () => {
                                            const place = autocomplete.getPlace();
                                            if (place && place.geometry) {
                                                handleCurrentLocationChange(place.formatted_address);
                                            }
                                        });
                                    }}
                                >
                                    <input
                                        type="text"
                                        id="currentLocation"
                                        className="custom-input"
                                        placeholder="Enter Location"
                                        value={currentLocation}
                                        onChange={(e) => setCurrentLocation(e.target.value)}
                                    />
                                </Autocomplete>
                            </div>
                        )}

                        {!locationFound && showPlanRouteTextbox && (
                            <button onClick={handlePlanRouteClick}>Plan Route</button>
                        )}
                    </div>
                    {!locationFound && !showPlanRouteTextbox && (
                            <button onClick={handleHideClick}>Hide</button>
                        )}
                    </div>
                        {!locationFound && (
                            <button onClick={handleGetCurrentLocation} disabled={isGettingLocation}>
                                {isGettingLocation ? "Getting Location..." : "Start"}
                            </button>
                        )}
                    {/* Checkboxes for elevation and distance */}
                    <div>
                        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                            <button 
                                onClick={handleElevationCheckboxChange}
                                className={elevationEnabled ? 'selected' : 'unselected'}
                                style={{ backgroundColor: elevationEnabled ? '#1E90FF' : '#4caf50'}}
                            >
                                Lowest Elevation
                            </button>
                            <button
                                onClick={handleDistanceCheckboxChange}
                                className={distanceEnabled ? 'selected' : 'unselected'}
                                style={{ backgroundColor: distanceEnabled ? '#1E90FF' : '#4caf50'}}
                            >
                                Shortest Distance
                            </button>
                        </div>
                    </div>
                    {/* Buttons */}
                    <div className="button-container">
                        {(elevationEnabled || distanceEnabled) && (
                            <button onClick={handleGetDirections}>
                                <FaDirections className='Icon'/>
                            </button>
                        )}
                        {directions && directions.routes && directions.routes.length > 0 && (
                            <button style={{backgroundColor: 'grey'}} className="pannel" onClick={toggleSidePanel}>
                                <IoMenu className={isSidePanelOpen ? 'Icon black' : 'Icon white'} />
                            </button>
                        )}
                        <button style={{backgroundColor: isDarkMode ? 'black' : '#FFFFFF'}} onClick={toggleDarkMode}>
                            <WiMoonFirstQuarter className={isDarkMode ? 'Icon white' : 'Icon black'}/>
                        </button>
                        {showStopButton && (
                        <div className="stop-container">
                            <button style={{backgroundColor: '#C51E3A'}} onClick={toggleStopTextBox}>
                                <BiSolidDirections className={isAddingStop ? 'Icon black' : 'Icon white'} />
                            </button>
                            {isAddingStop && (
                                <div className='stop-input-container'>
                                    <label htmlFor="stopLocation" className={isDarkMode ? 'white' : 'black'}>
                                        Add Stop
                                    </label>
                                    <Autocomplete
                                        onLoad={(autocomplete) => {
                                            autocomplete.addListener('place_changed', () => {
                                                const place = autocomplete.getPlace();
                                                if (place && place.geometry) {
                                                    // Set the location in your state
                                                    setStopLocation(place.formatted_address);
                                                }
                                            });
                                        }}
                                    >
                                        <input
                                            type="text"
                                            id="stopLocation"
                                            className="custom-input"
                                            placeholder="Enter Stop Location"
                                            value={stopLocation}
                                            onChange={(e) => setStopLocation(e.target.value)}
                                        />
                                    </Autocomplete>
                                    <button onClick={handleAddStop} style={{backgroundColor: '#C51E3A'}}>Add</button>
                                </div>
                            )}
                        </div>
                    )}
                    </div>
                </div>
            </div>
            //</LoadScript>
            )}
        </div>
    );
};

export default App;