<?php

	//Get the current page url
	$current_url = (!empty($_SERVER['HTTPS'])) ? "https://".$_SERVER['SERVER_NAME'].$_SERVER['REQUEST_URI'] : "http://".$_SERVER['SERVER_NAME'].$_SERVER['REQUEST_URI'];
	//Split url into fragmnents to get the project name
	$current_url = explode("/", $current_url);	
	$project = $current_url[4]; // This will get "project-name"
	$dirMain = "../../img/" . $project . "/{*.jpg,*.gif}";
	$dirThumb = "../../img/" . $project . "/thumbs/{*.jpg,*.gif}";
	

	function mainImages($dirMain) {
	  // Open a known directory, and proceed to read its contents
	  foreach(glob($dirMain, GLOB_BRACE) as $image) {
		  $size = imageSize($image);
		  echo "<li><img src =" . $image . " alt = 'Project image' width=" . $size[0] . " height=" . $size[1] . " /></li>";
	  }	
	}
	
	function thumbImages($dirThumb) {
	  foreach(glob($dirThumb, GLOB_BRACE) as $image) {
		  $size = imageSize($image);
		  echo "<li><a href='#test'><img src =" . $image . " alt = 'Project image' width=" . $size[0] . " height=" . $size[1] . " /></a></li>";
		  
	  }
	}
	
	// Get each images height and widht attributes
	function imageSize($image) {
			list($width, $height) = getimagesize($image);
			return array($width, $height);
	}
?>
