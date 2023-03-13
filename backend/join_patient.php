<?php

include("connection.php");

include('./vendor/autoload.php');

use Firebase\JWT\JWT;
use Firebase\JWT\Key;

$headers = getallheaders();
$token = $headers['Authorization'];
$secret_key = "mhmdHospital101";

try {
    $decoded_token = JWT::decode($token, new Key($secret_key, 'HS256'));
} catch (Exception $e) {
    http_response_code(401);
    exit();
}

$user_id = $_POST["user_id"];
$hospital_id = $_POST["hospital_id"];
$is_active = "true";
$date_joined = date('d-m-y h:i:s');

$query = $mysql -> prepare("SELECT * FROM hospital_users 
WHERE user_id = ? AND date_left is NULL");

$query -> bind_param("i", $user_id);
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