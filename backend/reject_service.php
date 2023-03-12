<?php

include("connection.php");

$user_id = $_POST["user_id"];
$service_id = $_POST["service_id"];
$status = "Rejected";

$query = $mysql -> prepare ("UPDATE `user_services` SET  `status` = ? WHERE user_id = ? and service_id = ?");
$query -> bind_param("sii", $status, $user_id, $service_id);
if($query -> execute()){
    $response = [
        "status" => "rejected"
    ];
}

echo json_encode($response);
?>