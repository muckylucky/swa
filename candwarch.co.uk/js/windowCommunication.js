// Written to allow both sites to be on users desktop but links pointing to
// each others functionality
var childWindow;

//function openChildWindow(myURL, parWindow)
//{    
//	   try
//	   {
//	   		window.opener.focus();
//		}
//		catch(e)
//		{
//			if(childWindow)
//			{
//				if(childWindow.closed)
//				{
//					childWindow = window.open(myURL);
//				}
//				else
//				{
//	              childWindow.location.href = myURL;
//					childWindow.focus();
//				}
//			}
//			else
//			{
//				childWindow = window.open(myURL);
//			}
//		}
//}

function openChildWindow(myURL)
{    
	if(childWindow)
	{
		if(childWindow.closed)
		{
			childWindow = window.open(myURL);
		}
		else
		{
	       childWindow.location.href = myURL;
			childWindow.focus();
		}
	}
	else
	{
			childWindow = window.open(myURL);
	}
}

function changeField()
{

	//if (document.getElementById('passwordnav').type != 'password')
	//{
	document.getElementById('passwordnav').type="password";
	//}

	

}