<?php
include 'db.php';
session_start();
header("Refresh: 5"); // Auto-refresh to see status changes live

if (!isset($_SESSION['user_id'])) {
    header("Location: login.php");
    exit();
}

$user_id = $_SESSION['user_id'];
// Fetch the latest order for this user
$my_orders = mysqli_query($conn, "SELECT * FROM orders WHERE user_id = $user_id ORDER BY order_id DESC LIMIT 1");
$order = mysqli_fetch_assoc($my_orders);
?>

<!DOCTYPE html>
<html>
<head>
    <title>My Order Status</title>
    <link rel="stylesheet" href="style.css">
</head>
<body>
    <div class="container" style="text-align: center; margin-top: 50px;">
        <h2>Order Tracking</h2>
        <hr>
        <?php if($order): ?>
            <div style="padding: 20px; border: 2px dashed #ccc; border-radius: 10px; background-color: #fcfcfc;">
                <h3>Current Status: 
                    <?php if($order['status'] == 'Ready'): ?>
                        <span style="color: green; font-size: 1.5em;">READY</span>
                    <?php elseif($order['status'] == 'Completed'): ?>
                        <span style="color: blue;">PICKED UP</span>
                    <?php else: ?>
                        <span style="color: orange;">PREPARING</span>
                    <?php endif; ?>
                </h3>
                
                <p>Order ID: #<?php echo $order['order_id']; ?></p>
                <p>Items: <?php echo htmlspecialchars($order['items_summary']); ?></p>
                
                <?php if($order['status'] == 'Ready'): ?>
                    <div style="background: #d4edda; border: 1px solid #c3e6cb; padding: 15px; margin-top: 10px; border-radius: 5px;">
                        <p style="font-weight: bold; color: #155724; font-size: 1.2em; margin: 0;">
                            🎉 Your food is ready! Please collect it from the counter.
                        </p>
                    </div>
                <?php elseif($order['status'] == 'Pending'): ?>
                    <p>Please wait... The chef is preparing your meal.</p>
                <?php else: ?>
                    <p>This order has been collected. Thank you!</p>
                <?php endif; ?>
            </div>
        <?php else: ?>
            <p>You haven't placed any orders yet.</p>
        <?php endif; ?>
        <br>
        <a href="customer_menu.php" class="btn">Back to Menu</a>
    </div>
</body>
</html>