import Script from "next/script";

function AppMapScripts(props) {
return (
<>
{/* jquery  */}
       <Script 
       type="text/javascript" 
       id="hs-script-loader" 
       async 
       defer 
       src="/assets/js/map.js"
       />
       <Script 
       async 
       defer 
       src="https://unpkg.com/leaflet@1.9.4/dist/leaflet.js"
    integrity="sha256-20nQCchB9co0qIjJZRGuk2/Z9VM+kNiyxNV1lvTlZBo="
    crossOrigin=""
       />
       <Script 
       async 
       defer 
       src="https://unpkg.com/leaflet.markercluster@1.4.1/dist/leaflet.markercluster-src.js"
       />
       <Script 
       async 
       defer 
       src="https://unpkg.com/leaflet.markercluster@1.4.1/dist/leaflet.markercluster-src.js"
       />
       <Script 
       async 
       defer 
       src="https://unpkg.com/leaflet-routing-machine@latest/dist/leaflet-routing-machine.js"
       />
</>
);
}

export default AppMapScripts;