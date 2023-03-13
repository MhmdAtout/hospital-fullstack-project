<?php

include("connection.php");

$query = $mysql -> prepare ("SELECT * FROM hospitals");
$query -> execute();
$result = $query -> get_result();

while($object = $result -> fetch_assoc()){
    $data[] = $object;
}

$response = [
    "hospitals" => $data
];


echo json_encode($response);

?>