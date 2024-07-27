import { useState } from "react";
import { CreateShop } from "../actions";

function AddShopComponet(props) {
    const [inputValueName, setInputValueName] = useState(''); 
	const [inputValueEmail, setInputValueEmail] = useState(''); 
	const [inputValuePhone, setInputValuePhone] = useState(''); 
	const [inputValueAddress, setInputValueAddress] = useState(''); 
	const [inputValueBanner, setInputValueBanner] = useState(''); 
	const [inputValueDesc, setInputValueDesc] = useState(''); 
	const [longitude, setLongitude] = useState('');
	const [latitude, setLatitude] = useState('');

	const handleChange = (setter) => (event) => setter(event.target.value);

	const handleCreateShop=async()=>{
		var res=await CreateShop(inputValueName,inputValueDesc,inputValueBanner,inputValueAddress,inputValuePhone,inputValueEmail,longitude,latitude);
		if(res._id){
			alert('Shop has been created!');
		}
		window.location.reload()
	}


return (
<div className="contact-from-section mt-150 mb-150" id="add-product">
		<div className="container">
			<div className="row">
				<div className="col-lg-8 mx-auto mb-5 mb-lg-0">
					<div className="form-title">
						<h2>Fill in</h2>
						<p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Pariatur, ratione! Laboriosam est, assumenda. Perferendis, quo alias quaerat aliquid. Corporis ipsum minus voluptate? Dolore, esse natus!</p>
						<a className="cart-btn" onClick={()=>{
								if (navigator.geolocation) {
									navigator.geolocation.getCurrentPosition(
										(position) => {
											setLatitude(position.coords.latitude);
											setLongitude(position.coords.longitude);
										},
										(error) => {
											console.error("Error getting the current location", error);
										}
									);
								} else {
									console.error("Geolocation is not supported by this browser.");
								}
							}}>Get Location</a>
					</div>
				 	<div id="form_status"></div>
					<div className="contact-form">
						<form type="POST" id="fruitkha-contact">
							<p>
								<input type="text" placeholder="Name" name="name" id="name"
                                value={inputValueName}
                                onChange={handleChange(setInputValueName)}/> <a></a>
								<input type="email" placeholder="Email" name="type" id="type"
                                value={inputValueEmail}
                                onChange={handleChange(setInputValueEmail)}/>
							</p>
							<p>
								<input type="tel" placeholder="Contact" name="unit" id="unit" value={inputValuePhone}
                                onChange={handleChange(setInputValuePhone)}/> <a></a>
								<input type="text" placeholder="Address" name="suplier" id="suplier"
                                value={inputValueAddress}
                                onChange={handleChange(setInputValueAddress)}
                                />
							</p>

							<p>
								<input type="text" placeholder="longitude" name="unit" value={longitude}
                                onChange={handleChange(setLongitude)}/> <a></a>
								<input type="text" placeholder="latitude" name="latitude"
                                value={latitude}
                                onChange={handleChange(setLatitude)}
                                />
							</p>
							<p>
							<input type="text" placeholder="banner" name="banner" id="banner"
                            value={inputValueBanner}
                            onChange={handleChange(setInputValueBanner)}/>
							
							</p>
							<p><textarea name="desc" id="desc" cols="30" rows="10" placeholder="Description"
                            value={inputValueDesc}
                            onChange={handleChange(setInputValueDesc)}></textarea></p>
							<p><a className="boxed-btn" onClick={handleCreateShop}>Create</a></p>

							
						</form>
					</div>
				</div>
			</div>
		</div>
	</div>
);
}

export default AddShopComponet;