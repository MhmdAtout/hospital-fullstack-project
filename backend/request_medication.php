<?php

include("connection.php");

$user_id = $_POST["user_id"];
$medication_id = $_POST["medication_id"];

$query = $mysql -> prepare ("INSERT INTO `users_medications` (user_id, medication_id) VALUES (?, ?)");
$query -> bind_param("ii", $user_id, $medication_id);
$query -> execute();
$response = [
    "status" => "true"
];

echo json_encode($response);

?>