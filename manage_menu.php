<?php
include 'db.php';
session_start();

// Security: Only allow admins
if ($_SESSION['role'] !== 'admin') {
    header("Location: customer_menu.php");
    exit();
}

// 1. Logic to ADD a new item
if (isset($_POST['add_item'])) {
    $name = mysqli_real_escape_string($conn, $_POST['item_name']);
    $price = $_POST['price'];
    mysqli_query($conn, "INSERT INTO menu (item_name, price) VALUES ('$name', '$price')");
}

// 2. Logic to TOGGLE Stock (Live Update)
if (isset($_GET['toggle_id'])) {
    $id = $_GET['toggle_id'];
    $current_status = $_GET['current'];
    $new_status = ($current_status == 1) ? 0 : 1;
    mysqli_query($conn, "UPDATE menu SET is_available = $new_status WHERE item_id = $id");
    header("Location: manage_menu.php");
}

// 3. Logic to REMOVE (Hide) an item
if (isset($_GET['delete_id'])) {
    $id = $_GET['delete_id'];
    mysqli_query($conn, "UPDATE menu SET is_active = 0 WHERE item_id = $id");
    header("Location: manage_menu.php");
}

$items = mysqli_query($conn, "SELECT * FROM menu WHERE is_active = 1");
?>

<!DOCTYPE html>
<html>
<head>
    <title>Manage Menu</title>
    <link rel="stylesheet" href="style.css">
</head>
<body>
    <nav style="background: #333; padding: 15px; text-align: center;">
    <a href="canteen_dashboard.php" style="color: white; margin-right: 20px; text-decoration: none;">View Orders</a>
    <a href="manage_menu.php" style="color: white; margin-right: 20px; text-decoration: none;">Manage Menu (Add/Remove)</a>
    <a href="logout.php" style="color: #ff4d4d; text-decoration: none; font-weight: bold;">Logout</a>
</nav>
    <h2>Canteen Admin: Manage Menu</h2>
    
    <fieldset>
        <legend>Add New Food Item</legend>
        <form method="POST">
            <input type="text" name="item_name" placeholder="Item Name (e.g. Samosa)" required>
            <input type="number" step="0.01" name="price" placeholder="Price" required>
            <button type="submit" name="add_item">Add to Menu</button>
        </form>
    </fieldset>

    <hr>

    <table border="1" cellpadding="10">
        <tr>
            <th>Item Name</th>
            <th>Price</th>
            <th>Status</th>
            <th>Actions</th>
        </tr>
        <?php while($row = mysqli_fetch_assoc($items)): ?>
        <tr>
            <td><?php echo $row['item_name']; ?></td>
            <td>₹<?php echo $row['price']; ?></td>
            <td>
                <?php echo ($row['is_available'] == 1) ? "✅ In Stock" : "❌ Out of Stock"; ?>
            </td>
            <td>
                <a href="manage_menu.php?toggle_id=<?php echo $row['item_id']; ?>&current=<?php echo $row['is_available']; ?>">
                    [Toggle Stock]
                </a>
                <a href="manage_menu.php?delete_id=<?php echo $row['item_id']; ?>" onclick="return confirm('Remove item?')">
                    [Remove]
                </a>
            </td>
        </tr>
        <?php endwhile; ?>
    </table>
    <br>
    <a href="canteen_dashboard.php">Go to Orders Dashboard</a>
</body>
</html>