/* nav js ################################################################## */

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
