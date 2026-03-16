<?php
session_start();
$_SESSION['role'] = 'admin';
$_SESSION['username'] = 'Professor_Demo';
$_SESSION['user_id'] = 1; // Assuming ID 1 exists
header("Location: canteen_dashboard.php");
?>