import { Order, OrderStatus } from '@/types/canteen';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Clock, CheckCircle2, ChefHat, Package } from 'lucide-react';

interface OrderCardProps {
  order: Order;
  isStaff?: boolean;
  onStatusChange?: (orderId: string, status: OrderStatus) => void;
}

const statusConfig: Record<OrderStatus, { label: string; variant: 'pending' | 'preparing' | 'ready' | 'success' | 'secondary'; icon: React.ReactNode }> = {
  pending: { label: 'Pending', variant: 'pending', icon: <Clock className="h-3 w-3" /> },
  preparing: { label: 'Preparing', variant: 'preparing', icon: <ChefHat className="h-3 w-3" /> },
  ready: { label: 'Ready', variant: 'ready', icon: <Package className="h-3 w-3" /> },
  completed: { label: 'Completed', variant: 'success', icon: <CheckCircle2 className="h-3 w-3" /> },
  cancelled: { label: 'Cancelled', variant: 'secondary', icon: null },
};

const nextStatus: Record<OrderStatus, OrderStatus | null> = {
  pending: 'preparing',
  preparing: 'ready',
  ready: 'completed',
  completed: null,
  cancelled: null,
};

export function OrderCard({ order, isStaff, onStatusChange }: OrderCardProps) {
  const config = statusConfig[order.status];
  const next = nextStatus[order.status];

  return (
    <div className="rounded-2xl bg-card p-4 shadow-md animate-slide-up">
      <div className="mb-3 flex items-center justify-between">
        <div>
          <span className="text-xs text-muted-foreground">Order</span>
          <h3 className="font-bold text-foreground">#{order.id.slice(0, 6).toUpperCase()}</h3>
        </div>
        <Badge variant={config.variant} className="flex items-center gap-1">
          {config.icon}
          {config.label}
        </Badge>
      </div>

      <div className="mb-3 space-y-2">
        {order.items.map((item) => (
          <div key={item.id} className="flex items-center justify-between text-sm">
            <span className="text-foreground">
              {item.quantity}x {item.name}
            </span>
            <span className="text-muted-foreground">${(item.price * item.quantity).toFixed(2)}</span>
          </div>
        ))}
      </div>

      <div className="border-t pt-3">
        <div className="flex items-center justify-between">
          <div>
            <span className="text-xs text-muted-foreground">Customer</span>
            <p className="font-medium text-foreground">{order.customerName}</p>
          </div>
          <div className="text-right">
            <span className="text-xs text-muted-foreground">Total</span>
            <p className="font-bold text-primary">${order.total.toFixed(2)}</p>
          </div>
        </div>

        {isStaff && next && onStatusChange && (
          <Button
            variant="success"
            size="sm"
            className="mt-3 w-full"
            onClick={() => onStatusChange(order.id, next)}
          >
            Mark as {statusConfig[next].label}
          </Button>
        )}

        {!isStaff && order.status !== 'completed' && order.status !== 'cancelled' && (
          <div className="mt-3 flex items-center gap-2 rounded-lg bg-secondary p-3">
            <Clock className="h-4 w-4 text-primary" />
            <span className="text-sm text-foreground">
              Estimated: <strong>{order.estimatedTime} min</strong>
            </span>
          </div>
        )}
      </div>
    </div>
  );
}
