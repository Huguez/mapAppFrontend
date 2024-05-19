import mapboxgl, { Map, NavigationControl, Marker } from 'mapbox-gl';
import { useCallback, useEffect, useRef, useState } from 'react'
import { v4 } from "uuid"

mapboxgl.accessToken = process.env.REACT_APP_TOKEN_MAPBOX;

export const useMap = ( initialPoint ) => {
   const mapContainer = useRef()
   const marcadores = useRef( {} )
   const [ coords, setCoords ] = useState( initialPoint )
   const mapa = useRef()

   const addMarker = useCallback( ( { lngLat } ) => {
      const { lng, lat } = lngLat
      const marker = new Marker()
      marker.id = v4()
      marker.setLngLat( [ lng, lat ] ).addTo( mapa.current ).setDraggable( true )
      marcadores.current[ marker.id ] = marker
   } , [] ) 

   useEffect( () => {
      const map = new Map({
         container: mapContainer.current,
         style: 'mapbox://styles/mapbox/streets-v11',
         center: [ initialPoint.lat, initialPoint.lng,  ],
         zoom: initialPoint.zoom,         
      });

      map.addControl( new NavigationControl() );
      mapa.current = map
      // setMapa( map )
   }, [] )

   useEffect( () => {
      mapa?.current?.on( "move", (some) => {
         setCoords( { ... mapa.current.getCenter(), zoom: mapa.current.getZoom() } )
      } )
   }, [] )

   useEffect( () => {
      mapa.current?.on( "click", addMarker )
   
   }, [addMarker] )

   return {
      coords,
      mapContainer,
      marcadores,
      mapa: mapa.current,
      addMarker,
   }
}