"use client"; // This is a client component 👈🏽
import { useEffect, useState } from "react";
import { PaystackConsumer } from 'react-paystack';


import AppHead from "@/app/Components/AppHead";
import AppScripts from "@/app/Components/AppScripts";
import AppHeader from "../../Components/AppHeader";
import AppFooter from "../../Components/AppFooter";
import AppCopyRight from "../../Components/AppCopyRight";
import AppCompanies from "../../Components/AppCompanies";
import Script from "next/script";
import { getMyShops, getSession } from "@/app/actions";
import AddShopComponet from "@/app/Components/AddShopComponet";


export default function Home() {

	const [domLoaded, setDomLoaded] = useState(false);
	const [preLoad, setPreLoader] = useState(true);
	const [shops, setShops] = useState([]);
	const [myShops, setMyShops] = useState([]);

  useEffect(() => {
    setDomLoaded(true);
	myLoad();
	// LoadSingleProduct();
	getMyShops().then(data=>{
		setMyShops(data);
	});
	getSession().
	then(data=>{
		LoadCarts(data.userToken);
		LoadShops()
	})
	
  }, []);

  function myLoad(){
	setTimeout(()=>{
		setPreLoader(false)
	},1500)
  }


  function LoadCarts(token){

	fetch('http://localhost:8000/customer/shoping-details',{
        method:'get',
		headers: {
			'Authorization': `Bearer ${token}`
		},
    }).then((data)=>{
        return data.json();
    }).then(data=>{
		let newSubtotal = 0; 
		data.cart.forEach(element => {
			const itemTotal = element.product.price * element.unit;
			newSubtotal += itemTotal;
		});
		setSubtotal(newSubtotal);
		newSubtotal>0?setShipping(5):setShipping(0);
    }).catch((e)=>{
        console.log(e);
    });
  }


  function LoadShops(){
	  getMyShops().then(data=>{
		console.log("My shop:",data)
		setShops(data)
	});
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
						<h1>Create Shop</h1>
					</div>
				</div>
			</div>
		</div>
	</div>
	 {/* end breadcrumb section  */}

	 {/* Add shop form  */}
	<AddShopComponet/>
	 {/* end add shop form  */}

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
