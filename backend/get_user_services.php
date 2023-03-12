<?php

include("connection.php");

$id = $_GET["user_id"];

$query = $mysql -> prepare ("SELECT services.title, user_services.*
FROM services
INNER JOIN user_services ON services.id = user_services.service_id 
WHERE user_id = ?");
$query -> bind_param("i", $id);
$query -> execute();
$result = $query -> get_result();

while($object = $result -> fetch_assoc()){
    $data[] = $object;
}

$response = [
    "services" => $data
];


echo json_encode($response);


?>