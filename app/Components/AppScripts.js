import Script from "next/script";

function AppScripts(props) {
return (
<>
{/* jquery  */}
       <Script 
       type="text/javascript" 
       id="hs-script-loader" 
       async 
       defer 
       src="/assets/js/jquery-1.11.3.min.js"
       />

      {/* bootstrap  */}
       {global.jQuery&&<Script 
       type="text/javascript" 
       id="hs-script-loader" 
       async 
       defer 
       src="/assets/bootstrap/js/bootstrap.min.js"
       />}
       
       {/* count down  */}
       <Script 
       type="text/javascript" 
       id="hs-script-loader" 
       async 
       defer 
       src="/assets/js/jquery.countdown.js"
       />

       {/* isotope  */}
       <Script 
       type="text/javascript" 
       id="hs-script-loader" 
       async 
       defer 
       src="/assets/js/jquery.isotope-3.0.6.min.js"
       />

       {/* waypoints  */}
       <Script 
       type="text/javascript" 
       id="hs-script-loader" 
       async 
       defer 
       src="/assets/js/waypoints.js"
       />
	
       {/* owl carousel  */}
       <Script 
       type="text/javascript" 
       id="hs-script-loader" 
       async 
       defer 
       src="/assets/js/owl.carousel.min.js"
       />

       {/* magnific popup  */}
       <Script 
       type="text/javascript" 
       id="hs-script-loader" 
       async 
       defer 
       src="/assets/js/jquery.magnific-popup.min.js"
       />
	
       {/* mean menu  */}
       <Script 
       type="text/javascript" 
       id="hs-script-loader" 
       async 
       defer 
       src="/assets/js/jquery.meanmenu.min.js"
       />
	
       {/* sticker js  */}
       <Script 
       type="text/javascript" 
       id="hs-script-loader" 
       async 
       defer 
       src="/assets/js/sticker.js"
       />

       {/* main js  */}
       <Script 
       type="text/javascript" 
       id="hs-script-loader" 
       async 
       defer 
       src="/assets/js/main.js"
       />
</>
);
}

export default AppScripts;