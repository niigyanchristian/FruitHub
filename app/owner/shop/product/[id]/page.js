"use client";
import { useEffect, useState } from "react";

import AppHead from "@/app/Components/AppHead";
import AppScripts from "@/app/Components/AppScripts";
import AppHeader from "@/app/Components/AppHeader";
import AppFooter from "@/app/Components/AppFooter";
import AppCopyRight from "@/app/Components/AppCopyRight";
import { getProductDetails } from "@/app/actions";
import AppEditProductComponent from "@/app/Components/AppEditProductComponent";
import AppPreLoader from "@/app/Components/AppPreLoader";


export default function Home({params}) {

	const [domLoaded, setDomLoaded] = useState(false);
	const [preLoad, setPreLoader] = useState(true);
	const [product, setProduct] = useState();

	

  useEffect(() => {
    setDomLoaded(true);
	myLoad();
	getProductDetails(params.id).then(data=>{
		setProduct(data);
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
    {preLoad&& !product&& <AppPreLoader/>}
	
	{/* header */}
		<AppHeader/>

	
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
	

	 {/* Add product form  */}
	{product&&<AppEditProductComponent data={product}/>}

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
