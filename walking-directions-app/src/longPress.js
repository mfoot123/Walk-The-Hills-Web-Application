// import { useRef, useState } from 'react';
// import {MarkerSetup} from './Marker';

// export const useLongPress = () => {
//     const [action, setAction] = useState();
//     const timerRef = useRef();
//     const isLongPress = useRef(false);
//     const {droppingMarkers} = MarkerSetup();


//     // Function only handles the map clicking feature
//     const handleMapClick = (e) => {
//         console.log("HandleMapClick");

//         if (isLongPress.current) {
//             console.log("it is a long press!");
//             console.log("Map is clicked");
//             // Position
//             const clickPosition = e.latLng;
//             // Convert to lat and lng
//             const lat = clickPosition.lat();
//             const lng = clickPosition.lng();
//             console.log(clickPosition.lat(), clickPosition.lng())
//             // Calls function drop markers
//             droppingMarkers(lat, lng, mapInstance, setMarkers, markers);
//             return;
//         }
//     }
//     const handleOnMouseDown = () =>{
//         console.log("onMouseDwon");
//         startPressTimer();
//     }
//     const handleOnMouseUp = () =>{
//         console.log("onMouseUp");
//         clearTimeout(timerRef.current);
//     }
//     const handleOnTouchStart = () =>{
//         console.log("onTouchStart");
//         startPressTimer();
//     }
//     const handleOnTouchEnd = () =>{
//         console.log("onTouchEnd");
//         clearTimeout(timerRef.current);
//     }

//     const startPressTimer = () => {
//         isLongPress.current = false;
//         timerRef.current = setTimeout(() => {
//             setAction('longpress');
//             isLongPress.current = true;
//         }, 500);
//     }

//     return {
//         action,
//         handlers:{
//             onClick: handleMapClick,
//             onMouseDown: handleOnMouseDown,
//             onMouseUp: handleOnMouseUp,
//             onTouchStart: handleOnTouchStart,
//             onTouchEnd: handleOnTouchEnd
//         }
//     }
// }