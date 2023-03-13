<?php

include("connection.php");

$user_id = $_POST["user_id"];
$service_id = $_POST["service_id"];
$status = "Accepted";


$query = $mysql -> prepare ("INSERT INTO `user_services` (user_id, service_id, `status`) VALUES (?, ?, ?)");
$query -> bind_param("iis", $user_id, $service_id, $status);
$query -> execute();
$response = [
    "status" => "true"
];


echo json_encode($response);

?>