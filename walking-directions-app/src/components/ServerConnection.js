import React, {useEffect, useState} from "react";
import {View, Text} from 'react-native';

import axios from 'axios';
 // Run this????
// npm start --host 127.0.0.1
// go to this video "https://www.youtube.com/watch?v=w3vs4a03y3I"
const ServerConnection = () =>{
    const [backendData, setBackendData] = useState([{}]);

    useEffect(() => {
        fetch('http://127.0.0.1:1234/api/data').then(
            response => response.json()
        ).then(data => {
            setBackendData(data)
        }
        )
    }, []);

    return(
        <div>
            {(typeof backendData.users === 'undefined') ? (
                <p>Loading...</p>
            ):(
                backendData.users.map((user, i) =>(
                    <p>key = {i}>{user}</p>
                ))
            )}

        </div>
    )
};
export default ServerConnection;