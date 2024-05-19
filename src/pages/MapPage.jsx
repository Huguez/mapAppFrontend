import React from 'react'
import { useMap } from "../hooks/useMap"

const initialPoint = {
   lng: 29.65,
   lat: -110.7112,
   zoom: 6
}

export const MapPage = () => {
   const { coords, mapContainer, } = useMap( initialPoint )
      
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
