<?php 

include('connection.php');

if(isset($_POST["id"])){
    $user_id = $_POST["id"];

    $query = $mysql -> prepare("SELECT * FROM `users` Where id = ? ");
    $query -> bind_param("i", $user_id);
    $query -> execute();
    $result = $query->get_result();

    while($object = $result -> fetch_assoc()){
        $data = $object;
    }

    $response = [
        "user" => $data
    ];
}else{
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
            $response = [
                "id" => $data["id"],
                "name" => $data["name"],
                "email" => $data["email"],
                "dob" => $data["dob"],
                "gender" => $data["gender"],
                "user_type" => $data["usertype_id"],
            ];
    }else{
        $response =[
            "message" => "Credentials are incorrect"
        ];
    };
}

echo json_encode($response);

?>