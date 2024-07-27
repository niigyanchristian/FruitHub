"use client";
import { useEffect, useState } from "react";
import { PaystackConsumer } from 'react-paystack';


import AppHead from "@/app/Components/AppHead";
import AppScripts from "@/app/Components/AppScripts";
import AppHeader from "../../Components/AppHeader";
import AppFooter from "../../Components/AppFooter";
import AppCopyRight from "../../Components/AppCopyRight";
import AppCompanies from "../../Components/AppCompanies";
import AppMapScripts from "../../Components/AppMapScripts";
import AppHeadForProfile from "../../Components/AppHeadForProfile";
import AppPreLoader from "../../Components/AppPreLoader";
import Script from "next/script";
import { AddToCart, GetAllShops, getSession, getShopProducts } from "../../actions";
import AppProductCard from "@/app/Components/AppProductCard";

export default function Home({params}) {

	const [domLoaded, setDomLoaded] = useState(false);
	const [preLoad, setPreLoader] = useState(true);
	const [products, setProducts] = useState([]);
	const [shop, setShop] = useState([]);
	const [wishlist, setWishlist] = useState([]);
	const [Subtotal, setSubtotal] = useState(0);
	const [shipping, setShipping] = useState(0);
    const [session, setSession] = useState(null);

  useEffect(() => {
    setDomLoaded(true);
	myLoad();

    getShopProducts(params.id).then(data=>setProducts(data));
    GetAllShops().then(data=>{
        setShop(data[0]);
    })
    getSession().
	then(data=>{
		setSession(data);
	})
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
	
	 {/* header */}
	<AppHeader/>
	 {/* end header */}

	 {/* search area */}
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
	 {/* end search arewa */}
	
	 {/* breadcrumb-section */}
	<div className="breadcrumb-section breadcrumb-bg">
		<div className="container">
			<div className="row">
				<div className="col-lg-8 offset-lg-2 text-center">
					<div className="breadcrumb-text">
						<p>Fresh and Organic</p>
						<h1>{shop.name}</h1>
					</div>
				</div>
			</div>
		</div>
	</div>
	 {/* end breadcrumb section */}

	 {/* products */}
	<div className="product-section mt-150 mb-150">
		<div className="container">

			<div className="row">
                <div className="col-md-12">
                    <div className="product-filters">
                        <ul>
                            <li className="active" data-filter="*">All</li>
                            <li data-filter=".strawberry">Strawberry</li>
                            <li data-filter=".berry">Berry</li>
                            <li data-filter=".lemon">Lemon</li>
                        </ul>
                    </div>
                </div>
            </div>

			<div className="row product-lists">
				{products.map((product,index)=>(
                   <AppProductCard key={index} product={product}/>
                ))}
			</div>
		</div>
	</div>

	 {/* footer */}
	<AppFooter/>
	
	 {/* copyright */}
    <AppCopyRight/>

    {/* jquery  */}
       <Script 
       type="text/javascript" 
       id="hs-script-loader" 
       async 
       defer 
       src="/assets/js/jquery-1.11.3.min.js"
       />

      {/* bootstrap  */}
       {global.jQuery&&<Script 
       type="text/javascript" 
       id="hs-script-loader" 
       async 
       defer 
       src="/assets/bootstrap/js/bootstrap.min.js"
       />}
       
       {/* count down  */}
       <Script 
       type="text/javascript" 
       id="hs-script-loader" 
       async 
       defer 
       src="/assets/js/jquery.countdown.js"
       />

       {/* isotope  */}
       <Script 
       type="text/javascript" 
       id="hs-script-loader" 
       async 
       defer 
       src="/assets/js/jquery.isotope-3.0.6.min.js"
       />

       {/* waypoints  */}
       <Script 
       type="text/javascript" 
       id="hs-script-loader" 
       async 
       defer 
       src="/assets/js/waypoints.js"
       />
	
       {/* owl carousel  */}
       <Script 
       type="text/javascript" 
       id="hs-script-loader" 
       async 
       defer 
       src="/assets/js/owl.carousel.min.js"
       />

       {/* magnific popup  */}
       <Script 
       type="text/javascript" 
       id="hs-script-loader" 
       async 
       defer 
       src="/assets/js/jquery.magnific-popup.min.js"
       />
	
       {/* mean menu  */}
       <Script 
       type="text/javascript" 
       id="hs-script-loader" 
       async 
       defer 
       src="/assets/js/jquery.meanmenu.min.js"
       />
	
       {/* sticker js  */}
       <Script 
       type="text/javascript" 
       id="hs-script-loader" 
       async 
       defer 
       src="/assets/js/sticker.js"
       />
</body>
</html>
)}
</>
  );
}
