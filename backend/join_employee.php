<?php

include("connection.php");

$user_id = $_POST["user_id"];
$hospital_id = $_POST["hospital_id"];
$is_active = "true";
$date_joined = date('d-m-y h:i:s');

$query = $mysql -> prepare(" SELECT * FROM `hospital_users` WHERE user_id = ? and hospital_id = ? and date_left is NULL ");
$query -> bind_param("ii", $user_id, $hospital_id);
$query -> execute();
$result = $query -> get_result();

while($object = $result -> fetch_assoc()){
    $data[] = $object;
}

if(isset($data)){
    $response = [
        "status" => "false"
    ];
}else{
    $query = $mysql -> prepare(" INSERT INTO `hospital_users` (user_id, hospital_id, is_active, date_joined) VALUES (?, ?, ?, ?) ");
    $query -> bind_param("iiss", $user_id, $hospital_id, $is_active, $date_joined);
    $query -> execute();
    $response = [
        "status" => "true"
    ];
}

echo json_encode($response);

?>