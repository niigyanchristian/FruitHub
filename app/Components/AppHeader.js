"use client"
import { useEffect, useState } from "react";
import { getMyShops, logout } from "../actions";

function AppHeader() {
	const [myShops, setMyShops] = useState([]);

	useEffect(() => {
		getMyShops().then(data=>{
			setMyShops(data);
		})
	},[])
return (
<div className="top-header-area" id="sticker">
		<div className="container">
			<div className="row">
				<div className="col-lg-12 col-sm-12 text-center">
					<div className="main-menu-wrap">
						 {/* logo  */}
						<div className="site-logo">
							<a href="index.html">
								<img src="/assets/img/logo3.png" alt=""/>
							</a>
						</div>
						 {/* logo  */}

						 {/* menu start  */}
						<nav className="main-menu">
							<ul>
								<li className="current-list-item"><a href="/">Home</a>
									<ul className="sub-menu">
										<li><a href="/">Static Home</a></li>
										{/* <li><a href="index_2.html">Slider Home</a></li> */}
									</ul>
								</li>
								
								<li><a href="#">Pages</a>
									<ul className="sub-menu">
										<li><a href="/cart">Cart</a></li>
										<li><a href="/checkout">Check Out</a></li>
										<li><a href="/product/create">Create Product</a></li>
										<li><a href="/orders">Orders</a></li>
										<li><a href="/shop">Shop</a></li>
									</ul>
								</li>

								<li><a href="/shops">Shops</a></li>
								<li><a href="shop.html">My Shops</a>
									<ul className="sub-menu">
										{myShops?.map((shop,index)=>(
											<li key={index}><a href={`/owner/shop/${shop._id}`}>{shop.name}</a></li>
										))}
										<li><a href="/shop/create">Create shop</a></li>
									</ul>
								</li>
								<li>
									<div className="header-icons">
										<a className="shopping-cart" href="/cart"><i className="fas fa-shopping-cart"></i></a>
										<a className="shopping-cart" href="/wishlist"><i className="fas fa-heart"></i></a>
										<a className="shopping-cart" href="/profile"><i className="fa fa-user"></i></a>
										<a className="shopping-cart" onClick={async()=>{
											const res =await logout();
											window.location.reload()

										}}>Logout</a>
									</div>
								</li>
							</ul>
						</nav>
						<a className="mobile-show search-bar-icon" href="#"><i className="fas fa-search"></i></a>
						<div className="mobile-menu"></div>
						 {/* menu end  */}
					</div>
				</div>
			</div>
		</div>
	</div>
);
}

export default AppHeader;