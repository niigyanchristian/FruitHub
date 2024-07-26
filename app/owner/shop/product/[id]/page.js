"use client";
import { useEffect, useState } from "react";

import AppHead from "@/app/Components/AppHead";
import AppScripts from "@/app/Components/AppScripts";
import AppHeader from "@/app/Components/AppHeader";
import AppFooter from "@/app/Components/AppFooter";
import AppCopyRight from "@/app/Components/AppCopyRight";
import { DeleteProduct, getMyShopDetails, getMyShopOrders, getMyShops, getProductDetails, getSession, getShopProducts } from "@/app/actions";
import AppProductComponent from "@/app/Components/AppProductComponent";
import AppMapComponent from "@/app/Components/AppMapComponent";
import AppEditProductComponent from "@/app/Components/AppEditProductComponent";


export default function Home({params}) {

	const [domLoaded, setDomLoaded] = useState(false);
	const [preLoad, setPreLoader] = useState(true);
	const [product, setProduct] = useState();
	const [orders, setOrders] = useState([]);
	const [myShops, setMyShops] = useState([]);
	const [products, setProducts] = useState([]);
	const [longitude, setLongitude] = useState('');
	const [latitude, setLatitude] = useState('');
	const [status, setStatus] = useState('');
	const [currentLocation, setCurrentLocation] = useState('');
	const [estimatedDeliveryDate, setEstimatedDeliveryDate] = useState('');
	const [myShopsDetails, setMyShopsDetails] = useState({
		name:'Loading...',desc:'Loading...',});
	const [session, setSession] = useState(null);

	const handleChangeLongitude = (event) =>setLongitude(event.target.value);
	const handleChangeLatitude = (event) =>setLatitude(event.target.value);
	const handleChangeStatus = (event) =>setStatus(event.target.value);
	const handleChangecurrentLocation = (event) =>setCurrentLocation(event.target.value);
	const handleChangeEstimatedDeliveryDate = (event) =>setEstimatedDeliveryDate(event.target.value);
	

  useEffect(() => {
    setDomLoaded(true);
	myLoad();
	getProductDetails(params.id).then(data=>{
		setProduct(data);

		console.log('====================================');
		console.log(data);
		console.log('====================================');
	})
	// LoadSingleProduct();

	// getMyShopDetails(params.id).then(data=>setMyShopsDetails(data));
	// getMyShops().then(data=>setMyShops(data));
	// getMyShopOrders(params.id).then(data=>{
		// setOrders(data)
	// });
	// getMyShopOrder

	// getShopProducts(params.id).then(data=>{
	// 	setProducts(data)
	// });
	// getSession().
	// then(data=>{
	// 	setSession(data);
	// })
	
  }, []);

  function myLoad(){
	setTimeout(()=>{
		setPreLoader(false)
	},1500)
  }


  return (
<>
{domLoaded && (
<html lang="en">
<AppHead/>
<body>
	
	{/* PreLoader */}
    {preLoad&&<div className="loader">
        <div className="loader-inner">
            <div className="circle"></div>
        </div>
    </div>}
    {/* PreLoader Ends */}
	
	{/* header */}
		<AppHeader myshops={myShops}/>
	{/* end header */}

	 {/* search area  */}
	<div className="search-area">
		<div className="container">
			<div className="row">
				<div className="col-lg-12">
					<span className="close-btn"><i className="fas fa-window-close"></i></span>
					<div className="search-bar">
						<div className="search-bar-tablecell">
							<h3>Search For:</h3>
							<input type="text" placeholder="Keywords"/>
							<button type="submit">Search <i className="fas fa-search"></i></button>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
	 {/* end search arewa  */}
	
	 {/* breadcrumb-section  */}
	<div className="breadcrumb-section breadcrumb-bg">
		<div className="container">
			<div className="row">
				<div className="col-lg-8 offset-lg-2 text-center">
					<div className="breadcrumb-text">
						<p>Get 24/7 Support</p>
						<h1>Edit your product here!</h1>
					</div>
				</div>
			</div>
		</div>
	</div>
	 {/* end breadcrumb section  */}
	

	 {/* Add product form  */}
	{product&&<AppEditProductComponent data={product}/>}
	 {/* end add product form  */}

	{/* footer  */}
	<AppFooter/>
	{/* end footer  */}
	
	 {/* copyright  */}
	<AppCopyRight/>
	 {/* end copyright  */}
	
    <AppScripts/>
</body>
</html>

)}
</>
  );
}
