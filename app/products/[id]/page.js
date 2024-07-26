"use client"; // This is a client component 👈🏽
import { AddToCart, AddToWishlist, getMyShopDetails, getProductDetails, getSession } from "@/app/actions";
import AppHead from "@/app/Components/AppHead";
import AppHeader from "@/app/Components/AppHeader";
import AppScripts from "@/app/Components/AppScripts";
import { useEffect, useState } from "react";
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
	// LoadSingleProduct();
	LoadProducts();

	getSession().
	then(data=>{
		setSession(data);
		// console.log("Session:",data)
	});

	getProductDetails(params.id).
	then(data=>{
		setSingleProduct(data)
		return getMyShopDetails(data.shop_id);
	}).then(data=>{

		setProductShop(data);
	})
  }, []);

  function myLoad(){
	setTimeout(()=>{
		setPreLoader(false)
	},1500)
  }


  function LoadProducts(){
	fetch('http://localhost:8000/',{
        method:'get',
    }).then((data)=>{
        return data.json();
    }).then(data=>{
       
		setProducts(data.products)
    }).catch((e)=>{
        console.log(e);
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
						<p className="single-product-pricing"><span>{singleproducts.unit} in stock</span> ${singleproducts.price}</p>
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
							<a onClick={async()=>{
								var qty=document.getElementById('qty').value
								var res =await AddToCart(singleproducts._id,qty,singleproducts.shop_id);
								if(res){
									alert("Cart has been added successfully!")
								}
								}} className="cart-btn"><i className="fas fa-shopping-cart"></i> Add to Cart</a>
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
					<div key={index} className="col-lg-4 col-md-6 text-center">
					<div className="single-product-item">
						<div className="product-image">
							<a href="single-product.html"><img src={`/assets/img/products/${product.banner}`} alt=""/></a>
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
