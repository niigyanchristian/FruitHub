// import React, { useState } from 'react';
// import { Loader } from '@googlemaps/js-api-loader';


// function AppSearchMapComponent(props) {
//     const [searchQuery, setSearchQuery] = useState('');
//     const [results, setResults] = useState([]);


//     const handleSearch = async () => {
//         const loader = new Loader({
//             apiKey: process.env.NEXT_PUBLIC_API_KEY,
//             version: 'weekly',
//             libraries: ['places'],
//         });

//         await loader.load();

//         const service = new window.google.maps.places.PlacesService(document.createElement('div'));

//         service.textSearch({ query: searchQuery }, (results, status) => {
//             if (status === window.google.maps.places.PlacesServiceStatus.OK) {
//                 const coordinates = results.map((place) => ({
//                     name: place.name,
//                     lat: place.geometry.location.lat(),
//                     lng: place.geometry.location.lng(),
//                 }));
//                 setResults(coordinates);
//             } else {
//                 console.error('Error fetching location data:', status);
//             }
//         });
//     };
// return (
//     <div>
//     <input
//         type="text"
//         value={searchQuery}
//         onChange={(e) => setSearchQuery(e.target.value)}
//         placeholder="Search for a location"
//     />
//     <button onClick={handleSearch}>Search</button>
//     <ul>
//         {results.map((result, index) => (
//             <li key={index}>
//                 {result.name}: {result.lat}, {result.lng}
//             </li>
//         ))}
//     </ul>
// </div>
// );
// }

// export default AppSearchMapComponent;
