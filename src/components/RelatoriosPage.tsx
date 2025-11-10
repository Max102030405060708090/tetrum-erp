import { Download, FileText, TrendingUp, Calendar, Filter } from 'lucide-react';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from './ui/select';

const reports = [
  {
    id: 1,
    title: 'Relatório de Vendas',
    description: 'Análise completa de vendas do período',
    period: 'Junho 2025',
    type: 'PDF',
    size: '2.4 MB',
    color: 'from-[#7038FF] to-[#8A5EFF]'
  },
  {
    id: 2,
    title: 'Balanço Financeiro',
    description: 'Demonstrativo financeiro consolidado',
    period: 'Junho 2025',
    type: 'Excel',
    size: '1.8 MB',
    color: 'from-[#8A5EFF] to-[#A47DFF]'
  },
  {
    id: 3,
    title: 'Inventário de Estoque',
    description: 'Listagem completa de produtos em estoque',
    period: 'Junho 2025',
    type: 'PDF',
    size: '3.1 MB',
    color: 'from-[#A47DFF] to-[#BA9FFF]'
  },
  {
    id: 4,
    title: 'Análise de Compras',
    description: 'Relatório de compras e fornecedores',
    period: 'Junho 2025',
    type: 'PDF',
    size: '1.5 MB',
    color: 'from-[#BA9FFF] to-[#D2BFFF]'
  },
  {
    id: 5,
    title: 'Fluxo de Caixa',
    description: 'Movimentações financeiras detalhadas',
    period: 'Junho 2025',
    type: 'Excel',
    size: '2.2 MB',
    color: 'from-[#7038FF] to-[#A47DFF]'
  },
  {
    id: 6,
    title: 'Relatório de Clientes',
    description: 'Base de clientes e histórico de compras',
    period: 'Junho 2025',
    type: 'PDF',
    size: '4.3 MB',
    color: 'from-[#8A5EFF] to-[#BA9FFF]'
  },
];

export function RelatoriosPage() {
  return (
    <div className="p-3 md:p-6 space-y-4 md:space-y-6 max-w-full overflow-x-hidden pb-24 lg:pb-12">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1>Relatórios</h1>
          <p className="mt-1">Gere e visualize relatórios do sistema</p>
        </div>
        <div className="flex gap-2">
          <Select defaultValue="junho">
            <SelectTrigger className="w-[180px] border-border">
              <Calendar className="h-4 w-4 mr-2 text-[#7038FF] dark:text-[#E8DCFF]" />
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="junho">Junho 2025</SelectItem>
              <SelectItem value="maio">Maio 2025</SelectItem>
              <SelectItem value="abril">Abril 2025</SelectItem>
            </SelectContent>
          </Select>
          <Button className="bg-gradient-to-r from-[#7038FF] to-[#8A5EFF] hover:from-[#8A5EFF] hover:to-[#A47DFF] text-white shadow-lg shadow-[#7038FF]/30 rounded-xl gap-2">
            <Filter className="h-4 w-4" />
            Filtrar
          </Button>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <Card className="card-shadow border-border bg-card dark:bg-[#1a1625] rounded-2xl">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm">Total de Relatórios</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl text-[#7038FF] dark:text-[#E8DCFF]">24</div>
            <p className="text-xs text-[#666666] dark:text-[#a0a0a0] mt-1">Disponíveis para download</p>
          </CardContent>
        </Card>

        <Card className="card-shadow border-border bg-card dark:bg-[#1a1625] rounded-2xl">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm">Gerados Este Mês</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl text-[#8A5EFF] dark:text-[#E8DCFF]">6</div>
            <div className="flex items-center gap-1 mt-1">
              <TrendingUp className="h-4 w-4 text-green-500" />
              <span className="text-xs text-green-500">+2 vs mês anterior</span>
            </div>
          </CardContent>
        </Card>

        <Card className="card-shadow border-border bg-card dark:bg-[#1a1625] rounded-2xl">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm">Tamanho Total</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl text-[#A47DFF] dark:text-[#E8DCFF]">45.2 MB</div>
            <p className="text-xs text-[#666666] dark:text-[#a0a0a0] mt-1">Em armazenamento</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {reports.map((report) => (
          <Card 
            key={report.id} 
            className="card-shadow card-shadow-hover border-border bg-card dark:bg-[#1a1625] rounded-2xl overflow-hidden group"
          >
            <div className={`h-2 bg-gradient-to-r ${report.color}`} />
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <CardTitle className="text-base mb-1">{report.title}</CardTitle>
                  <p className="text-sm text-[#666666] dark:text-[#a0a0a0]">
                    {report.description}
                  </p>
                </div>
                <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${report.color} flex items-center justify-center shadow-lg`}>
                  <FileText className="h-6 w-6 text-white" />
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between text-sm text-[#666666] dark:text-[#a0a0a0] mb-4">
                <span>{report.period}</span>
                <span className="flex items-center gap-1">
                  <span className="text-[#7038FF] dark:text-[#E8DCFF]">{report.type}</span>
                  <span>•</span>
                  <span>{report.size}</span>
                </span>
              </div>
              <div className="flex gap-2">
                <Button 
                  className="flex-1 bg-gradient-to-r from-[#7038FF] to-[#8A5EFF] hover:from-[#8A5EFF] hover:to-[#A47DFF] text-white rounded-xl gap-2 transition-all group-hover:shadow-lg group-hover:shadow-[#7038FF]/30"
                >
                  <Download className="h-4 w-4" />
                  Baixar
                </Button>
                <Button 
                  variant="outline"
                  className="border-border text-[#7038FF] dark:text-[#E8DCFF] hover:bg-[#E8DCFF] rounded-xl"
                >
                  Visualizar
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card className="card-shadow border-border bg-gradient-to-br from-[#E8DCFF] to-white dark:from-[#1a1625] dark:to-[#1a1625] rounded-2xl">
        <CardContent className="pt-6">
          <div className="text-center space-y-4">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#7038FF] to-[#A47DFF] flex items-center justify-center mx-auto shadow-lg shadow-[#7038FF]/30">
              <FileText className="h-8 w-8 text-white" />
            </div>
            <div>
              <h3>Precisa de um relatório customizado?</h3>
              <p className="text-[#666666] dark:text-[#a0a0a0] mt-1">
                Crie relatórios personalizados com os dados que você precisa
              </p>
            </div>
            <Button className="bg-gradient-to-r from-[#7038FF] to-[#8A5EFF] hover:from-[#8A5EFF] hover:to-[#A47DFF] text-white shadow-lg shadow-[#7038FF]/30 rounded-xl">
              Criar Relatório Personalizado
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
