import {useState} from "react";

// The text box that will appear in the review box
export const timeOfDayCheckBox =  `
    <div>
        <input type = "checkbox" name = "timeOfDay" value={3}/>Morning(3)
        <input type = "checkbox" name = "timeOfDay" value={2}/>Afternoon(2)
        <input type = "checkbox" name = "timeOfDay" value={1}/>Evening(1)
    </div>`
// The text that is also apppearing in the review box
export const ratingCheckBox = `
    <div>
        <input type = "checkbox" name = "option" value={5}/>Very Safe(5)
        
        <input type = "checkbox" name = "option" value={4}/>Safe(4)
        <br/>
        <input type = "checkbox" name = "option" value={3}/>Somewhat Safe(3)
        <br/>
        <input type = "checkbox" name = "option" value={2}/>Not So Safe(2)
        
        <input type = "checkbox" name = "option" value={1}/>Not Safe(1)
    </div>`

/// <summary>
// Review object that contains functions related to review. There are two more in app.js at the end  
/// </summary>
export const Review = () =>{
    const [selectedMarkers, setSelectedMarkers] = useState([]);

    /// <summary>
    // // This function is made is for converting the package string into it's unique form    
    /// </summary>
    /// <param name="coordinateList">List of coordinates from path</param>
    /// <param name="enteredValue">Review on the route</param>
    /// <param name="levelOfSafety">Users rating of safety</param>
    /// <param name="timeOfDay">Value of what time of day the review happened</param>
    /// <returns> A string that is converted to tokenize the data </returns>
    const convertPackageToUnique = (coordinateList, enteredValue, levelOfSafety, timeOfDay) =>{
        let newString = '';
        // for each coordinate inside route
        for (const coordinate of coordinateList){
            if(newString != ''){
                newString += '||'; //  ---> This means it is a unique coordinate
            }
            newString += coordinate + '*_;' + timeOfDay + '*_;' + levelOfSafety + '*_;' + enteredValue;
        }
        return newString;
    }

//https://www.joshuacolvin.net/selected-checkbox-values/
    /// <summary>
    // Checks to see if a specific text box was checked off    
    /// </summary>
    /// <param name="checkboxes">Either timeOfDay check box of levelOfSafety</param>
    const checkBoxChecker = (checkboxes) => {
        for (const checkbox of checkboxes) {
            if (checkbox.checked) {
                // console.log("Box was checked")
                const value = checkbox.value;
                // console.log(value);
                return value;
            }
            else{
                console.log("Nothing was checked");
            }
        }
    }

    /// <summary>
    // Reviewing specific marker that is dropped on a location, no route   
    /// </summary>
    /// <param name="mapInstance">The overall Map</param>
    /// <param name="marker">The marker selected</param>
    /// <param name="lng">longitude of marker</param>
    /// <param name="lat">latitude of marker</param>
    const reviewingBoxDroppedMarker = (mapInstance, marker, lng, lat) =>{
        const timeDiv = timeOfDayCheckBox;
        const ratingDiv = ratingCheckBox;
        let text = new window.google.maps.InfoWindow();
        //https://stackoverflow.com/questions/5656392/how-to-create-input-type-text-dynamically
        // create elements
        const content = document.createElement('div');
        const rating = document.createElement('div');
        const time = document.createElement('div');
        const ratingTitle = document.createElement('h3');
        const timeTitle = document.createElement('h3');
        const reviewTitle = document.createElement('h3');
        const inputField = document.createElement('textarea');
        const closeMarkerButton = document.createElement('button');
        const submitButton = document.createElement('button');

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
        closeMarkerButton.textContent = 'Close Marker';
        closeMarkerButton.id = 'closeButton';
        submitButton.textContent = 'Submit';
        submitButton.id = 'submitButton';

        content.appendChild(timeTitle);
        content.appendChild(time);
        content.appendChild(ratingTitle);
        content.appendChild(rating);
        content.appendChild(reviewTitle);
        content.appendChild(inputField);
        content.appendChild(closeMarkerButton)
        content.appendChild(submitButton);
        text.setContent(content);
        text.open(mapInstance, marker);

        // Once review is written, press submit which closes the text and returns the value that is entered
        submitButton.addEventListener('click', function () {
            const checkboxes = document.querySelectorAll('input[type="checkbox"][name="option"]');
            const checkboxes_2 = document.querySelectorAll('input[type="checkbox"][name="timeOfDay"]');
            console.log("Length of Boxes: " + checkboxes.length);
            const enteredValue = inputField.value;
            const levelOfSafety = checkBoxChecker(checkboxes);
            const timeOfDay = checkBoxChecker(checkboxes_2);
            const packagedData = '(' + lat + ',' + lng + ')' + '*_;' + timeOfDay + '*_;' + levelOfSafety + '*_;' + enteredValue;
            text.close();
            console.log(packagedData);
            return packagedData;
        });
        closeMarkerButton.addEventListener('click', function () {
            marker.setMap(null);
        });
    }

    /// <summary>
    // Clearing path from the polyline    
    /// </summary>
    /// <param name="polyline">The polyline that has the path</param>

    const clearPath = (polyline) =>{
        console.log("Gets in function");
        if (polyline) {
            console.log("Clears polyline");
            polyline.setMap(null); // Remove the polyline from the map

        }
        // empty each array
        setSelectedMarkers([]);
    }

    return {convertPackageToUnique, checkBoxChecker,
        reviewingBoxDroppedMarker, clearPath};
}