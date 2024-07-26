import { Loader } from "@googlemaps/js-api-loader";
import { useEffect, useRef } from "react";

function AppMapComponent({title='Track your orders',orders=[]}) {
    const mapRef = useRef(null);

    useEffect(() => {
    const initMap = async () => {
        const loader = new Loader({
            apiKey: process.env.NEXT_PUBLIC_API_KEY,
            version: 'weekly',
            libraries: ["places"]
        });
        
        const { Map } = await loader.importLibrary("maps");
        const { AdvancedMarkerElement,PinElement } = await loader.importLibrary("marker");

        // Create a single map instance
        const map = new Map(mapRef.current, {
            center: { lat: parseFloat("5.655661"), lng: parseFloat("-0.18277") }, // Center on the first location or any default location
            zoom: 15,
            mapId: 'NEXTJS_MY'
        });

        // Add markers to the single map instance
        orders.forEach(element => {
            const marker = new AdvancedMarkerElement({
                map: map,
                position: {
                    lat: parseFloat(element.latitude),
                    lng: parseFloat(element.longitude)
                },
                title: element.orderId
            });
        });
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    const currentLocation = {
                        lat: position.coords.latitude,
                        lng: position.coords.longitude
                    };
                    const pinBackground = new PinElement({
                        background: 'blue'
                      })

                    const currentLocationMarker = new AdvancedMarkerElement({
                        map: map,
                        position: currentLocation,
                        content: pinBackground.element,
                        title: "Current Location"
                    });

                    // Center the map on the current location
                    map.setCenter(currentLocation);
                },
                (error) => {
                    console.error("Error getting the current location", error);
                }
            );
        } else {
            console.error("Geolocation is not supported by this browser.");
        }
    };
    
    initMap();
}, []);

return (
<div className="col-lg-10 mx-auto mt-5">
<h3>{title}</h3>
<div style={{height:600,border:1}} ref={mapRef}/>
</div>
);
}

export default AppMapComponent;