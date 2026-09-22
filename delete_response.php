<?php

header("Content-Type: application/json");
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Headers: Content-Type");

require "db.php";

$data = json_decode(file_get_contents("php://input"), true);
$id = filter_var($data["id"] ?? null, FILTER_VALIDATE_INT);

if (!$id || $id < 1) {
    echo json_encode([
        "success" => false,
        "message" => "A valid response ID is required."
    ]);
    exit;
}

try {
    $stmt = $pdo->prepare("DELETE FROM responses WHERE id = ?");
    $stmt->execute([$id]);

    echo json_encode([
        "success" => $stmt->rowCount() === 1,
        "message" => $stmt->rowCount() === 1
            ? "Response deleted successfully."
            : "Response not found."
    ]);
} catch (PDOException $e) {
    echo json_encode([
        "success" => false,
        "message" => "Failed to delete response."
    ]);
}
