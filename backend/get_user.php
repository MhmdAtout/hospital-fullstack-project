<?php

include("connection.php");

$id = $_GET["id"];

$query = $mysql -> prepare ("SELECT `name`, `email`, `dob`, `gender`, `usertype_id` FROM users WHERE id = ?");
$query -> bind_param("i", $id);
$query -> execute();
$result = $query -> get_result();

while($object = $result -> fetch_assoc()){
    $data = $object;
}

$response = [
    "user" => $data
];


echo json_encode($response);

?>