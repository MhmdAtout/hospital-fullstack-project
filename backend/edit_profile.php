<?php

include("connection.php");

$id = $_POST["id"];
$name = $_POST["name"];
$email = $_POST["email"];
$dob = $_POST["dob"];

$query = $mysql -> prepare ("UPDATE `users` SET `name`=?, email=?, dob=? WHERE id = ?");
$query -> bind_param("sssi", $name, $email, $dob, $id);
if($query -> execute()){
    $response = [
        "status" => "updated"
    ];
}

echo json_encode($response);
?>