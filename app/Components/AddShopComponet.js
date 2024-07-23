import { useState } from "react";
import { CreateShop } from "../actions";

function AddShopComponet(props) {
    const [inputValueName, setInputValueName] = useState(''); 
	const [inputValueEmail, setInputValueEmail] = useState(''); 
	const [inputValuePhone, setInputValuePhone] = useState(''); 
	const [inputValueAddress, setInputValueAddress] = useState(''); 
	const [inputValueBanner, setInputValueBanner] = useState(''); 
	const [inputValueDesc, setInputValueDesc] = useState(''); 


    const handleChangeName = (event) =>setInputValueName(event.target.value);
	const handleChangeEmail = (event) =>setInputValueEmail(event.target.value);
	const handleChangePhone = (event) =>setInputValuePhone(event.target.value);
	const handleChangeAddress = (event) =>setInputValueAddress(event.target.value);
	const handleChangeBanner = (event) =>setInputValueBanner(event.target.value);
	const handleChangeDesc = (event) =>setInputValueDesc(event.target.value);

return (
<div className="contact-from-section mt-150 mb-150" id="add-product">
		<div className="container">
			<div className="row">
				<div className="col-lg-8 mx-auto mb-5 mb-lg-0">
					<div className="form-title">
						<h2>Fill in</h2>
						{/* <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Pariatur, ratione! Laboriosam est, assumenda. Perferendis, quo alias quaerat aliquid. Corporis ipsum minus voluptate? Dolore, esse natus!</p> */}
					</div>
				 	<div id="form_status"></div>
					<div className="contact-form">
						<form type="POST" id="fruitkha-contact">
							<p>
								<input type="text" placeholder="Name" name="name" id="name"
                                value={inputValueName}
                                onChange={handleChangeName}/> <a></a>
								<input type="email" placeholder="Email" name="type" id="type"
                                value={inputValueEmail}
                                onChange={handleChangeEmail}/>
							</p>
							<p>
								<input type="tel" placeholder="Contact" name="unit" id="unit" value={inputValuePhone}
                                onChange={handleChangePhone}/> <a></a>
								<input type="text" placeholder="Address" name="suplier" id="suplier"
                                value={inputValueAddress}
                                onChange={handleChangeAddress}
                                />
							</p>
							<p>
							{/* <input type="number" placeholder="Price" name="price" id="price" min={1}/> <a></a> */}
							<input type="text" placeholder="banner" name="banner" id="banner"
                            value={inputValueBanner}
                            onChange={handleChangeBanner}/>
							
							</p>
							<p><textarea name="desc" id="desc" cols="30" rows="10" placeholder="Description"
                            value={inputValueDesc}
                            onChange={handleChangeDesc}></textarea></p>
							<input type="hidden" name="token" value="FsWga4&@f6aw" />
							<p><a className="boxed-btn" onClick={async ()=>{
                                var res=await CreateShop(inputValueName,inputValueDesc,inputValueBanner,inputValueAddress,inputValuePhone,inputValueEmail);
                                if(res._id){
                                    alert('Shop has been created!');
                                }
                            }}>Create</a></p>
						</form>
					</div>
				</div>
			</div>
		</div>
	</div>
);
}

export default AddShopComponet;