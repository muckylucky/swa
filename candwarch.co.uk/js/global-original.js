/* nav js ################################################################## */

function validateContactForm(theForm) {
		
		var email1 = theForm.email.value.toLowerCase();
		var email2 = theForm.email_confirm.value.toLowerCase();
		
		if ( email1 != email2 ) {
			alert("The email addresses you entered do not match please re-enter to proceed.");
		}
		
		return email1 == email2;
}



function createStyleRule(selector, declaration) {
    if (!document.getElementsByTagName ||
      !(document.createElement || document.createElementNS)) return;
    var agt = navigator.userAgent.toLowerCase();
    var is_ie = ((agt.indexOf("msie") != -1) &&  (agt.indexOf("opera") == -1));
    var is_iewin = (is_ie &&  (agt.indexOf("win") != -1));
    var is_iemac = (is_ie &&  (agt.indexOf("mac") != -1));
    if (is_iemac) return; // script doesn't work properly in IE/Mac
    var head = document.getElementsByTagName("head")[0]; 
    var style = (typeof document.createElementNS != "undefined") ?
      document.createElementNS("http://www.w3.org/1999/xhtml", "style") :
      document.createElement("style");
    if (!is_iewin) {
        var styleRule = document.createTextNode(selector + " {" + declaration + "}");
	    style.appendChild(styleRule); // bugs in IE/Win
    }
	style.setAttribute("type", "text/css");
    style.setAttribute("media", "screen"); 
    head.appendChild(style);
    if (is_iewin &&  document.styleSheets &&  document.styleSheets.length > 0) {
        var lastStyle = document.styleSheets[document.styleSheets.length - 1];
        if (typeof lastStyle.addRule == "object") {
            lastStyle.addRule(selector, declaration);
        }
    }
}

function setElementStyleById(id, propertyName, propertyValue) {
    if (!document.getElementById) return;
    var el = document.getElementById(id);
    if (el) el.style[propertyName] = propertyValue;
}

window.onload=rollup;

function rollout(objMenuitem, objEvent)
{
    var iKeyCode;

    // Check if from a keyboard - non IE, but
    // irrelevant as tab doesn't trigger the 
    // keypress event in IE
    if (objEvent && objEvent.type == 'keypress')
    {
        if (objEvent.keyCode)
            iKeyCode = objEvent.keyCode;
        else if (objEvent.which)
            iKeyCode = objEvent.which;

        // If it's not the enter key or space key, 
        // pass control back to the browser
        if (iKeyCode != 13 && iKeyCode != 32)
            return true;
    }

    if (objMenuitem.nextSibling.style.display == 'block')
        objMenuitem.nextSibling.style.display = 'none';
    else
        objMenuitem.nextSibling.style.display = 'block';

    // Stop the browser requesting the link
    return false;
}

function rollup()
{
    var bRollup, objLinks, objNode, objAnchor;

    // Check we're working with a DOM compliant browser
    if (document.getElementById && document.createElement)
    {
        var strLocation = window.location;

        // 'navlist' won't always exist, i.e. in help pages.
        if(document.getElementById('navlist'))
        {
            var objMenu = document.getElementById('navlist');
		    // alert("OK");
            var objNested = objMenu.getElementsByTagName('ul');

            // Hide each of the nested unordered list
            for (var i=0; i<objNested.length; i++)
            {
                // Only hide, if the current location is not found in the list
                bRollup = true;
                objLinks = objNested[i].getElementsByTagName('a');

		         //alert("OK " + i);
                for (var j=0; j<objLinks.length; j++)
                {
                    if (objLinks[j].href == strLocation)
                    bRollup = false;
                }

                if (bRollup == true)
                    objNested[i].style.display = 'none';
                else
                    objNested[i].style.display = 'block';

                // Place the top-level text in an anchor tag
                objNode = objNested[i].parentNode;
			
                var strContent = objNode.firstChild.data;
                //alert (strContent);
			    //alert (objNode);
                objAnchor = document.createElement('a');
                objAnchor.href = '#';
                objAnchor.onclick = function(event){return rollout(this, event);}
                objAnchor.onkeypress = function(event){return rollout(this, event);}
                objAnchor.appendChild(document.createTextNode(strContent));
			
                objNode.replaceChild(objAnchor, objNode.firstChild);
            }
        } // end of if(document.getElementById('navlist'))
    }
}

/* tooltip js ################################################################ */

/*javascript for Bubble Tooltips by Alessandro Fulciniti
- http://pro.html.it - http://web-graphics.com */

function enableTooltips(id){
var links,i,h;
if(!document.getElementById || !document.getElementsByTagName) return;
AddCss();
h=document.createElement("span");
h.id="btc";
h.setAttribute("id","btc");
h.style.position="absolute";
document.getElementsByTagName("body")[0].appendChild(h);
if(id==null) links=document.getElementsByTagName("a");
else 
	{
	   links=document.getElementById(id).getElementsByTagName("a");
	}
for(i=0;i<links.length;i++){
    Prepare(links[i]);
    }
}

function enable_allTooltips(ids)
{
	var i = 0;
	for(i=0; i< ids.length;i++)
	{
		enableTooltips(ids[i]);
	}
}


/*
These functions are to be called by the document behavior methods
This will prevent code being overridden by a template 
*/

function onload_functions()
{
	//menu rollup
	try
	{
		rollup();
	}
	catch(c){};
	
	// enable all tool tips
	try
	{
		//var tool_tips_ids = new Array("cont_avail","cont_not_avail","quick_bub","adv_bub");
		enable_allTooltips(tool_tips_ids);
	}
	catch(c){};
//	try
//	{
//		// contract search 
//		hideSplashLoader();
//	}
//	catch(c){};
}

function unload_functions()
{
	// contract search 
	hideSplashLoader;
}

function onclick_functions()
{
	hideSplashLoader
}



function Prepare(el){
var tooltip,t,b,s,l;
t=el.getAttribute("title");
if(t==null || t.length==0) t="link:";
el.removeAttribute("title");
tooltip=CreateEl("span","tooltip");
s=CreateEl("span","top");
s.appendChild(document.createTextNode(t));
tooltip.appendChild(s);
b=CreateEl("b","bottom");
l="";//el.getAttribute("href");
if(l.length>30) l=l.substr(0,27)+"...";
b.appendChild(document.createTextNode(l));
tooltip.appendChild(b);
setOpacity(tooltip);
el.tooltip=tooltip;
el.onmouseover=showTooltip;
el.onmouseout=hideTooltip;
el.onmousemove=Locate;
}

function showTooltip(e){
document.getElementById("btc").appendChild(this.tooltip);
Locate(e);
}

function hideTooltip(e){
var d=document.getElementById("btc");
if(d.childNodes.length>0) d.removeChild(d.firstChild);
}

function setOpacity(el){
el.style.filter="alpha(opacity:95)";
el.style.KHTMLOpacity="0.95";
el.style.MozOpacity="0.95";
el.style.opacity="0.95";
}

function CreateEl(t,c){
var x=document.createElement(t);
x.className=c;
x.style.display="block";
return(x);
}

function AddCss(){
var l=CreateEl("link");
l.setAttribute("type","text/css");
l.setAttribute("rel","stylesheet");
l.setAttribute("href","bt.css");
l.setAttribute("media","screen");
document.getElementsByTagName("head")[0].appendChild(l);
}

function Locate(e){
var posx=0,posy=0;
if(e==null) e=window.event;
if(e.pageX || e.pageY){
    posx=e.pageX; posy=e.pageY;
    }
else if(e.clientX || e.clientY){
    if(document.documentElement.scrollTop){
        posx=e.clientX+document.documentElement.scrollLeft;
        posy=e.clientY+document.documentElement.scrollTop;
        }
    else{
        posx=e.clientX+document.body.scrollLeft;
        posy=e.clientY+document.body.scrollTop;
        }
    }
document.getElementById("btc").style.top=(posy+10)+"px";
document.getElementById("btc").style.left=(posx-20)+"px";
}

/* show/hide layer js ################################################################## */

function P7_swapClass(){ //v1.4 by PVII
 var i,x,tB,j=0,tA=new Array(),arg=P7_swapClass.arguments;
 if(document.getElementsByTagName){for(i=4;i<arg.length;i++){tB=document.getElementsByTagName(arg[i]);
  for(x=0;x<tB.length;x++){tA[j]=tB[x];j++;}}for(i=0;i<tA.length;i++){
  if(tA[i].className){if(tA[i].id==arg[1]){if(arg[0]==1){
  tA[i].className=(tA[i].className==arg[3])?arg[2]:arg[3];}else{tA[i].className=arg[2];}
  }else if(arg[0]==1 && arg[1]=='none'){if(tA[i].className==arg[2] || tA[i].className==arg[3]){
  tA[i].className=(tA[i].className==arg[3])?arg[2]:arg[3];}
  }else if(tA[i].className==arg[2]){tA[i].className=arg[3];}}}}
}

function P7_writeStyles(op,a){ //v1.5 by PVII
if(op==0||document.getElementById){var tS="<sty"+"le type=\"text/css\">";
tS+=a+"<"+"/sty"+"le>";document.write(tS);document.close();}
}
P7_writeStyles(1,'.closed .showhide_info{ display:none;}.open .showhide_info { display:block;}');

/* other js ################################################################## */

function new_window(url,name,features) {
  window.open(url,name,features);
}

function popUp(theURL, theWidth, theHeight) {
  windowTwo = window.open(theURL, "popframe", "toolbar=no,location=no,status=no,directories=no,menubar=no,scrollbars=yes,resizable=yes,width=" + theWidth + ",height=" + theHeight);
  windowTwo.focus();
}

function clearText(thefield){
if (thefield.defaultValue==thefield.value)
thefield.value = ""
}
/* addEvent handler for IE and other browsers */
function addEvent(elm, evType, fn, useCapture)
// addEvent and removeEvent
// cross-browser event handling for IE5+,  NS6 and Mozilla
// By Scott Andrew
{
 if (elm.addEventListener){
   elm.addEventListener(evType, fn, useCapture);
   return true;
 } else if (elm.attachEvent){
   var r = elm.attachEvent("on"+evType, fn);
   return r;
 }
}  

function showHide(elementId, showHide)
   {
      var searchItem = document.getElementById(elementId);
      var imageButton = document.getElementById(showHide);
	  if( searchItem.style.display  == "none")
	  {
	  	 searchItem.style.display = "block";
	  	 imageButton.src = "on.jpg";
	  }
     else
   	  {
      	 searchItem.style.display = "none";
      	 imageButton.src = "off.jpg";
      }
    }


function checkboxState(){
      // Function to loop through the form elements and
      // either check all those that are unchecked, or
      // uncheck all those that are checked.

      for (var i=0;i<document.cpv_form.elements.length;i++) {
          var a=document.cpv_form.elements[i];
          if ((a.name != 'all_box_states') && (a.type=='checkbox')) {
               a.checked=document.cpv_form.all_box_states.checked;
          }
      }  
  }
  
  function checkboxCheckAllState(){
      // Function to keep track of those elements that
      // are checked and unchecked.
  	  
      var outer=inner=0;
      for (var i=0;i<document.cpv_form.elements.length;i++) {
          var formElement=document.cpv_form.elements[i];
          if ((formElement.name != 'all_box_states') && (formElement.type=='checkbox')) {
              outer++;
          }
          if (formElement.checked) {
              inner++;
          }
      }
      document.cpv_form.all_box_states.checked=(inner==outer)?true:false;
  }
  
function deleteCard(cardDetailsId) {
    if(confirm('Are you sure you wish to delete this card?')) {
        window.location = '/subscriptions/cgi-bin/payment.cgi?action=deletecard&carddetailsid=' + cardDetailsId;
    }
}

function disableFields(e) {
    if(e.value == 'amex' || e.value == 'visa' || e.value == 'mastercard') {
        document.form1.startmonth.value="01";
        document.form1.startyear.value="2001";
        document.form1.ccissue.value="";
        document.form1.ccnumber5.value="";
        document.form1.ccissue.disabled=true;        
        document.form1.startmonth.disabled=true;
        document.form1.startyear.disabled=true;
        document.form1.ccnumber5.disabled=true;
    }
    else {
        document.form1.ccissue.disabled=false;
        document.form1.startmonth.disabled=false;
        document.form1.startyear.disabled=false;
        document.form1.ccnumber5.disabled=false;
    }
}

function deleteBasketItem(scriptName, basketItemId) {
    if(confirm('Are you sure you wish to delete this item?')) {
        window.location = scriptName + '?action=delete&basketitemid=' + basketItemId;
    }   
}

function confirmAmount() {
    var formElement = document.subscription.refund_netamount.value;
    if(formElement == "") {
        alert('Please include an amount you wish to refund.');
        document.subscription.refund_netamount.focus();
    }
    else if(formElement == 0) {
        alert('Please include an amount greater than £0 to carry out this request.');
        document.subscription.refund_netamount.focus();
    }
    else if(isNaN(formElement)) {
        alert('The "Refund" field only accepts numerical characters.');
        document.subscription.refund_netamount.focus();
    }
    else if(confirm('Are you sure you wish to refund £' + formElement + ' against this subscription?')) {
        return true;
    }
    return false;
}

function confirmPaymentAmount(thisForm) {
    var formElement = thisForm.invoice_payment_amount.value;
    if(formElement == "") {
        alert('Please include an amount you wish to refund.');
        thisForm.invoice_payment_amount.focus();
    }
    else if(formElement == 0) {
        alert('Please include an amount greater than £0 to carry out this request.');
        thisForm.invoice_payment_amount.focus();
    }
    else if(isNaN(formElement)) {
        alert('The amount must contain only numbers.');
        thisForm.invoice_payment_amount.focus();
    }
    else if(confirm('Are you sure you wish to make a payment £' + formElement + ' against this invoice?')) {
        return true;
    }
    return false;
}

function checkDate() {    
    // Validate for dates that might not otherwise
    // be legal tender in this neck of the woods...
    var startDay = document.forms[1].start_day.value;
    var startMonth = document.forms[1].start_month.value;
    var startYear = document.forms[1].start_year.value;
    var endDay = document.forms[1].end_day.value;
    var endMonth = document.forms[1].end_month.value;
    var endYear = document.forms[1].end_year.value;
    
    // First element is blank to allow for indexing starting from zero.
    var months = new Array("", "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December");
    
    function isLeapYear(thisMonth, thisYear) {
        // First element is blank to allow for indexing starting from zero.
        var daysInMonth = new Array("","31",daysInFebruary(thisYear),"31","30","31","30","31","31","30","31","30","31");
        return daysInMonth[thisMonth];       
    }
        
    function daysInFebruary(thisYear) {
        if(thisYear % 4 != 0){
            return 28;
        }
        if(thisYear % 100 == 0) {
            if(thisYear %400 != 0) {
                return 28;
            }
        }
        return 29;
    }        

    if(startDay > isLeapYear(startMonth, startYear) || (startMonth > 12) || (startYear < 1970 && startYear > 2037)) {
        alert("There aren't " + startDay + " days in " + months[startMonth] + " " + startYear);
        return false;
    }
    
    if(endDay > isLeapYear(endMonth, endYear) || (endMonth > 12) || (endYear < 1970 && endYear > 2037)) {
        alert("There aren't " + endDay + " days in " + months[endMonth] + " " + endYear);
        return false;
    }    
}

function checkForm() {
    if(document.productForm.nuts.value == "Choose a region...") {
        alert('You need to select a region to add to your basket.');
        return false;
    }
    else {
        return true;
    }
}

function popPCSearch(theURL, theWidth, theHeight) {
    if(document.postcode_nuts_search.postcode.value == "") {
        alert("Whoops! You need to enter a postcode before clicking 'search'.");
        document.postcode_nuts_search.postcode.focus();
    }
    else {
        windowTwo = window.open(theURL + "?postcode=" + document.postcode_nuts_search.postcode.value, "popframe", "toolbar=no,location=no,status=no,directories=no,menubar=no,scrollbars=yes,resizable=yes,width=" + theWidth + ",height=" + theHeight);    
        windowTwo.focus();
    }
}

var check = false;
var what = "";
var layerRef = "";
var styleSwitch = "";

function init() {
    if(document.getElementById) { 
        layerRef="document.getElementByID"; 
        styleSwitch=".style"; 
        what="dom1"; 
    } 
    else if(document.layers) { 
        layerRef="document.layers"; 
        styleSwitch="";  
        what ="ns4"; 
    } 
    else if(document.all) { 
        layerRef="document.all"; 
        styleSwitch=".style";  
        what ="ie4"; 
    }  
    else { 
        what="none"; 
    } 
    check = true; 
}

function showOptions(f) {
    init();
    if((f.value != undefined && f.value == "B") || (f == "B")) {
        showLayer("buyer_type");
        showLayer("buyer_terms");
        hideLayer("supplier_type");
        hideLayer('supplier_type_offer');
        hideLayer("supplier_terms");
        document.reg_form_long.turnover.value = "";
        document.reg_form_long.employees.value = "";
    }
    else if((f.value != undefined && f.value == "S") || (f == "S")) {
        showLayer('supplier_type');
        showLayer('supplier_type_offer');
        showLayer('supplier_terms');
        hideLayer('buyer_type');
        hideLayer('buyer_terms');
        // Reset the buyer_options list, so that we don't pass
        // through any inadvertant values, i.e. the user selected
        // buyer, selected an option, and then changed their mind
        // to supplier...doh!
        document.reg_form_long.buyer_options.value = '';
    }
    else if ((f.value != undefined && f.value == 'Choose a region...') || (f == 'Choose a region...')) {
         hideLayer('map_options');
    }
}

function showLayer(layerName) { 
    if(check) { 
        if(what =="none") { 
            return; 
        } 
        else if(what == "dom1") {
            document.getElementById(layerName).style.display="block";
        } 
        else { 
            eval(layerRef+'["'+layerName+'"]'+styleSwitch+'.display="block"');
        } 
    } 
    else { 
        return; 
    } 
}

function hideLayer(layerName) {
    if(check) { 
        if(what =="none") { 
            return; 
        } 
        else if(what == "dom1") {
            document.getElementById(layerName).style.display="none"; 
        } 
        else { 
            eval(layerRef+'["'+layerName+'"]'+styleSwitch+'.display="none"'); 
        } 
    } 
    else { 
        return; 
    } 
}

function setUserType(userType) {
    init();
    if((userType.value != undefined && userType.value == "B") || (userType == "B")) {
        hideLayer("choose_user_type");
        hideLayer("reg_stepstart");
        hideLayer("reg_step1");
        hideLayer("reg_start");
        showLayer("reg_endb");
        showLayer("contact_info");
        showLayer("reg_stepbuyer");
        document.reg_form_long.selected_user_type.value = 'B';
        var selectedText = document.getElementById("selected_user_type_text");
        selectedText.childNodes[0].nodeValue = "Buyer";
        // This is to account for an odd bug in IE (typical!).
        // Basically, once the user had chosen their user type,
        // buyer in this case, moving the scroll wheel on
        // the mouse caused the map and registration form to
        // display...which was nice.
        // Here we just give the 'title' drop down menu focus
        // to get around this.
        if(document.getElementById) { 
            document.getElementById("contact_title").focus();
        } 
        else if(document.layers) { 
            document.layers['contact_title'].focus();
        } 
        else if(document.all) {
            document.all.contact_title.focus();
        }  
        else { 
            return
        }
    }
    else if((userType.value != undefined && userType.value == "S") || (userType == "S")) {
        hideLayer("choose_user_type");
        hideLayer("reg_stepstart");
        hideLayer("reg_start");
        hideLayer("reg_step1");
        showLayer("uk");
        showLayer("change_region");
        showLayer("reg_stepsupplier");
        showLayer("reg_suppliertype");
        showLayer("reg_step2");
        document.reg_form_long.selected_user_type.value = 'S';
        var selectedText = document.getElementById("selected_user_type_text");
        selectedText.childNodes[0].nodeValue = "Supplier";
        
        // This is to account for an odd bug in IE (typical!).
        // Basically, once the user had chosen their user type,
        // supplier in this case, moving the scroll wheel on
        // the mouse caused the registration form to display.
        // Here we just give the map focus to get around this.
        if(document.getElementById) { 
            document.getElementById("uk").focus();
        } 
        else if(document.layers) { 
            document.layers['uk'].focus();
        } 
        else if(document.all) {
            document.all.uk.focus();
        }  
        else { 
            return
        }
    }
    var registrationProcessText = document.getElementById("registration_process_text");
    registrationProcessText.childNodes[0].nodeValue = "2";
}

function setCountry(selectedCountry) {
    init();
    hideLayer("uk");
    hideLayer("reg_step2");
    hideLayer("reg_stepstart");
    hideLayer("reg_stepsupplier");
    showLayer(selectedCountry + "_regions");
    showLayer("reg_step3");
    document.reg_form_long.selected_country.value = selectedCountry;
    if(selectedCountry == "northernireland") {
        document.reg_form_long.selected_region.value = "northernireland";
        hideLayer("reg_step3");
        showLayer("reg_step4");
    }
    var registrationProcessText = document.getElementById("registration_process_text");
    registrationProcessText.childNodes[0].nodeValue = "3";
}

function setRegion(selectedRegion) {
    init();
    hideLayer("reg_step3");
    hideLayer(document.reg_form_long.selected_country.value + "_regions");
    showLayer(selectedRegion + "_areas");
    showLayer("reg_step4");
    document.reg_form_long.selected_region.value = selectedRegion;
    var registrationProcessText = document.getElementById("registration_process_text");
    registrationProcessText.childNodes[0].nodeValue = "4";
}

function setArea(selectedArea,areaText,nutsCode) {
    init();
    hideLayer(document.reg_form_long.selected_region.value + "_areas");
    hideLayer("reg_step4");
    hideLayer("reg_stepstart");
    hideLayer("reg_start");
    showLayer("contact_info");
    hideLayer("reg_stepsupplier");
    hideLayer("reg_suppliertype");
    showLayer("reg_stepbuyer");
    showLayer("reg_ends");
    
    if(document.reg_form_long.selected_region.value == "northernireland") {
        hideLayer('northernireland_regions');
    }
    document.reg_form_long.selected_area.value = selectedArea;
    document.reg_form_long.selected_nutscode.value = nutsCode;
    document.reg_form_long.selected_area_text.value = areaText;
    var registrationProcessText = document.getElementById("registration_process_text");
    registrationProcessText.childNodes[0].nodeValue = "3";
    var selectedAreaText = document.getElementById("selected_area_type_text");
    selectedAreaText.childNodes[0].nodeValue = areaText;
}

function changeRegion(selectedCountry) {
    init();
    hideLayer("contact_info");
    hideLayer("reg_stepbuyer");
    hideLayer("reg_start");
    showLayer("uk");
    showLayer("reg_stepsupplier");
    showLayer("reg_step2");
    showLayer("reg_suppliertype");
    document.reg_form_long.selected_country.value = "";
    document.reg_form_long.selected_region.value = "";
    document.reg_form_long.selected_area.value = "";
    document.reg_form_long.selected_area_text.value = "";
    var registrationProcessText = document.getElementById("registration_process_text");
    registrationProcessText.childNodes[0].nodeValue = "2";
}

function startAgain() {
    init();
    document.reg_form_long.selected_user_type.value = "";
    document.reg_form_long.selected_country.value = "";
    document.reg_form_long.selected_region.value = "";
    document.reg_form_long.selected_area.value = "";
    document.reg_form_long.selected_area_text.value = "";
    document.reg_form_long.selected_nutscode.value = "";
    showLayer("choose_user_type");
    showLayer("reg_step1");
    showLayer("reg_start");
    showLayer("reg_stepstart");
    hideLayer("reg_ends");
    hideLayer("reg_endb");
    hideLayer("contact_info");
    hideLayer("change_region");
    hideLayer("reg_stepbuyer");
    hideLayer("reg_stepsupplier");
    document.reg_form_long.usertype.options[0].selected = true;
    var registrationProcessText = document.getElementById("registration_process_text");
    registrationProcessText.childNodes[0].nodeValue = "1";
}

function breadCrumb(selectedCountry,selectedPlace,selectedStage) {
    init();
    hideLayer(selectedPlace);
    var registrationProcessText = document.getElementById("registration_process_text");
    if(selectedStage == 4 && selectedPlace == "northernireland_regions") {
        hideLayer("reg_step4");
        showLayer("reg_step2");
        registrationProcessText.childNodes[0].nodeValue = "2";
        showLayer("reg_suppliertype");
        showLayer("reg_stepsupplier");
    } else if(selectedStage == 4 && selectedPlace != "northernireland_regions") {
        // because layer 4 will always show up, hide it.
        hideLayer("reg_step4");
        hideLayer("reg_step" + selectedStage);
        showLayer("reg_step" + (selectedStage -1));
        registrationProcessText.childNodes[0].nodeValue = (selectedStage -1);
    } else {
        // because layer 4 will always show up, hide it.
        hideLayer("reg_step4");
        hideLayer("reg_step" + selectedStage);
        showLayer("reg_step" + (selectedStage -1));
        showLayer("reg_stepsupplier");
        registrationProcessText.childNodes[0].nodeValue = (selectedStage -1);
    }
    showLayer(selectedCountry);
}

// We want this as a global variable in order to 
// access it within both showMap() and resetMap().
var chosenSubscription = new Array();
function showMap(e) {
    init();
    if(check) {
        if(what =="none") { 
            return; 
        }
        else if(what == "dom1") {
            // Clear the previously displayed option.
            resetMap();
            var listElement = document.getElementById("uk_map");
            for(j = 0; j < listElement.childNodes.length; j++){
                if(listElement.childNodes[j].className == e.value + " " + e.value){
                    listElement.childNodes[j].className = e.value + "_b " + e.value;
                    chosenSubscription[0] = e.value;                    
                }
            }
        }
    }
    else {
        return;   
    }    
}

function resetMap() {
    init();
    if(check) {
        if(what =="none") { 
            return; 
        }
        else if(what == "dom1") {
            var listElement = document.getElementById("uk_map");
            if(chosenSubscription.length > 0) {
                for(j = 0; j < listElement.childNodes.length; j++) {
                    if(listElement.childNodes[j].className == chosenSubscription + "_b " + chosenSubscription) {
                        listElement.childNodes[j].className = chosenSubscription + " " + chosenSubscription;
                    }
                }
            }
        }
    }
    else {
        return;   
    }   
}

function showCurrentSubscriptions(currentSubscriptions) {
   init();
   if(check) {
        if(what =="none") { 
           return; 
        }
        else if(what == "dom1") {
            var listElement = document.getElementById("uk_map");
            if(currentSubscriptions.length > 0) {
                var message = "";
                for(var i = 0; i < currentSubscriptions.length; i++) {
                   for(j = 0; j < listElement.childNodes.length; j++) {
											
                       if(listElement.childNodes[j].className == currentSubscriptions[i] + " " + currentSubscriptions[i]) {
                            listElement.childNodes[j].className = currentSubscriptions[i] + "_r " + currentSubscriptions[i];
                       		
                        }
                    }
                }
            }
        }
    }
    else {
        return;   
    }    
}

function showBasketSubscriptions(basketSubscriptions) {
    init();
    if(check) {
        if(what =="none") { 
            return; 
        }
        else if(what == "dom1") {
            var listElement = document.getElementById("uk_map");
            if(basketSubscriptions.length > 0) {
                for(var i = 0; i < basketSubscriptions.length; i++) {
                    for(j = 0; j < listElement.childNodes.length; j++){
                        if(listElement.childNodes[j].className == basketSubscriptions[i] + " " + basketSubscriptions[i]) {
                            listElement.childNodes[j].className = basketSubscriptions[i] + "_g " + basketSubscriptions[i];
                        }
                    }
               }
            }
        }
    }
    else {
        return;   
    }
}

function showCardsOnly() {
    var formElement = document.search_form;
    for(var i = 1;i < formElement.length; i++) {
        if(formElement[i].type == "checkbox" && formElement[i].name != "show_credit_cards") {
            formElement[i].checked = false;
        }
    }

}

function hideCardsOnly() {
    var formElement = document.search_form;
    if(formElement.show_credit_cards.checked == true) {
        formElement.show_credit_cards.checked = false;
    }

}

function showOutstandingOnly() {
    var formElement = document.search_form;
    for(var i = 1;i < formElement.length; i++) {
        if(formElement[i].type == "checkbox" && formElement[i].name != "show_outstanding_invoices") {
            formElement[i].checked = false;
        }
    }
}

function hideOutstandingOnly() {
    var formElement = document.search_form;
    if(formElement.show_outstanding_invoices.checked == true) {
        formElement.show_outstanding_invoices.checked = false;
    }
}  

function openWindowCSsearch(myURL,myTitle,w,h)
{
	if(!document.cssearch.keywords.value){
		alert("Error. Please enter something to search for");
		return false;
	}
	else
	{
		openWindow(myURL,myTitle,w,h);
	}
}

// A more robust open window method that allows a window to be open anywhere for any reason -lg
function openWindow(myURL,myTitle,w,h){
   var LeftPosition=(screen.width)?(screen.width-w)/2:100;
   var TopPosition=(screen.height)?(screen.height-h)/2:100;
	var myConfig = 'width='+w+', height='+h+', top='+TopPosition+', left='+LeftPosition+', scrollbars=yes, location=no, directories=no, status=no, menubar=no, toolbar=no, resizable=no';
	win = window.open(myURL,myTitle,myConfig);
	if(win.focus){win.focus();}
}

function noDuplicateWords(word, keywords,exactKeywords,omitKeywords)
{
	var isDuplicate = 0;
	
	//Keywords
 	for(var i = 0;i < keywords.length; i++)
 	{
 		if(word.value == keywords.options[i].text)
 		{
 			alert("The word '"+keywords.options[i].text+"' already exists within keywords list");
 			isDuplicate = 1;
 		}
 	}
 	
 	//Exact Keywords
   for(var i = 0;i < exactKeywords.length; i++)
 	{
 		if(word.value == exactKeywords.options[i].text)
 		{
 			alert("The word '"+exactKeywords.options[i].text+"' already exists within the exact keywords list");
 			isDuplicate = 1;
 		}
 	}
 	
 	//Omit Keywords
 	for(var i = 0;i < omitKeywords.length; i++)
 	{
 		if(word.value == omitKeywords.options[i].text)
 		{
 			alert("The word '"+omitKeywords.options[i].text+"' already exists within omit keywords list");
 			isDuplicate = 1;
 		}
 	}
 	if(isDuplicate)
 	{
 		return false;
 	}
	else
	{
		return true;
	}
	
	
}

function onload_registration()
{
	// enable all tool tips
	try
	{
		showOptions(document.reg_form_long.usertype.value);
	}
	catch(c){};
	//menu rollup
	try
	{
		rollup();
	}
	catch(c){};
}