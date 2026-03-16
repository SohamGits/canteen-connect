<?php
include 'db.php';
session_start();

// Redirect to login if session is not set
if (!isset($_SESSION['user_id'])) { 
    header("Location: login.php"); 
    exit(); 
}

// Initialize cart if it doesn't exist
if (!isset($_SESSION['cart'])) {
    $_SESSION['cart'] = [];
}

// Logic to add items to the cart
if (isset($_POST['add_to_cart'])) {
    $item_id = $_POST['item_id'];
    if (isset($_SESSION['cart'][$item_id])) {
        $_SESSION['cart'][$item_id]['qty'] += 1;
    } else {
        $_SESSION['cart'][$item_id] = [
            'name' => $_POST['item_name'],
            'price' => $_POST['price'],
            'qty' => 1
        ];
    }
}

// Logic to clear cart
if (isset($_POST['clear_cart'])) {
    $_SESSION['cart'] = [];
}

// Checkout logic
if (isset($_POST['checkout']) && !empty($_SESSION['cart'])) {
    $total = 0;
    $summary_parts = [];
    foreach ($_SESSION['cart'] as $item) {
        $total += ($item['price'] * $item['qty']);
        $summary_parts[] = $item['name'] . " (x" . $item['qty'] . ")";
    }
    $summary = mysqli_real_escape_string($conn, implode(", ", $summary_parts));
    $u_id = $_SESSION['user_id'];
    
    $order_query = "INSERT INTO orders (user_id, items_summary, total_amount, status) VALUES ($u_id, '$summary', $total, 'Pending')";
    if (mysqli_query($conn, $order_query)) {
        $_SESSION['cart'] = []; // Clear cart after successful order
        header("Location: order_status.php");
        exit();
    }
}

$menu = mysqli_query($conn, "SELECT * FROM menu WHERE is_active = 1 AND is_available = 1");
?>
<!DOCTYPE html>
<html>
<head>
    <title>Menu</title>
    <link rel="stylesheet" href="style.css">
</head>
<body>
    <nav>
        <a href="logout.php" style="color:white;">Logout</a> | 
        <a href="order_status.php" style="color:white;">My Orders</a>
    </nav>
    
    <div class="container main-layout"> <div class="menu-section"> 
            <h2>Fresh Menu</h2>
            <?php while($item = mysqli_fetch_assoc($menu)): ?>
                <div class="menu-item">
                    <div class="item-info">
                        <h4><?php echo $item['item_name']; ?></h4>
                        <p>₹<?php echo $item['price']; ?></p>
                    </div>
                    <form method="POST">
                        <input type="hidden" name="item_id" value="<?php echo $item['item_id']; ?>">
                        <input type="hidden" name="item_name" value="<?php echo $item['item_name']; ?>">
                        <input type="hidden" name="price" value="<?php echo $item['price']; ?>">
                        <button type="submit" name="add_to_cart" class="btn-order">Add</button>
                    </form>
                </div>
            <?php endwhile; ?>
        </div>

        <div class="cart-section">
            <h3>Your Shopping Cart</h3>
            <?php if(!empty($_SESSION['cart'])): ?>
                <?php 
                $total = 0;
                foreach ($_SESSION['cart'] as $item): 
                    $total += ($item['price'] * $item['qty']);
                ?>
                    <p><?php echo $item['name']; ?> (x<?php echo $item['qty']; ?>) — <strong>₹<?php echo ($item['price'] * $item['qty']); ?></strong></p>
                <?php endforeach; ?>
                <hr>
                <h4>Total: ₹<?php echo $total; ?></h4>
                <form method="POST">
                    <button type="submit" name="checkout" class="btn-checkout">Place Order Now</button>
                </form>
            <?php else: ?>
                <p style="color: #888; text-align: center;">Your cart is empty.</p>
            <?php endif; ?>
        </div>

    </div>
</body>
</html>