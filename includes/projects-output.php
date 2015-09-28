<?php

	$root = strtolower( $_SERVER['DOCUMENT_ROOT'] );
//	echo '<p>' . $root . '</p>';
	
	// Check if we are running on local or remote server and load correct DB_CONN file
	if ( strpos($root, 'htdocs') || strpos($root, 'localhost') !== FALSE ) {
		require_once('mysqli_connect.php');
	} else {
		require_once('mysqli_connect_swa.php');	
	}

	$q = "SELECT id, name, completion, keywords FROM swaprojects.projects WHERE 1";

	$r = mysqli_query($dbc, $q); // Run the query.
	$num_rows = mysqli_num_rows($r); // Count results returned - need this for trailing comma

	// Open file, if doesn't exist create it
	$file = fopen("projects.js", "w");
	
	// Set counter for trailing comma
	$i = 0;
	$jSON = "[ \n";
	

//	echo print_r($r);
	while ( $row = mysqli_fetch_array($r, MYSQLI_ASSOC) ) {
		$i++;
		$jSON .= '{';
		$jSON .= '"id": ' . $row['id'] . ',';
		$jSON .= '"name": "' . $row['name'] . '",';
		$jSON .= '"completion": "' . $row['completion'] . '",';
		$jSON .= '"keywords": "' . $row['keywords'] . '",';
		$jSON .= '"link": "/' . str_replace(' ', '-', $row['name']) . '/?proj-id=' . $row['id']  . '"';
		$jSON .= '}';
		
		// If NOT the last row then ass a trailing comma
		if ($i < $num_rows) {
			$jSON .= ',';	
		}
	}
	
	$jSON .= '];';
	
	fwrite($file, $jSON);
	fclose($file);
?>