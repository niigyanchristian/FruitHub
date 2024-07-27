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
import AppPreLoader from "@/app/Components/AppPreLoader";


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
    {preLoad&& <AppPreLoader/>}
	
	{/* header */}
		<AppHeader/>
	
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

	 {/* Add shop form  */}
	<AddShopComponet/>

	{/* footer  */}
	<AppFooter/>
	
	 {/* copyright  */}
	<AppCopyRight/>
	
    <AppScripts/>
</body>
</html>

)}
</>
  );
}
