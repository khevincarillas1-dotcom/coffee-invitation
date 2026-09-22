<?php

header("Content-Type: application/json");
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Headers: Content-Type");

require "db.php";

$data = json_decode(file_get_contents("php://input"), true);

if (!$data) {
    echo json_encode([
        "success" => false,
        "message" => "Invalid request."
    ]);
    exit;
}

$date = $data["date"] ?? "";
$time = $data["time"] ?? "";
$shop = $data["shop"] ?? "";
$message = $data["message"] ?? "";

if (!$date || !$time) {
    echo json_encode([
        "success" => false,
        "message" => "Date and time are required."
    ]);
    exit;
}

try {

    $sql = "INSERT INTO responses
            (coffee_date, coffee_time, coffee_shop, message)
            VALUES (?, ?, ?, ?)";

    $stmt = $pdo->prepare($sql);

    $stmt->execute([
        $date,
        $time,
        $shop,
        $message
    ]);

    echo json_encode([
        "success" => true,
        "message" => "Response saved successfully!"
    ]);

} catch (PDOException $e) {

    echo json_encode([
        "success" => false,
        "message" => "Failed to save response."
    ]);
}