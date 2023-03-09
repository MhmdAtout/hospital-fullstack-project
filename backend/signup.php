<?php 

include('connection.php');

$name = $_POST["name"];
$email = $_POST["email"];
$password = $_POST["password"];
$dob = $_POST["dob"];
$gender = $_POST["gender"];
$usertype_id = $_POST["usertype_id"];

$hashed = hash("sha256", $password);

$query = $mysql -> prepare ("SELECT * FROM `users` WHERE email = ? AND password = ?");
$query -> bind_param("ss", $email, $hashed);
$query -> execute();
$result = $query -> get_result();

while($object = $result -> fetch_assoc()){
    $data = $object;
}

if(isset($data)){
    $response = [
        "status" => "Email is already associated with another account"
    ];
}else{
    $query = $mysql -> prepare ("INSERT INTO `users` (name, email, password, dob, gender, usertype_id) VALUES (?, ?, ?, ?, ?, ?)");
    $query -> bind_param("sssssi", $name, $email, $hashed, $dob, $gender, $usertype_id);
    if($query -> execute()){
        $response = [
            "status" => "user added"
        ];
    }
}

echo json_encode($response);
?>