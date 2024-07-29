import { AddToCart } from "../actions";

function AppProductCardEmpty() {
return (
<div className="col-lg-4 col-md-6 text-center" style={{minHeight:'400px'}}>
    <div className="single-product-item" style={{height:'100%'}}>
        <div className="product-image" style={{height:'50%',backgroundColor:'#bbb'}}></div>
        <h3 style={{height:'5%',marginTop:'2%'}}>loading...</h3>
        
    </div>
</div>
);
}
export default AppProductCardEmpty;