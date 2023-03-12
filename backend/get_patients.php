<?php

include("connection.php");

$query = $mysql -> prepare("SELECT * FROM `users` WHERE usertype_id = 3");
$query -> execute();
$result = $query -> get_result();

while ($object = $result -> fetch_assoc()){
    $data[] = $object;
}

$response = [
    "users" => $data
];

echo json_encode($response);

?>