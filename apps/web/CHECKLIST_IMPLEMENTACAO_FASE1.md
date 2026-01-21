# Checklist Detalhado - Fase 1: Autenticação & Backend

## Fase 1: Semanas 1-3 (Backend & Autenticação)

Esta fase estabelece a base técnica da plataforma. Prioridade: Backend funcional com autenticação real.

---

## SEMANA 1: Setup Backend & Database

### Backend Setup (Node.js + Express)
- [ ] Criar repositório backend separado
- [ ] Setup project Node.js (npm init, package.json)
- [ ] Instalar dependências principais:
  ```
  npm install express cors dotenv body-parser helmet morgan
  npm install typescript @types/node ts-node ts-loader
  npm install nodemon (dev dependency)
  ```
- [ ] Estrutura de pastas:
  ```
  src/
  ├── config/
  ├── controllers/
  ├── middleware/
  ├── routes/
  ├── services/
  ├── utils/
  ├── types/
  └── index.ts
  ```
- [ ] Configurar tsconfig.json
- [ ] Criar .env.example com variáveis:
  ```
  DATABASE_URL=postgresql://...
  REDIS_URL=redis://...
  JWT_SECRET=your-secret
  OTP_SERVICE_KEY=...
  PORT=5000
  NODE_ENV=development
  ```
- [ ] Criar app.ts com setup básico Express
- [ ] Setup middleware (cors, bodyParser, logger)
- [ ] Criar health check endpoint: GET /health

### Database Setup (PostgreSQL)
- [ ] Provisionar PostgreSQL (AWS RDS ou local)
- [ ] Criar banco de dados "kwanza_dev"
- [ ] Instalar client PostgreSQL:
  ```
  npm install pg typeorm typeorm-cli
  ```
- [ ] Criar primeiro schema:
  ```sql
  CREATE TABLE users (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    phone VARCHAR(20) UNIQUE NOT NULL,
    email VARCHAR(255),
    password_hash VARCHAR(255) NOT NULL,
    full_name VARCHAR(255),
    avatar_url VARCHAR(500),
    balance DECIMAL(15,2) DEFAULT 0,
    user_type ENUM('viewer', 'creator', 'admin') DEFAULT 'viewer',
    status ENUM('active', 'suspended', 'deleted') DEFAULT 'active',
    kyc_verified BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    INDEX idx_phone (phone),
    INDEX idx_email (email),
    INDEX idx_created_at (created_at)
  );

  CREATE TABLE otp_codes (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    phone VARCHAR(20) NOT NULL,
    code VARCHAR(6) NOT NULL,
    expires_at TIMESTAMP NOT NULL,
    attempts INT DEFAULT 0,
    verified BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    INDEX idx_phone_expires (phone, expires_at)
  );

  CREATE TABLE audit_logs (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES users(id),
    action VARCHAR(100) NOT NULL,
    details JSONB,
    ip_address VARCHAR(50),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    INDEX idx_user_id (user_id),
    INDEX idx_created_at (created_at)
  );
  ```
- [ ] Setup migrations com TypeORM
- [ ] Test connection com banco

### Redis Setup
- [ ] Provisionar Redis (Redis Cloud ou local)
- [ ] Instalar cliente:
  ```
  npm install redis
  ```
- [ ] Criar Redis client singleton
- [ ] Test connection

---

## SEMANA 2: Autenticação (OTP + JWT)

### OTP Service (SMS)
- [ ] Setup conta Twilio OU Afrika's Talking
- [ ] Criar service OTP:
  ```typescript
  // src/services/otp.service.ts
  class OTPService {
    async sendOTP(phone: string): Promise<void>
    async verifyOTP(phone: string, code: string): Promise<boolean>
    async generateOTP(): string
  }
  ```
- [ ] Rate limiting para envio OTP:
  - Max 5 tentativas por telefone por dia
  - Cooldown de 60 segundos entre envios
- [ ] Test OTP com número real (seu telefone)

### JWT & Session Management
- [ ] Instalar dependências:
  ```
  npm install jsonwebtoken bcryptjs
  npm install @types/jsonwebtoken @types/bcryptjs
  ```
- [ ] Criar JWT service:
  ```typescript
  // src/services/jwt.service.ts
  class JWTService {
    generateToken(userId: string): string
    generateRefreshToken(userId: string): string
    verifyToken(token: string): JWTPayload
    revokeToken(token: string): void
  }
  ```
- [ ] Implementar refresh token rotation
- [ ] Criar middleware de autenticação:
  ```typescript
  // src/middleware/auth.middleware.ts
  async function authMiddleware(req, res, next)
  ```
- [ ] Test JWT flow completo

### Auth Endpoints
- [ ] POST /auth/request-otp
  ```
  Body: { phone: "+244..." }
  Response: { success: true, message: "OTP sent" }
  ```
  - Validar formato telefone Angola
  - Rate limit: 5 por dia
  - Gerar + enviar OTP
  - Armazenar em DB + Redis (TTL: 10 min)

- [ ] POST /auth/verify-otp
  ```
  Body: { phone: "+244...", code: "123456" }
  Response: { 
    success: true, 
    accessToken: "jwt...",
    refreshToken: "jwt...",
    user: { id, phone, name }
  }
  ```
  - Validar OTP existe e não expirou
  - Verificar não foi usado
  - Marcar como usado
  - Gerar JWT tokens
  - Log em audit_logs
  - Retornar user data

- [ ] POST /auth/signup
  ```
  Body: { 
    phone: "+244...",
    code: "123456",
    fullName: "João Silva"
  }
  Response: { accessToken, refreshToken, user }
  ```
  - Verificar OTP
  - Criar usuário novo
  - Hash password (bcrypt rounds: 12)
  - Gerar tokens
  - Send welcome email (fake para MVP)

- [ ] POST /auth/login
  ```
  Body: { phone: "+244...", password: "..." }
  Response: { accessToken, refreshToken, user }
  ```
  - Encontrar user por phone
  - Compare password com hash (bcrypt)
  - Gerar tokens
  - Log em audit_logs

- [ ] POST /auth/refresh-token
  ```
  Body: { refreshToken: "jwt..." }
  Response: { accessToken, refreshToken }
  ```
  - Validar refresh token
  - Gerar novo access token
  - Opcionalmente gerar novo refresh token

- [ ] POST /auth/logout
  ```
  Headers: { Authorization: "Bearer jwt..." }
  Response: { success: true }
  ```
  - Revoke token em Redis
  - Log em audit_logs

### Middleware & Validation
- [ ] Criar validator para phone (Angola +244)
- [ ] Rate limiting middleware:
  ```
  npm install express-rate-limit
  ```
- [ ] Error handling middleware global
- [ ] Logging middleware (morgan)

---

## SEMANA 3: Testes & Documentação

### Unit Tests (Auth)
- [ ] Setup Jest:
  ```
  npm install jest @types/jest ts-jest
  npm install --save-dev @types/jest
  ```
- [ ] Criar testes para:
  - [ ] OTPService.generateOTP()
  - [ ] JWTService.generateToken()
  - [ ] authMiddleware()
  - [ ] Rate limiter
  
- [ ] Exemplos de testes:
  ```typescript
  describe('OTPService', () => {
    test('generateOTP() returns 6 digit code', () => {
      const otp = otpService.generateOTP();
      expect(otp).toMatch(/^\d{6}$/);
    });
  });
  ```

### Integration Tests
- [ ] Test POST /auth/request-otp
  - Deve enviar OTP para número válido
  - Deve rejeitar número inválido
  - Deve aplicar rate limit

- [ ] Test POST /auth/verify-otp
  - Deve gerar tokens com OTP correto
  - Deve rejeitar OTP errado
  - Deve rejeitar OTP expirado

- [ ] Test POST /auth/signup
  - Deve criar novo user
  - Deve rejeitar duplicate phone
  - Deve retornar tokens válidos

- [ ] Test middleware auth
  - Deve permitir requisição com JWT válido
  - Deve rejeitar sem JWT
  - Deve rejeitar JWT expirado

### API Documentation
- [ ] Setup Swagger:
  ```
  npm install swagger-ui-express swagger-jsdoc
  ```
- [ ] Documentar todos endpoints em Swagger
- [ ] Criar README com:
  - Setup instructions
  - Environment variables
  - How to run locally
  - API endpoints summary

### CI/CD Setup
- [ ] Setup GitHub Actions workflow:
  ```yaml
  name: Tests
  on: [push, pull_request]
  jobs:
    test:
      runs-on: ubuntu-latest
      steps:
        - uses: actions/checkout@v2
        - uses: actions/setup-node@v2
        - run: npm ci
        - run: npm test
        - run: npm run build
  ```
- [ ] Add pre-commit hooks (husky):
  ```
  npm install husky lint-staged
  ```

### Bug Fixes & Refinement
- [ ] Fix any failing tests
- [ ] Security audit:
  - [ ] No secrets in code
  - [ ] No SQL injection vulnerabilities
  - [ ] Password hashing proper
  - [ ] Rate limiting working
  - [ ] CORS configured

- [ ] Performance check:
  - [ ] OTP endpoint < 500ms
  - [ ] Login endpoint < 500ms
  - [ ] JWT verification < 50ms
  - [ ] Database queries indexed

- [ ] Final testing com frontend:
  - [ ] Connect Next.js app a este backend
  - [ ] Test login flow completo
  - [ ] Armazenar JWT em localStorage
  - [ ] Usar JWT em requests subsequentes

---

## Deliverables Fase 1

### Code
- [ ] Backend repo com código pronto para produção
- [ ] Database migrations e schema
- [ ] Auth endpoints 100% funcionando
- [ ] Tests passando (>80% coverage)
- [ ] CI/CD pipeline configurado

### Documentation
- [ ] API documentation (Swagger)
- [ ] README com setup instructions
- [ ] Architecture diagram
- [ ] Database schema docs
- [ ] Postman collection com endpoints

### Infrastructure
- [ ] PostgreSQL database provisioned
- [ ] Redis instance provisioned
- [ ] Staging environment ready
- [ ] Backup strategy em place
- [ ] Monitoring alerts configured

### Testing Checklist
- [ ] 100+ OTP codes gerados e testados
- [ ] Todos endpoints retornam 200/400/401
- [ ] Rate limiting funciona
- [ ] JWT tokens válidos
- [ ] Erros tratados gracefully
- [ ] Logs aparecem corretamente

---

## Tecnologias & Versões

```
Node.js: v20.x LTS
Express: 4.18.x
PostgreSQL: 15.x
Redis: 7.x
TypeScript: 5.x
Jest: 29.x
Docker: 24.x
```

---

## Estimativa de Horas

| Tarefa | Horas | Pessoa |
|--------|-------|--------|
| Backend Setup | 8 | Dev 1 |
| Database Schema | 6 | Dev 1 |
| OTP Service | 10 | Dev 2 |
| JWT & Auth | 12 | Dev 2 |
| Auth Endpoints | 12 | Dev 1 |
| Testing | 14 | Dev 3 |
| CI/CD | 6 | DevOps |
| Docs | 4 | Dev 1 |
| **TOTAL** | **72 horas** | |

**Timeline: 3 pessoas x 3 semanas = 9 semanas-pessoa ≈ 2 semanas com team**

---

## Como Começar HOJE

1. **Setup inicial:**
   ```bash
   mkdir kwanza-stream-backend
   cd kwanza-stream-backend
   npm init -y
   npm install express cors dotenv typescript @types/node
   ```

2. **Primeiro endpoint:**
   ```typescript
   // src/index.ts
   import express from 'express';
   const app = express();
   app.use(express.json());
   
   app.get('/health', (req, res) => {
     res.json({ status: 'ok' });
   });
   
   app.listen(5000, () => {
     console.log('Server running on port 5000');
   });
   ```

3. **Run:**
   ```bash
   npx ts-node src/index.ts
   # Visit http://localhost:5000/health
   ```

4. **Próximo passo:** Conectar ao PostgreSQL (semana 1)

---

## Fase 1 está pronta para começar!
