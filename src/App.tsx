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

export default function App() {
  // Bypass login when path is /manager (or ends with it)
  const initialPage =
    typeof window !== 'undefined' &&
    (window.location.pathname.toLowerCase() === '/manager' ||
      window.location.pathname.toLowerCase().endsWith('/manager'))
      ? 'dashboard'
      : 'login';
  const [currentPage, setCurrentPage] = useState(initialPage);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [editingProductId, setEditingProductId] = useState<string | null>(null);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  const handleLogin = () => {
    setCurrentPage('dashboard');
  };

  const handleNavigate = (page: string, productId?: string) => {
    if (page === 'product-detail' && productId) {
      setEditingProductId(productId);
    } else {
      setEditingProductId(null);
    }
    setCurrentPage(page);
  };

  const handleBackFromProduct = () => {
    setEditingProductId(null);
    setCurrentPage('produtos');
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
