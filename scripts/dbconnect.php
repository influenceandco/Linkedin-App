<?php

	//connects webpage to database.  requires config settings

	include("../config.php");
	
	$connect = mysql_connect($strHostName, $strUserName,$strPassword ) or die("Couldn't connect!");
	mysql_select_db($strDbName ) or die ("Couldn't find db");


?>