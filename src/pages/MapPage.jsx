import mapboxgl, { Map, NavigationControl } from 'mapbox-gl';
import React, { useEffect, useRef, useState } from 'react'

mapboxgl.accessToken = process.env.REACT_APP_TOKEN_MAPBOX;

const initialPoint = {
   lng: 29.65,
   lat: -110.7112,
   zoom: 6
}

export const MapPage = () => {

   const mapContainer = useRef()
   const [ coords, setCoords ] = useState( initialPoint )
   const [ mapa, setMapa ] = useState( null )

   useEffect( () => {
      const map = new Map({
         container: mapContainer.current,
         style: 'mapbox://styles/mapbox/streets-v11',
         center: [ initialPoint.lat, initialPoint.lng,  ],
         zoom: initialPoint.zoom,         
      });

      map.addControl( new NavigationControl() );

      setMapa( map )
   }, [] )

   useEffect( () => {
      mapa?.on( "move", (some) => {
         // console.log( some );
         setCoords( { ... mapa.getCenter(), zoom: mapa.getZoom() } )
         
      } )
   }, [mapa] )

   return <>
      <div className='infoPoint'>
         Latitud: { coords.lat.toFixed( 4 ) } | Longitud: { coords.lng.toFixed( 4 ) } | Zoom: { coords.zoom.toFixed( 1 ) }
      </div>
      <div 
         className='mapContainer' 
         ref={mapContainer} 
         id='mapContainer' 
      />
   </>
}
