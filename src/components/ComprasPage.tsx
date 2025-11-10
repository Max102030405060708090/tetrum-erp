import { useState, useEffect } from 'react';
import { Search, Filter, Plus, Eye, Edit, Trash2, Download } from 'lucide-react';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader } from './ui/card';
import { Input } from './ui/input';
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

const purchasesData = [
  { id: '#C1234', fornecedor: 'Tech Solutions LTDA', data: '03/11/2025', valor: 8500.00, status: 'concluido', itens: 15 },
  { id: '#C1233', fornecedor: 'Distribuidora ABC', data: '02/11/2025', valor: 4200.00, status: 'pendente', itens: 8 },
  { id: '#C1232', fornecedor: 'Importadora XYZ', data: '01/11/2025', valor: 12300.00, status: 'concluido', itens: 22 },
  { id: '#C1231', fornecedor: 'Global Parts Inc', data: '31/10/2025', valor: 3800.00, status: 'cancelado', itens: 5 },
  { id: '#C1230', fornecedor: 'Tech Solutions LTDA', data: '30/10/2025', valor: 6750.00, status: 'concluido', itens: 12 },
];

export function ComprasPage() {
  const getStatusBadge = (status: string) => {
    const variants: Record<string, { variant: any; label: string; className: string }> = {
      concluido: { variant: 'default', label: 'Concluído', className: 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400' },
      pendente: { variant: 'secondary', label: 'Pendente', className: 'bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-400' },
      cancelado: { variant: 'destructive', label: 'Cancelado', className: 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400' },
    };

    const config = variants[status] || variants.pendente;
    return (
      <Badge variant={config.variant} className={config.className}>
        {config.label}
      </Badge>
    );
  };

  const [idColor, setIdColor] = useState('#7038FF');

  useEffect(() => {
    const isDark = document.documentElement.classList.contains('dark');
    setIdColor(isDark ? '#E8DCFF' : '#7038FF');

    const observer = new MutationObserver(() => {
      const isDark = document.documentElement.classList.contains('dark');
      setIdColor(isDark ? '#E8DCFF' : '#7038FF');
    });

    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] });
    return () => observer.disconnect();
  }, []);

  return (
    <div className="p-3 md:p-6 space-y-4 md:space-y-6 max-w-full overflow-x-hidden pb-24 lg:pb-12">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1>Compras</h1>
          <p className="mt-1">Gerencie pedidos de compra e fornecedores</p>
        </div>
        <Button className="bg-gradient-to-r from-[#7038FF] to-[#8A5EFF] hover:from-[#8A5EFF] hover:to-[#A47DFF] text-white shadow-lg shadow-[#7038FF]/30 rounded-xl gap-2">
          <Plus className="h-4 w-4" />
          Nova Compra
        </Button>
      </div>

      <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
        <Card className="card-shadow border-border bg-card dark:bg-[#1a1625] rounded-2xl">
          <CardHeader className="pb-2">
            <p className="text-sm font-medium text-muted-foreground dark:text-white">Total em Compras (Mês)</p>
          </CardHeader>
          <CardContent>
            <div className="text-2xl text-[#7038FF] dark:text-[#E8DCFF]">R$ 35.550</div>
          </CardContent>
        </Card>

        <Card className="card-shadow border-border bg-card dark:bg-[#1a1625] rounded-2xl">
          <CardHeader className="pb-2">
            <p className="text-sm font-medium text-muted-foreground dark:text-white">Pedidos Concluídos</p>
          </CardHeader>
          <CardContent>
            <div className="text-2xl text-green-500">3</div>
          </CardContent>
        </Card>

        <Card className="card-shadow border-border bg-card dark:bg-[#1a1625] rounded-2xl">
          <CardHeader className="pb-2">
            <p className="text-sm font-medium text-muted-foreground dark:text-white">Pedidos Pendentes</p>
          </CardHeader>
          <CardContent>
            <div className="text-2xl text-orange-500">1</div>
          </CardContent>
        </Card>

        <Card className="card-shadow border-border bg-card dark:bg-[#1a1625] rounded-2xl">
          <CardHeader className="pb-2">
            <p className="text-sm font-medium text-muted-foreground dark:text-white">Fornecedores Ativos</p>
          </CardHeader>
          <CardContent>
            <div className="text-2xl text-[#A47DFF] dark:text-[#E8DCFF]">12</div>
          </CardContent>
        </Card>
      </div>

      <Card className="card-shadow border-border bg-card dark:bg-[#1a1625] rounded-2xl">
        <CardHeader>
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[#7038FF] dark:text-[#E8DCFF]" />
              <Input
                placeholder="Buscar por fornecedor, ID da compra..."
                className="pl-10 border-border focus:border-[#7038FF]"
              />
            </div>
            <div className="flex gap-2">
              <Select defaultValue="todos">
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
                  <TableHead>ID Compra</TableHead>
                  <TableHead>Fornecedor</TableHead>
                  <TableHead>Data</TableHead>
                  <TableHead>Itens</TableHead>
                  <TableHead>Valor</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Ações</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {purchasesData.map((purchase) => (
                  <TableRow key={purchase.id} className="hover:bg-[#E8DCFF]/30 dark:hover:bg-[#7038FF]/5">
                    <TableCell style={{ color: idColor }}>{purchase.id}</TableCell>
                    <TableCell>{purchase.fornecedor}</TableCell>
                    <TableCell>{purchase.data}</TableCell>
                    <TableCell>{purchase.itens}</TableCell>
                    <TableCell>R$ {purchase.valor.toFixed(2)}</TableCell>
                    <TableCell>{getStatusBadge(purchase.status)}</TableCell>
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
            <p className="text-sm font-medium text-muted-foreground dark:text-white">
              Mostrando 5 de 5 compras
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
    </div>
  );
}
