"use client"; // This is a client component 👈🏽
import { AddToCart, AddToWishlist, getMyShopDetails, getProductDetails, GetProducts, GetProductsByCategory, getSession } from "@/app/actions";
import AppHead from "@/app/Components/AppHead";
import AppHeader from "@/app/Components/AppHeader";
import AppScripts from "@/app/Components/AppScripts";
import { useEffect, useState } from "react";
export default function Home({ params }) {

	const [domLoaded, setDomLoaded] = useState(false);
	const [preLoad, setPreLoader] = useState(true);
	const [products, setProducts] = useState([]);
	const [categories, setCategories] = useState([]);
	const [session, setSession] = useState(null);




  useEffect(() => {
    setDomLoaded(true);
	myLoad();

	getSession().
	then(data=>{
		// setSession(data);
		// console.log("Session:",data)
	});

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
				{products.map((product,index)=>(
					<div key={index} className="col-lg-4 col-md-6 text-center">
					<div className="single-product-item">
						<div className="product-image">
							<a href={`/products/${product._id}`}><img src={`/assets/img/products/${product.banner}`} alt=""/></a>
						</div>
						<h3>{product.name}</h3>
						<p className="product-price"><span>{product.unit} in stock</span> ${product.price} </p>
						<a href="cart.html" className="cart-btn"><i className="fas fa-shopping-cart"></i> Add to Cart</a>
					</div>
					</div>
				))}
			</div>
		</div>
	</div>
	 {/* end more products  */}

	 {/* logo carousel  */}
	<div className="logo-carousel-section">
		<div className="container">
			<div className="row">
				<div className="col-lg-12">
					<div className="logo-carousel-inner">
						<div className="single-logo-item">
							<img src="/assets/img/company-logos/1.png" alt=""/>
						</div>
						<div className="single-logo-item">
							<img src="/assets/img/company-logos/2.png" alt=""/>
						</div>
						<div className="single-logo-item">
							<img src="/assets/img/company-logos/3.png" alt=""/>
						</div>
						<div className="single-logo-item">
							<img src="/assets/img/company-logos/4.png" alt=""/>
						</div>
						<div className="single-logo-item">
							<img src="/assets/img/company-logos/5.png" alt=""/>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
	 {/* end logo carousel  */}

	 {/* footer  */}
	<div className="footer-area">
		<div className="container">
			<div className="row">
				<div className="col-lg-3 col-md-6">
					<div className="footer-box about-widget">
						<h2 className="widget-title">About us</h2>
						<p>Ut enim ad minim veniam perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae.</p>
					</div>
				</div>
				<div className="col-lg-3 col-md-6">
					<div className="footer-box get-in-touch">
						<h2 className="widget-title">Get in Touch</h2>
						<ul>
							<li>34/8, East Hukupara, Gifirtok, Sadan.</li>
							<li>support@fruitkha.com</li>
							<li>+00 111 222 3333</li>
						</ul>
					</div>
				</div>
				<div className="col-lg-3 col-md-6">
					<div className="footer-box pages">
						<h2 className="widget-title">Pages</h2>
						<ul>
							<li><a href="index.html">Home</a></li>
							<li><a href="about.html">About</a></li>
							<li><a href="services.html">Shop</a></li>
							<li><a href="news.html">News</a></li>
							<li><a href="contact.html">Contact</a></li>
						</ul>
					</div>
				</div>
				<div className="col-lg-3 col-md-6">
					<div className="footer-box subscribe">
						<h2 className="widget-title">Subscribe</h2>
						<p>Subscribe to our mailing list to get the latest updates.</p>
						<form action="index.html">
							<input type="email" placeholder="Email"/>
							<button type="submit"><i className="fas fa-paper-plane"></i></button>
						</form>
					</div>
				</div>
			</div>
		</div>
	</div>
	 {/* end footer  */}
	
	 {/* copyright  */}
	<div className="copyright">
		<div className="container">
			<div className="row">
				<div className="col-lg-6 col-md-12">
					<p>Copyrights &copy; 2019 - <a href="https://imransdesign.com/">Imran Hossain</a>,  All Rights Reserved.</p>
				</div>
				<div className="col-lg-6 text-right col-md-12">
					<div className="social-icons">
						<ul>
							<li><a href="#" target="_blank"><i className="fab fa-facebook-f"></i></a></li>
							<li><a href="#" target="_blank"><i className="fab fa-twitter"></i></a></li>
							<li><a href="#" target="_blank"><i className="fab fa-instagram"></i></a></li>
							<li><a href="#" target="_blank"><i className="fab fa-linkedin"></i></a></li>
							<li><a href="#" target="_blank"><i className="fab fa-dribbble"></i></a></li>
						</ul>
					</div>
				</div>
			</div>
		</div>
	</div>
	 {/* end copyright  */}
	 
    <AppScripts/>
</body>
</html>

)}
</>
  );
}
