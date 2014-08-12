<?php

	$dir = '../projects/*';
	foreach(glob($dir) as $project) {
		if (is_dir($project) ) {
			$link = explode("/", $project);
			echo '<li><a href="' . str_replace('..', '', $project) . '">' . str_replace('-', ' ', $link[2]) . '</a></li>';
		}
	}

?>