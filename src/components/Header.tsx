import { useState } from 'react';
import { Bell, Moon, Sun, User, Settings, Menu, ChevronDown, Search } from 'lucide-react';
import { Button } from './ui/button';
import { Avatar, AvatarFallback } from './ui/avatar';
import { Input } from './ui/input';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from './ui/dropdown-menu';

interface HeaderProps {
  onMenuToggle: () => void;
  darkMode: boolean;
  onThemeToggle: () => void;
  onNavigate: (page: string) => void;
}

export function Header({ onMenuToggle, darkMode, onThemeToggle, onNavigate }: HeaderProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const menuItems = [
    { 
      id: 'metricas', 
      label: 'Métricas',
      subItems: [
        { id: 'dashboard', label: 'Dashboard Geral' },
        { id: 'curva-abc', label: 'Curva ABC' },
      ]
    },
    { 
      id: 'cadastros', 
      label: 'Cadastros',
      subItems: [
        { id: 'categoria-produtos', label: 'Categoria de Produtos' },
        { id: 'produtos', label: 'Produtos' },
        { id: 'clientes-fornecedores', label: 'Clientes e Fornecedores' },
        { id: 'funcionarios', label: 'Funcionários' },
      ]
    },
    { 
      id: 'estoque', 
      label: 'Estoque',
      subItems: [
        { id: 'lancamentos', label: 'Lançamentos' },
      ]
    },
    { 
      id: 'comercial', 
      label: 'Comercial',
      subItems: [
        { id: 'pedidos-compra', label: 'Pedidos de Compra' },
        { id: 'pedidos-venda', label: 'Pedidos de Venda' },
        { id: 'nf-entrada', label: 'Notas Fiscais de Entrada' },
        { id: 'nf-saida', label: 'Notas Fiscais de Saída' },
        { id: 'frente-caixa', label: 'Frente de Caixa' },
      ]
    },
    { 
      id: 'financeiro', 
      label: 'Financeiro',
      subItems: [
        { id: 'caixa-bancos', label: 'Caixa/Bancos' },
        { id: 'contas-pagar', label: 'Contas a Pagar' },
        { id: 'contas-receber', label: 'Contas a Receber' },
        { id: 'remessas', label: 'Remessas' },
        { id: 'controle-caixa', label: 'Controle de Caixa' },
      ]
    },
  ];

  function goToSearch(query: string) {
    const q = query.trim().toLowerCase();
    if (!q) return;
    // Roteamento simples por palavras‑chave
    const routeByKeyword: Record<string, string> = {
      'dashboard': 'dashboard',
      'home': 'dashboard',
      'métricas': 'metricas',
      'metricas': 'metricas',
      'cadastros': 'cadastros',
      'produtos': 'produtos',
      'estoque': 'estoque',
      'lancamentos': 'lancamentos',
      'comercial': 'comercial',
      'vendas': 'vendas',
      'financeiro': 'financeiro',
      'contas a pagar': 'contas-pagar',
      'contas a receber': 'contas-receber',
      'relatórios': 'relatorios',
      'relatorios': 'relatorios',
      'configurações': 'configuracoes',
      'configuracoes': 'configuracoes',
    };
    for (const key of Object.keys(routeByKeyword)) {
      if (q.includes(key)) {
        onNavigate(routeByKeyword[key]);
        return;
      }
    }
    // Default: vai para Produtos para pesquisa de itens
    onNavigate('produtos');
    setSearchQuery('');
  }

  return (
    <header className="sticky top-0 z-40 w-full bg-card dark:bg-[#0f0a1a]" style={{ borderBottom: '1px solid rgba(210, 191, 255, 0.3)' }}>
      <div className="flex h-16 md:h-20 items-center gap-4 px-3 md:px-6">
        {/* Menu de navegação principal - escondido no mobile */}
        <nav className="header-nav-menu flex items-center gap-2 flex-none">
          {/* Métricas */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button className="header-menu-item px-4 lg:px-5 py-2.5 lg:py-3 rounded-lg text-sm lg:text-base font-medium transition-all flex items-center gap-1.5">
                Métricas
                <ChevronDown className="h-4 w-4" />
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start" className="w-64 p-4">
              <DropdownMenuLabel className="text-xs uppercase text-muted-foreground font-semibold px-2 py-2 mb-1">
                Análises
              </DropdownMenuLabel>
              <DropdownMenuItem onClick={() => onNavigate('dashboard')} className="cursor-pointer py-3 px-3">
                Dashboard Geral
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => onNavigate('curva-abc')} className="cursor-pointer py-3 px-3">
                Curva ABC
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          {/* Cadastros */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button className="header-menu-item px-4 lg:px-5 py-2.5 lg:py-3 rounded-lg text-sm lg:text-base font-medium transition-all flex items-center gap-1.5">
                Cadastros
                <ChevronDown className="h-4 w-4" />
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start" className="w-64 p-4">
              <DropdownMenuLabel className="text-xs uppercase text-muted-foreground font-semibold px-2 py-2 mb-1">
                Produtos
              </DropdownMenuLabel>
              <DropdownMenuItem onClick={() => onNavigate('categoria-produtos')} className="cursor-pointer py-3 px-3 mb-1">
                Categoria de Produtos
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => onNavigate('produtos')} className="cursor-pointer py-3 px-3">
                Produtos
              </DropdownMenuItem>
              
              <DropdownMenuSeparator className="my-3" />
              
              <DropdownMenuLabel className="text-xs uppercase text-muted-foreground font-semibold px-2 py-2 mb-1">
                Pessoas
              </DropdownMenuLabel>
              <DropdownMenuItem onClick={() => onNavigate('clientes-fornecedores')} className="cursor-pointer py-3 px-3 mb-1">
                Clientes e Fornecedores
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => onNavigate('funcionarios')} className="cursor-pointer py-3 px-3">
                Funcionários
              </DropdownMenuItem>
              
              <DropdownMenuSeparator className="my-3" />
              
              <DropdownMenuLabel className="text-xs uppercase text-muted-foreground font-semibold px-2 py-2 mb-1">
                Fiscal
              </DropdownMenuLabel>
              <DropdownMenuItem onClick={() => onNavigate('tributos-padrao')} className="cursor-pointer py-3 px-3">
                Tributos Padrão
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          {/* Estoque */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button className="header-menu-item px-4 lg:px-5 py-2.5 lg:py-3 rounded-lg text-sm lg:text-base font-medium transition-all flex items-center gap-1.5">
                Estoque
                <ChevronDown className="h-4 w-4" />
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start" className="w-64 p-4">
              <DropdownMenuLabel className="text-xs uppercase text-muted-foreground font-semibold px-2 py-2 mb-1">
                Movimentações
              </DropdownMenuLabel>
              <DropdownMenuItem onClick={() => onNavigate('lancamentos')} className="cursor-pointer py-3 px-3">
                Lançamentos
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          {/* Comercial */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button className="header-menu-item px-4 lg:px-5 py-2.5 lg:py-3 rounded-lg text-sm lg:text-base font-medium transition-all flex items-center gap-1.5">
                Comercial
                <ChevronDown className="h-4 w-4" />
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start" className="w-64 p-4">
              <DropdownMenuLabel className="text-xs uppercase text-muted-foreground font-semibold px-2 py-2 mb-1">
                Pedidos
              </DropdownMenuLabel>
              <DropdownMenuItem onClick={() => onNavigate('pedidos-compra')} className="cursor-pointer py-3 px-3 mb-1">
                Pedidos de Compra
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => onNavigate('pedidos-venda')} className="cursor-pointer py-3 px-3">
                Pedidos de Venda
              </DropdownMenuItem>
              
              <DropdownMenuSeparator className="my-3" />
              
              <DropdownMenuLabel className="text-xs uppercase text-muted-foreground font-semibold px-2 py-2 mb-1">
                Notas Fiscais
              </DropdownMenuLabel>
              <DropdownMenuItem onClick={() => onNavigate('nf-entrada')} className="cursor-pointer py-3 px-3 mb-1">
                Notas Fiscais de Entrada
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => onNavigate('nf-saida')} className="cursor-pointer py-3 px-3">
                Notas Fiscais de Saída
              </DropdownMenuItem>
              
              <DropdownMenuSeparator className="my-3" />
              
              <DropdownMenuLabel className="text-xs uppercase text-muted-foreground font-semibold px-2 py-2 mb-1">
                Vendas
              </DropdownMenuLabel>
              <DropdownMenuItem onClick={() => onNavigate('frente-caixa')} className="cursor-pointer py-3 px-3">
                Frente de Caixa
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          {/* Financeiro */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button className="header-menu-item px-4 lg:px-5 py-2.5 lg:py-3 rounded-lg text-sm lg:text-base font-medium transition-all flex items-center gap-1.5">
                Financeiro
                <ChevronDown className="h-4 w-4" />
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start" className="w-64 p-4">
              <DropdownMenuLabel className="text-xs uppercase text-muted-foreground font-semibold px-2 py-2 mb-1">
                Gestão Financeira
              </DropdownMenuLabel>
              <DropdownMenuItem onClick={() => onNavigate('caixa-bancos')} className="cursor-pointer py-3 px-3 mb-1">
                Caixa/Bancos
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => onNavigate('controle-caixa')} className="cursor-pointer py-3 px-3">
                Controle de Caixa
              </DropdownMenuItem>
              
              <DropdownMenuSeparator className="my-3" />
              
              <DropdownMenuLabel className="text-xs uppercase text-muted-foreground font-semibold px-2 py-2 mb-1">
                Contas
              </DropdownMenuLabel>
              <DropdownMenuItem onClick={() => onNavigate('contas-pagar')} className="cursor-pointer py-3 px-3 mb-1">
                Contas a Pagar
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => onNavigate('contas-receber')} className="cursor-pointer py-3 px-3 mb-1">
                Contas a Receber
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => onNavigate('remessas')} className="cursor-pointer py-3 px-3">
                Remessas
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

        </nav>

        {/* Busca global - bloco próprio entre o menu e os ícones (desktop) */}
        <div className="flex items-center flex-1 max-w-2xl px-4 ml-6">
          <div className="relative w-full">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Buscar por código, descrição ou categoria..."
              className="file:text-foreground placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground bg-card text-card-foreground flex h-9 w-full min-w-0 rounded-md border px-3 py-1 text-base transition-[color,box-shadow] outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive pl-10 border-border focus:border-[#7038FF]"
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  goToSearch(searchQuery);
                }
              }}
            />
          </div>
        </div>

        <div className="flex items-center gap-1 md:gap-2 ml-auto pr-2">
          <Button
            variant="ghost"
            size="icon"
            className="relative hover:bg-[#E8DCFF]"
            style={{ color: '#7038FF' }}
          >
            <Bell className="h-5 w-5" />
            <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full" />
          </Button>

          <Button
            variant="ghost"
            size="icon"
            className="hover:bg-[#E8DCFF]"
            onClick={onThemeToggle}
            style={{ color: '#7038FF' }}
          >
            {darkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
          </Button>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="gap-2 hover:bg-[#E8DCFF]" style={{ color: '#7038FF' }}>
                <Avatar className="h-8 w-8" style={{ border: '2px solid #7038FF' }}>
                  <AvatarFallback className="text-white" style={{ background: 'linear-gradient(135deg, #7038FF 0%, #A47DFF 100%)' }}>
                    AD
                  </AvatarFallback>
                </Avatar>
                <span className="hidden md:inline">Admin</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              <DropdownMenuItem onClick={() => onNavigate('configuracoes')} className="cursor-pointer">
                <User className="mr-2 h-4 w-4" />
                Perfil
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => onNavigate('configuracoes')} className="cursor-pointer">
                <Settings className="mr-2 h-4 w-4" />
                Configurações
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => onNavigate('login')} className="cursor-pointer text-red-600">
                Sair
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
}
