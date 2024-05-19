import React, { useEffect } from 'react'
import { useMap } from "../hooks/useMap"

const initialPoint = {
   lng: 29.0965,
   lat: -110.9910,
   zoom: 15
}

export const MapPage = () => {
   const { coords, mapContainer, newMarker$, moveMarker$ } = useMap( initialPoint )
   
   useEffect( () => {
      newMarker$.subscribe( mkr => {
         // console.log( mkr );
      } )
   }, [ newMarker$ ] )

   useEffect( () => {
      moveMarker$.subscribe( mkr => {
         // console.log( mkr.id );
      } )
   }, [ moveMarker$ ] )


   return <>
      <div className='infoPoint'>
         Latitud: { coords.lat.toFixed( 4 ) } | 
         Longitud: { coords.lng.toFixed( 4 ) } | 
         Zoom: { coords.zoom.toFixed( 2 ) }
      </div>
      <div 
         className='mapContainer' 
         ref={ mapContainer } // (node) => console.log( node )
         id='mapContainer' 
      />
   </>
}
