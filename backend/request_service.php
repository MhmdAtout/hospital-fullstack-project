<?php

include("connection.php");

$user_id = $_POST["user_id"];
$service_id = $_POST["service_id"];
$status = "Pending";

$query = $mysql -> prepare ("SELECT * FROM `user_services` WHERE user_id = ? AND `service_id` = ? AND `status` = 'Pending'");
$query -> bind_param("is", $user_id, $service_id);
$query -> execute();
$result = $query -> get_result();

while($object = $result -> fetch_assoc()){
    $data = $object;
}

if(isset($data)){
    $response = [
        "status" => "false"
    ];
}else{
    $query = $mysql -> prepare ("INSERT INTO `user_services` (user_id, service_id, `status`) VALUES (?, ?, ?)");
    $query -> bind_param("iis", $user_id, $service_id, $status);
    $query -> execute();
    $response = [
        "status" => "true"
    ];
}

echo json_encode($response);

?>