"use client";
import { GetProducts, GetProductsByCategory } from "@/app/actions";
import AppHead from "@/app/Components/AppHead";
import AppHeader from "@/app/Components/AppHeader";
import AppScripts from "@/app/Components/AppScripts";
import { useEffect, useState } from "react";
import AppProductCard from "../Components/AppProductCard";
import AppFooter from "../Components/AppFooter";
import AppCopyRight from "../Components/AppCopyRight";
import AppCompanies from "../Components/AppCompanies";
export default function Home({ params }) {

	const [domLoaded, setDomLoaded] = useState(false);
	const [preLoad, setPreLoader] = useState(true);
	const [products, setProducts] = useState([]);
	const [categories, setCategories] = useState([]);
	const [session, setSession] = useState(null);
	// State for the search query
	const [searchQuery, setSearchQuery] = useState('');




  useEffect(() => {
    setDomLoaded(true);
	myLoad();

	GetProducts().
	then(data=>{
		setProducts(data.products)
		setCategories(data.categories)
	});
  }, []);

  function myLoad(){
	setTimeout(()=>{
		setPreLoader(false)
	},1500)
  }

  
   // Function to handle search input changes
   const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  // Filter products based on the search query
  const filteredProducts = products.filter(product => {
    return (
      product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.desc.toLowerCase().includes(searchQuery.toLowerCase())
    );
  });

  

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
						<h1>Fruits</h1>
						<p>See more products</p>
					</div>
				</div>
			</div>
		</div>
	</div>
	 {/* end breadcrumb section  */}

	 {/* more products  */}
	<div className="more-products mb-150 mt-5">
		<div className="container">
		<div className="search-bar">
        <input
          type="text"
          placeholder="Search..."
          value={searchQuery}
          onChange={handleSearchChange}

		  style={{borderRadius:'10px',padding:'.6rem'}}
        />
      </div>
		<div className="row">
                <div className="col-md-12">
                    <div className="product-filters">
                        <ul>
                            <li className="active" data-filter="*" 
							onClick={async()=>{
								const res = await GetProducts();
								setProducts(res.products);
								setCategories(res.categories);
							}}>All</li>
                            
							{categories.map((item,index)=>(
								<li key={index} data-filter=".strawberry" 
								onClick={async()=>{
									const res = await GetProductsByCategory(item);
									setProducts(res);
								}}>{item}</li>
							))}
                        </ul>
                    </div>
                </div>
            </div>
			<div className="row">
			{filteredProducts.length > 0 ? (
              filteredProducts.map((product, index) => (
                <AppProductCard key={index} product={product} />
              ))
            ) : (
              <p>No products found</p>
            )}
			</div>
		</div>
	</div>
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
