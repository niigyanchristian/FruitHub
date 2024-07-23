"use client";
import { useEffect, useState } from "react";

import AppHead from "@/app/Components/AppHead";
import AppScripts from "@/app/Components/AppScripts";
import AppHeader from "../Components/AppHeader";
import AppFooter from "../Components/AppFooter";
import AppCopyRight from "../Components/AppCopyRight";
import { AddToCart, DeleteFromWishlist, getSession, GetShoppingDetails } from "../actions";




export default function Home() {

	const [domLoaded, setDomLoaded] = useState(false);
	const [preLoad, setPreLoader] = useState(true);
	const [wishlists, setWishlists] = useState([]);
	const [Subtotal, setSubtotal] = useState(0);
	const [shipping, setShipping] = useState(0);
	const [session, setSession] = useState(null);

  useEffect(() => {
    setDomLoaded(true);
	myLoad();
	getSession().
	then(data=>{
		// LoadCarts(data.userToken);
		setSession(data);
	})

	GetShoppingDetails().
	then(data=>{
		console.log('====================================');
		console.log(data.wishlist);
		console.log('====================================');
		setWishlists(data.wishlist)
	})
  }, []);


  function myLoad(){
	setTimeout(()=>{
		setPreLoader(false)
	},1500)
  }


//   function LoadCarts(token){


// 	fetch('http://localhost:8000/customer/shoping-details',{
//         method:'get',
// 		headers: {
// 			'Authorization': `Bearer ${token}`
// 		},
//     }).then((data)=>{ 
//         return data.json();
//     }).then(data=>{
//         let newSubtotal = 0; 
// 		data.cart.forEach(element => {
// 			const itemTotal = element.product.price * element.unit;
// 			newSubtotal += itemTotal;
// 		});
// 		setSubtotal(newSubtotal);
// 		newSubtotal>0?setShipping(5):setShipping(0);
// 		// setWishlists(data.cart)
//     }).catch((e)=>{
//         console.log(e);
//     });
//   }

  function DeleteCart(productId,token){

	console.log("my token",token)
	fetch(`http://localhost:8000/cart/${productId}`, {
		method: 'DELETE',
		headers: {
			'Content-Type': 'application/json',
			'Authorization': `Bearer ${token}`
		}
	})
	.then(response => response.json())
	// .then(data => LoadCarts(token))
	.catch(error => console.error('Error:', error));
  }



  return (
<>
{domLoaded && (
<html lang="en">
<AppHead/>
<body>
	
	{/* PreLoader */}
	{/* preLoad&& */}
    {<div className="loader">
        <div className="loader-inner">
            <div className="circle"></div>
        </div>
    </div>}
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
						<h1>Wishlist</h1>
					</div>
				</div>
			</div>
		</div>
	</div>
	 {/* end breadcrumb section */}

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

								{wishlists.map((cart)=>(
									<tr className="table-body-row">
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
									 onClick={async()=>{
										var res =await AddToCart(cart._id,1,'');
										console.log('RES====================================');
										console.log(res);
										console.log('====================================');
										if(res==201){
											alert('Item has been added to cart!');
										}
									}}><i className="fas fa-heart"></i></td>
								</tr>
								))}
							</tbody>
						</table>
					</div>
				</div>
			</div>
		</div>
	</div>
	 {/* end cart */}

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
