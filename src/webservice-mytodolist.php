<?php
// REST API Web Service
//
// Written by Mattias Bygdeson
// DT173G Webbutveckling III
// Mittuniversitetet
//
// POST      Creates a new task
// GET       Retrieves a task
// PUT       Updates an existing task
// DELETE    Deletes a task
//
// Database name: myTodoList
// --------------------------------------------------------------------------------------------------------------------
// | ID (int(11), UNSIGNED, NOT NULL, AUTO_INCREMENT, PRIMARY KEY) | body (varchar(255)) | deadline (DATE, YYYY-MM-DD)
// --------------------------------------------------------------------------------------------------------------------

// Get HTTP method, path and input of the request
$method = $_SERVER['REQUEST_METHOD'];
$request = explode('/', trim($_SERVER['PATH_INFO'],'/'));
$input = json_decode(file_get_contents('php://input'),true);

if($request[0] != "posts"){ 
	http_response_code(404);
	exit();
}

// Send return header information
header("Content-Type: application/json; charset=UTF-8");

// Local connection
$DBHOST = 'localhost';
$DBUSER = 'root';
$DBPASS = 'hurpdurp';
$DBNAME = 'myTodoList';

// Connect to database
$conn = mysqli_connect($DBHOST, $DBUSER, $DBPASS, $DBNAME) or die("Error connecting to database.");
$db_connected = mysqli_select_db($conn, $DBNAME);

// HTTP method implementations
switch ($method){
	case "GET":
		$sql = "SELECT ID, body, deadline FROM Tasks ORDER BY deadline DESC";
		if(isset($request[1])) $sql = $sql . " WHERE ID = " . $request[1] . ";";
		break;
	case "PUT":
		$sql = "UPDATE Tasks SET body = '" . $input['body'] . "', deadline = '" . $input['deadline'] . "' WHERE ID = " . $request[1] . ";";
    	break;
	case "POST":
		$sql = "INSERT INTO Tasks (body, deadline) VALUES ('" . $input['body'] . "', '" . $input['deadline'] . "' " . ");";
		break;

	case "DELETE":
   		$sql = "DELETE FROM Tasks WHERE ID = " . $request[1] . ";";
   		break;
}

// Create json array of data (with exception of using GET)
$result = mysqli_query($conn,$sql) or die(mysqli_error($conn));

$harr = [];
if($method != "GET") $sql = "SELECT ID, body, deadline FROM Tasks";
$result = mysqli_query($conn,$sql) or die(mysqli_error($conn));

while($row = mysqli_fetch_assoc($result)){
		$row_arr['ID'] = $row['ID'];
		$row_arr['body'] = $row['body'];
		$row_arr['deadline'] = $row['deadline'];
		array_push($harr,$row_arr);
}

mysqli_close($conn);
echo json_encode($harr);