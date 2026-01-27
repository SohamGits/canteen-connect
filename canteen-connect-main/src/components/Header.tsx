import { UtensilsCrossed } from 'lucide-react';

interface HeaderProps {
  view: 'student' | 'staff';
  onViewChange: (view: 'student' | 'staff') => void;
}

export function Header({ view, onViewChange }: HeaderProps) {
  return (
    <header className="sticky top-0 z-50 border-b bg-card/95 backdrop-blur supports-[backdrop-filter]:bg-card/80">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl gradient-primary">
            <UtensilsCrossed className="h-5 w-5 text-primary-foreground" />
          </div>
          <div>
            <h1 className="text-lg font-bold text-foreground">Campus Canteen</h1>
            <p className="text-xs text-muted-foreground">Order fresh, skip the line</p>
          </div>
        </div>
        
        <div className="flex items-center rounded-lg bg-secondary p-1">
          <button
            onClick={() => onViewChange('student')}
            className={`rounded-md px-4 py-2 text-sm font-medium transition-all duration-200 ${
              view === 'student'
                ? 'bg-card text-foreground shadow-sm'
                : 'text-muted-foreground hover:text-foreground'
            }`}
          >
            Student
          </button>
          <button
            onClick={() => onViewChange('staff')}
            className={`rounded-md px-4 py-2 text-sm font-medium transition-all duration-200 ${
              view === 'staff'
                ? 'bg-card text-foreground shadow-sm'
                : 'text-muted-foreground hover:text-foreground'
            }`}
          >
            Staff
          </button>
        </div>
      </div>
    </header>
  );
}
