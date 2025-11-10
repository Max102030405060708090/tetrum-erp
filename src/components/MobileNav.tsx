import { 
  LayoutDashboard, 
  ShoppingCart, 
  Package, 
  DollarSign, 
  Settings
} from 'lucide-react';

interface MobileNavProps {
  currentPage: string;
  onNavigate: (page: string) => void;
  onMenuOpen: () => void;
}

export function MobileNav({ currentPage, onNavigate, onMenuOpen }: MobileNavProps) {
  const items = [
    { id: 'dashboard', icon: LayoutDashboard, label: 'Home' },
    { id: 'vendas', icon: ShoppingCart, label: 'Vendas' },
    { id: 'estoque', icon: Package, label: 'Produtos' },
    { id: 'financeiro', icon: DollarSign, label: 'Finanças' },
    { id: 'configuracoes', icon: Settings, label: 'Config' },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-40 bg-card lg:hidden" style={{ borderTop: '1px solid rgba(210, 191, 255, 0.3)', boxShadow: '0 -2px 12px rgba(112, 56, 255, 0.08)' }}>
      <div className="flex items-center justify-around px-2 py-3 safe-bottom">
        {items.map((item) => {
          const Icon = item.icon;
          const isActive = currentPage === item.id;
          
          return (
            <button
              key={item.id}
              onClick={() => onNavigate(item.id)}
              className="flex flex-col items-center gap-1 px-2 py-2 rounded-xl transition-all min-w-0"
              style={{ color: isActive ? '#7038FF' : '#999' }}
            >
              <Icon className="h-5 w-5 flex-shrink-0" />
              <span className="text-xs truncate max-w-full">{item.label}</span>
              {isActive && (
                <div className="w-1 h-1 rounded-full" style={{ backgroundColor: '#7038FF' }} />
              )}
            </button>
          );
        })}
      </div>
    </nav>
  );
}
