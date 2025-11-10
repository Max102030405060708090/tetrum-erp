import { useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';

interface LoginPageProps {
  onLogin: () => void;
}

export function LoginPage({ onLogin }: LoginPageProps) {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validar credenciais
    if (email === 'root' && password === 'root') {
      setError('');
      onLogin();
    } else {
      setError('Credenciais inválidas. Use: root / root');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4" style={{ background: 'linear-gradient(135deg, #E8DCFF 0%, #D2BFFF 50%, #BA9FFF 100%)' }}>
      <div className="w-full max-w-md">
        <div className="bg-white rounded-3xl p-8 space-y-6" style={{ boxShadow: '0 20px 60px rgba(112, 56, 255, 0.2)' }}>
          <div className="text-center space-y-3">
            <div className="flex justify-center mb-2">
              <div className="w-20 h-20 rounded-3xl flex items-center justify-center" style={{ background: 'linear-gradient(135deg, #7038FF 0%, #A47DFF 100%)', boxShadow: '0 8px 24px rgba(112, 56, 255, 0.4)' }}>
                <span className="text-white text-3xl">T</span>
              </div>
            </div>
            <h1 style={{ background: 'linear-gradient(135deg, #7038FF 0%, #A47DFF 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
              Tetrum ERP
            </h1>
            <p style={{ color: '#666666' }}>
              Faça login para continuar
            </p>
            <div className="px-4 py-2 rounded-lg" style={{ backgroundColor: 'rgba(112, 56, 255, 0.1)', border: '1px solid rgba(112, 56, 255, 0.2)' }}>
              <p className="text-xs" style={{ color: '#7038FF' }}>
                <strong>Login:</strong> root | <strong>Senha:</strong> root
              </p>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            {error && (
              <div className="px-4 py-3 rounded-xl bg-red-50" style={{ border: '1px solid #fecaca' }}>
                <p className="text-sm text-red-600">{error}</p>
              </div>
            )}

            <div className="space-y-2">
              <Label htmlFor="email" style={{ color: '#333333' }}>
                Login
              </Label>
              <Input
                id="email"
                type="text"
                placeholder="root"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="h-12 rounded-xl"
                style={{ borderColor: '#D2BFFF' }}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="password" style={{ color: '#333333' }}>
                Senha
              </Label>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="h-12 rounded-xl pr-12"
                  style={{ borderColor: '#D2BFFF' }}
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 transition-colors"
                  style={{ color: '#7038FF' }}
                >
                  {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between text-sm">
              <label className="flex items-center gap-2 cursor-pointer">
                <input type="checkbox" className="w-4 h-4 rounded" style={{ accentColor: '#7038FF' }} />
                <span style={{ color: '#666666' }}>Lembrar-me</span>
              </label>
              <a href="#" className="transition-colors" style={{ color: '#7038FF' }}>
                Esqueci a senha
              </a>
            </div>

            <Button
              type="submit"
              className="w-full h-12 rounded-xl text-white transition-all hover:scale-[1.02]"
              style={{ background: 'linear-gradient(135deg, #7038FF 0%, #8A5EFF 100%)', boxShadow: '0 4px 16px rgba(112, 56, 255, 0.3)' }}
            >
              Entrar
            </Button>
          </form>

          <div className="text-center text-sm" style={{ color: '#666666' }}>
            Não tem uma conta?{' '}
            <a href="#" className="transition-colors" style={{ color: '#7038FF' }}>
              Cadastre-se
            </a>
          </div>
        </div>

        <p className="text-center mt-6 text-sm" style={{ color: '#666666' }}>
          © 2025 Tetrum ERP. Todos os direitos reservados.
        </p>
      </div>
    </div>
  );
}
