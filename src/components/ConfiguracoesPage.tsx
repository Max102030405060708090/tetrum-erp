import { User, Bell, Lock, Palette, Globe, Shield, Mail, Smartphone } from 'lucide-react';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from './ui/card';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Switch } from './ui/switch';
import { Avatar, AvatarFallback } from './ui/avatar';
import { Separator } from './ui/separator';

interface ConfiguracoesPageProps {
  darkMode: boolean;
  onThemeToggle: () => void;
}

export function ConfiguracoesPage({ darkMode, onThemeToggle }: ConfiguracoesPageProps) {
  return (
    <div className="p-4 md:p-6 space-y-4 md:space-y-6 max-w-full overflow-x-hidden pb-24 lg:pb-12">
      <div>
        <h1>Configurações</h1>
        <p className="mt-1">Gerencie suas preferências e informações da conta</p>
      </div>

      <div className="grid gap-4 md:gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
        <div className="md:col-span-2 space-y-6">
          <Card className="card-shadow border-border bg-card rounded-2xl">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <User className="h-5 w-5 text-[#7038FF] dark:text-[#E8DCFF]" />
                Informações da Conta
              </CardTitle>
              <CardDescription>Atualize suas informações pessoais</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center gap-4">
                <Avatar className="h-20 w-20 border-4 border-[#7038FF]">
                  <AvatarFallback className="bg-gradient-to-br from-[#7038FF] to-[#A47DFF] text-white text-2xl">
                    AD
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <Button variant="outline" className="border-border text-[#7038FF] dark:text-[#E8DCFF] hover:bg-[#E8DCFF] rounded-xl">
                    Alterar Foto
                  </Button>
                </div>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="firstName">Nome</Label>
                  <Input 
                    id="firstName" 
                    defaultValue="Admin" 
                    className="border-border focus:border-[#7038FF]"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="lastName">Sobrenome</Label>
                  <Input 
                    id="lastName" 
                    defaultValue="Tetrum" 
                    className="border-border focus:border-[#7038FF]"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">E-mail</Label>
                <Input 
                  id="email" 
                  type="email" 
                  defaultValue="admin@tetrum.com" 
                  className="border-border focus:border-[#7038FF]"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="phone">Telefone</Label>
                <Input 
                  id="phone" 
                  defaultValue="+55 11 99999-9999" 
                  className="border-border focus:border-[#7038FF]"
                />
              </div>

              <Button className="w-full bg-gradient-to-r from-[#7038FF] to-[#8A5EFF] hover:from-[#8A5EFF] hover:to-[#A47DFF] text-white shadow-lg shadow-[#7038FF]/30 rounded-xl">
                Salvar Alterações
              </Button>
            </CardContent>
          </Card>

          <Card className="card-shadow border-border bg-card rounded-2xl">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Lock className="h-5 w-5 text-[#7038FF] dark:text-[#E8DCFF]" />
                Segurança
              </CardTitle>
              <CardDescription>Altere sua senha e configurações de segurança</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="currentPassword">Senha Atual</Label>
                <Input 
                  id="currentPassword" 
                  type="password" 
                  className="border-border focus:border-[#7038FF]"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="newPassword">Nova Senha</Label>
                <Input 
                  id="newPassword" 
                  type="password" 
                  className="border-border focus:border-[#7038FF]"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="confirmPassword">Confirmar Nova Senha</Label>
                <Input 
                  id="confirmPassword" 
                  type="password" 
                  className="border-border focus:border-[#7038FF]"
                />
              </div>

              <Separator className="my-4" />

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Autenticação de Dois Fatores</Label>
                  <p className="text-sm text-[#666666] dark:text-[#a0a0a0]">
                    Adicione uma camada extra de segurança
                  </p>
                </div>
                <Switch />
              </div>

              <Button className="w-full bg-gradient-to-r from-[#7038FF] to-[#8A5EFF] hover:from-[#8A5EFF] hover:to-[#A47DFF] text-white shadow-lg shadow-[#7038FF]/30 rounded-xl">
                Atualizar Senha
              </Button>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-6">
          <Card className="card-shadow border-border bg-card rounded-2xl">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Palette className="h-5 w-5 text-[#7038FF] dark:text-[#E8DCFF]" />
                Aparência
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Modo Escuro</Label>
                  <p className="text-sm text-[#666666] dark:text-[#a0a0a0]">
                    Ativar tema escuro
                  </p>
                </div>
                <Switch checked={darkMode} onCheckedChange={onThemeToggle} />
              </div>

              <Separator />

              <div className="space-y-2">
                <Label>Cor de Destaque</Label>
                <div className="flex gap-2">
                  <button className="w-10 h-10 rounded-full bg-[#7038FF] ring-2 ring-[#7038FF] ring-offset-2" />
                  <button className="w-10 h-10 rounded-full bg-[#8A5EFF]" />
                  <button className="w-10 h-10 rounded-full bg-[#A47DFF]" />
                  <button className="w-10 h-10 rounded-full bg-[#BA9FFF]" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="card-shadow border-border bg-card rounded-2xl">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Bell className="h-5 w-5 text-[#7038FF] dark:text-[#E8DCFF]" />
                Notificações
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <div className="flex items-center gap-2">
                    <Mail className="h-4 w-4 text-[#7038FF] dark:text-[#E8DCFF]" />
                    <Label>E-mail</Label>
                  </div>
                  <p className="text-sm text-[#666666] dark:text-[#a0a0a0]">
                    Notificações por e-mail
                  </p>
                </div>
                <Switch defaultChecked />
              </div>

              <Separator />

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <div className="flex items-center gap-2">
                    <Smartphone className="h-4 w-4 text-[#7038FF] dark:text-[#E8DCFF]" />
                    <Label>Push</Label>
                  </div>
                  <p className="text-sm text-[#666666] dark:text-[#a0a0a0]">
                    Notificações push
                  </p>
                </div>
                <Switch defaultChecked />
              </div>

              <Separator />

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Vendas</Label>
                  <p className="text-sm text-[#666666] dark:text-[#a0a0a0]">
                    Novos pedidos
                  </p>
                </div>
                <Switch defaultChecked />
              </div>

              <Separator />

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Estoque</Label>
                  <p className="text-sm text-[#666666] dark:text-[#a0a0a0]">
                    Produtos em falta
                  </p>
                </div>
                <Switch defaultChecked />
              </div>
            </CardContent>
          </Card>

          <Card className="card-shadow border-border bg-card rounded-2xl">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Globe className="h-5 w-5 text-[#7038FF] dark:text-[#E8DCFF]" />
                Região
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label>Idioma</Label>
                <div className="text-sm text-[#666666] dark:text-[#a0a0a0]">
                  Português (Brasil)
                </div>
              </div>

              <Separator />

              <div className="space-y-2">
                <Label>Fuso Horário</Label>
                <div className="text-sm text-[#666666] dark:text-[#a0a0a0]">
                  (UTC-03:00) Brasília
                </div>
              </div>

              <Separator />

              <div className="space-y-2">
                <Label>Moeda</Label>
                <div className="text-sm text-[#666666] dark:text-[#a0a0a0]">
                  Real (BRL)
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
