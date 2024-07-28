"use client";
import { useEffect, useState } from "react";
import { AddToCart, AddToWishlist, getMyShopDetails, getProductDetails, GetProducts, getSession } from "@/app/actions";
import AppCompanies from "@/app/Components/AppCompanies";
import AppCopyRight from "@/app/Components/AppCopyRight";
import AppFooter from "@/app/Components/AppFooter";
import AppHead from "@/app/Components/AppHead";
import AppHeader from "@/app/Components/AppHeader";
import AppPreLoader from "@/app/Components/AppPreLoader";
import AppProductCard from "@/app/Components/AppProductCard";
import AppScripts from "@/app/Components/AppScripts";

export default function Home({ params }) {

	const [domLoaded, setDomLoaded] = useState(false);
	const [preLoad, setPreLoader] = useState(true);
	const [products, setProducts] = useState([]);
	const [singleproducts, setSingleProduct] = useState([]);
	const [inputValue, setInputValue] = useState(1); 
	const [session, setSession] = useState(null);
	const [productShop, setProductShop] = useState(null);


	const handleChange = (event) => {
	  setInputValue(event.target.value);
	};


  useEffect(() => {
    setDomLoaded(true);
	myLoad();	

	getProductDetails(params.id).
	then(data=>{
		setSingleProduct(data)
		return getMyShopDetails(data.shop_id);
	}).then(data=>{
		setProductShop(data);
		return GetProducts()
	}).then(data=>setProducts(data.products))
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
    {preLoad && <AppPreLoader/>}
    {/* PreLoader Ends */}
	
	{/* header  */}
	<AppHeader/>
	{/* end header  */}

	
	 {/* breadcrumb-section  */}
	<div className="breadcrumb-section breadcrumb-bg">
		<div className="container">
			<div className="row">
				<div className="col-lg-8 offset-lg-2 text-center">
					<div className="breadcrumb-text">
						<p>See more Details</p>
						<h1>Single Product</h1>
					</div>
				</div>
			</div>
		</div>
	</div>
	 {/* end breadcrumb section  */}

	 {/* single product  */}
	<div className="single-product mt-150 mb-150">
		<div className="container">
			<div className="row">
				<div className="col-md-5">
					<div className="single-product-img">
						<img src="/assets/img/products/product-img-5.jpg" alt=""/>
					</div>
				</div>
				<div className="col-md-7">
					<div className="single-product-content">
						<h3>{singleproducts.name}</h3>
						<p className="single-product-pricing"><span>{singleproducts.unit} in stock</span> GH₵{singleproducts.price}</p>
						<p>{singleproducts.desc}</p>
						<p><strong>Category: </strong>{singleproducts.type}</p>
						
						<div className="single-product-form">
							<form action="index.html">
								<div className="qty">Quantity: {inputValue}</div>
								
								<input id="qty" type="range" name="qty"
								value={inputValue}
								max={singleproducts.unit}
								min={1}
								onChange={handleChange}
								></input>
							</form>

							{singleproducts.unit>0?(<a onClick={async ()=>{
								var qty=document.getElementById('qty').value;
								var res = await AddToCart(singleproducts._id,qty,singleproducts.shop_id);
								if(res){
									alert("Cart has been added successfully!");
								}
							}} className="cart-btn"><i className="fas fa-shopping-cart"></i> Add to Cart</a>):(<a className="cart-btn" style={{textDecoration:'line-through',backgroundColor:'#a8a8a8'}}><i className="fas fa-shopping-cart"></i>Unavailable</a>)}

							<a onClick={async()=>{
								var res = await AddToWishlist({_id:singleproducts._id});
								if(res==201){
									alert('Item has been added to wishlist!');
								}
								}} className="cart-btn ml-5"><i className="fas fa-heart"></i> Add to Wishlist</a>

						</div>
						
						<h4>Shop Info:</h4>
						<p><i className="fas fa-phone"></i> {productShop?productShop.contact:''}</p>
						<p><i className="fa fa-envelope"></i> {productShop?productShop.email:''}</p>
					</div>
				</div>
			</div>
		</div>
	</div>
	 {/* end single product  */}

	 {/* more products  */}
	<div className="more-products mb-150">
		<div className="container">
			<div className="row">
				<div className="col-lg-8 offset-lg-2 text-center">
					<div className="section-title">	
						<h3><span className="orange-text">Related</span> Products</h3>
						<p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aliquid, fuga quas itaque eveniet beatae optio.</p>
					</div>
				</div>
			</div>
			<div className="row">
				{products.map((product,index)=>(
					<AppProductCard key={index} product={product}/>
				))}
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
