import { Category } from '@/types/canteen';
import { Coffee, Salad, Cookie, Wine } from 'lucide-react';

interface CategoryFilterProps {
  activeCategory: Category;
  onCategoryChange: (category: Category) => void;
}

const categories: { id: Category; label: string; icon: React.ReactNode }[] = [
  { id: 'all', label: 'All', icon: null },
  { id: 'breakfast', label: 'Breakfast', icon: <Coffee className="h-4 w-4" /> },
  { id: 'lunch', label: 'Lunch', icon: <Salad className="h-4 w-4" /> },
  { id: 'snacks', label: 'Snacks', icon: <Cookie className="h-4 w-4" /> },
  { id: 'beverages', label: 'Beverages', icon: <Wine className="h-4 w-4" /> },
];

export function CategoryFilter({ activeCategory, onCategoryChange }: CategoryFilterProps) {
  return (
    <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
      {categories.map((category) => (
        <button
          key={category.id}
          onClick={() => onCategoryChange(category.id)}
          className={`flex shrink-0 items-center gap-2 rounded-full px-4 py-2 text-sm font-medium transition-all duration-200 ${
            activeCategory === category.id
              ? 'gradient-primary text-primary-foreground shadow-md'
              : 'bg-secondary text-secondary-foreground hover:bg-secondary/80'
          }`}
        >
          {category.icon}
          {category.label}
        </button>
      ))}
    </div>
  );
}
