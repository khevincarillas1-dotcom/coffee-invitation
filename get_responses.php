<?php

header("Content-Type: application/json");
header("Access-Control-Allow-Origin: *");

require "db.php";

try {

    $stmt = $pdo->query("
        SELECT
            id,
            coffee_date,
            coffee_time,
            coffee_shop,
            message,
            created_at
        FROM responses
        ORDER BY created_at DESC
    ");

    $responses = $stmt->fetchAll(PDO::FETCH_ASSOC);

    echo json_encode([
        "success" => true,
        "responses" => $responses
    ]);

} catch (PDOException $e) {

    echo json_encode([
        "success" => false,
        "message" => "Failed to load responses."
    ]);
}