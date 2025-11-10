import { TrendingUp, TrendingDown, ShoppingCart, Package, DollarSign, AlertTriangle } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { BarChart, Bar, PieChart, Pie, Cell, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';

const salesData = [
  { month: 'Jan', vendas: 45000, compras: 32000 },
  { month: 'Fev', vendas: 52000, compras: 38000 },
  { month: 'Mar', vendas: 48000, compras: 35000 },
  { month: 'Abr', vendas: 61000, compras: 42000 },
  { month: 'Mai', vendas: 55000, compras: 39000 },
  { month: 'Jun', vendas: 67000, compras: 45000 },
];

const productData = [
  { name: 'Eletrônicos', value: 35 },
  { name: 'Vestuário', value: 25 },
  { name: 'Alimentos', value: 20 },
  { name: 'Outros', value: 20 },
];

const COLORS = ['#7038FF', '#8A5EFF', '#A47DFF', '#BA9FFF'];

export function DashboardPage() {
  return (
    <div className="p-3 md:p-6 lg:p-8 space-y-3 md:space-y-6 pb-24 lg:pb-12 max-w-full overflow-x-hidden">
      <div className="mb-4 md:mb-8">
        <h1 className="text-2xl md:text-3xl text-[#7038FF] dark:text-[#E8DCFF]">Dashboard</h1>
        <p className="mt-1 md:mt-2 text-sm md:text-base text-muted-foreground">Visão geral do seu negócio</p>
      </div>

      <div className="grid gap-4 md:gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
        <Card className="rounded-2xl border border-border bg-card">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle className="text-sm text-card-foreground">Faturamento Mensal</CardTitle>
              <div className="w-10 h-10 rounded-xl flex items-center justify-center bg-[#7038FF]/10">
                <DollarSign className="h-5 w-5 text-[#7038FF] dark:text-[#E8DCFF]" />
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl mb-2 text-[#7038FF] dark:text-[#E8DCFF]">R$ 67.450</div>
            <div className="flex items-center gap-1">
              <TrendingUp className="h-4 w-4 text-green-500" />
              <span className="text-xs text-green-500">+12.5%</span>
              <span className="text-xs text-muted-foreground">vs mês anterior</span>
            </div>
          </CardContent>
        </Card>

        <Card className="rounded-2xl border border-border bg-card">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle className="text-sm text-card-foreground">Pedidos Hoje</CardTitle>
              <div className="w-10 h-10 rounded-xl flex items-center justify-center bg-[#8A5EFF]/10">
                <ShoppingCart className="h-5 w-5 text-[#8A5EFF] dark:text-[#E8DCFF]" />
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl mb-2 text-[#8A5EFF] dark:text-[#E8DCFF]">142</div>
            <div className="flex items-center gap-1">
              <TrendingUp className="h-4 w-4 text-green-500" />
              <span className="text-xs text-green-500">+8.2%</span>
              <span className="text-xs text-muted-foreground">vs ontem</span>
            </div>
          </CardContent>
        </Card>

        <Card className="rounded-2xl border border-border bg-card">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle className="text-sm text-card-foreground">Produtos em Estoque</CardTitle>
              <div className="w-10 h-10 rounded-xl flex items-center justify-center bg-[#A47DFF]/10">
                <Package className="h-5 w-5 text-[#A47DFF] dark:text-[#E8DCFF]" />
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl mb-2 text-[#A47DFF] dark:text-[#E8DCFF]">1.248</div>
            <div className="flex items-center gap-1">
              <TrendingDown className="h-4 w-4 text-orange-500" />
              <span className="text-xs text-orange-500">-3.1%</span>
              <span className="text-xs text-muted-foreground">vs semana anterior</span>
            </div>
          </CardContent>
        </Card>

        <Card className="rounded-2xl border border-border bg-card">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle className="text-sm text-card-foreground">Produtos em Falta</CardTitle>
              <div className="w-10 h-10 rounded-xl flex items-center justify-center bg-red-500/10">
                <AlertTriangle className="h-5 w-5 text-red-500" />
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl text-red-500 mb-2">18</div>
            <p className="text-xs text-muted-foreground">Requer atenção</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 md:gap-6 grid-cols-1 md:grid-cols-2">
        <Card className="rounded-2xl border border-border bg-card">
          <CardHeader>
            <CardTitle className="text-foreground">Vendas vs Compras</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={salesData}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis dataKey="month" stroke="hsl(var(--muted-foreground))" style={{ fontSize: '12px' }} />
                <YAxis stroke="hsl(var(--muted-foreground))" style={{ fontSize: '12px' }} />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: 'hsl(var(--card))', 
                    border: '1px solid hsl(var(--border))',
                    borderRadius: '12px',
                    color: 'hsl(var(--card-foreground))'
                  }} 
                />
                <Legend />
                <Bar dataKey="vendas" fill="#7038FF" radius={[8, 8, 0, 0]} />
                <Bar dataKey="compras" fill="#A47DFF" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card className="rounded-2xl border border-border bg-card">
          <CardHeader>
            <CardTitle className="text-foreground">Distribuição por Categoria</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={productData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  outerRadius={100}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {productData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      <Card className="rounded-2xl border border-border bg-card">
        <CardHeader>
          <CardTitle className="text-foreground">Desempenho de Vendas</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={salesData}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis dataKey="month" stroke="hsl(var(--muted-foreground))" style={{ fontSize: '12px' }} />
              <YAxis stroke="hsl(var(--muted-foreground))" style={{ fontSize: '12px' }} />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: 'hsl(var(--card))', 
                  border: '1px solid hsl(var(--border))',
                  borderRadius: '12px',
                  color: 'hsl(var(--card-foreground))'
                }} 
              />
              <Legend />
              <Line 
                type="monotone" 
                dataKey="vendas" 
                stroke="#7038FF" 
                strokeWidth={3}
                dot={{ fill: '#7038FF', r: 5 }}
                activeDot={{ r: 7 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      <div className="grid gap-4 md:gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
        <Card className="rounded-2xl border border-border text-white overflow-hidden bg-gradient-to-br from-[#7038FF] to-[#8A5EFF]">
          <CardHeader>
            <CardTitle className="text-white">Ticket Médio</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl mb-2">R$ 475,00</div>
            <p className="text-white/80">Baseado em 142 pedidos</p>
          </CardContent>
        </Card>

        <Card className="rounded-2xl border border-border text-white overflow-hidden bg-gradient-to-br from-[#8A5EFF] to-[#A47DFF]">
          <CardHeader>
            <CardTitle className="text-white">Taxa de Conversão</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl mb-2">68.5%</div>
            <p className="text-white/80">+5.2% este mês</p>
          </CardContent>
        </Card>

        <Card className="rounded-2xl border border-border text-white overflow-hidden bg-gradient-to-br from-[#A47DFF] to-[#BA9FFF]">
          <CardHeader>
            <CardTitle className="text-white">Clientes Ativos</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl mb-2">2.847</div>
            <p className="text-white/80">+312 este mês</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
