<?php 

include('connection.php');

$name = $_POST["name"];
$email = $_POST["email"];
$password = $_POST["password"];
$dob = $_POST["dob"];

$hashed = hash("sha256", $password);

$query = mysql -> prepare ("SELECT * FROM `user` WHERE email = ?, passsword = ?");
$query -> bind_param("ss", $email, $hashed);
$query -> execute();
$result = $query -> get_result();

while($object = $result -> fetch_assoc()){
    $data = $object;
}
?>