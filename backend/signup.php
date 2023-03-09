<?php 

include('connection.php');

$name = $_POST["name"];
$email = $_POST["email"];
$password = $_POST["password"];
$dob = $_POST["dob"];

$hashed = hash("sha256", $password);
?>