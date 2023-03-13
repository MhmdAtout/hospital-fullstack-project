<?php 

include('connection.php');

include('./vendor/autoload.php');

use Firebase\JWT\JWT;
use Firebase\JWT\Key;

$key = "mhmdHospital101";

$email = $_POST["email"];
$password = $_POST["password"];

$hashed = hash("sha256", $password);
$query = $mysql -> prepare("SELECT * FROM `users` WHERE `email`=? AND `password`=?");
$query -> bind_param("ss", $email, $hashed);
$query -> execute();
$result = $query -> get_result();

while($object = $result -> fetch_assoc()){
    $data = $object;
}

if(isset($data)){
    $payload = [
        "id" => $data["id"],
        "name" => $data["name"],
        "email" => $data["email"],
        "user_type" => $data["usertype_id"],
    ];

    $jwt = JWT::encode($payload, $key, 'HS256');
    
    $response = [
        "id" => $data["id"],
        "user_type" => $data["usertype_id"],
        "access_token" => $jwt
    ];
}else{
    $response =[
        "message" => "Credentials are incorrect"
    ];
};


echo json_encode($response);

?>