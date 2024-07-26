"use client"; // This is a client component 👈🏽
import { useEffect, useState } from "react";
import { PaystackConsumer } from 'react-paystack';
import { Loader } from '@googlemaps/js-api-loader';

import AppHead from "@/app/Components/AppHead";
import AppScripts from "@/app/Components/AppScripts";
import AppHeader from "../Components/AppHeader";
import AppFooter from "../Components/AppFooter";
import AppCopyRight from "../Components/AppCopyRight";
import AppCompanies from "../Components/AppCompanies";
import { getAllShops, GetShoppingDetails, mapDistance, PlaceOrder } from "../actions";

export default function Home() {
  const [domLoaded, setDomLoaded] = useState(false);
  const [preLoad, setPreLoader] = useState(true);
  const [carts, setCarts] = useState([]);
  const [subtotal, setSubtotal] = useState(0);
  const [deliveryFee, setDeliveryFee] = useState(0);
  const [shipping, setShipping] = useState(null);
  const [longitude, setLongitude] = useState(0);
  const [latitude, setLatitude] = useState(0);
//   const [session, setSession] = useState(null);
//   const [config, setConfig] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [results, setResults] = useState([]);
  const [allShops, setAllShops] = useState([]);
  const [distance, setDistance] = useState(0);
  const [senderEmail, setSenderEmail] = useState('');

  const [name, setName] = useState('');
  const [address, setAddress] = useState('');
  const [contact, setContact] = useState('');
  const [note, setNote] = useState('');

  const [componentProps, setComponentProps] = useState(null);

  const handleChange = (setter) => (event) => setter(event.target.value);

  useEffect(() => {
    setDomLoaded(true);
    myLoad();

    

    fetchData().then(data=>{})
  }, []);

  const fetchData = async () => {
	try {
	  const shops = await getAllShops();
	  setAllShops(shops);

	  const { cart, email } = await GetShoppingDetails();
	  setCarts(cart);

	  const newSubtotal = cart.reduce((acc, item) => acc + item.product.price * item.unit, 0);
	  setSubtotal(newSubtotal);

	  const shopIds = new Set(cart.map((item) => item.product.shop_id));
	  const distances = await Promise.all(
		Array.from(shopIds).map((shopId) => {
		  const shop = shops.find((s) => s._id === shopId);
		  return mapDistance({ lat: parseFloat(shop.locCoords.lat), lng: parseFloat(shop.locCoords.lng) });
		})
	  );

	  const deliveryDistance = distances.reduce((total, distance) => total + distance, 0);
	  setDistance(deliveryDistance);
	  setSenderEmail(email);
	} catch (error) {
	  console.error('Error fetching data', error);
	}
  };
  const myLoad = () => {
    setTimeout(() => {
      setPreLoader(false);
    }, 1500);
  };

  async function handleSuccess(reference,add,lng,lat,price){
	// console.log('====================================');
	console.log(name,contact,note);
	console.log(add,lng,lat,price);
	// console.log('====================================');
    if (reference.status === 'success') {
      const res = await PlaceOrder(reference.reference, name, add, contact, note,lng,lat,price);
      if (res) {
        alert("Order has been placed successfully");

        const { cart } = await GetShoppingDetails();
        setCarts(cart);

        const newSubtotal = cart.reduce((acc, item) => acc + item.product.price * item.unit, 0);
        setSubtotal(newSubtotal);
        setConfig(null);
      }
    }
  };

  function handleClose(){
    console.log('Payment dialog closed');
  };

  const handleSearch = async () => {
    const loader = new Loader({
      apiKey: process.env.NEXT_PUBLIC_API_KEY,
      version: 'weekly',
      libraries: ['places'],
    });

    await loader.load();

    const service = new window.google.maps.places.PlacesService(document.createElement('div'));

    service.textSearch({ query: searchQuery }, (results, status) => {
      if (status === window.google.maps.places.PlacesServiceStatus.OK) {
        const coordinates = results.map((place) => ({
          name: place.name,
          lat: place.geometry.location.lat(),
          lng: place.geometry.location.lng(),
        }));
        setResults(coordinates);
      } else {
        console.error('Error fetching location data:', status);
      }
    });
  };

  return (
    <>
      {domLoaded && (
        <html lang="en">
          <AppHead />
          <body>
            {preLoad && (
              <div className="loader">
                <div className="loader-inner">
                  <div className="circle"></div>
                </div>
              </div>
            )}

            <AppHeader />

            <div className="search-area">
              <div className="container">
                <div className="row">
                  <div className="col-lg-12">
                    <span className="close-btn">
                      <i className="fas fa-window-close"></i>
                    </span>
                    <div className="search-bar">
                      <div className="search-bar-tablecell">
                        <h3>Search For:</h3>
                        <input type="text" placeholder="Keywords" />
                        <button type="submit">Search <i className="fas fa-search"></i></button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="breadcrumb-section breadcrumb-bg">
              <div className="container">
                <div className="row">
                  <div className="col-lg-8 offset-lg-2 text-center">
                    <div className="breadcrumb-text">
                      <p>Fresh and Organic</p>
                      <h1>Check Out Product</h1>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="checkout-section mt-150 mb-150">
              <div className="container">
                <div className="row">
                  <div className="col-lg-8">
                    <div className="checkout-accordion-wrap">
                      <div className="accordion" id="accordionExample">
                        <div className="card single-accordion">
                          <div className="card-header" id="headingOne">
                            <h5 className="mb-0">
                              <button className="btn btn-link" type="button" data-toggle="collapse" data-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
                                Billing Address
                              </button>
                            </h5>
                          </div>

                          <div id="collapseOne" className="collapse show" aria-labelledby="headingOne" data-parent="#accordionExample">
                            <div className="card-body">
                              <div className="billing-address-form">
                                <form action="index.html">
                                  <p>
                                    <input type="tel" placeholder="Your name" value={name} onChange={handleChange(setName)} />
                                  </p>
                                  
                                  <p>
                                    <input type="tel" placeholder="Contact" value={contact} onChange={handleChange(setContact)} />
                                  </p>
                                  <p>
                                    <textarea name="bill" id="bill" cols="30" rows="10" placeholder="Say Something" value={note} onChange={handleChange(setNote)}></textarea>
                                  </p>
								  <p>
                                    <input
                                      type="text"
                                      value={searchQuery}
                                      onChange={(e) => setSearchQuery(e.target.value)}
                                      placeholder="Search for a location"
                                    />
                                  </p>
                                  <a className="cart-btn" onClick={handleSearch}>Populate Address</a>

                                  <ul>
                                    {results.map((result, index) => (
                                      <li key={index} onClick={async () => {
                                        setAddress(result.name);
										handleChange(setLongitude(parseFloat(result.lng)))
										handleChange(setLatitude(parseFloat(result.lat)))
										
										// setLatitude(parseFloat(result.lat));
										

                                        const dis = await mapDistance({ lat: parseFloat(result.lat), lng: parseFloat(result.lng) });
                                        const fee = ((distance + dis) / 10).toFixed(2);
                                        setShipping(parseFloat(fee));
                                        const amount = (parseFloat(subtotal) + parseFloat(fee)) * 100;
										setDeliveryFee(parseInt(amount));
                                        setComponentProps({
                                          reference: (new Date()).getTime().toString(),
                                          email: senderEmail,
                                          amount: parseInt(amount),
                                          publicKey: process.env.NEXT_PUBLIC_PAYMENT_API_KEY,
                                          currency: 'GHS',
                                          text: 'Paystack Button Implementation',
                                          onSuccess: (reference) => handleSuccess(reference,result.name,result.lat,result.lng,amount),
                                          onClose: handleClose,
                                        });
										return;
                                      }}>
                                        {result.name}: {result.lat}, {result.lng}
                                      </li>
                                    ))}
                                  </ul>
                                  <p>
                                    <input type="text" placeholder="Address" value={address} readOnly />
                                  </p>
                                </form>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="col-lg-4">
                    <div className="order-details-wrap">
                      <table className="order-details">
                        <thead>
                          <tr>
                            <th>Your order Details</th>
                            <th>Price</th>
                          </tr>
                        </thead>
                        <tbody className="order-details-body">
                          <tr>
                            <td>Product</td>
                            <td>Total</td>
                          </tr>
                          {carts.map((cart, index) => (
                            <tr key={index}>
                              <td>{cart.product.name}</td>
                              <td>${cart.product.price * cart.unit}</td>
                            </tr>
                          ))}
                        </tbody>
                        <tbody className="checkout-details">
                          <tr>
                            <td>Subtotal</td>
                            <td>${subtotal}</td>
                          </tr>
                          {shipping && (
                            <>
                              <tr>
                                <td>Delivery fee</td>
                                <td>${shipping}</td>
                              </tr>
                              <tr>
                                <td>Total</td>
                                <td>${parseFloat(subtotal) + parseFloat(shipping)}</td>
                              </tr>
                            </>
                          )}
                        </tbody>
                      </table>
                      {componentProps && (
                        <PaystackConsumer {...componentProps}>
                          {({ initializePayment }) => <a className="boxed-btn" onClick={() => initializePayment(handleSuccess, handleClose)}>Place Order</a>}
                        </PaystackConsumer>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <AppCompanies />

            <AppFooter />

            <AppCopyRight />

            <AppScripts />
          </body>
        </html>
      )}
    </>
  );
}
