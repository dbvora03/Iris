import React, {useState, useEffect} from 'react'
import {GoogleMap, withScriptjs, withGoogleMap} from "react-google-maps"
import 'bootstrap/dist/css/bootstrap.min.css';

const rawMap = () => {

    return (
            <GoogleMap defaultZoom={10} defaultCenter={{lat:12, lng:13}}/>
    )
}

const WrappedMap = withScriptjs(withGoogleMap(rawMap))


const Map = () => {

    return (
        <div style={{width: '50vw', height: '50vh'}}>    
            <WrappedMap 
                googleMapURL={'https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places&key=AIzaSyCKDSvUSoK7FcSlKPkNzB4kxl10Zthn4to'} 
                loadingElement={<div style={{height: "100%"}}></div>}
                containerElement={<div style={{height: "100%"}}></div>}
                mapElement={<div style={{height: "100%"}}></div>}
                />
        </div>

    )
}


export default Map