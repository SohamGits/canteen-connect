<?php
include 'db.php';
session_start();

// Security Check: Admin only
if (!isset($_SESSION['role']) || $_SESSION['role'] !== 'admin') {
    header("Location: login.php");
    exit();
}

// Live update every 5 seconds
header("Refresh: 5"); 

// Fetch orders that are currently being processed or waiting for pickup
$query = "SELECT orders.*, users.username FROM orders 
          JOIN users ON orders.user_id = users.id 
          WHERE status != 'Completed' 
          ORDER BY order_id DESC";
$orders = mysqli_query($conn, $query);
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8 Assembler">
    <title>Canteen Admin - Order Queue</title>
    <link rel="stylesheet" href="style.css">
    <style>
        .status-box { padding: 5px 12px; border-radius: 4px; font-weight: bold; }
        .pending-text { background: #fff3cd; color: #856404; }
        .ready-text { background: #d4edda; color: #155724; }
        .btn-action { text-decoration: none; padding: 8px 15px; border-radius: 5px; color: white; font-weight: bold; font-size: 0.9em; }
        .btn-ready { background: #28a745; }
        .btn-complete { background: #007bff; }
        nav { background: #2c3e50; padding: 15px; text-align: center; color: white; margin-bottom: 20px; border-radius: 8px; }
        nav a { color: #ecf0f1; text-decoration: none; margin: 0 15px; font-weight: bold; }
        nav a:hover { color: #3498db; }
    </style>
</head>
<body>
    <div class="container" style="max-width: 900px;">
        <nav>
            <strong>ADMIN PANEL</strong> | 
            <a href="canteen_dashboard.php">Orders Queue</a> | 
            <a href="manage_menu.php">Manage Menu</a> | 
            <a href="logout.php" style="color: #ff7675;">Logout</a>
        </nav>

        <h2>Live Order Dashboard</h2>
        <p style="text-align: center; color: #666;">Page refreshes every 5 seconds to show new orders.</p>

        <table width="100%" border="0" cellpadding="15" style="background: white; border-radius: 8px; box-shadow: 0 2px 10px rgba(0,0,0,0.1);">
            <thead>
                <tr style="background: #f8f9fa; text-align: left;">
                    <th>Order #</th>
                    <th>Customer</th>
                    <th>Amount</th>
                    <th>Status</th>
                    <th>Action</th>
                </tr>
            </thead>
            <tbody>
                <?php if(mysqli_num_rows($orders) > 0): ?>
                    <?php while($row = mysqli_fetch_assoc($orders)): ?>
                    <tr style="border-bottom: 1px solid #eee;">
                        <td>#<?php echo $row['order_id']; ?></td>
                        <td><?php echo htmlspecialchars($row['username']); ?></td>
                        <td>₹<?php echo $row['total_amount']; ?></td>
                        <td>
                            <span class="status-box <?php echo ($row['status'] == 'Ready') ? 'ready-text' : 'pending-text'; ?>">
                                <?php echo $row['status']; ?>
                            </span>
                        </td>
                        <td>
                            <?php if($row['status'] == 'Pending'): ?>
                                <a href="update_status.php?id=<?php echo $row['order_id']; ?>&status=Ready" class="btn-action btn-ready">
                                    Mark Ready
                                </a>
                            <?php elseif($row['status'] == 'Ready'): ?>
                                <a href="update_status.php?id=<?php echo $row['order_id']; ?>&status=Completed" class="btn-action btn-complete">
                                    Mark Picked Up
                                </a>
                            <?php endif; ?>
                        </td>
                    </tr>
                    <?php endwhile; ?>
                <?php else: ?>
                    <tr>
                        <td colspan="5" style="padding: 40px; color: #777; text-align: center;">No active orders right now.</td>
                    </tr>
                <?php endif; ?>
            </tbody>
        </table>
    </div>
</body>
</html>