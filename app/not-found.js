"use client";

import { useEffect, useState } from "react";
import AppHead from "./Components/AppHead";
import AppScripts from "./Components/AppScripts";
import AppPreLoader from "./Components/AppPreLoader";
import AppHeader from "./Components/AppHeader";
import AppFooter from "./Components/AppFooter";
import AppCopyRight from "./Components/AppCopyRight";
import AppCompanies from "./Components/AppCompanies";
import { AddToCart, GetAllShops, GetProducts } from "./actions";
import ShopComponent from "./Components/ShopComponent";
import AppProductCard from "./Components/AppProductCard";


export default function Home() {

	const [domLoaded, setDomLoaded] = useState(false);
	const [preLoad, setPreLoader] = useState(true);
	

  useEffect(() => {
    setDomLoaded(true);
	myLoad();
	
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
    {preLoad&&<AppPreLoader/>}
    {/* PreLoader Ends */}
	
	 {/* header  */}
	<AppHeader/>
	 {/* end header  */}
		
		 {/* breadcrumb-section  */}
		<div class="breadcrumb-section breadcrumb-bg">
			<div class="container">
				<div class="row">
					<div class="col-lg-8 offset-lg-2 text-center">
						<div class="breadcrumb-text">
							<p>Fresh adn Organic</p>
							<h1>404 - Not Found</h1>
						</div>
					</div>
				</div>
			</div>
		</div>
		 {/* end breadcrumb section  */}
		 {/* error section  */}
		<div class="full-height-section error-section">
			<div class="full-height-tablecell">
				<div class="container">
					<div class="row">
						<div class="col-lg-8 offset-lg-2 text-center">
							<div class="error-text">
								<i class="far fa-sad-cry"></i>
								<h1>Oops! Not Found.</h1>
								<p>The page you requested for is not found.</p>
								<a href="/" class="boxed-btn">Back to Home</a>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
		 {/* end error section  */}

         <AppCompanies/>

         <AppFooter/>
         <AppCopyRight/>
         <AppScripts/>
</body>
</html>
)}</>);}
