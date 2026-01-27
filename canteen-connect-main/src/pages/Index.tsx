import { useState } from 'react';
import { MenuItem, CartItem, Category, Order, OrderStatus } from '@/types/canteen';
import { menuItems } from '@/data/menuItems';
import { useCart } from '@/hooks/useCart';
import { Header } from '@/components/Header';
import { CategoryFilter } from '@/components/CategoryFilter';
import { MenuItemCard } from '@/components/MenuItemCard';
import { Cart } from '@/components/Cart';
import { OrderCard } from '@/components/OrderCard';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { toast } from 'sonner';
import { ShoppingCart, X, Package } from 'lucide-react';

export default function Index() {
  const [view, setView] = useState<'student' | 'staff'>('student');
  const [activeCategory, setActiveCategory] = useState<Category>('all');
  const [orders, setOrders] = useState<Order[]>([]);
  const [showMobileCart, setShowMobileCart] = useState(false);
  const { items, addItem, removeItem, clearCart, total, itemCount, estimatedTime } = useCart();

  const filteredItems = activeCategory === 'all'
    ? menuItems
    : menuItems.filter((item) => item.category === activeCategory);

  const handleCheckout = () => {
    if (items.length === 0) return;

    const newOrder: Order = {
      id: Math.random().toString(36).slice(2, 11),
      items: [...items],
      total,
      status: 'pending',
      createdAt: new Date(),
      customerName: 'Student',
      estimatedTime,
    };

    setOrders((prev) => [newOrder, ...prev]);
    clearCart();
    setShowMobileCart(false);
    toast.success('Order placed successfully!', {
      description: `Order #${newOrder.id.slice(0, 6).toUpperCase()} is being prepared.`,
    });
  };

  const handleStatusChange = (orderId: string, status: OrderStatus) => {
    setOrders((prev) =>
      prev.map((order) =>
        order.id === orderId ? { ...order, status } : order
      )
    );
    toast.success(`Order status updated to ${status}`);
  };

  const activeOrders = orders.filter(
    (order) => order.status !== 'completed' && order.status !== 'cancelled'
  );
  const studentOrders = orders.filter((order) => order.customerName === 'Student');

  return (
    <div className="min-h-screen bg-background">
      <Header view={view} onViewChange={setView} />

      {view === 'student' ? (
        <div className="container py-6">
          <div className="grid gap-6 lg:grid-cols-[1fr_380px]">
            {/* Menu Section */}
            <div>
              <div className="mb-6">
                <h2 className="mb-1 text-2xl font-bold text-foreground">Menu</h2>
                <p className="text-muted-foreground">Fresh & delicious meals made daily</p>
              </div>

              <div className="mb-6">
                <CategoryFilter
                  activeCategory={activeCategory}
                  onCategoryChange={setActiveCategory}
                />
              </div>

              <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
                {filteredItems.map((item) => (
                  <MenuItemCard
                    key={item.id}
                    item={item}
                    onAddToCart={(item) => {
                      addItem(item);
                      toast.success(`${item.name} added to cart`);
                    }}
                  />
                ))}
              </div>

              {/* My Orders Section */}
              {studentOrders.length > 0 && (
                <div className="mt-10">
                  <div className="mb-4 flex items-center gap-2">
                    <Package className="h-5 w-5 text-primary" />
                    <h2 className="text-xl font-bold text-foreground">My Orders</h2>
                  </div>
                  <div className="grid gap-4 sm:grid-cols-2">
                    {studentOrders.slice(0, 4).map((order) => (
                      <OrderCard key={order.id} order={order} />
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Cart Section - Desktop */}
            <div className="hidden lg:block">
              <div className="sticky top-24">
                <Cart
                  items={items}
                  total={total}
                  estimatedTime={estimatedTime}
                  onAddItem={addItem}
                  onRemoveItem={removeItem}
                  onCheckout={handleCheckout}
                />
              </div>
            </div>
          </div>

          {/* Mobile Cart Button */}
          <div className="fixed bottom-6 right-6 lg:hidden">
            <Button
              variant="hero"
              size="lg"
              className="relative h-14 w-14 rounded-full p-0"
              onClick={() => setShowMobileCart(true)}
            >
              <ShoppingCart className="h-6 w-6" />
              {itemCount > 0 && (
                <span className="absolute -right-1 -top-1 flex h-6 w-6 items-center justify-center rounded-full bg-foreground text-xs font-bold text-background">
                  {itemCount}
                </span>
              )}
            </Button>
          </div>

          {/* Mobile Cart Drawer */}
          {showMobileCart && (
            <div className="fixed inset-0 z-50 lg:hidden">
              <div
                className="absolute inset-0 bg-foreground/50"
                onClick={() => setShowMobileCart(false)}
              />
              <div className="absolute bottom-0 left-0 right-0 max-h-[85vh] overflow-auto rounded-t-3xl bg-background p-4 animate-slide-up">
                <div className="mb-4 flex items-center justify-between">
                  <h2 className="text-lg font-bold text-foreground">Your Cart</h2>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => setShowMobileCart(false)}
                  >
                    <X className="h-5 w-5" />
                  </Button>
                </div>
                <Cart
                  items={items}
                  total={total}
                  estimatedTime={estimatedTime}
                  onAddItem={addItem}
                  onRemoveItem={removeItem}
                  onCheckout={handleCheckout}
                />
              </div>
            </div>
          )}
        </div>
      ) : (
        /* Staff Dashboard */
        <div className="container py-6">
          <div className="mb-6">
            <h2 className="mb-1 text-2xl font-bold text-foreground">Order Dashboard</h2>
            <p className="text-muted-foreground">Manage incoming orders and update status</p>
          </div>

          {activeOrders.length === 0 ? (
            <div className="flex flex-col items-center justify-center rounded-2xl bg-card p-12 text-center shadow-md">
              <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-secondary">
                <Package className="h-8 w-8 text-muted-foreground" />
              </div>
              <h3 className="mb-2 font-semibold text-foreground">No active orders</h3>
              <p className="text-sm text-muted-foreground">
                New orders will appear here in real-time
              </p>
            </div>
          ) : (
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {activeOrders.map((order) => (
                <OrderCard
                  key={order.id}
                  order={order}
                  isStaff
                  onStatusChange={handleStatusChange}
                />
              ))}
            </div>
          )}

          {/* Completed Orders */}
          {orders.filter((o) => o.status === 'completed').length > 0 && (
            <div className="mt-10">
              <div className="mb-4 flex items-center gap-2">
                <Badge variant="success">Completed</Badge>
                <span className="text-sm text-muted-foreground">
                  {orders.filter((o) => o.status === 'completed').length} orders today
                </span>
              </div>
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {orders
                  .filter((o) => o.status === 'completed')
                  .slice(0, 4)
                  .map((order) => (
                    <OrderCard key={order.id} order={order} isStaff />
                  ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
