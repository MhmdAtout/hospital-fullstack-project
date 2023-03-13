<?php

include("connection.php");

$query = $mysql -> prepare ("SELECT services.title, user_services.*, users.name
FROM services
INNER JOIN user_services ON services.id = user_services.service_id 
INNER JOIN users ON users.id = user_services.user_id
WHERE user_services.status = 'Pending'");
$query -> execute();
$result = $query -> get_result();

while($object = $result -> fetch_assoc()){
    $data[] = $object;
}

$response = [
    "requests" => $data
];

echo json_encode($response);

?>