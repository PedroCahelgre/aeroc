# 🍕 Aero Pizza - Sistema de Pizzaria

Um sistema completo de pizzaria desenvolvido com tecnologias modernas, oferecendo uma experiência completa para gestão de pedidos, cardápio digital e área administrativa.

## ✨ Funcionalidades

### 👥 Para Clientes
- **📱 Cardápio Digital** - Navegação intuitiva pelos produtos com imagens e descrições
- **🛒 Carrinho de Compras** - Adicionar/remover produtos com quantidades
- **📋 Sistema de Pedidos** - Fazer pedidos online com diferentes formas de pagamento
- **📍 Delivery e Retirada** - Opções flexíveis de entrega
- **⏰ Acompanhamento em Tempo Real** - Status do pedido via Socket.IO

### 👨‍💼 Para Administradores
- **📊 Dashboard Completo** - Métricas e estatísticas em tempo real
- **🛍️ Gestão de Produtos** - CRUD completo com upload de imagens
- **👥 Gerenciamento de Usuários** - Controle de clientes e administradores
- **📈 Relatórios Avançados** - Analytics e relatórios financeiros
- **🔔 Notificações** - Sistema de notificações via WhatsApp/SMS
- **⚙️ Configurações do Sistema** - Personalização e backup

## 🛠️ Stack Tecnológico

### 🎯 Frontend
- **⚡ Next.js 15** - Framework React com App Router
- **📘 TypeScript 5** - Tipagem estática para maior confiabilidade
- **🎨 Tailwind CSS 4** - Framework CSS utilitário
- **🧩 shadcn/ui** - Componentes acessíveis baseados em Radix UI
- **🌈 Framer Motion** - Animações fluidas e interativas

### 🔧 Backend & Database
- **🗄️ Prisma ORM** - Gerenciamento de banco de dados type-safe
- **🗃️ SQLite** - Banco de dados local para desenvolvimento
- **🔐 NextAuth.js** - Sistema de autenticação completo
- **📡 Socket.IO** - Comunicação em tempo real

### 📱 UI/UX
- **🎯 Lucide React** - Biblioteca de ícones consistente
- **🌙 Next Themes** - Suporte a modo escuro/claro
- **📊 Recharts** - Visualizações de dados
- **🖱️ DND Kit** - Drag and drop moderno

## 🚀 Instalação e Uso

### Pré-requisitos
- Node.js 18+
- npm ou yarn

### Instalação

```bash
# Clone o repositório
git clone https://github.com/PedroCahelgre/aeroc.git
cd aeroc

# Instale as dependências
npm install

# Configure o banco de dados
npx prisma generate

# Execute o servidor de desenvolvimento
npm run dev
```

Acesse [http://localhost:3000](http://localhost:3000) para ver a aplicação.

### Scripts Disponíveis

```bash
# Desenvolvimento
npm run dev          # Servidor de desenvolvimento com hot reload
npm run build        # Build para produção
npm run start        # Servidor de produção
npm run lint         # Verificação de código

# Banco de dados
npm run db:push      # Sincroniza schema com banco
npm run db:generate  # Gera cliente Prisma
npm run db:migrate   # Migrações de banco
npm run db:reset     # Reset completo do banco
```

## 📁 Estrutura do Projeto

```
├── src/
│   ├── app/                 # Páginas Next.js (App Router)
│   │   ├── admin/          # Área administrativa
│   │   ├── api/            # API routes
│   │   ├── cardapio/       # Cardápio público
│   │   └── login-admin/    # Login administrativo
│   ├── components/         # Componentes React reutilizáveis
│   │   ├── admin/         # Componentes administrativos
│   │   └── ui/            # Componentes base (shadcn/ui)
│   ├── hooks/             # Hooks personalizados
│   └── lib/               # Utilitários e configurações
├── prisma/                # Schema e migrações do banco
├── public/                # Assets estáticos (imagens, etc.)
└── scripts/               # Scripts utilitários
```

## 🔧 Configuração

1. **Variáveis de Ambiente**
   - Copie `.env.example` para `.env`
   - Configure `DATABASE_URL` para seu banco de dados
   - Adicione outras variáveis conforme necessário

2. **Banco de Dados**
   - Execute `npx prisma db push` para criar as tabelas
   - Execute `npx prisma generate` para gerar o cliente

3. **Administrador Inicial**
   - Acesse `/login-admin` para criar o primeiro administrador
   - Use a rota `/api/init-admins` para inicializar admins via API

## 🌟 Principais Features

### 🍕 Cardápio Interativo
- Categorias organizadas
- Busca e filtros
- Imagens de alta qualidade
- Descrições detalhadas

### 📦 Sistema de Pedidos
- Carrinho persistente
- Múltiplas formas de pagamento (PIX, cartão, dinheiro)
- Agendamento de pedidos
- Histórico completo

### 🔄 Tempo Real
- Status dos pedidos via WebSocket
- Notificações push
- Dashboard administrativo atualizado automaticamente

### 📱 Responsivo
- Design mobile-first
- Interface adaptável
- Touch-friendly

## 🤝 Contribuição

1. Fork o projeto
2. Crie uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

## 📄 Licença

Este projeto está sob a licença MIT. Veja o arquivo `LICENSE` para mais detalhes.

## 🆘 Suporte

Para suporte e dúvidas:
- Abra uma issue no GitHub
- Entre em contato com a equipe de desenvolvimento

---

**Aero Pizza** - Sabor que voa até sua casa! 🚀🍕
