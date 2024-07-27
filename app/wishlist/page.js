"use client";
import { useEffect, useState } from "react";

import AppHead from "@/app/Components/AppHead";
import AppScripts from "@/app/Components/AppScripts";
import AppHeader from "../Components/AppHeader";
import AppFooter from "../Components/AppFooter";
import AppCopyRight from "../Components/AppCopyRight";
import { AddToCart, DeleteFromWishlist, getProductDetails, GetShoppingDetails } from "../actions";
import AppPreLoader from "../Components/AppPreLoader";




export default function Home() {

	const [domLoaded, setDomLoaded] = useState(false);
	const [preLoad, setPreLoader] = useState(true);
	const [wishlists, setWishlists] = useState([]);

  useEffect(() => {
    setDomLoaded(true);
	myLoad();

	GetShoppingDetails().
	then(data=>{
		setWishlists(data.wishlist)
	})
  }, []);


  function myLoad(){
	setTimeout(()=>{
		setPreLoader(false)
	},1500)
  }

  const handleAddToCart=async(cartId)=>{
	const product = await getProductDetails(cartId);

	if(product.unit == 0){
		alert('Product is out of stack!');
		return
	}
	var res =await AddToCart(cartId,1,'');
	if(res==201){
		alert('Item has been added to cart!');
	}
}



  return (
<>
{domLoaded && (
<html lang="en">
<AppHead/>
<body>
	
	{/* PreLoader */}
	{/* PreLoader */}
    {preLoad&&<AppPreLoader/>}
    {/* PreLoader Ends */}
	
	 {/* header */}
		<AppHeader/>
	
	 {/* breadcrumb-section */}
	<div className="breadcrumb-section breadcrumb-bg">
		<div className="container">
			<div className="row">
				<div className="col-lg-8 offset-lg-2 text-center">
					<div className="breadcrumb-text">
						<p>Fresh and Organic</p>
						<h1>Wishlist</h1>
					</div>
				</div>
			</div>
		</div>
	</div>

	 {/* cart */}
	<div className="cart-section mt-150 mb-150">
		<div className="container">
			<div className="row">
				<div className="col-lg-8 col-md-12">
					<div className="cart-table-wrap">
						<table className="cart-table">
							<thead className="cart-table-head">
								<tr className="table-head-row">
									<th className="product-remove"></th>
									<th className="product-image">Product Image</th>
									<th className="product-name">Name</th>
									<th className="product-price">Price</th>
									<th className="product-price">Add to cart</th>
								</tr>
							</thead>
							<tbody>

								{wishlists.map((cart,index)=>(
									<tr key={index} className="table-body-row">
									<td className="product-remove"><a onClick={async()=>{
										var res= await DeleteFromWishlist(cart._id);
										console.log(res)
										if(res._id){
											alert('Item removed!');
										}
										GetShoppingDetails().
										then(data=>{
											setWishlists(data.wishlist)
										})
									}}><i className="far fa-window-close"></i></a></td>
									<td className="product-image"><img src={`assets/img/products/${cart.banner}`} alt=""/></td>
									<td className="product-name">{cart.name}</td>
									<td className="product-price">${cart.price}</td>
									<td style={{color:'#F28123'}}
									 onClick={async()=>handleAddToCart(cart._id)}><i className="fas fa-heart"></i></td>
								</tr>
								))}
							</tbody>
						</table>
					</div>
				</div>
			</div>
		</div>
	</div>

	{/* footer  */}
	<AppFooter/>
	
	{/* copyright  */}
	<AppCopyRight/>

	{/* scripts */}
    <AppScripts/>
</body>
</html>

)}
</>
  );
}
