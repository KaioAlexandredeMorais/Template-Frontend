# Chronos Pomodoro API

API REST desenvolvida com Express + Prisma + MySQL para o projeto Chronos Pomodoro.

## Tecnologias

- Node.js + TypeScript
- Express
- Prisma ORM
- MySQL

## Como rodar

### Pré-requisitos
- Node.js instalado
- MySQL rodando (XAMPP ou similar)

### Instalação

```bash
npm install
```

### Configurar o banco

Crie um arquivo `.env` na raiz com:

```env
DATABASE_URL="mysql://root:@localhost:3306/pomodoro_db"
PORT=3333
```

### Rodar migrations

```bash
npx prisma migrate dev
```

### Iniciar servidor

```bash
npm run dev
```

API disponível em `http://localhost:3333`

---

## Endpoints

### Health

| Método | Rota | Descrição |
|--------|------|-----------|
| GET | `/health` | Verifica se a API está no ar |

**Resposta:**
```json
{ "ok": true }
```

---

### Settings

| Método | Rota | Descrição |
|--------|------|-----------|
| GET | `/settings` | Busca configurações do Pomodoro |
| PUT | `/settings` | Atualiza configurações |

**GET /settings — Resposta:**
```json
{
  "id": 1,
  "workTime": 25,
  "shortBreakTime": 5,
  "longBreakTime": 15,
  "updatedAt": "2026-05-21T23:06:05.683Z"
}
```

**PUT /settings — Body:**
```json
{
  "workTime": 30,
  "shortBreakTime": 10,
  "longBreakTime": 20
}
```

---

### Tasks

| Método | Rota | Descrição |
|--------|------|-----------|
| GET | `/tasks` | Lista todas as tasks |
| POST | `/tasks` | Cria uma nova task |
| PATCH | `/tasks/:id/complete` | Marca task como concluída |
| PATCH | `/tasks/:id/interrupt` | Marca task como interrompida |
| DELETE | `/tasks` | Remove todas as tasks |

**POST /tasks — Body:**
```json
{
  "id": "1716300000000",
  "name": "Estudar TypeScript",
  "duration": 25,
  "type": "workTime",
  "startDate": 1716300000000
}
```

**PATCH /tasks/:id/complete — Body:**
```json
{ "completeDate": 1716301500000 }
```

**PATCH /tasks/:id/interrupt — Body:**
```json
{ "interruptDate": 1716301500000 }
```

**GET /tasks — Resposta:**
```json
[
  {
    "id": "1716300000000",
    "name": "Estudar TypeScript",
    "duration": 25,
    "type": "workTime",
    "startDate": 1716300000000,
    "completeDate": 1716301500000,
    "interruptDate": null,
    "createdAt": "2026-05-21T23:06:05.683Z"
  }
]
```

---

## Códigos de resposta

| Código | Significado |
|--------|-------------|
| 200 | Sucesso |
| 201 | Criado com sucesso |
| 204 | Sem conteúdo (DELETE) |
| 400 | Dados inválidos |
| 500 | Erro interno |

---

## Testando com Postman

Importe a coleção ou crie um environment com:

- `baseUrl` = `http://localhost:3333`
- `taskId` = (preenchido após criar uma task)