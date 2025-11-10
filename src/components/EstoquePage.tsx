import { useState } from 'react';
import { Search, Filter, Plus, Edit, Trash2, TrendingUp, TrendingDown, AlertCircle, Package, ChevronDown, ChevronRight, Image as ImageIcon } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from './ui/table';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from './ui/select';

interface ProductVariation {
  id: string;
  sku: string;
  descricao: string;
  variacao: string;
  unidade: string;
  preco: number;
  estoque: number;
}

interface Product {
  id: string;
  sku: string;
  nome: string;
  descricao: string;
  categoria: string;
  unidade: string;
  preco: number;
  estoque: number;
  variacoes?: ProductVariation[];
  hasImage?: boolean;
}

const productsData: Product[] = [
  {
    id: 'P001',
    sku: 'NB-DELL-001',
    nome: 'Notebook Dell XPS 15',
    descricao: 'Notebook Dell XPS 15',
    categoria: 'Eletrônicos',
    unidade: 'UN',
    preco: 5499.00,
    estoque: 45,
    hasImage: true,
  },
  {
    id: 'P002',
    sku: 'VENT-001',
    nome: 'Ventilador de Teto',
    descricao: 'Ventilador de Teto (2 variações)',
    categoria: 'Eletrodomésticos',
    unidade: 'UN',
    preco: 189.00,
    estoque: 0,
    hasImage: true,
    variacoes: [
      {
        id: 'P002-V1',
        sku: 'VENT-001-127',
        descricao: 'Ventilador de Teto 127V',
        variacao: 'Voltagem: 127V',
        unidade: 'UN',
        preco: 189.00,
        estoque: 25,
      },
      {
        id: 'P002-V2',
        sku: 'VENT-001-220',
        descricao: 'Ventilador de Teto 220V',
        variacao: 'Voltagem: 220V',
        unidade: 'UN',
        preco: 189.00,
        estoque: 30,
      },
    ],
  },
  {
    id: 'P003',
    sku: 'MS-LOG-001',
    nome: 'Mouse Logitech MX Master',
    descricao: 'Mouse Logitech MX Master',
    categoria: 'Eletrônicos',
    unidade: 'UN',
    preco: 459.00,
    estoque: 120,
    hasImage: true,
  },
  {
    id: 'P004',
    sku: 'TEC-MEC-001',
    nome: 'Teclado Mecânico RGB',
    descricao: 'Teclado Mecânico RGB (3 variações)',
    categoria: 'Eletrônicos',
    unidade: 'UN',
    preco: 389.00,
    estoque: 0,
    hasImage: true,
    variacoes: [
      {
        id: 'P004-V1',
        sku: 'TEC-MEC-001-RED',
        descricao: 'Teclado Mecânico RGB Red Switch',
        variacao: 'Switch: Red',
        unidade: 'UN',
        preco: 389.00,
        estoque: 8,
      },
      {
        id: 'P004-V2',
        sku: 'TEC-MEC-001-BLUE',
        descricao: 'Teclado Mecânico RGB Blue Switch',
        variacao: 'Switch: Blue',
        unidade: 'UN',
        preco: 389.00,
        estoque: 15,
      },
      {
        id: 'P004-V3',
        sku: 'TEC-MEC-001-BROWN',
        descricao: 'Teclado Mecânico RGB Brown Switch',
        variacao: 'Switch: Brown',
        unidade: 'UN',
        preco: 389.00,
        estoque: 0,
      },
    ],
  },
];

interface EstoquePageProps {
  onNavigate?: (page: string, productId?: string) => void;
}

export function EstoquePage({ onNavigate }: EstoquePageProps = {}) {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('todos');
  const [expandedProducts, setExpandedProducts] = useState<Set<string>>(new Set());

  const toggleExpanded = (productId: string) => {
    const newExpanded = new Set(expandedProducts);
    if (newExpanded.has(productId)) {
      newExpanded.delete(productId);
    } else {
      newExpanded.add(productId);
    }
    setExpandedProducts(newExpanded);
  };

  const getStockIcon = (estoque: number) => {
    if (estoque === 0) {
      return <Package className="h-4 w-4 text-red-500" />;
    } else if (estoque < 10) {
      return <Package className="h-4 w-4 text-orange-500" />;
    }
    return <Package className="h-4 w-4 text-green-500" />;
  };

  const getProductStatus = (estoque: number) => {
    if (estoque === 0) return 'sem-estoque';
    if (estoque < 10) return 'baixo';
    return 'ativo';
  };

  const filteredProducts = productsData.filter((product) => {
    // Filtro de busca
    const searchLower = searchTerm.toLowerCase();
    const matchesSearch = 
      product.nome.toLowerCase().includes(searchLower) ||
      product.descricao.toLowerCase().includes(searchLower) ||
      product.sku.toLowerCase().includes(searchLower) ||
      product.categoria.toLowerCase().includes(searchLower) ||
      (product.variacoes?.some(v => 
        v.descricao.toLowerCase().includes(searchLower) ||
        v.sku.toLowerCase().includes(searchLower)
      ));

    // Filtro de status
    const productStatus = getProductStatus(product.estoque);
    const hasVariationWithStatus = product.variacoes?.some(v => {
      const varStatus = getProductStatus(v.estoque);
      return statusFilter === 'todos' || varStatus === statusFilter;
    });

    const matchesStatus = 
      statusFilter === 'todos' || 
      productStatus === statusFilter ||
      hasVariationWithStatus;

    return matchesSearch && matchesStatus;
  });

  return (
    <div className="p-3 md:p-6 space-y-4 md:space-y-6 max-w-full overflow-x-hidden pb-24 lg:pb-12">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-foreground">Produtos</h1>
          <p className="mt-1 text-muted-foreground">Controle seus produtos e inventário</p>
        </div>
        <Button className="bg-gradient-to-r from-[#7038FF] to-[#8A5EFF] hover:from-[#8A5EFF] hover:to-[#A47DFF] text-white shadow-lg shadow-[#7038FF]/30 rounded-xl gap-2">
          <Plus className="h-4 w-4" />
          Novo Produto
        </Button>
      </div>

      <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
        <Card className="card-shadow border-border bg-card dark:bg-[#1a1625] rounded-2xl">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground dark:text-white">Total de Produtos</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl text-[#7038FF] dark:text-[#E8DCFF]">{productsData.length}</div>
            <div className="flex items-center gap-1 mt-1">
              <TrendingUp className="h-4 w-4 text-green-500" />
              <span className="text-xs text-green-500">+12 este mês</span>
            </div>
          </CardContent>
        </Card>

        <Card className="card-shadow border-border bg-card dark:bg-[#1a1625] rounded-2xl">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground dark:text-white">Valor em Estoque</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl text-[#8A5EFF] dark:text-[#E8DCFF]">R$ 458K</div>
            <div className="flex items-center gap-1 mt-1">
              <TrendingUp className="h-4 w-4 text-green-500" />
              <span className="text-xs text-green-500">+5.2%</span>
            </div>
          </CardContent>
        </Card>

        <Card className="card-shadow border-border bg-card dark:bg-[#1a1625] rounded-2xl">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground dark:text-white">Estoque Baixo</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl text-orange-500">
              {productsData.filter(p => {
                const lowStock = p.estoque > 0 && p.estoque < 10;
                const hasLowStockVar = p.variacoes?.some(v => v.estoque > 0 && v.estoque < 10);
                return lowStock || hasLowStockVar;
              }).length}
            </div>
            <div className="flex items-center gap-1 mt-1">
              <AlertCircle className="h-4 w-4 text-orange-500" />
              <span className="text-xs text-orange-500">Requer atenção</span>
            </div>
          </CardContent>
        </Card>

        <Card className="card-shadow border-border bg-card dark:bg-[#1a1625] rounded-2xl">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground dark:text-white">Sem Estoque</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl text-red-500">
              {productsData.filter(p => {
                const noStock = p.estoque === 0;
                const hasNoStockVar = p.variacoes?.some(v => v.estoque === 0);
                return noStock || hasNoStockVar;
              }).length}
            </div>
            <div className="flex items-center gap-1 mt-1">
              <TrendingDown className="h-4 w-4 text-red-500" />
              <span className="text-xs text-red-500">Urgente</span>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card className="card-shadow border-border bg-card dark:bg-[#1a1625] rounded-2xl">
        <CardHeader>
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[#7038FF] dark:text-[#E8DCFF]" />
              <Input
                placeholder="Buscar por código, descrição ou categoria..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 border-border focus:border-[#7038FF]"
              />
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-full md:w-[200px] border-border">
                <Filter className="h-4 w-4 mr-2 text-[#7038FF] dark:text-[#E8DCFF]" />
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="todos">Todos</SelectItem>
                <SelectItem value="ativo">Em Estoque</SelectItem>
                <SelectItem value="baixo">Estoque Baixo</SelectItem>
                <SelectItem value="sem-estoque">Sem Estoque</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardHeader>
        <CardContent>
          <div className="rounded-xl border border-border overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow className="bg-[#E8DCFF] dark:bg-[#7A47FF] hover:bg-[#D2BFFF] dark:hover:bg-[#8A5EFF]">
                  <TableHead className="w-12"></TableHead>
                  <TableHead className="w-20">Imagem</TableHead>
                  <TableHead>Descrição</TableHead>
                  <TableHead>Código (SKU)</TableHead>
                  <TableHead>Unidade</TableHead>
                  <TableHead>Preço</TableHead>
                  <TableHead>Estoque</TableHead>
                  <TableHead className="text-right">Ações</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredProducts.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={8} className="text-center py-8 text-muted-foreground">
                      Nenhum produto encontrado
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredProducts.map((product) => (
                  <>
                    <TableRow key={product.id} className="hover:bg-[#E8DCFF]/30 dark:hover:bg-[#7038FF]/5">
                      <TableCell>
                        {product.variacoes && product.variacoes.length > 0 && (
                          <button
                            onClick={() => toggleExpanded(product.id)}
                            className="text-muted-foreground hover:text-foreground"
                          >
                            {expandedProducts.has(product.id) ? (
                              <ChevronDown className="h-4 w-4" />
                            ) : (
                              <ChevronRight className="h-4 w-4" />
                            )}
                          </button>
                        )}
                      </TableCell>
                      <TableCell>
                        <div className="w-12 h-12 rounded-lg bg-muted flex items-center justify-center overflow-hidden">
                          {product.hasImage ? (
                            <ImageIcon className="h-6 w-6 text-muted-foreground" />
                          ) : (
                            <ImageIcon className="h-6 w-6 text-muted-foreground" />
                          )}
                        </div>
                      </TableCell>
                      <TableCell className="font-medium">{product.descricao}</TableCell>
                      <TableCell className="text-[#7038FF] dark:text-[#E8DCFF]">{product.sku}</TableCell>
                      <TableCell>{product.unidade}</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          R$ {product.preco.toFixed(2)}
                          <Button variant="ghost" size="icon" className="h-6 w-6 text-[#7038FF] dark:text-[#E8DCFF]">
                            <Edit className="h-3 w-3" />
                          </Button>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <span>{product.estoque.toFixed(2)}</span>
                          {getStockIcon(product.estoque)}
                        </div>
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-2">
                          <Button 
                            variant="ghost" 
                            size="icon" 
                            className="h-8 w-8 text-[#7038FF] dark:text-[#E8DCFF] hover:bg-[#E8DCFF] dark:hover:bg-[#7038FF]/10"
                            onClick={() => onNavigate?.('product-detail', product.id)}
                          >
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="icon" className="h-8 w-8 text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20">
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                    
                    {product.variacoes && expandedProducts.has(product.id) && product.variacoes.map((variacao) => (
                      <TableRow key={variacao.id} className="bg-muted/30 hover:bg-[#E8DCFF]/30 dark:hover:bg-[#7038FF]/5">
                        <TableCell></TableCell>
                        <TableCell>
                          <div className="w-12 h-12 rounded-lg bg-muted flex items-center justify-center overflow-hidden ml-4">
                            <ImageIcon className="h-6 w-6 text-muted-foreground" />
                          </div>
                        </TableCell>
                        <TableCell className="pl-8">
                          <div>
                            <div className="text-sm">{variacao.descricao}</div>
                            <div className="text-xs text-muted-foreground">{variacao.variacao}</div>
                          </div>
                        </TableCell>
                        <TableCell className="text-[#7038FF] dark:text-[#E8DCFF]">{variacao.sku}</TableCell>
                        <TableCell>{variacao.unidade}</TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            R$ {variacao.preco.toFixed(2)}
                            <Button variant="ghost" size="icon" className="h-6 w-6 text-[#7038FF] dark:text-[#E8DCFF]">
                              <Edit className="h-3 w-3" />
                            </Button>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <span>{variacao.estoque.toFixed(2)}</span>
                            {getStockIcon(variacao.estoque)}
                          </div>
                        </TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                            <Button 
                              variant="ghost" 
                              size="icon" 
                              className="h-8 w-8 text-[#7038FF] dark:text-[#E8DCFF] hover:bg-[#E8DCFF] dark:hover:bg-[#7038FF]/10"
                              onClick={() => onNavigate?.('product-detail', variacao.id)}
                            >
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="icon" className="h-8 w-8 text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20">
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
                  </>
                  ))
                )}
              </TableBody>
            </Table>
          </div>

          <div className="flex items-center justify-between mt-4">
            <p className="text-sm text-muted-foreground">
              Mostrando {filteredProducts.length} de {productsData.length} produtos
            </p>
            <div className="flex gap-2">
              <Button variant="outline" size="sm" className="border-border text-[#7038FF] dark:text-[#E8DCFF] hover:bg-[#E8DCFF] dark:hover:bg-[#7038FF]/10">
                Anterior
              </Button>
              <Button size="sm" className="bg-[#7038FF] text-white hover:bg-[#8A5EFF]">
                Próximo
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
