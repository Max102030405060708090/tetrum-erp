import { TrendingUp, TrendingDown, DollarSign, CreditCard, Wallet } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { Badge } from './ui/badge';

const cashFlowData = [
  { month: 'Jan', entradas: 85000, saidas: 62000 },
  { month: 'Fev', entradas: 92000, saidas: 68000 },
  { month: 'Mar', entradas: 88000, saidas: 65000 },
  { month: 'Abr', entradas: 101000, saidas: 72000 },
  { month: 'Mai', entradas: 95000, saidas: 69000 },
  { month: 'Jun', entradas: 107000, saidas: 75000 },
];

const recentTransactions = [
  { id: 1, descricao: 'Venda Pedido #12345', tipo: 'entrada', valor: 1250.00, data: '03/11/2025' },
  { id: 2, descricao: 'Pagamento Fornecedor XYZ', tipo: 'saida', valor: 3500.00, data: '03/11/2025' },
  { id: 3, descricao: 'Venda Pedido #12344', tipo: 'entrada', valor: 850.50, data: '03/11/2025' },
  { id: 4, descricao: 'Aluguel Escritório', tipo: 'saida', valor: 4500.00, data: '02/11/2025' },
  { id: 5, descricao: 'Venda Pedido #12343', tipo: 'entrada', valor: 2100.00, data: '02/11/2025' },
];

export function FinanceiroPage() {
  return (
    <div className="p-3 md:p-6 space-y-4 md:space-y-6 max-w-full overflow-x-hidden pb-24 lg:pb-12">
      <div>
        <h1>Financeiro</h1>
        <p className="mt-1">Controle de fluxo de caixa e transações</p>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <Card className="card-shadow border-border bg-gradient-to-br from-[#7038FF] to-[#8A5EFF] text-white rounded-2xl">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm text-white">Saldo Atual</CardTitle>
            <Wallet className="h-4 w-4 text-white" />
          </CardHeader>
          <CardContent className="pt-4">
            <div className="text-3xl">R$ 142.350</div>
            <p className="text-white/80 mt-2">Disponível em caixa</p>
          </CardContent>
        </Card>

        <Card className="card-shadow border-border bg-card dark:bg-[#1a1625] rounded-2xl">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm">Entradas (Mês)</CardTitle>
            <TrendingUp className="h-4 w-4 text-green-500" />
          </CardHeader>
          <CardContent className="pt-4">
            <div className="text-3xl text-green-500">R$ 107.000</div>
            <div className="flex items-center gap-1 mt-2">
              <TrendingUp className="h-4 w-4 text-green-500" />
              <span className="text-xs text-green-500">+12.6%</span>
              <span className="text-xs text-[#666666] dark:text-[#a0a0a0]">vs mês anterior</span>
            </div>
          </CardContent>
        </Card>

        <Card className="card-shadow border-border bg-card dark:bg-[#1a1625] rounded-2xl">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm">Saídas (Mês)</CardTitle>
            <TrendingDown className="h-4 w-4 text-red-500" />
          </CardHeader>
          <CardContent className="pt-4">
            <div className="text-3xl text-red-500">R$ 75.000</div>
            <div className="flex items-center gap-1 mt-2">
              <TrendingUp className="h-4 w-4 text-red-500" />
              <span className="text-xs text-red-500">+8.7%</span>
              <span className="text-xs text-[#666666] dark:text-[#a0a0a0]">vs mês anterior</span>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card className="card-shadow border-border bg-card dark:bg-[#1a1625] rounded-2xl">
        <CardHeader>
          <CardTitle>Fluxo de Caixa</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={350}>
            <BarChart data={cashFlowData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#D2BFFF" opacity={0.3} />
              <XAxis dataKey="month" stroke="hsl(var(--muted-foreground))" />
              <YAxis stroke="hsl(var(--muted-foreground))" />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: 'hsl(var(--card))', border: '1px solid hsl(var(--border))', color: 'hsl(var(--card-foreground))',
                  borderRadius: '8px'
                }} 
              />
              <Legend />
              <Bar dataKey="entradas" fill="#10b981" radius={[8, 8, 0, 0]} name="Entradas" />
              <Bar dataKey="saidas" fill="#ef4444" radius={[8, 8, 0, 0]} name="Saídas" />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      <div className="grid gap-4 md:grid-cols-2">
        <Card className="card-shadow border-border bg-card dark:bg-[#1a1625] rounded-2xl">
          <CardHeader>
            <CardTitle>Evolução do Saldo</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={cashFlowData.map((item, index) => ({
                month: item.month,
                saldo: (item.entradas - item.saidas) + (index * 5000)
              }))}>
                <CartesianGrid strokeDasharray="3 3" stroke="#D2BFFF" opacity={0.3} />
                <XAxis dataKey="month" stroke="hsl(var(--muted-foreground))" />
                <YAxis stroke="hsl(var(--muted-foreground))" />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: 'hsl(var(--card))', border: '1px solid hsl(var(--border))', color: 'hsl(var(--card-foreground))',
                    borderRadius: '8px'
                  }} 
                />
                <Line 
                  type="monotone" 
                  dataKey="saldo" 
                  stroke="#7038FF" 
                  strokeWidth={3}
                  dot={{ fill: '#7038FF', r: 5 }}
                  activeDot={{ r: 7 }}
                  name="Saldo"
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card className="card-shadow border-border bg-card dark:bg-[#1a1625] rounded-2xl">
          <CardHeader>
            <CardTitle>Transações Recentes</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentTransactions.map((transaction) => (
                <div key={transaction.id} className="flex items-center justify-between p-3 rounded-xl hover:bg-[#E8DCFF]/30 dark:hover:bg-[#7038FF]/5 transition-colors">
                  <div className="flex items-center gap-3">
                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                      transaction.tipo === 'entrada' 
                        ? 'bg-green-100 dark:bg-green-900/30' 
                        : 'bg-red-100 dark:bg-red-900/30'
                    }`}>
                      {transaction.tipo === 'entrada' ? (
                        <TrendingUp className="h-5 w-5 text-green-500" />
                      ) : (
                        <TrendingDown className="h-5 w-5 text-red-500" />
                      )}
                    </div>
                    <div>
                      <p className="text-sm">{transaction.descricao}</p>
                      <p className="text-xs text-[#666666] dark:text-[#a0a0a0]">{transaction.data}</p>
                    </div>
                  </div>
                  <div className={`${
                    transaction.tipo === 'entrada' ? 'text-green-500' : 'text-red-500'
                  }`}>
                    {transaction.tipo === 'entrada' ? '+' : '-'} R$ {transaction.valor.toFixed(2)}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <Card className="card-shadow card-shadow-hover border-border bg-card dark:bg-[#1a1625] rounded-2xl">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm">Contas a Receber</CardTitle>
            <DollarSign className="h-4 w-4 text-[#7038FF] dark:text-[#E8DCFF]" />
          </CardHeader>
          <CardContent className="pt-4">
            <div className="text-2xl text-[#7038FF] dark:text-[#E8DCFF]">R$ 45.200</div>
            <p className="text-xs text-[#666666] dark:text-[#a0a0a0] mt-1">28 faturas pendentes</p>
          </CardContent>
        </Card>

        <Card className="card-shadow card-shadow-hover border-border bg-card dark:bg-[#1a1625] rounded-2xl">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm">Contas a Pagar</CardTitle>
            <CreditCard className="h-4 w-4 text-red-500" />
          </CardHeader>
          <CardContent className="pt-4">
            <div className="text-2xl text-red-500">R$ 28.800</div>
            <p className="text-xs text-[#666666] dark:text-[#a0a0a0] mt-1">15 faturas pendentes</p>
          </CardContent>
        </Card>

        <Card className="card-shadow card-shadow-hover border-border bg-card dark:bg-[#1a1625] rounded-2xl">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm">Lucro Líquido (Mês)</CardTitle>
            <TrendingUp className="h-4 w-4 text-green-500" />
          </CardHeader>
          <CardContent className="pt-4">
            <div className="text-2xl text-green-500">R$ 32.000</div>
            <p className="text-xs text-[#666666] dark:text-[#a0a0a0] mt-1">Margem de 29.9%</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
