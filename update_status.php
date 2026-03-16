<?php
include 'db.php'; // Use your existing db connection file
session_start();

// Security check: Only authenticated admins can update status
if (!isset($_SESSION['user_id']) || !isset($_SESSION['role']) || $_SESSION['role'] !== 'admin') {
    die("Access Denied: Unauthorized Action.");
}

if (isset($_GET['id']) && isset($_GET['status'])) {
    $id = (int)$_GET['id'];
    $status = mysqli_real_escape_string($conn, $_GET['status']);

    // Prepared statement would be better, but keeping your style:
    $query = "UPDATE orders SET status='$status' WHERE order_id=$id";
    mysqli_query($conn, $query);
}

header("Location: canteen_dashboard.php");
exit();
?>