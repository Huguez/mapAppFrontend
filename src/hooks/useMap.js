import mapboxgl, { Map, NavigationControl } from 'mapbox-gl';
import { useEffect, useRef, useState } from 'react'

mapboxgl.accessToken = process.env.REACT_APP_TOKEN_MAPBOX;

export const useMap = ( initialPoint ) => {
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
   }, [ mapa ] )

   return {
      coords,
      mapContainer,
      mapa,
   }
}