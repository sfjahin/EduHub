<?php
session_start();
include 'db_connect.php';

// Simulate a logged-in user
if (!isset($_SESSION['username'])) {
    $_SESSION['username'] = "User_" . rand(1000, 9999);
}

$current_user = $_SESSION['username'];

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $_SESSION['selected_users'] = $_POST['users'] ?? [];
    $_SESSION['selected_users'][] = $current_user; // Include the creator

    if (empty($_SESSION['selected_users'])) {
        die("<p style='color:red; font-weight:bold;'>❌ Error: No users selected. Please select at least one participant.</p>");
    }

    // Convert selected users to a string
    $selected_users = implode(",", $_SESSION['selected_users']);

    // Store the session in the database
    $conn->query("INSERT INTO live_classes (host, participants) VALUES ('$current_user', '$selected_users')");

    $_SESSION['class_active'] = true; // Mark the class as active

    // Redirect to live class
    header("Location: live_class.php");
    exit();
}

// Fetch registered users
$users = $conn->query("SELECT name FROM students UNION SELECT full_name FROM instructors");
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <title>Schedule Live Class</title>
</head>
<body>
    <h2>Schedule a Live Class</h2>
    <p><b>Logged in as:</b> <?= $current_user ?></p>

    <form method="post">
        <label>Select Participants:</label><br>
        <?php while ($row = $users->fetch_assoc()): ?>
            <input type="checkbox" name="users[]" value="<?= $row['name'] ?>"> <?= $row['name'] ?><br>
        <?php endwhile; ?>

        <button type="submit">Start Class</button>
    </form>
</body>
</html>