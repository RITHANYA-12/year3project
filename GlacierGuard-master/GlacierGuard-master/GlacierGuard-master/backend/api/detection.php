<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: POST, GET, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

require_once '../config.php';

// Handle preflight requests
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

// Function to handle errors
function handleError($message, $code = 400) {
    http_response_code($code);
    echo json_encode(["error" => $message]);
    exit();
}

// Handle POST request for new detection
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $data = json_decode(file_get_contents("php://input"), true);
    
    if (!$data) {
        handleError("Invalid input data");
    }

    // Extract data from request
    $timestamp = date('Y-m-d H:i:s');
    $detection_type = $data['type'] ?? '';
    $confidence = $data['confidence'] ?? 0;
    $coordinates = json_encode($data['coordinates'] ?? []);
    
    // Prepare SQL statement
    $sql = "INSERT INTO detections (timestamp, detection_type, confidence, coordinates) 
            VALUES (?, ?, ?, ?)";
    
    $stmt = mysqli_prepare($conn, $sql);
    mysqli_stmt_bind_param($stmt, "ssds", $timestamp, $detection_type, $confidence, $coordinates);
    
    if (mysqli_stmt_execute($stmt)) {
        http_response_code(201);
        echo json_encode([
            "message" => "Detection saved successfully",
            "id" => mysqli_insert_id($conn)
        ]);
    } else {
        handleError("Error saving detection: " . mysqli_error($conn), 500);
    }
    
    mysqli_stmt_close($stmt);
}

// Handle GET request for retrieving detections
if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    $sql = "SELECT * FROM detections ORDER BY timestamp DESC LIMIT 100";
    $result = mysqli_query($conn, $sql);
    
    if ($result) {
        $detections = [];
        while ($row = mysqli_fetch_assoc($result)) {
            $detections[] = [
                "id" => $row['id'],
                "timestamp" => $row['timestamp'],
                "type" => $row['detection_type'],
                "confidence" => $row['confidence'],
                "coordinates" => json_decode($row['coordinates'])
            ];
        }
        echo json_encode($detections);
    } else {
        handleError("Error retrieving detections: " . mysqli_error($conn), 500);
    }
}

mysqli_close($conn);
?> 