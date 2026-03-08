# Kwanza Stream

## Sobre o Projeto

Kwanza Stream é uma plataforma de streaming completa desenvolvida para oferecer uma experiência de vídeo sob demanda e transmissão ao vivo.

## Estrutura do Projeto

O projeto é um monorepo organizado em workspaces:

- **apps/server**: Servidor backend com API, streaming, pagamentos e administração
- **apps/web**: Aplicação web frontend
- **packages/shared-types**: Tipos compartilhados entre os projetos

## Tecnologias Principais

- **Backend**: Node.js, TypeScript, Prisma, Redis
- **Streaming**: Node Media Server
- **Pagamentos**: Integração com Multicaixa
- **Frontend**: React/TypeScript

## Funcionalidades

- Sistema de streaming de vídeo
- Gestão de usuários e autenticação
- Sistema de pagamentos integrado
- Painel administrativo
- API RESTful completa

## Documentação

Consulte os arquivos na pasta `docs/` para mais informações sobre:
- Arquitetura técnica
- Deploy e rollback
- Segurança
- Monitoramento
- Streaming

## Desenvolvimento

```bash
# Instalar dependências
npm install

# Executar em modo desenvolvimento
npm run dev

# Executar apenas o servidor
npm run dev:server

# Executar apenas o web
npm run dev:web

# Build
npm run build
```

## Licença

Projeto privado.
