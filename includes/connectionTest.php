<?php	ini_set('display_errors', '1');	require_once('mysqli_connect_swa.php');	if (isset($_GET['proj-id']) ) {		$projectId = $_GET['proj-id'];		$q = "SELECT name, location, map_ref, floor_area, co2, energy, completion, long_description, awards FROM projects.projects WHERE id=" . $_GET['proj-id'] . "";		$r = mysqli_query ($dbc, $q); // Run the query.		$row = mysqli_fetch_array($r, MYSQLI_ASSOC); //Construct array of items		mysqli_close($dbc);				echo '<h1>' . $row['name'] . '</h1>';		echo '<p>' . $row['location'] . '</p>';		echo '<em>' . $row['floor_area'] . '</em>';		echo '<em>' . $row['co2'] . '</em>';		echo '<p>' . $row['energy'] . '</p>';	} else {		echo '<h2>No id set</h2>';		}		?>