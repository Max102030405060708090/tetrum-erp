import { useState } from 'react';
import { 
  LayoutDashboard, 
  ShoppingCart, 
  ShoppingBag, 
  Package, 
  DollarSign, 
  FileText, 
  Settings,
  X,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';
import { Button } from './ui/button';

interface SidebarProps {
  currentPage: string;
  onNavigate: (page: string) => void;
  isOpen: boolean;
  onClose: () => void;
}

const menuItems = [
  { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { id: 'vendas', label: 'Vendas', icon: ShoppingCart },
  { id: 'compras', label: 'Compras', icon: ShoppingBag },
  { id: 'estoque', label: 'Produtos', icon: Package },
  { id: 'financeiro', label: 'Financeiro', icon: DollarSign },
  { id: 'relatorios', label: 'Relatórios', icon: FileText },
  { id: 'configuracoes', label: 'Configurações', icon: Settings },
];

export function Sidebar({ currentPage, onNavigate, isOpen, onClose }: SidebarProps) {
  const [isCollapsed, setIsCollapsed] = useState(false);
  
  console.log('Sidebar isCollapsed:', isCollapsed); // DEBUG
  
  return (
    <>
      <aside
        data-collapsed={isCollapsed}
        className={`sidebar-component fixed left-0 top-0 z-50 h-screen bg-card dark:bg-[#0f0a1a] transition-all duration-300 lg:sticky lg:top-0 lg:h-screen relative ${
          isCollapsed ? 'sidebar-collapsed' : 'sidebar-expanded'
        }`}
        style={{ 
          borderRight: '1px solid rgba(210, 191, 255, 0.3)',
          width: isCollapsed && window.innerWidth >= 1024 ? '5rem' : '18rem',
          display: window.innerWidth < 1024 ? 'none' : 'block'
        }}
      >
        {isCollapsed ? (
          /* MODO RETRAÍDO - LOGO T + SETA + ÍCONES - SÓ DESKTOP */
          <>
            <div className="flex flex-col items-center justify-center p-4 gap-3 border-b border-border/30">
              <div className="w-10 h-10 rounded-lg flex items-center justify-center bg-gradient-to-br from-[#7038FF] to-[#A47DFF]">
                <span className="text-white font-bold text-lg">T</span>
              </div>
              <button
                onClick={() => setIsCollapsed(false)}
                className="flex items-center justify-center w-10 h-10 rounded-lg bg-[#7038FF] hover:bg-[#8A5EFF] text-white transition-all shadow-lg"
                title="Expandir menu"
              >
                <ChevronRight className="h-5 w-5" />
              </button>
            </div>
            
            <nav className="p-2 space-y-2 overflow-y-auto">
              {menuItems.map((item) => {
                const Icon = item.icon;
                const isActive = currentPage === item.id;
                
                return (
                  <button
                    key={item.id}
                    onClick={() => {
                      onNavigate(item.id);
                      onClose();
                    }}
                    className={`w-full flex items-center justify-center px-2 py-3.5 rounded-xl transition-all ${
                      isActive
                        ? 'text-white'
                        : 'text-[#b0b0b0] hover:bg-accent hover:text-foreground'
                    }`}
                    style={{
                      background: isActive ? 'linear-gradient(135deg, #7038FF 0%, #8A5EFF 100%)' : 'transparent',
                      boxShadow: isActive ? '0 4px 12px rgba(112, 56, 255, 0.3)' : 'none',
                    }}
                    title={item.label}
                  >
                    <Icon className="h-5 w-5" />
                  </button>
                );
              })}
            </nav>
          </>
        ) : (
          /* MODO EXPANDIDO - LOGO + MENU COMPLETO */
          <>
            <div className="flex items-center justify-between p-4 border-b border-border/30">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg flex items-center justify-center bg-gradient-to-br from-[#7038FF] to-[#A47DFF]">
                  <span className="text-white font-bold">T</span>
                </div>
                <span className="font-semibold text-foreground">Tetrum ERP</span>
              </div>
              
              <button
                onClick={() => setIsCollapsed(true)}
                className="flex items-center justify-center w-10 h-10 rounded-lg bg-[#7038FF] hover:bg-[#8A5EFF] text-white transition-all shadow-lg"
                title="Retrair menu"
              >
                <ChevronLeft className="h-6 w-6" />
              </button>
            </div>

            <nav className="p-4 space-y-2 overflow-y-auto">
              {menuItems.map((item) => {
                const Icon = item.icon;
                const isActive = currentPage === item.id;
                
                return (
                  <button
                    key={item.id}
                    onClick={() => {
                      onNavigate(item.id);
                      onClose();
                    }}
                    className={`w-full flex items-center gap-3 px-4 py-3.5 rounded-xl transition-all ${
                      isActive
                        ? 'text-white'
                        : 'text-[#999] hover:bg-accent hover:text-foreground'
                    }`}
                    style={{
                      background: isActive ? 'linear-gradient(135deg, #7038FF 0%, #8A5EFF 100%)' : 'transparent',
                      boxShadow: isActive ? '0 4px 12px rgba(112, 56, 255, 0.3)' : 'none',
                    }}
                  >
                    <Icon className="h-5 w-5 flex-shrink-0" />
                    <span className="text-sm font-medium">{item.label}</span>
                  </button>
                );
              })}
            </nav>
          </>
        )}
      </aside>
    </>
  );
}
