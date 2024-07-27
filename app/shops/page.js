"use client";
import { useEffect, useState } from "react";
import { GetAllShops } from "@/app/actions";
import AppHead from "@/app/Components/AppHead";
import AppHeader from "@/app/Components/AppHeader";
import AppScripts from "@/app/Components/AppScripts";
import AppFooter from "../Components/AppFooter";
import AppCopyRight from "../Components/AppCopyRight";
import AppCompanies from "../Components/AppCompanies";
import AppShopCard from "../Components/AppShopCard";


export default function Home({ params }) {
	const [domLoaded, setDomLoaded] = useState(false);
	const [preLoad, setPreLoader] = useState(true);
	const [shops, setShops] = useState([]);


  useEffect(() => {
    setDomLoaded(true);
	myLoad();

	GetAllShops().then(data=>setShops(data));
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
	
	{/* header  */}
	<AppHeader/>
	{/* end header  */}

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
						<h1>Shops</h1>
						<p>See more shops</p>
					</div>
				</div>
			</div>
		</div>
	</div>
	 {/* end breadcrumb section  */}

	  {/* latest news  */}
	<div class="latest-news mt-150 mb-150">
		<div class="container">
			<div class="row">
			{shops.map((shop,index)=>(
                    <AppShopCard key={index} shop={shop}/>
                ))}				
			</div>
		</div>
	</div>
	 {/* end latest news  */}

	 {/* end more products  */}

	 {/* logo carousel  */}
	<AppCompanies/>
	 {/* end logo carousel  */}

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
