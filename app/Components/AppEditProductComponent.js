import { useState } from "react";
import { UpdateProduct } from "../actions";
// import { AddProduct } from "../actions";

function AppEditProductComponent({data}) {
    const [inputValueName, setInputValueName] = useState(data.name); 
	const [inputValueType, setInputValueType] = useState(data.type); 
	const [inputValueQty, setInputValueQty] = useState(data.unit); 
	const [inputValueSuplier, setInputValueSuplier] = useState(data.suplier); 
	const [inputValuePrice, setInputValuePrice] = useState(data.price); 
	const [inputValueBanner, setInputValueBanner] = useState(data.banner); 
	const [inputValueDesc, setInputValueDesc] = useState(data.desc); 


    const handleChangeName = (event) => {
		setInputValueName(event.target.value);
	};
	const handleChangeType = (event) => {
		setInputValueType(event.target.value);
	};
	const handleChangeQty = (event) => {
		setInputValueQty(event.target.value);
	};
	const handleChangeSuplier = (event) => {
		setInputValueSuplier(event.target.value);
	};
	const handleChangePrice = (event) => {
		setInputValuePrice(event.target.value);
	};
	const handleChangeBanner = (event) => {
		setInputValueBanner(event.target.value);
	};
	const handleChangeDesc = (event) => {
		setInputValueDesc(event.target.value);
	};


return (
<div className="contact-from-section mt-150 mb-150" id="add-product">
		<div className="container">
			<div className="row">
				<div className="col-lg-8 mb-5 mb-lg-0">
					<div className="form-title">
						<h2>Edit Product</h2>
					</div>
				 	<div id="form_status"></div>
					<div className="contact-form">
						<form id="fruitkha-contact">
							<p>
								<input type="text" placeholder="Name"
                                value={inputValueName}
                                onChange={handleChangeName}
                                /> <a></a>
								<input type="text" placeholder="Type"
                                value={inputValueType}
                                onChange={handleChangeType}/>
							</p>
							<p>
								<input type="number" placeholder="Quantity" min={1}
                                value={inputValueQty}
                                onChange={handleChangeQty}/> <a></a>
								<input type="text" placeholder="Suplier"
                                value={inputValueSuplier}
                                onChange={handleChangeSuplier}/>
							</p>
							<p>
							<input type="number" placeholder="Price" name="price" id="price" min={1}
                            value={inputValuePrice}
                            onChange={handleChangePrice}/> <a></a>
							<input type="text" placeholder="banner" name="banner" id="banner"
                            value={inputValueBanner}
                            onChange={handleChangeBanner}/>
							</p>
							<p><textarea name="desc" id="desc" cols="30" rows="10" placeholder="Description"
                            value={inputValueDesc}
                            onChange={handleChangeDesc}
                            ></textarea></p>
							<input type="hidden" name="token" value="FsWga4&@f6aw" />
							<p><a onClick={async ()=>{
                                var res =await UpdateProduct(inputValueName,inputValueType,inputValueQty,inputValueSuplier,inputValuePrice,inputValueBanner,inputValueDesc,data._id,data.shop_id);
                                if(res._id){
                                    alert('Product has been updated!')
                                }
                            }} className="boxed-btn">Submit</a></p>
						</form>
					</div>
				</div>
			</div>
		</div>
	</div>
);
}

export default AppEditProductComponent;
