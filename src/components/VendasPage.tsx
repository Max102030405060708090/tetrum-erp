import { useState } from 'react';
import { Search, Filter, Plus, Eye, Edit, Trash2, Download } from 'lucide-react';
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

const salesData = [
  { id: '#12345', cliente: 'João Silva', data: '03/11/2025', valor: 1250.00, status: 'concluido', produtos: 3 },
  { id: '#12344', cliente: 'Maria Santos', data: '03/11/2025', valor: 850.50, status: 'pendente', produtos: 2 },
  { id: '#12343', cliente: 'Pedro Costa', data: '02/11/2025', valor: 2100.00, status: 'concluido', produtos: 5 },
  { id: '#12342', cliente: 'Ana Oliveira', data: '02/11/2025', valor: 450.00, status: 'cancelado', produtos: 1 },
  { id: '#12341', cliente: 'Carlos Souza', data: '01/11/2025', valor: 3200.00, status: 'concluido', produtos: 8 },
  { id: '#12340', cliente: 'Juliana Lima', data: '01/11/2025', valor: 680.00, status: 'pendente', produtos: 2 },
];

export function VendasPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('todos');

  const getStatusBadge = (status: string) => {
    const variants: Record<string, { variant: any; label: string }> = {
      concluido: { variant: 'default', label: 'Concluído' },
      pendente: { variant: 'secondary', label: 'Pendente' },
      cancelado: { variant: 'destructive', label: 'Cancelado' },
    };

    const config = variants[status] || variants.pendente;
    return (
      <Badge 
        variant={config.variant}
        className={
          status === 'concluido' 
            ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400' 
            : status === 'pendente'
            ? 'bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-400'
            : ''
        }
      >
        {config.label}
      </Badge>
    );
  };

  return (
    <div className="p-3 md:p-6 space-y-4 md:space-y-6 max-w-full overflow-x-hidden pb-24 lg:pb-12">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1>Vendas</h1>
          <p className="mt-1">Gerencie seus pedidos de vendas</p>
        </div>
        <Button className="bg-gradient-to-r from-[#7038FF] to-[#8A5EFF] hover:from-[#8A5EFF] hover:to-[#A47DFF] text-white shadow-lg shadow-[#7038FF]/30 rounded-xl gap-2">
          <Plus className="h-4 w-4" />
          Novo Pedido
        </Button>
      </div>

      <Card className="card-shadow border-border bg-card dark:bg-[#1a1625] rounded-2xl">
        <CardHeader>
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[#7038FF] dark:text-[#E8DCFF]" />
              <Input
                placeholder="Buscar por cliente, ID do pedido..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 border-border focus:border-[#7038FF]"
              />
            </div>
            <div className="flex gap-2">
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-[180px] border-border">
                  <Filter className="h-4 w-4 mr-2 text-[#7038FF] dark:text-[#E8DCFF]" />
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="todos">Todos</SelectItem>
                  <SelectItem value="concluido">Concluído</SelectItem>
                  <SelectItem value="pendente">Pendente</SelectItem>
                  <SelectItem value="cancelado">Cancelado</SelectItem>
                </SelectContent>
              </Select>
              <Button variant="outline" className="border-border text-[#7038FF] dark:text-[#E8DCFF] hover:bg-[#E8DCFF]">
                <Download className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="rounded-xl border border-border overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow className="bg-[#E8DCFF] dark:bg-[#7A47FF] hover:bg-[#D2BFFF] dark:hover:bg-[#8A5EFF]">
                  <TableHead>ID Pedido</TableHead>
                  <TableHead>Cliente</TableHead>
                  <TableHead>Data</TableHead>
                  <TableHead>Produtos</TableHead>
                  <TableHead>Valor</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Ações</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {salesData.map((sale) => (
                  <TableRow key={sale.id} className="hover:bg-[#E8DCFF]/30 dark:hover:bg-[#7038FF]/5">
                    <TableCell className="text-[#7038FF] dark:text-[#E8DCFF]">{sale.id}</TableCell>
                    <TableCell>{sale.cliente}</TableCell>
                    <TableCell>{sale.data}</TableCell>
                    <TableCell>{sale.produtos}</TableCell>
                    <TableCell>R$ {sale.valor.toFixed(2)}</TableCell>
                    <TableCell>{getStatusBadge(sale.status)}</TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        <Button variant="ghost" size="icon" className="h-8 w-8 text-[#7038FF] dark:text-[#E8DCFF] hover:bg-[#E8DCFF]">
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="icon" className="h-8 w-8 text-[#7038FF] dark:text-[#E8DCFF] hover:bg-[#E8DCFF]">
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="icon" className="h-8 w-8 text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20">
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          <div className="flex items-center justify-between mt-4">
            <p className="text-sm text-[#666666] dark:text-[#a0a0a0]">
              Mostrando 6 de 6 pedidos
            </p>
            <div className="flex gap-2">
              <Button variant="outline" size="sm" disabled className="border-border">
                Anterior
              </Button>
              <Button variant="outline" size="sm" disabled className="border-border">
                Próximo
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid gap-4 md:grid-cols-3">
        <Card className="card-shadow border-border bg-card dark:bg-[#1a1625] rounded-2xl">
          <CardHeader>
            <CardTitle className="text-sm">Total em Vendas (Hoje)</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl text-[#7038FF] dark:text-[#E8DCFF]">R$ 2.100,50</div>
            <p className="text-xs text-[#666666] dark:text-[#a0a0a0] mt-1">2 pedidos concluídos</p>
          </CardContent>
        </Card>

        <Card className="card-shadow border-border bg-card dark:bg-[#1a1625] rounded-2xl">
          <CardHeader>
            <CardTitle className="text-sm">Pedidos Pendentes</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl text-orange-500">2</div>
            <p className="text-xs text-[#666666] dark:text-[#a0a0a0] mt-1">Aguardando processamento</p>
          </CardContent>
        </Card>

        <Card className="card-shadow border-border bg-card dark:bg-[#1a1625] rounded-2xl">
          <CardHeader>
            <CardTitle className="text-sm">Taxa de Sucesso</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl text-green-500">83%</div>
            <p className="text-xs text-[#666666] dark:text-[#a0a0a0] mt-1">5 de 6 pedidos concluídos</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
