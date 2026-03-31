<?php
header("Content-Type: application/json");

// Allow only POST request
if ($_SERVER["REQUEST_METHOD"] !== "POST") {
    echo json_encode(["error" => "Invalid request method"]);
    exit;
}

// Database config
$host = "localhost";
$dbname = "hostel";
$username = "root";
$password = "12345";

try {
    $pdo = new PDO("mysql:host=$host;dbname=$dbname;charset=utf8", $username, $password);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
} catch (PDOException $e) {
    echo json_encode(["error" => "Database connection failed"]);
    exit;
}

// Get POST data
$name = $_POST['name'] ?? '';
$email = $_POST['email'] ?? '';
$password = $_POST['password'] ?? '';
$role = $_POST['role'] ?? '';

// Validate input
if (empty($name) || empty($email) || empty($password) || empty($role)) {
    echo json_encode(["error" => "All fields are required"]);
    exit;
}

// Check duplicate email
$stmt = $pdo->prepare("SELECT id FROM users WHERE email = ?");
$stmt->execute([$email]);

if ($stmt->rowCount() > 0) {
    echo json_encode(["error" => "Email already exists"]);
    exit;
}

// Hash password
$hashedPassword = password_hash($password, PASSWORD_BCRYPT);

// Insert user
$stmt = $pdo->prepare("
    INSERT INTO users (name, email, password, role, created_at)
    VALUES (?, ?, ?, ?, NOW())
");

try {
    $stmt->execute([$name, $email, $hashedPassword, $role]);
    echo json_encode(["success" => true]);
} catch (PDOException $e) {
    echo json_encode(["error" => "Registration failed"]);
}