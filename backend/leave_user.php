<?php

include("connection.php");

$user_id = $_POST["user_id"];
$date_left = date('d-m-y h:i:s');
$is_active = "false";

$query = $mysql -> prepare ("UPDATE `hospital_users` SET  `is_active` = ?, `date_left` = ? WHERE `user_id` = ? and date_left is null");
$query -> bind_param("ssi", $is_active, $date_left, $user_id);
if($query -> execute()){
    $response = [
        "status" => "left"
    ];
};

echo json_encode($response);

?>