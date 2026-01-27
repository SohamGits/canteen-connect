import { MenuItem } from '@/types/canteen';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Plus, Clock } from 'lucide-react';

interface MenuItemCardProps {
  item: MenuItem;
  onAddToCart: (item: MenuItem) => void;
}

export function MenuItemCard({ item, onAddToCart }: MenuItemCardProps) {
  return (
    <div className="group relative overflow-hidden rounded-2xl bg-card shadow-md transition-all duration-300 hover:shadow-lg hover:-translate-y-1 animate-scale-in">
      <div className="aspect-[4/3] overflow-hidden">
        <img
          src={item.image}
          alt={item.name}
          className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
        />
        {!item.available && (
          <div className="absolute inset-0 flex items-center justify-center bg-foreground/60">
            <Badge variant="unavailable" className="text-sm">
              Currently Unavailable
            </Badge>
          </div>
        )}
      </div>
      
      <div className="p-4">
        <div className="mb-2 flex items-start justify-between gap-2">
          <h3 className="font-semibold text-foreground leading-tight">{item.name}</h3>
          <span className="shrink-0 text-lg font-bold text-primary">
            ${item.price.toFixed(2)}
          </span>
        </div>
        
        <p className="mb-3 text-sm text-muted-foreground line-clamp-2">
          {item.description}
        </p>
        
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1 text-xs text-muted-foreground">
            <Clock className="h-3 w-3" />
            <span>{item.prepTime} min</span>
          </div>
          
          <Button
            size="sm"
            onClick={() => onAddToCart(item)}
            disabled={!item.available}
            className="h-9 gap-1"
          >
            <Plus className="h-4 w-4" />
            Add
          </Button>
        </div>
      </div>
    </div>
  );
}
