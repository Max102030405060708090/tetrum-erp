import { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { Sidebar } from './components/Sidebar';
import { MobileNav } from './components/MobileNav';
import { LoginPage } from './components/LoginPage';
import { DashboardPage } from './components/DashboardPage';
import { VendasPage } from './components/VendasPage';
import { ComprasPage } from './components/ComprasPage';
import { EstoquePage } from './components/EstoquePage';
import { FinanceiroPage } from './components/FinanceiroPage';
import { RelatoriosPage } from './components/RelatoriosPage';
import { ConfiguracoesPage } from './components/ConfiguracoesPage';
import { MetricasPage } from './components/MetricasPage';
import { CadastrosPage } from './components/CadastrosPage';
import { ComercialPage } from './components/ComercialPage';
import { CurvaABCPage } from './components/CurvaABCPage';
import { CategoriaProdutosPage } from './components/CategoriaProdutosPage';
import { ClientesFornecedoresPage } from './components/ClientesFornecedoresPage';
import { FuncionariosPage } from './components/FuncionariosPage';
import { TributosPadraoPage } from './components/TributosPadraoPage';
import { LancamentosPage } from './components/LancamentosPage';
import { PedidosCompraPage } from './components/PedidosCompraPage';
import { PedidosVendaPage } from './components/PedidosVendaPage';
import { NFEntradaPage } from './components/NFEntradaPage';
import { NFSaidaPage } from './components/NFSaidaPage';
import { FrenteCaixaPage } from './components/FrenteCaixaPage';
import { CaixaBancosPage } from './components/CaixaBancosPage';
import { ContasPagarPage } from './components/ContasPagarPage';
import { ContasReceberPage } from './components/ContasReceberPage';
import { RemessasPage } from './components/RemessasPage';
import { ControleCaixaPage } from './components/ControleCaixaPage';
import { ProductDetailPage } from './components/ProductDetailPage';

// Mapeamento de rotas (URL -> página)
const routeMap: Record<string, string> = {
  '/': 'dashboard',
  '/dashboard': 'dashboard',
  '/vendas': 'vendas',
  '/compras': 'compras',
  '/estoque': 'estoque',
  '/produtos': 'produtos',
  '/financeiro': 'financeiro',
  '/relatorios': 'relatorios',
  '/configuracoes': 'configuracoes',
  '/metricas': 'metricas',
  '/cadastros': 'cadastros',
  '/comercial': 'comercial',
  '/curva-abc': 'curva-abc',
  '/categoria-produtos': 'categoria-produtos',
  '/clientes-fornecedores': 'clientes-fornecedores',
  '/funcionarios': 'funcionarios',
  '/tributos-padrao': 'tributos-padrao',
  '/lancamentos': 'lancamentos',
  '/pedidos-compra': 'pedidos-compra',
  '/pedidos-venda': 'pedidos-venda',
  '/nf-entrada': 'nf-entrada',
  '/nf-saida': 'nf-saida',
  '/frente-caixa': 'frente-caixa',
  '/caixa-bancos': 'caixa-bancos',
  '/contas-pagar': 'contas-pagar',
  '/contas-receber': 'contas-receber',
  '/remessas': 'remessas',
  '/controle-caixa': 'controle-caixa',
  '/login': 'login',
};

// Mapeamento reverso (página -> URL)
const pageToRoute: Record<string, string> = {
  'dashboard': '/dashboard',
  'vendas': '/vendas',
  'compras': '/compras',
  'estoque': '/estoque',
  'produtos': '/produtos',
  'financeiro': '/financeiro',
  'relatorios': '/relatorios',
  'configuracoes': '/configuracoes',
  'metricas': '/metricas',
  'cadastros': '/cadastros',
  'comercial': '/comercial',
  'curva-abc': '/curva-abc',
  'categoria-produtos': '/categoria-produtos',
  'clientes-fornecedores': '/clientes-fornecedores',
  'funcionarios': '/funcionarios',
  'tributos-padrao': '/tributos-padrao',
  'lancamentos': '/lancamentos',
  'pedidos-compra': '/pedidos-compra',
  'pedidos-venda': '/pedidos-venda',
  'nf-entrada': '/nf-entrada',
  'nf-saida': '/nf-saida',
  'frente-caixa': '/frente-caixa',
  'caixa-bancos': '/caixa-bancos',
  'contas-pagar': '/contas-pagar',
  'contas-receber': '/contas-receber',
  'remessas': '/remessas',
  'controle-caixa': '/controle-caixa',
  'login': '/login',
};

// Função para obter a página atual baseada na URL
function getPageFromPath(): string {
  const path = window.location.pathname.toLowerCase();
  
  // Verifica se é uma rota de produto (ex: /produtos/123)
  if (path.startsWith('/produtos/') && path !== '/produtos') {
    const productId = path.split('/produtos/')[1];
    if (productId) {
      return 'product-detail';
    }
  }
  
  // Retorna a página mapeada ou dashboard por padrão
  return routeMap[path] || 'dashboard';
}

export default function App() {
  // Função para extrair productId da URL
  const extractProductIdFromPath = (): string | null => {
    const path = window.location.pathname.toLowerCase();
    if (path.startsWith('/produtos/') && path !== '/produtos') {
      const productId = path.split('/produtos/')[1];
      return productId || null;
    }
    return null;
  };

  // Inicia com a página baseada na URL atual
  const [currentPage, setCurrentPage] = useState(() => getPageFromPath());
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [editingProductId, setEditingProductId] = useState<string | null>(() => extractProductIdFromPath());

  // Atualiza a URL na primeira carga se necessário
  useEffect(() => {
    const path = window.location.pathname.toLowerCase();
    if (path === '/' || path === '') {
      window.history.replaceState({}, '', '/dashboard');
    }
  }, []);

  // Sincroniza a URL com mudanças de navegação do navegador (botão voltar/avançar)
  useEffect(() => {
    const handlePopState = () => {
      const page = getPageFromPath();
      setCurrentPage(page);
      
      // Se for produto, extrai o ID da URL
      const productId = extractProductIdFromPath();
      setEditingProductId(productId);
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  const handleLogin = () => {
    setCurrentPage('dashboard');
    window.history.pushState({}, '', '/dashboard');
  };

  const handleNavigate = (page: string, productId?: string) => {
    if (page === 'product-detail' && productId) {
      setEditingProductId(productId);
      // URL para produto específico: /produtos/123
      window.history.pushState({}, '', `/produtos/${productId}`);
    } else {
      setEditingProductId(null);
      // Atualiza a URL baseada na página
      const route = pageToRoute[page];
      if (route) {
        window.history.pushState({}, '', route);
      }
    }
    setCurrentPage(page);
  };

  const handleBackFromProduct = () => {
    setEditingProductId(null);
    setCurrentPage('produtos');
    window.history.pushState({}, '', '/produtos');
  };

  const handleThemeToggle = () => {
    setDarkMode(!darkMode);
  };

  if (currentPage === 'login') {
    return <LoginPage onLogin={handleLogin} />;
  }

  return (
    <div className="min-h-screen bg-background flex">
      {/* Sidebar - apenas desktop */}
      <Sidebar
        currentPage={currentPage}
        onNavigate={handleNavigate}
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
      />
      
      {/* Container principal - ao lado do sidebar */}
      <div className="flex-1 flex flex-col min-w-0 w-full">
        <Header
          onMenuToggle={() => setSidebarOpen(!sidebarOpen)}
          darkMode={darkMode}
          onThemeToggle={handleThemeToggle}
          onNavigate={handleNavigate}
        />
        
        <main className="flex-1 overflow-y-auto">
          {currentPage === 'dashboard' && <DashboardPage />}
          {currentPage === 'vendas' && <VendasPage />}
          {currentPage === 'compras' && <ComprasPage />}
          {currentPage === 'estoque' && <EstoquePage onNavigate={handleNavigate} />}
          {currentPage === 'financeiro' && <FinanceiroPage />}
          {currentPage === 'relatorios' && <RelatoriosPage />}
          {currentPage === 'configuracoes' && (
            <ConfiguracoesPage darkMode={darkMode} onThemeToggle={handleThemeToggle} />
          )}
          {currentPage === 'metricas' && <MetricasPage />}
          {currentPage === 'cadastros' && <CadastrosPage />}
          {currentPage === 'comercial' && <ComercialPage />}
          {currentPage === 'curva-abc' && <CurvaABCPage />}
          {currentPage === 'categoria-produtos' && <CategoriaProdutosPage />}
          {currentPage === 'produtos' && <EstoquePage onNavigate={handleNavigate} />}
          {currentPage === 'clientes-fornecedores' && <ClientesFornecedoresPage />}
          {currentPage === 'funcionarios' && <FuncionariosPage />}
          {currentPage === 'tributos-padrao' && <TributosPadraoPage />}
          {currentPage === 'lancamentos' && <LancamentosPage />}
          {currentPage === 'pedidos-compra' && <PedidosCompraPage />}
          {currentPage === 'pedidos-venda' && <PedidosVendaPage />}
          {currentPage === 'nf-entrada' && <NFEntradaPage />}
          {currentPage === 'nf-saida' && <NFSaidaPage />}
          {currentPage === 'frente-caixa' && <FrenteCaixaPage />}
          {currentPage === 'caixa-bancos' && <CaixaBancosPage />}
          {currentPage === 'contas-pagar' && <ContasPagarPage />}
          {currentPage === 'contas-receber' && <ContasReceberPage />}
          {currentPage === 'remessas' && <RemessasPage />}
          {currentPage === 'controle-caixa' && <ControleCaixaPage />}
          {currentPage === 'product-detail' && (
            <ProductDetailPage productId={editingProductId || undefined} onBack={handleBackFromProduct} />
          )}
        </main>

        <MobileNav
          currentPage={currentPage}
          onNavigate={handleNavigate}
          onMenuOpen={() => setSidebarOpen(true)}
        />
      </div>
    </div>
  );
}
