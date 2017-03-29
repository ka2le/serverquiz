
<html>

  <head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <link rel="stylesheet" href="stylesheets/style.css">
	<script src="https://code.jquery.com/jquery-1.11.1.min.js"></script>
	<!--  <script type="text/javascript" src="main.js"></script> -->
	 <script type="text/javascript" >
		console.log("loaded");
	 
	 </script>
  </head>

</script>
	
  <body>
	<?php
$myfile = fopen("Input.txt", "r") or die("Unable to open file!");
echo fgets($myfile);
fclose($myfile);
?>
  </body>

</html>
