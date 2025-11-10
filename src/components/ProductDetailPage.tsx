import { useState } from 'react';
import { ArrowLeft, Upload, Save } from 'lucide-react';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Switch } from './ui/switch';
import { Textarea } from './ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';

interface ProductDetailPageProps {
  productId?: string;
  onBack: () => void;
}

export function ProductDetailPage({ productId, onBack }: ProductDetailPageProps) {
  const [comVariacoes, setComVariacoes] = useState(false);

  return (
    <div className="p-3 md:p-6 lg:p-8 space-y-3 md:space-y-6 pb-24 lg:pb-12 max-w-full overflow-x-hidden">
      {/* Header com botão voltar */}
      <div className="flex items-center justify-between mb-4 md:mb-8">
        <div className="flex items-center gap-4">
          <Button
            variant="ghost"
            size="icon"
            onClick={onBack}
            className="text-[#7038FF] dark:text-[#E8DCFF]"
          >
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <div>
            <h1 className="text-2xl md:text-3xl text-foreground">
              {productId ? 'Editar Produto' : 'Novo Produto'}
            </h1>
            <p className="mt-1 text-sm md:text-base text-muted-foreground">
              {productId ? `Produto #${productId}` : 'Cadastre um novo produto'}
            </p>
          </div>
        </div>
        <Button className="bg-gradient-to-r from-[#7038FF] to-[#8A5EFF] hover:from-[#8A5EFF] hover:to-[#A47DFF] text-white shadow-lg shadow-[#7038FF]/30 rounded-xl gap-2">
          <Save className="h-4 w-4" />
          Salvar Produto
        </Button>
      </div>

      {/* Tabs com as seções do produto */}
      <Tabs defaultValue="geral" className="w-full">
        <div className="overflow-x-auto">
          <TabsList className="inline-flex w-auto min-w-full bg-muted p-1 rounded-lg h-auto">
            <TabsTrigger value="geral" className="px-4 py-2.5 rounded-md whitespace-nowrap">
              Informações Gerais
            </TabsTrigger>
            <TabsTrigger value="preco" className="px-4 py-2.5 rounded-md whitespace-nowrap">
              Preço e Estoque
            </TabsTrigger>
            <TabsTrigger value="medidas" className="px-4 py-2.5 rounded-md whitespace-nowrap">
              Medidas e Produção
            </TabsTrigger>
            <TabsTrigger value="identificacao" className="px-4 py-2.5 rounded-md whitespace-nowrap">
              Identificação
            </TabsTrigger>
            <TabsTrigger value="tributos" className="px-4 py-2.5 rounded-md whitespace-nowrap">
              Tributos
            </TabsTrigger>
            {comVariacoes && (
              <TabsTrigger value="variacoes" className="px-4 py-2.5 rounded-md whitespace-nowrap">
                Variações
              </TabsTrigger>
            )}
          </TabsList>
        </div>

        {/* ABA 1: Informações Gerais */}
        <TabsContent value="geral" className="mt-6">
          <Card className="border-border bg-card">
            <CardHeader>
              <CardTitle>Informações Gerais</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid gap-6 lg:grid-cols-3">
                {/* Imagem do Produto - Destaque à esquerda */}
                <div className="lg:col-span-1">
                  <Label className="text-base font-semibold">Imagem do Produto</Label>
                  <div className="mt-3 space-y-4">
                    {/* Preview grande com exemplo */}
                    <div className="w-full aspect-square rounded-xl border-2 border-dashed border-border product-image-upload product-image-preview overflow-hidden relative group">
                      {/* Exemplo de imagem de placeholder */}
                      <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-purple-50 via-white to-purple-50 dark:from-purple-950/20 dark:via-background dark:to-purple-950/20">
                        <div className="text-center p-6">
                          <div className="mb-4 relative">
                            <div className="w-20 h-20 mx-auto rounded-2xl bg-gradient-to-br from-purple-100 to-purple-200 dark:from-purple-900/40 dark:to-purple-800/40 flex items-center justify-center">
                              <Upload className="h-10 w-10 text-purple-500 dark:text-purple-400" />
                            </div>
                          </div>
                          <p className="text-sm font-semibold text-foreground mb-1">Arraste uma imagem aqui</p>
                          <p className="text-xs text-muted-foreground mb-3">
                            ou clique para selecionar
                          </p>
                          <div className="inline-flex items-center gap-2 text-xs text-purple-600 dark:text-purple-400">
                            <span className="w-2 h-2 rounded-full bg-purple-500 animate-pulse"></span>
                            JPG, PNG ou WEBP
                          </div>
                        </div>
                      </div>
                      
                      {/* Hover overlay */}
                      <div className="absolute inset-0 bg-purple-600/10 dark:bg-purple-400/10 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                        <div className="bg-white dark:bg-gray-900 rounded-lg px-4 py-2 shadow-lg">
                          <p className="text-sm font-medium text-purple-600 dark:text-purple-400">Clique para fazer upload</p>
                        </div>
                      </div>
                    </div>
                    
                    {/* Botões de ação */}
                    <div className="space-y-2">
                      <Button variant="outline" className="w-full border-border hover:border-purple-500 hover:text-purple-600 dark:hover:text-purple-400 transition-colors">
                        <Upload className="h-4 w-4 mr-2" />
                        Upload de Imagem
                      </Button>
                      <Input
                        placeholder="Ou cole URL da imagem..."
                        className="text-sm"
                      />
                      <div className="flex items-start gap-2 text-xs text-muted-foreground bg-muted/50 p-2 rounded-lg">
                        <div className="mt-0.5">ℹ️</div>
                        <div>
                          <p className="font-medium">Tamanho recomendado: 800x800px</p>
                          <p>Formato: JPG, PNG ou WEBP. Máx. 2MB</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Campos do formulário - 2 colunas à direita */}
                <div className="lg:col-span-2 space-y-6">
                  {/* Nome do Produto */}
                  <div>
                    <Label htmlFor="nome" className="text-sm font-medium">Nome do Produto *</Label>
                    <Input
                      id="nome"
                      placeholder="Ex: Notebook Dell XPS 15"
                      className="mt-2"
                    />
                  </div>

                  <div className="grid gap-6 md:grid-cols-2">
                    {/* Código (SKU) */}
                    <div>
                      <Label htmlFor="sku" className="text-sm font-medium">Código (SKU)</Label>
                      <Input
                        id="sku"
                        placeholder="Gerado automaticamente"
                        className="mt-2"
                      />
                      <p className="text-xs text-muted-foreground mt-1">
                        Deixe em branco para gerar automaticamente
                      </p>
                    </div>

                    {/* Tipo */}
                    <div>
                      <Label htmlFor="tipo" className="text-sm font-medium">Tipo</Label>
                      <Select>
                        <SelectTrigger className="mt-2">
                          <SelectValue placeholder="Selecione o tipo" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="produto">Produto</SelectItem>
                          <SelectItem value="servico">Serviço</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    {/* Condição */}
                    <div>
                      <Label htmlFor="condicao" className="text-sm font-medium">Condição</Label>
                      <Select>
                        <SelectTrigger className="mt-2">
                          <SelectValue placeholder="Selecione a condição" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="novo">Novo</SelectItem>
                          <SelectItem value="usado">Usado</SelectItem>
                          <SelectItem value="seminovo">Seminovo</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    {/* Ativo */}
                    <div className="flex items-center justify-between p-4 border border-border rounded-lg bg-muted/30">
                      <div>
                        <Label className="text-sm font-medium">Produto Ativo</Label>
                        <p className="text-xs text-muted-foreground mt-1">
                          Ativa ou pausa o produto
                        </p>
                      </div>
                      <Switch />
                    </div>
                  </div>

                  {/* Com Variações */}
                  <div className="flex items-center justify-between p-4 border border-border rounded-lg bg-muted/30">
                    <div>
                      <Label className="text-sm font-medium">Com Variações</Label>
                      <p className="text-xs text-muted-foreground mt-1">
                        Exibe aba "Variações" quando ativado
                      </p>
                    </div>
                    <Switch checked={comVariacoes} onCheckedChange={setComVariacoes} />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* ABA 2: Preço e Estoque */}
        <TabsContent value="preco" className="mt-6">
          <Card className="border-border bg-card">
            <CardHeader>
              <CardTitle>Preço e Estoque</CardTitle>
            </CardHeader>
            <CardContent className="space-y-8">
              {/* Seção: Precificação */}
              <div>
                <h3 className="text-sm font-semibold text-foreground mb-4 flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-purple-500"></span>
                  Precificação
                </h3>
                <div className="grid gap-6 md:grid-cols-3">
                  {/* Preço de Custo */}
                  <div>
                    <Label htmlFor="precoCusto" className="text-sm font-medium">
                      Preço de Custo
                    </Label>
                    <div className="relative mt-2">
                      <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground text-sm font-medium">
                        R$
                      </span>
                      <Input
                        id="precoCusto"
                        type="number"
                        step="0.01"
                        placeholder="0,00"
                        className="pl-10"
                      />
                    </div>
                    <p className="text-xs text-muted-foreground mt-1">
                      Valor de aquisição
                    </p>
                  </div>

                  {/* Preço de Venda */}
                  <div>
                    <Label htmlFor="precoVenda" className="text-sm font-medium">
                      Preço de Venda
                    </Label>
                    <div className="relative mt-2">
                      <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground text-sm font-medium">
                        R$
                      </span>
                      <Input
                        id="precoVenda"
                        type="number"
                        step="0.01"
                        placeholder="0,00"
                        className="pl-10"
                      />
                    </div>
                    <p className="text-xs text-muted-foreground mt-1">
                      Valor para cliente
                    </p>
                  </div>

                  {/* Margem de Lucro (calculado) */}
                  <div>
                    <Label className="text-sm font-medium">Margem de Lucro</Label>
                    <div className="mt-2 h-10 px-3 rounded-md border border-border bg-muted/30 flex items-center justify-between calculated-field cursor-default">
                      <span className="text-sm font-semibold text-green-600 dark:text-green-400">
                        0,00%
                      </span>
                      <span className="text-xs text-muted-foreground">R$ 0,00</span>
                    </div>
                    <p className="text-xs text-muted-foreground mt-1">
                      Calculado automaticamente
                    </p>
                  </div>
                </div>
              </div>

              {/* Seção: Unidade e Embalagem */}
              <div>
                <h3 className="text-sm font-semibold text-foreground mb-4 flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-purple-500"></span>
                  Unidade e Embalagem
                </h3>
                <div className="grid gap-6 md:grid-cols-3">
                  {/* Unidade */}
                  <div>
                    <Label htmlFor="unidade" className="text-sm font-medium">
                      Unidade
                    </Label>
                    <Select>
                      <SelectTrigger className="mt-2">
                        <SelectValue placeholder="Selecione" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="UN">UN - Unidade</SelectItem>
                        <SelectItem value="CX">CX - Caixa</SelectItem>
                        <SelectItem value="MT">MT - Metro</SelectItem>
                        <SelectItem value="M2">M² - Metro Quadrado</SelectItem>
                        <SelectItem value="M3">M³ - Metro Cúbico</SelectItem>
                        <SelectItem value="KG">KG - Quilograma</SelectItem>
                        <SelectItem value="LT">LT - Litro</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Itens por Caixa */}
                  <div>
                    <Label htmlFor="itensCaixa" className="text-sm font-medium">
                      Itens por Caixa
                    </Label>
                    <Input
                      id="itensCaixa"
                      type="number"
                      placeholder="1"
                      className="mt-2"
                      min="1"
                    />
                    <p className="text-xs text-muted-foreground mt-1">
                      Quantidade por embalagem
                    </p>
                  </div>

                  {/* Frete Grátis */}
                  <div className="flex items-center justify-between p-4 border border-border rounded-lg bg-muted/30">
                    <div>
                      <Label className="text-sm font-medium">Frete Grátis</Label>
                      <p className="text-xs text-muted-foreground mt-1">
                        Oferece frete grátis
                      </p>
                    </div>
                    <Switch />
                  </div>
                </div>
              </div>

              {/* Seção: Controle de Estoque */}
              <div>
                <h3 className="text-sm font-semibold text-foreground mb-4 flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-purple-500"></span>
                  Controle de Estoque
                </h3>
                <div className="grid gap-6 md:grid-cols-2">
                  {/* Estoque Mínimo */}
                  <div>
                    <Label htmlFor="estoqueMin" className="text-sm font-medium">
                      Estoque Mínimo
                    </Label>
                    <Input
                      id="estoqueMin"
                      type="number"
                      placeholder="0"
                      className="mt-2"
                      min="0"
                    />
                    <p className="text-xs text-amber-600 dark:text-amber-400 mt-1 flex items-center gap-1">
                      <span>⚠️</span>
                      Define alerta de reposição
                    </p>
                  </div>

                  {/* Estoque Máximo */}
                  <div>
                    <Label htmlFor="estoqueMax" className="text-sm font-medium">
                      Estoque Máximo
                    </Label>
                    <Input
                      id="estoqueMax"
                      type="number"
                      placeholder="0"
                      className="mt-2"
                      min="0"
                    />
                    <p className="text-xs text-muted-foreground mt-1">
                      Controle de volume máximo
                    </p>
                  </div>

                  {/* Tempo de Crossdocking */}
                  <div>
                    <Label htmlFor="crossdocking" className="text-sm font-medium">
                      Tempo de Crossdocking
                    </Label>
                    <div className="relative mt-2">
                      <Input
                        id="crossdocking"
                        type="number"
                        placeholder="0"
                        className="pr-14"
                        min="0"
                      />
                      <span className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground text-sm">
                        dias
                      </span>
                    </div>
                    <p className="text-xs text-muted-foreground mt-1">
                      Prazo adicional de envio
                    </p>
                  </div>

                  {/* Localização no Estoque */}
                  <div>
                    <Label htmlFor="localizacao" className="text-sm font-medium">
                      Localização no Estoque
                    </Label>
                    <Input
                      id="localizacao"
                      placeholder="Ex: Prateleira A3 - Setor 2"
                      className="mt-2"
                    />
                    <p className="text-xs text-muted-foreground mt-1">
                      Endereço físico do item
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* ABA 3: Medidas e Produção */}
        <TabsContent value="medidas" className="mt-6">
          <Card className="border-border bg-card">
            <CardHeader>
              <CardTitle>Medidas e Produção</CardTitle>
            </CardHeader>
            <CardContent className="space-y-8">
              {/* Seção: Informações de Produção */}
              <div>
                <h3 className="text-sm font-semibold text-foreground mb-4 flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-purple-500"></span>
                  Informações de Produção
                </h3>
                <div className="grid gap-6 md:grid-cols-3">
                  {/* Marca */}
                  <div>
                    <Label htmlFor="marca" className="text-sm font-medium">
                      Marca
                    </Label>
                    <Input
                      id="marca"
                      placeholder="Ex: Dell, Samsung, Apple..."
                      className="mt-2"
                    />
                    <p className="text-xs text-muted-foreground mt-1">
                      Pode puxar marcas cadastradas
                    </p>
                  </div>

                  {/* Fabricação */}
                  <div>
                    <Label htmlFor="fabricacao" className="text-sm font-medium">
                      Fabricação
                    </Label>
                    <Select>
                      <SelectTrigger className="mt-2">
                        <SelectValue placeholder="Selecione" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="propria">Própria</SelectItem>
                        <SelectItem value="terceiros">Terceiros</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Data de Validade */}
                  <div>
                    <Label htmlFor="validade" className="text-sm font-medium">
                      Data de Validade
                    </Label>
                    <Input
                      id="validade"
                      type="date"
                      className="mt-2"
                    />
                    <p className="text-xs text-muted-foreground mt-1">
                      Não obrigatório
                    </p>
                  </div>
                </div>
              </div>

              {/* Seção: Peso */}
              <div>
                <h3 className="text-sm font-semibold text-foreground mb-4 flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-purple-500"></span>
                  Peso
                </h3>
                <div className="grid gap-6 md:grid-cols-2">
                  {/* Peso Líquido */}
                  <div>
                    <Label htmlFor="pesoLiquido" className="text-sm font-medium">
                      Peso Líquido (kg)
                    </Label>
                    <div className="relative mt-2">
                      <Input
                        id="pesoLiquido"
                        type="number"
                        step="0.001"
                        placeholder="0,000"
                        className="pr-12"
                      />
                      <span className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground text-sm">
                        kg
                      </span>
                    </div>
                    <p className="text-xs text-muted-foreground mt-1">
                      Ex: 5,000 (3 casas decimais)
                    </p>
                  </div>

                  {/* Peso Bruto */}
                  <div>
                    <Label htmlFor="pesoBruto" className="text-sm font-medium">
                      Peso Bruto (kg)
                    </Label>
                    <div className="relative mt-2">
                      <Input
                        id="pesoBruto"
                        type="number"
                        step="0.001"
                        placeholder="0,000"
                        className="pr-12"
                      />
                      <span className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground text-sm">
                        kg
                      </span>
                    </div>
                    <p className="text-xs text-muted-foreground mt-1">
                      Ex: 5,140 (3 casas decimais)
                    </p>
                  </div>
                </div>
              </div>

              {/* Seção: Dimensões */}
              <div>
                <h3 className="text-sm font-semibold text-foreground mb-4 flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-purple-500"></span>
                  Dimensões
                </h3>
                <div className="grid gap-6 md:grid-cols-4">
                  {/* Largura */}
                  <div>
                    <Label htmlFor="largura" className="text-sm font-medium">
                      Largura (cm)
                    </Label>
                    <div className="relative mt-2">
                      <Input
                        id="largura"
                        type="number"
                        step="0.01"
                        placeholder="0,00"
                        className="pr-12"
                      />
                      <span className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground text-sm">
                        cm
                      </span>
                    </div>
                  </div>

                  {/* Altura */}
                  <div>
                    <Label htmlFor="altura" className="text-sm font-medium">
                      Altura (cm)
                    </Label>
                    <div className="relative mt-2">
                      <Input
                        id="altura"
                        type="number"
                        step="0.01"
                        placeholder="0,00"
                        className="pr-12"
                      />
                      <span className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground text-sm">
                        cm
                      </span>
                    </div>
                  </div>

                  {/* Profundidade */}
                  <div>
                    <Label htmlFor="profundidade" className="text-sm font-medium">
                      Profundidade (cm)
                    </Label>
                    <div className="relative mt-2">
                      <Input
                        id="profundidade"
                        type="number"
                        step="0.01"
                        placeholder="0,00"
                        className="pr-12"
                      />
                      <span className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground text-sm">
                        cm
                      </span>
                    </div>
                  </div>

                  {/* Volume Calculado */}
                  <div>
                    <Label className="text-sm font-medium">Volume (m³)</Label>
                    <div className="mt-2 h-10 px-3 rounded-md border border-border bg-muted/30 flex items-center calculated-field cursor-default">
                      <span className="text-sm font-semibold text-blue-600 dark:text-blue-400">
                        0,000
                      </span>
                    </div>
                    <p className="text-xs text-muted-foreground mt-1">
                      Calculado automaticamente
                    </p>
                  </div>
                </div>
              </div>

              {/* Seção: Embalagem */}
              <div>
                <h3 className="text-sm font-semibold text-foreground mb-4 flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-purple-500"></span>
                  Embalagem
                </h3>
                <div className="grid gap-6 md:grid-cols-2">
                  {/* Volumes */}
                  <div>
                    <Label htmlFor="volumes" className="text-sm font-medium">
                      Volumes
                    </Label>
                    <Input
                      id="volumes"
                      type="number"
                      placeholder="0"
                      className="mt-2"
                      min="0"
                    />
                    <p className="text-xs text-muted-foreground mt-1">
                      Quantidade de volumes (Ex: 0 ou 1)
                    </p>
                  </div>

                  {/* Unidade de Medida */}
                  <div>
                    <Label htmlFor="unidadeMedida" className="text-sm font-medium">
                      Unidade de Medida
                    </Label>
                    <Select>
                      <SelectTrigger className="mt-2">
                        <SelectValue placeholder="Selecione" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="cm">cm - Centímetros</SelectItem>
                        <SelectItem value="m">m - Metros</SelectItem>
                        <SelectItem value="mm">mm - Milímetros</SelectItem>
                        <SelectItem value="pol">pol - Polegadas</SelectItem>
                        <SelectItem value="unidade">Unidade</SelectItem>
                        <SelectItem value="caixa">Caixa</SelectItem>
                        <SelectItem value="m2">m² - Metro Quadrado</SelectItem>
                        <SelectItem value="m3">m³ - Metro Cúbico</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* ABA 4: Identificação e Conteúdo */}
        <TabsContent value="identificacao" className="mt-6">
          <Card className="border-border bg-card">
            <CardHeader>
              <CardTitle>Identificação e Conteúdo</CardTitle>
            </CardHeader>
            <CardContent className="space-y-8">
              {/* Seção: Identificação */}
              <div>
                <h3 className="text-sm font-semibold text-foreground mb-4 flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-purple-500"></span>
                  Identificação
                </h3>
                <div className="grid gap-6 md:grid-cols-2">
                  {/* Código de Barras */}
                  <div>
                    <Label htmlFor="codigoBarras" className="text-sm font-medium">
                      Código de Barras (GTIN/EAN)
                    </Label>
                    <Input
                      id="codigoBarras"
                      placeholder="0000000000000"
                      maxLength={14}
                      className="mt-2 font-mono"
                      pattern="[0-9]*"
                    />
                    <p className="text-xs text-muted-foreground mt-1">
                      Validar 8, 12, 13 ou 14 dígitos
                    </p>
                  </div>

                  {/* Categoria */}
                  <div>
                    <Label htmlFor="categoria" className="text-sm font-medium">
                      Categoria
                    </Label>
                    <Select>
                      <SelectTrigger className="mt-2">
                        <SelectValue placeholder="Buscar categoria..." />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="eletronicos">📱 Eletrônicos</SelectItem>
                        <SelectItem value="eletrodomesticos">🏠 Eletrodomésticos</SelectItem>
                        <SelectItem value="moveis">🪑 Móveis</SelectItem>
                        <SelectItem value="vestuario">👕 Vestuário</SelectItem>
                        <SelectItem value="alimentos">🍎 Alimentos</SelectItem>
                        <SelectItem value="livros">📚 Livros</SelectItem>
                      </SelectContent>
                    </Select>
                    <p className="text-xs text-muted-foreground mt-1">
                      Puxa categorias cadastradas
                    </p>
                  </div>
                </div>
              </div>

              {/* Seção: Descrições */}
              <div>
                <h3 className="text-sm font-semibold text-foreground mb-4 flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-purple-500"></span>
                  Descrições
                </h3>
                <div className="space-y-6">
                  {/* Descrição Curta */}
                  <div>
                    <Label htmlFor="descricaoCurta" className="text-sm font-medium flex items-center justify-between">
                      <span>Descrição Curta</span>
                      <span className="text-xs text-muted-foreground font-normal">Usada em listagens</span>
                    </Label>
                    <div className="mt-2 border border-border rounded-lg overflow-hidden">
                      {/* Barra de ferramentas WYSIWYG simples */}
                      <div className="flex items-center gap-1 p-2 bg-muted/30 border-b border-border">
                        <Button variant="ghost" size="sm" className="h-7 w-7 p-0" type="button">
                          <span className="font-bold">B</span>
                        </Button>
                        <Button variant="ghost" size="sm" className="h-7 w-7 p-0" type="button">
                          <span className="italic">I</span>
                        </Button>
                        <Button variant="ghost" size="sm" className="h-7 w-7 p-0" type="button">
                          <span className="underline">U</span>
                        </Button>
                        <div className="w-px h-5 bg-border mx-1"></div>
                        <span className="text-xs text-muted-foreground ml-auto">0/160</span>
                      </div>
                      <Textarea
                        id="descricaoCurta"
                        placeholder="Descrição breve para listagens..."
                        className="border-0 focus-visible:ring-0 resize-none"
                        rows={3}
                        maxLength={160}
                      />
                    </div>
                  </div>

                  {/* Descrição Complementar */}
                  <div>
                    <Label htmlFor="descricaoCompleta" className="text-sm font-medium flex items-center justify-between">
                      <span>Descrição Complementar</span>
                      <span className="text-xs text-muted-foreground font-normal">Usada na página do produto</span>
                    </Label>
                    <div className="mt-2 border border-border rounded-lg overflow-hidden">
                      {/* Barra de ferramentas WYSIWYG completa */}
                      <div className="flex items-center gap-1 p-2 bg-muted/30 border-b border-border flex-wrap">
                        <Button variant="ghost" size="sm" className="h-7 w-7 p-0" type="button">
                          <span className="font-bold">B</span>
                        </Button>
                        <Button variant="ghost" size="sm" className="h-7 w-7 p-0" type="button">
                          <span className="italic">I</span>
                        </Button>
                        <Button variant="ghost" size="sm" className="h-7 w-7 p-0" type="button">
                          <span className="underline">U</span>
                        </Button>
                        <div className="w-px h-5 bg-border mx-1"></div>
                        <Button variant="ghost" size="sm" className="h-7 px-2 text-xs" type="button">
                          Lista
                        </Button>
                        <Button variant="ghost" size="sm" className="h-7 px-2 text-xs" type="button">
                          Link
                        </Button>
                        <Button variant="ghost" size="sm" className="h-7 px-2 text-xs" type="button">
                          Imagem
                        </Button>
                      </div>
                      <Textarea
                        id="descricaoCompleta"
                        placeholder="Descrição detalhada do produto..."
                        className="border-0 focus-visible:ring-0 resize-none"
                        rows={8}
                      />
                    </div>
                  </div>

                  {/* Observações */}
                  <div>
                    <Label htmlFor="observacoes" className="text-sm font-medium">
                      Observações Internas
                    </Label>
                    <Textarea
                      id="observacoes"
                      placeholder="Anotações internas (não visíveis para o cliente)"
                      className="mt-2"
                      rows={4}
                    />
                    <p className="text-xs text-muted-foreground mt-1">
                      Livre, interno, não obrigatório
                    </p>
                  </div>
                </div>
              </div>

              {/* Seção: Links e Mídia */}
              <div>
                <h3 className="text-sm font-semibold text-foreground mb-4 flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-purple-500"></span>
                  Links e Mídia
                </h3>
                <div className="space-y-6">
                  {/* URL do Site */}
                  <div>
                    <Label htmlFor="url" className="text-sm font-medium">
                      URL (Site)
                    </Label>
                    <div className="relative mt-2">
                      <Input
                        id="url"
                        type="url"
                        placeholder="https://exemplo.com/produto"
                        className="pl-9"
                      />
                      <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">
                        🔗
                      </span>
                    </div>
                    <p className="text-xs text-muted-foreground mt-1">
                      Link externo opcional
                    </p>
                  </div>

                  {/* Foto Destaque (Capa) */}
                  <div>
                    <Label className="text-sm font-medium">Foto Destaque (Capa)</Label>
                    <div className="mt-2 grid gap-4 md:grid-cols-3">
                      {/* Preview */}
                      <div className="md:col-span-1">
                        <div className="aspect-square rounded-lg border-2 border-dashed border-border bg-muted/30 flex items-center justify-center upload-preview cursor-pointer">
                          <div className="text-center p-4">
                            <Upload className="h-8 w-8 text-muted-foreground mx-auto mb-2" />
                            <p className="text-xs text-muted-foreground">Imagem principal</p>
                          </div>
                        </div>
                      </div>
                      
                      {/* Upload/URL */}
                      <div className="md:col-span-2 space-y-2">
                        <Button variant="outline" className="w-full" type="button">
                          <Upload className="h-4 w-4 mr-2" />
                          Upload de Imagem
                        </Button>
                        <Input
                          placeholder="Ou cole URL da imagem..."
                          className="text-sm"
                        />
                        <p className="text-xs text-muted-foreground">
                          Máx. 2MB. JPG, PNG ou WEBP
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Galeria de Imagens */}
                  <div>
                    <Label className="text-sm font-medium">Galeria de Imagens</Label>
                    <div className="mt-2 border-2 border-dashed border-border rounded-lg p-6 bg-muted/30">
                      <div className="flex items-center justify-center gap-4 flex-wrap">
                        {/* Placeholder para imagens */}
                        <div className="w-24 h-24 rounded-lg border border-border bg-background flex items-center justify-center gallery-item cursor-pointer">
                          <Upload className="h-6 w-6 text-muted-foreground" />
                        </div>
                        <div className="w-24 h-24 rounded-lg border border-border bg-background flex items-center justify-center gallery-item cursor-pointer">
                          <Upload className="h-6 w-6 text-muted-foreground" />
                        </div>
                        <div className="w-24 h-24 rounded-lg border border-border bg-background flex items-center justify-center gallery-item cursor-pointer">
                          <Upload className="h-6 w-6 text-muted-foreground" />
                        </div>
                        <div className="w-24 h-24 rounded-lg border-2 border-dashed border-border bg-background/50 flex items-center justify-center cursor-pointer hover:border-purple-500 hover:bg-purple-50 dark:hover:bg-purple-950/20 transition-all">
                          <span className="text-2xl text-muted-foreground">+</span>
                        </div>
                      </div>
                      <p className="text-xs text-muted-foreground text-center mt-4">
                        Upload múltiplo ou URLs múltiplas. Máx. 2MB por imagem
                      </p>
                    </div>
                  </div>

                  {/* Vídeo (YouTube) */}
                  <div>
                    <Label htmlFor="video" className="text-sm font-medium">
                      Vídeo (YouTube)
                    </Label>
                    <div className="relative mt-2">
                      <Input
                        id="video"
                        type="url"
                        placeholder="https://www.youtube.com/watch?v=..."
                        className="pl-9"
                      />
                      <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">
                        ▶️
                      </span>
                    </div>
                    <p className="text-xs text-muted-foreground mt-1">
                      Inserir link do vídeo do YouTube
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* ABA 5: Tributos e Fornecedor */}
        <TabsContent value="tributos" className="mt-6">
          <Card className="border-border bg-card">
            <CardHeader>
              <CardTitle>Tributos e Fornecedor</CardTitle>
            </CardHeader>
            <CardContent className="space-y-10">
              {/* Seção: Fornecedor */}
              <div>
                <h3 className="text-sm font-semibold text-foreground mb-6 flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-purple-500"></span>
                  Fornecedor
                </h3>
                <div>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Buscar fornecedor..." />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="fornecedor1">Fornecedor ABC Ltda.</SelectItem>
                      <SelectItem value="fornecedor2">Distribuidora XYZ S.A.</SelectItem>
                      <SelectItem value="fornecedor3">Importadora 123 Comércio</SelectItem>
                    </SelectContent>
                  </Select>
                  <p className="text-xs text-muted-foreground mt-2">
                    Puxa cadastro de fornecedores
                  </p>
                </div>
              </div>

              {/* Seção: Classificação Fiscal */}
              <div>
                <h3 className="text-sm font-semibold text-foreground mb-6 flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-purple-500"></span>
                  Classificação Fiscal
                </h3>
                <div className="grid gap-8 md:grid-cols-2">
                  {/* Origem */}
                  <div>
                    <Label htmlFor="origem" className="text-sm font-medium">
                      Origem
                    </Label>
                    <Select>
                      <SelectTrigger className="mt-2">
                        <SelectValue placeholder="Selecione" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="0">0 - Nacional, exceto as indicadas nos códigos 3, 4, 5 e 8</SelectItem>
                        <SelectItem value="1">1 - Estrangeira - Importação direta, exceto a indicada no código 6</SelectItem>
                        <SelectItem value="2">2 - Estrangeira - Adquirida no mercado interno, exceto a indicada no código 7</SelectItem>
                        <SelectItem value="3">3 - Nacional, mercadoria ou bem com Conteúdo de Importação superior a 40%</SelectItem>
                        <SelectItem value="4">4 - Nacional, cuja produção tenha sido feita em conformidade com os processos produtivos básicos</SelectItem>
                        <SelectItem value="5">5 - Nacional, mercadoria ou bem com Conteúdo de Importação inferior ou igual a 40%</SelectItem>
                        <SelectItem value="6">6 - Estrangeira - Importação direta, sem similar nacional, constante em lista de Resolução CAMEX</SelectItem>
                        <SelectItem value="7">7 - Estrangeira - Adquirida no mercado interno, sem similar nacional, constante em lista de Resolução CAMEX</SelectItem>
                        <SelectItem value="8">8 - Nacional, mercadoria ou bem com Conteúdo de Importação superior a 70%</SelectItem>
                      </SelectContent>
                    </Select>
                    <p className="text-xs text-muted-foreground mt-2">
                      Conforme Convênio ICMS 146/15 (0-8)
                    </p>
                  </div>

                  {/* NCM */}
                  <div>
                    <Label htmlFor="ncm" className="text-sm font-medium">
                      NCM
                    </Label>
                    <Input
                      id="ncm"
                      placeholder="0000.00.00"
                      maxLength={10}
                      className="mt-2 font-mono"
                    />
                    <p className="text-xs text-muted-foreground mt-2">
                      Ex: 9506.91.00
                    </p>
                  </div>

                  {/* CEST */}
                  <div>
                    <Label htmlFor="cest" className="text-sm font-medium">
                      CEST
                    </Label>
                    <Input
                      id="cest"
                      placeholder="00.000.00"
                      maxLength={9}
                      className="mt-2 font-mono"
                    />
                  </div>

                  {/* Tipo do Item */}
                  <div>
                    <Label htmlFor="tipoItem" className="text-sm font-medium">
                      Tipo do Item
                    </Label>
                    <Select>
                      <SelectTrigger className="mt-2">
                        <SelectValue placeholder="Selecione" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="revenda">Revenda</SelectItem>
                        <SelectItem value="materia-prima">Matéria-Prima</SelectItem>
                        <SelectItem value="produto-acabado">Produto Acabado</SelectItem>
                        <SelectItem value="insumo">Insumo</SelectItem>
                        <SelectItem value="embalagem">Embalagem</SelectItem>
                        <SelectItem value="uso-consumo">Uso e Consumo</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>

              {/* Seção: Tributos e Grupo */}
              <div>
                <h3 className="text-sm font-semibold text-foreground mb-6 flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-purple-500"></span>
                  Tributos e Grupo
                </h3>
                <div className="grid gap-8 md:grid-cols-2">
                  {/* % Tributos */}
                  <div>
                    <Label htmlFor="tributos" className="text-sm font-medium">
                      % Tributos
                    </Label>
                    <div className="relative mt-2">
                      <Input
                        id="tributos"
                        type="number"
                        step="0.01"
                        placeholder="0,00"
                        className="pr-8"
                      />
                      <span className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground text-sm">
                        %
                      </span>
                    </div>
                    <p className="text-xs text-muted-foreground mt-2">
                      Ex: 15,50
                    </p>
                  </div>

                  {/* Grupo de Produtos */}
                  <div>
                    <Label htmlFor="grupoProdutos" className="text-sm font-medium">
                      Grupo de Produtos
                    </Label>
                    <div className="flex gap-2 mt-2">
                      <Select>
                        <SelectTrigger className="flex-1">
                          <SelectValue placeholder="Selecione um grupo" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="grupo1">Eletrônicos</SelectItem>
                          <SelectItem value="grupo2">Móveis</SelectItem>
                          <SelectItem value="grupo3">Vestuário</SelectItem>
                        </SelectContent>
                      </Select>
                      <Button variant="outline" type="button" className="whitespace-nowrap">
                        Gerenciar
                      </Button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Seção: ICMS */}
              <div>
                <h3 className="text-sm font-semibold text-foreground mb-6 flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-purple-500"></span>
                  ICMS
                </h3>
                <div className="grid gap-8 md:grid-cols-3">
                  {/* ICMS - Valor base ST retenção */}
                  <div>
                    <Label htmlFor="icmsBaseStRetencao" className="text-sm font-medium">
                      Valor Base ST Retenção
                    </Label>
                    <div className="relative mt-2">
                      <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground text-sm">
                        R$
                      </span>
                      <Input
                        id="icmsBaseStRetencao"
                        type="number"
                        step="0.0001"
                        placeholder="0,0000"
                        className="pl-10"
                      />
                    </div>
                    <p className="text-xs text-muted-foreground mt-2">
                      4 casas decimais
                    </p>
                  </div>

                  {/* ICMS - Valor ST para retenção */}
                  <div>
                    <Label htmlFor="icmsStRetencao" className="text-sm font-medium">
                      Valor ST para Retenção
                    </Label>
                    <div className="relative mt-2">
                      <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground text-sm">
                        R$
                      </span>
                      <Input
                        id="icmsStRetencao"
                        type="number"
                        step="0.0001"
                        placeholder="0,0000"
                        className="pl-10"
                      />
                    </div>
                    <p className="text-xs text-muted-foreground mt-2">
                      4 casas decimais
                    </p>
                  </div>

                  {/* ICMS - Próprio do substituto */}
                  <div>
                    <Label htmlFor="icmsProprioSubstituto" className="text-sm font-medium">
                      Próprio do Substituto
                    </Label>
                    <div className="relative mt-2">
                      <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground text-sm">
                        R$
                      </span>
                      <Input
                        id="icmsProprioSubstituto"
                        type="number"
                        step="0.0001"
                        placeholder="0,0000"
                        className="pl-10"
                      />
                    </div>
                    <p className="text-xs text-muted-foreground mt-2">
                      4 casas decimais
                    </p>
                  </div>
                </div>
              </div>

              {/* Seção: IPI, PIS e COFINS */}
              <div>
                <h3 className="text-sm font-semibold text-foreground mb-6 flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-purple-500"></span>
                  IPI, PIS e COFINS
                </h3>
                <div className="grid gap-8 md:grid-cols-3">
                  {/* IPI - Código exceção da TIPI */}
                  <div>
                    <Label htmlFor="ipiCodigoExcecao" className="text-sm font-medium">
                      IPI - Código Exceção TIPI
                    </Label>
                    <Input
                      id="ipiCodigoExcecao"
                      type="number"
                      placeholder="000"
                      className="mt-2"
                    />
                    <p className="text-xs text-muted-foreground mt-2">
                      Código inteiro
                    </p>
                  </div>

                  {/* PIS - Valor fixo */}
                  <div>
                    <Label htmlFor="pisValorFixo" className="text-sm font-medium">
                      PIS - Valor Fixo
                    </Label>
                    <div className="relative mt-2">
                      <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground text-sm">
                        R$
                      </span>
                      <Input
                        id="pisValorFixo"
                        type="number"
                        step="0.0001"
                        placeholder="0,0000"
                        className="pl-10"
                      />
                    </div>
                    <p className="text-xs text-muted-foreground mt-2">
                      4 casas decimais
                    </p>
                  </div>

                  {/* COFINS - Valor fixo */}
                  <div>
                    <Label htmlFor="cofinsValorFixo" className="text-sm font-medium">
                      COFINS - Valor Fixo
                    </Label>
                    <div className="relative mt-2">
                      <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground text-sm">
                        R$
                      </span>
                      <Input
                        id="cofinsValorFixo"
                        type="number"
                        step="0.0001"
                        placeholder="0,0000"
                        className="pl-10"
                      />
                    </div>
                    <p className="text-xs text-muted-foreground mt-2">
                      4 casas decimais
                    </p>
                  </div>
                </div>
              </div>

              {/* Seção: Dados Adicionais e Tributação */}
              <div>
                <h3 className="text-sm font-semibold text-foreground mb-6 flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-purple-500"></span>
                  Dados Adicionais e Tributação
                </h3>
                <div className="space-y-8">
                  {/* Dados Adicionais */}
                  <div>
                    <Label htmlFor="dadosAdicionais" className="text-sm font-medium">
                      Dados Adicionais
                    </Label>
                    <Textarea
                      id="dadosAdicionais"
                      placeholder="Observações fiscais, regimes especiais..."
                      className="mt-2"
                      rows={4}
                    />
                    <p className="text-xs text-muted-foreground mt-2">
                      Observações fiscais, regimes especiais
                    </p>
                  </div>

                  {/* Tributação Padrão */}
                  <div>
                    <Label htmlFor="tributacaoPadrao" className="text-sm font-medium">
                      Tributação Padrão
                    </Label>
                    <Select>
                      <SelectTrigger className="mt-2">
                        <SelectValue placeholder="Buscar tributação..." />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="simples">Simples Nacional - CST 101</SelectItem>
                        <SelectItem value="lucro-presumido">Lucro Presumido - CST 000</SelectItem>
                        <SelectItem value="lucro-real">Lucro Real - CST 000</SelectItem>
                        <SelectItem value="isento">Isento - CST 040</SelectItem>
                        <SelectItem value="substituicao">Substituição Tributária - CST 060</SelectItem>
                      </SelectContent>
                    </Select>
                    <p className="text-xs text-muted-foreground mt-2">
                      Puxa tributações pré-cadastradas
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* ABA 6: Variações (condicional) */}
        {comVariacoes && (
          <TabsContent value="variacoes" className="mt-6">
            <Card className="border-border bg-card">
              <CardHeader>
                <CardTitle>Variações do Produto</CardTitle>
                <p className="text-sm text-muted-foreground mt-2">
                  Crie combinações de atributos para gerar produtos filhos automaticamente
                </p>
              </CardHeader>
              <CardContent className="space-y-8">
                {/* Seção: Atributos de Variação */}
                <div>
                  <h3 className="text-sm font-semibold text-foreground mb-4 flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-purple-500"></span>
                    Atributos de Variação
                  </h3>
                  
                  <div className="space-y-4">
                    {/* Atributo 1: Cor */}
                    <div className="p-4 border border-border rounded-lg bg-muted/30 attribute-container">
                      <div className="flex items-center gap-4 mb-4">
                        <div className="flex-1">
                          <Label htmlFor="atributo1" className="text-sm font-medium">
                            Nome do Atributo
                          </Label>
                          <Input
                            id="atributo1"
                            placeholder="Ex: Cor, Tamanho, Voltagem..."
                            className="mt-2"
                            defaultValue="Cor"
                          />
                        </div>
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          className="text-red-500 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-950/20 mt-7"
                          type="button"
                        >
                          🗑️ Remover
                        </Button>
                      </div>
                      
                      <div>
                        <Label className="text-sm font-medium">Valores</Label>
                        <div className="flex flex-wrap gap-2 mt-2 mb-3">
                          <span className="inline-flex items-center gap-1 px-3 py-1.5 rounded-full bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 text-sm">
                            Vermelho
                            <button className="hover:text-red-500 text-xs">✕</button>
                          </span>
                          <span className="inline-flex items-center gap-1 px-3 py-1.5 rounded-full bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 text-sm">
                            Branco
                            <button className="hover:text-red-500 text-xs">✕</button>
                          </span>
                          <span className="inline-flex items-center gap-1 px-3 py-1.5 rounded-full bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 text-sm">
                            Azul
                            <button className="hover:text-red-500 text-xs">✕</button>
                          </span>
                        </div>
                        <div className="flex gap-2">
                          <Input
                            placeholder="Digite um valor e pressione Enter"
                            className="flex-1"
                          />
                          <Button type="button" variant="outline">
                            Adicionar
                          </Button>
                        </div>
                      </div>
                    </div>

                    {/* Atributo 2: Tamanho */}
                    <div className="p-4 border border-border rounded-lg bg-muted/30 attribute-container">
                      <div className="flex items-center gap-4 mb-4">
                        <div className="flex-1">
                          <Label htmlFor="atributo2" className="text-sm font-medium">
                            Nome do Atributo
                          </Label>
                          <Input
                            id="atributo2"
                            placeholder="Ex: Cor, Tamanho, Voltagem..."
                            className="mt-2"
                            defaultValue="Tamanho"
                          />
                        </div>
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          className="text-red-500 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-950/20 mt-7"
                          type="button"
                        >
                          🗑️ Remover
                        </Button>
                      </div>
                      
                      <div>
                        <Label className="text-sm font-medium">Valores</Label>
                        <div className="flex flex-wrap gap-2 mt-2 mb-3">
                          <span className="inline-flex items-center gap-1 px-3 py-1.5 rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 text-sm">
                            P
                            <button className="hover:text-red-500 text-xs">✕</button>
                          </span>
                          <span className="inline-flex items-center gap-1 px-3 py-1.5 rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 text-sm">
                            M
                            <button className="hover:text-red-500 text-xs">✕</button>
                          </span>
                          <span className="inline-flex items-center gap-1 px-3 py-1.5 rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 text-sm">
                            G
                            <button className="hover:text-red-500 text-xs">✕</button>
                          </span>
                        </div>
                        <div className="flex gap-2">
                          <Input
                            placeholder="Digite um valor e pressione Enter"
                            className="flex-1"
                          />
                          <Button type="button" variant="outline">
                            Adicionar
                          </Button>
                        </div>
                      </div>
                    </div>

                    {/* Botão Adicionar Novo Atributo */}
                    <Button 
                      variant="outline" 
                      className="w-full border-dashed border-2 add-attribute-btn"
                      type="button"
                    >
                      + Adicionar Novo Atributo
                    </Button>
                  </div>
                </div>

                {/* Seção: Configuração de Herança */}
                <div>
                  <h3 className="text-sm font-semibold text-foreground mb-4 flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-purple-500"></span>
                    Configuração de Herança
                  </h3>
                  <p className="text-xs text-muted-foreground mb-4">
                    Defina quais dados as variantes herdarão do produto pai
                  </p>
                  
                  <div className="grid gap-4 md:grid-cols-2">
                    <div className="flex items-center space-x-3 p-3 rounded-lg border border-border bg-muted/20">
                      <input type="checkbox" id="herdar-preco" defaultChecked className="w-4 h-4 rounded border-border" />
                      <Label htmlFor="herdar-preco" className="text-sm cursor-pointer flex-1">
                        Puxar Preço do Pai
                      </Label>
                    </div>
                    
                    <div className="flex items-center space-x-3 p-3 rounded-lg border border-border bg-muted/20">
                      <input type="checkbox" id="herdar-imagem" className="w-4 h-4 rounded border-border" />
                      <Label htmlFor="herdar-imagem" className="text-sm cursor-pointer flex-1">
                        Puxar Imagem do Pai
                      </Label>
                    </div>
                    
                    <div className="flex items-center space-x-3 p-3 rounded-lg border border-border bg-muted/20">
                      <input type="checkbox" id="herdar-estoque" defaultChecked className="w-4 h-4 rounded border-border" />
                      <Label htmlFor="herdar-estoque" className="text-sm cursor-pointer flex-1">
                        Puxar Estoque do Pai
                      </Label>
                    </div>
                    
                    <div className="flex items-center space-x-3 p-3 rounded-lg border border-border bg-muted/20">
                      <input type="checkbox" id="herdar-tributos" defaultChecked className="w-4 h-4 rounded border-border" />
                      <Label htmlFor="herdar-tributos" className="text-sm cursor-pointer flex-1">
                        Puxar Tributos do Pai
                      </Label>
                    </div>
                    
                    <div className="flex items-center space-x-3 p-3 rounded-lg border border-border bg-muted/20">
                      <input type="checkbox" id="herdar-peso" className="w-4 h-4 rounded border-border" />
                      <Label htmlFor="herdar-peso" className="text-sm cursor-pointer flex-1">
                        Puxar Peso/Dimensões do Pai
                      </Label>
                    </div>
                    
                    <div className="flex items-center space-x-3 p-3 rounded-lg border border-border bg-muted/20">
                      <input type="checkbox" id="herdar-descricao" className="w-4 h-4 rounded border-border" />
                      <Label htmlFor="herdar-descricao" className="text-sm cursor-pointer flex-1">
                        Puxar Descrição do Pai
                      </Label>
                    </div>
                  </div>
                </div>

                {/* Seção: Gerar Combinações */}
                <div>
                  <h3 className="text-sm font-semibold text-foreground mb-4 flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-purple-500"></span>
                    Gerar Combinações
                  </h3>
                  
                  <div className="p-6 border-2 border-dashed border-border rounded-lg bg-gradient-to-br from-purple-50 to-blue-50 dark:from-purple-950/20 dark:to-blue-950/20">
                    <div className="flex items-center justify-between mb-4">
                      <div>
                        <p className="text-sm font-medium text-foreground">
                          Combinações Possíveis
                        </p>
                        <p className="text-xs text-muted-foreground mt-1">
                          3 cores × 3 tamanhos = <span className="font-bold text-purple-600 dark:text-purple-400">9 variantes</span>
                        </p>
                      </div>
                      <Button 
                        className="bg-purple-600 hover:bg-purple-700 text-white"
                        type="button"
                      >
                        ⚡ Gerar Variantes
                      </Button>
                    </div>
                    
                    <div className="mt-4 p-4 bg-white dark:bg-gray-900 rounded-lg border border-border">
                      <p className="text-xs font-semibold text-muted-foreground mb-3">PREVIEW DAS VARIANTES:</p>
                      <div className="grid gap-2 max-h-40 overflow-y-auto variant-preview">
                        <div className="flex items-center gap-2 text-xs p-2 bg-muted/30 rounded">
                          <span className="px-2 py-0.5 bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 rounded">Vermelho</span>
                          <span>×</span>
                          <span className="px-2 py-0.5 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 rounded">P</span>
                        </div>
                        <div className="flex items-center gap-2 text-xs p-2 bg-muted/30 rounded">
                          <span className="px-2 py-0.5 bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 rounded">Vermelho</span>
                          <span>×</span>
                          <span className="px-2 py-0.5 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 rounded">M</span>
                        </div>
                        <div className="flex items-center gap-2 text-xs p-2 bg-muted/30 rounded">
                          <span className="px-2 py-0.5 bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 rounded">Vermelho</span>
                          <span>×</span>
                          <span className="px-2 py-0.5 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 rounded">G</span>
                        </div>
                        <div className="flex items-center gap-2 text-xs p-2 bg-muted/30 rounded">
                          <span className="px-2 py-0.5 bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 rounded">Branco</span>
                          <span>×</span>
                          <span className="px-2 py-0.5 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 rounded">P</span>
                        </div>
                        <div className="flex items-center gap-2 text-xs p-2 bg-muted/30 rounded">
                          <span className="px-2 py-0.5 bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 rounded">Branco</span>
                          <span>×</span>
                          <span className="px-2 py-0.5 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 rounded">M</span>
                        </div>
                        <div className="flex items-center gap-2 text-xs p-2 bg-muted/30 rounded">
                          <span className="px-2 py-0.5 bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 rounded">Branco</span>
                          <span>×</span>
                          <span className="px-2 py-0.5 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 rounded">G</span>
                        </div>
                        <div className="flex items-center gap-2 text-xs p-2 bg-muted/30 rounded">
                          <span className="px-2 py-0.5 bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 rounded">Azul</span>
                          <span>×</span>
                          <span className="px-2 py-0.5 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 rounded">P</span>
                        </div>
                        <div className="flex items-center gap-2 text-xs p-2 bg-muted/30 rounded">
                          <span className="px-2 py-0.5 bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 rounded">Azul</span>
                          <span>×</span>
                          <span className="px-2 py-0.5 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 rounded">M</span>
                        </div>
                        <div className="flex items-center gap-2 text-xs p-2 bg-muted/30 rounded">
                          <span className="px-2 py-0.5 bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 rounded">Azul</span>
                          <span>×</span>
                          <span className="px-2 py-0.5 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 rounded">G</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Info Footer */}
                <div className="p-4 bg-blue-50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-800 rounded-lg">
                  <div className="flex gap-3">
                    <span className="text-blue-600 dark:text-blue-400 text-xl">ℹ️</span>
                    <div>
                      <p className="text-sm font-medium text-blue-900 dark:text-blue-100">
                        Como funciona?
                      </p>
                      <p className="text-xs text-blue-700 dark:text-blue-300 mt-1">
                        1. Adicione atributos (Cor, Tamanho, etc) e seus valores<br />
                        2. Configure quais dados serão herdados do produto pai<br />
                        3. Clique em "Gerar Variantes" para criar automaticamente todas as combinações<br />
                        4. Edite individualmente cada variante após a geração, se necessário
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        )}
      </Tabs>
    </div>
  );
}

