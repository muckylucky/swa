function NewWindow(mypage,myname,w,h,scroll,pos){
  var rndURL = (1000*Math.random());
  if(pos=="random"){
    LeftPosition=(screen.width)?Math.floor(Math.random()*(screen.width-w)):100;
    TopPosition=(screen.height)?Math.floor(Math.random()*((screen.height-h)-75)):100;
  }

  if(pos=="center"){
    LeftPosition=(screen.width)?(screen.width-w)/2:100;
    TopPosition=(screen.height)?(screen.height-h)/2:100;
  } else if((pos!="center" && pos!="random") || pos==null){
    LeftPosition=0;TopPosition=20
  }

  settings='width='+w+',height='+h+',top='+TopPosition+',left='+LeftPosition+',scrollbars='+scroll+',location=no,directories=no,status=no,menubar=no,toolbar=no,resizable=no';
  win=window.open(mypage+'&rndURL='+rndURL,myname,settings);
  if(win.focus){win.focus();}
}


function DoSearch(){
   var mbool = "AND";
   var mcase = "Insensitive";
   if(!document.cssearch.terms.value){
     alert("Error. Please enter something to search for");
     return false;
   } else {
     var URL = "/cgi-bin/csSearch/csSearch.cgi?command=query&terms="+escape(document.cssearch.terms.value)+"&mbool="+mbool+"&mcase="+mcase;
     NewWindow(URL,'query',780,500,'yes','center');
    
     return false;
   }
}