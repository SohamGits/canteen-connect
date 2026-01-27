import { CartItem } from '@/types/canteen';
import { Button } from '@/components/ui/button';
import { ShoppingBag, Plus, Minus, Trash2, Clock } from 'lucide-react';

interface CartProps {
  items: CartItem[];
  total: number;
  estimatedTime: number;
  onAddItem: (item: CartItem) => void;
  onRemoveItem: (itemId: string) => void;
  onCheckout: () => void;
}

export function Cart({ items, total, estimatedTime, onAddItem, onRemoveItem, onCheckout }: CartProps) {
  if (items.length === 0) {
    return (
      <div className="flex h-full flex-col items-center justify-center rounded-2xl bg-card p-8 text-center shadow-md">
        <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-secondary">
          <ShoppingBag className="h-8 w-8 text-muted-foreground" />
        </div>
        <h3 className="mb-2 font-semibold text-foreground">Your cart is empty</h3>
        <p className="text-sm text-muted-foreground">
          Add items from the menu to get started
        </p>
      </div>
    );
  }

  return (
    <div className="flex h-full flex-col rounded-2xl bg-card shadow-md">
      <div className="border-b p-4">
        <div className="flex items-center gap-2">
          <ShoppingBag className="h-5 w-5 text-primary" />
          <h2 className="font-semibold text-foreground">Your Order</h2>
          <span className="ml-auto rounded-full bg-primary px-2 py-0.5 text-xs font-medium text-primary-foreground">
            {items.reduce((sum, item) => sum + item.quantity, 0)} items
          </span>
        </div>
      </div>

      <div className="flex-1 overflow-auto p-4">
        <div className="space-y-3">
          {items.map((item) => (
            <div
              key={item.id}
              className="flex items-center gap-3 rounded-xl bg-secondary/50 p-3 animate-slide-up"
            >
              <img
                src={item.image}
                alt={item.name}
                className="h-14 w-14 rounded-lg object-cover"
              />
              <div className="flex-1 min-w-0">
                <h4 className="font-medium text-foreground text-sm truncate">{item.name}</h4>
                <p className="text-sm font-semibold text-primary">
                  ${(item.price * item.quantity).toFixed(2)}
                </p>
              </div>
              <div className="flex items-center gap-1">
                <Button
                  variant="icon"
                  size="icon-sm"
                  onClick={() => onRemoveItem(item.id)}
                >
                  {item.quantity === 1 ? (
                    <Trash2 className="h-4 w-4" />
                  ) : (
                    <Minus className="h-4 w-4" />
                  )}
                </Button>
                <span className="w-6 text-center text-sm font-medium">
                  {item.quantity}
                </span>
                <Button
                  variant="icon"
                  size="icon-sm"
                  onClick={() => onAddItem(item)}
                >
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="border-t p-4 space-y-4">
        <div className="flex items-center justify-between text-sm">
          <div className="flex items-center gap-1 text-muted-foreground">
            <Clock className="h-4 w-4" />
            <span>Est. prep time</span>
          </div>
          <span className="font-medium text-foreground">{estimatedTime} min</span>
        </div>
        
        <div className="flex items-center justify-between">
          <span className="text-muted-foreground">Total</span>
          <span className="text-2xl font-bold text-foreground">${total.toFixed(2)}</span>
        </div>
        
        <Button
          variant="hero"
          size="lg"
          className="w-full"
          onClick={onCheckout}
        >
          Place Order
        </Button>
      </div>
    </div>
  );
}
