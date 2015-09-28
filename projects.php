<?php
	ini_set('display_errors', '1');
	$title = 'Projects';
	include ('includes/header.html');
	require_once('includes/mysqli_connect_swa.php');
	
	
	$q = "SELECT * FROM projects";
	$r = mysqli_query ($dbc, $q); // Run the query.
	//$row = mysqli_fetch_array($r, MYSQLI_ASSOC); //Construct array of items
	mysqli_close($dbc);
?>
	<div class="bg">
    	<img src="img/bg-img/a2.jpg" class="bg-img" alt="Background image" />
    </div>
    <div class="row hero">
    	<div class="small-12 centered">
        <h1 class="white-drop">Browse our projects</h1>
        	<div style="height:10rem"></div>
                
                <?php
				/*
                if ($r) {
                    while ($row = mysqli_fetch_array($r, MYSQLI_ASSOC)) {
                        echo '<div class="project-container">';
                        echo '<h2>' . $row['name'] . '</h2>';
                        echo '<em>' . date("F Y", strtotime($row['completion']) ) . '</em>';
                        echo '<p>' . $row['short_description'] . '</p>';
                        echo '</div>';
                    }
                } else {
                    echo '<p>No projects returned.</p>';	
                }
                mysqli_free_result($r);
    			*/
                ?>
   
                <ul class="list-projects-grid">
                  <li class="project-container">
                  	<a href="/projects/the-houl/index.php?proj-id=1">
                      <img src="img/project-thumbs/the-houl.jpg" width="128" height="128" alt="the houl" />
                      <h2>The Houl</h2>
                      <em>December 2009</em>
                      <p>RIBA award winning, contemporary new build zero carbon home.</p>
                      </a>
                      <div class="tags"> 
                              <span class="label round">passive</span>
                              <span class="label round">sustainable</span>
                              <span class="label round">new build</span>
                      </div>
                  </li>
                  
                  <li class="project-container">
                  	<a href="/projects/taigh-sonas/index.php?proj-id=2">
                      <img src="img/project-thumbs/taigh-sonas.jpg" width="128" height="128" alt="the houl" />
                      <h2>Taigh Sonas</h2>
                      <em>June 2013</em>
                      <p>Demolition of existing single storey house and the erection of a replacement dwelling house with 2 storeys and a basement. </p>
                      </a>
                      <div class="tags"> 
                              <span class="label round">natural materials</span>
                              <span class="label round">sustainable</span>
                      </div>
                  </li>
                  
                  <li class="project-container">
                  	<a href="/projects/deepstone/index.php?proj-id=3">
                      <img src="img/project-thumbs/deepstone.jpg" width="128" height="128" alt="the houl" />
                      <h2>Deepstone</h2>
                      <em>May 2009</em>
                      <p>Contemporary home located on a spectacular former quarry site overlooking the Solway Firth - a National Scenic Area.</p>
                      </a>
                      <div class="tags"> 
                              <span class="label round">contemporary</span>
                              <span class="label round">sustainable</span>
                      </div>
                  </li>                
                  
                  <li class="project-container">
                  	<a href="/projects/ford-house/index.php?proj-id=4">
                      <img src="img/project-thumbs/ford-house.jpg" width="128" height="128" alt="the houl" />
                      <h2>Ford House</h2>
                      <em>December 2009</em>
                      <p>This new house completed in 2010 for two artists replaces an existing traditional farmhouse with a very low energy building clad in black zinc sheeting.</p>
                      </a>
                      <div class="tags"> 
                              <span class="label round">contemporary</span>
                      </div>
                  </li>
                  
                  <li class="project-container">
                  	<a href="/projects/ardlochan-road/index.php?proj-id=5">
                      <img src="img/project-thumbs/ardlochan-road.jpg" width="128" height="128" alt="the houl" />
                      <h2>Ardlochan Road</h2>
                      <em>October 2010</em>
                      <p>The replacement of an existing dilapidated house, repositioned in order to achieve an enlarged and more useable rear garden area.</p>
                      </a>
                              <span class="label round">natural materials</span>
                              <span class="label round">sustainable</span>
                      </div>
                  </li>
                  <li class="project-container">
                  	<a href="/projects/cargengrove/index.php?proj-id=6">
                      <img src="img/project-thumbs/cargengrove.jpg" width="128" height="128" alt="the houl" />
                      <h2>Cargengrove</h2>
                      <em>December 2009</em>
                      <p>Copy in here please.</p>
                      </a>
                      <div class="tags"> 
                              <span class="label round">passive</span>
                              <span class="label round">sustainable</span>
                              <span class="label round">new build</span>
                      </div>
                  </li>

                  <li class="project-container">
                  	<a href="/projects/lochvenachar/index.php?proj-id=7">
                      <img src="img/project-thumbs/lochvenacher.jpg" width="128" height="128" alt="the houl" />
                      <h2>Lochvenacher</h2>
                      <em>April 2014</em>
                      <p>New build home on the foot of Loch Venachar.</p>
                      </a>
                      <div class="tags"> 
                              <span class="label round">contemporary</span>
                              <span class="label round">sustainable</span>
                      </div>
                  </li>                
                  
                  <li class="project-container">
                  	<a href="/projects/the-brae/index.php?proj-id=8">
                      <img src="img/project-thumbs/the-brae.jpg" width="128" height="128" alt="the houl" />
                      <h2>The Brae</h2>
                      <em>2006</em>
                      <p>An existing house with 1.5 storey, stone walled and slate roofed, typical of those found in Galloway extending & renovating to transform the house to a modern family home.</p>
                      </a>
                      <div class="tags"> 
                              <span class="label round">contemporary</span>
                              <span class="label round">sustainable</span>
                      </div>
                  </li>
                                    
                  <li class="project-container">
                  	<a href="/projects/kirkland-street-studio/index.php?proj-id=9">
                      <img src="img/project-thumbs/kirkland-street-studio.jpg" width="128" height="128" alt="the houl" />
                      <h2>Kirkland Street Studio </h2>
                      <em>January 2004</em>
                      <p>Studio & workshop with cedar cladding & coated stainless steel standing seam roof.</p>
                      </a>
                      <div class="tags"> 
                              <span class="label round">contemporary</span>
                              <span class="label round">sustainable</span>
                      </div>
                  </li>                
                  
                  <li class="project-container">
                  	<a href="/projects/locharthur-farm-shop/index.php?proj-id=10">
                      <img src="img/project-thumbs/locharthur-farm-shop.jpg" width="128" height="128" alt="the houl" />
                      <h2>Locharthur Farm Shop </h2>
                      <em>Summer 2012</em>
                      <p>A new Farm Shop was designed in collaboration with Denis Chanarin of Camphill Architects.</p>
                      </a>
                      <div class="tags"> 
                              <span class="label round">contemporary</span>
                              <span class="label round">sustainable</span>
                      </div>
                  </li>
                  
       			</ul>
       			<div class="clearfix"></div>
        </div><!--END SMALL-12-->
    </div><!--END ROW-->

<?php
	include ('includes/footer.html');
?>
