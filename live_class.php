<?php
session_start();
include 'db_connect.php';

// Simulate logged-in user
if (!isset($_SESSION['username'])) {
    $_SESSION['username'] = "User_" . rand(1000, 9999);
}

$current_user = $_SESSION['username'];

// Get the most recent active class
$result = $conn->query("SELECT * FROM live_classes ORDER BY id DESC LIMIT 1");
$class = $result->fetch_assoc();
$allowed_users = explode(",", $class['participants']);

if (!in_array($current_user, $allowed_users)) {
    echo "<p style='color: orange; font-weight: bold;'>⚠️ You are not invited to this class, but you can start a new one.</p>";
    echo "<a href='schedule_class.php'><button>Start Your Own Live Class</button></a>";
    exit();
}

?>

<!DOCTYPE html>
<html lang="en">
<head>
    <title>Live Class</title>
    <link rel="stylesheet" href="style.css">
</head>
<body>
    <h2>Live Class Session</h2>
    <p>Welcome! You have successfully joined the class.</p>

    <div id="video-container">
        <video id="localVideo" autoplay muted playsinline></video>
        <video id="remoteVideo" autoplay playsinline></video>
    </div>

    <button id="startCall">Start Call</button>
    <button id="shareScreen">Share Screen</button>

    <script>
        let users = <?= json_encode($allowed_users) ?>;
    </script>
    <script src="live_class.js"></script>
</body>
</html>
