 <?php
 //read data from form
 $name = filter_input(INPUT_POST, "name");
 //generate output for text file
 $output = $name . "\t\n";
 //open file for output
 $fp = fopen("rsvp-data-930303.csv", "a");
 //write to the file
 fwrite($fp, $output);
 fclose($fp);
 ?>
