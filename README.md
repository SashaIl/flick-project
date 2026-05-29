#  Flick Guide

> AI-powered movie discovery platform — find films through natural language search, not endless scrolling.

[![Demo](https://img.youtube.com/vi/h3DmSenW1XY/maxresdefault.jpg)](https://www.youtube.com/watch?v=h3DmSenW1XY)

---

##  About

**Flick Guide** is a full-stack web application that helps users discover movies using AI-powered search. Instead of browsing through categories, you describe what you're in the mood for — and the AI finds it for you.

---

##  Architecture

```
flick-guide/
├── ui/movies_service_ui/          # React + TypeScript (frontend)
├── api/                           # ASP.NET Core Web API (backend)
└── ai/                            # Python / Django (AI microservice)
```
---

##  Tech Stack

### Frontend — `client/`
| Technology | Purpose |
|---|---|
| React + TypeScript | UI framework |

### Backend — `server/`
| Technology | Purpose |
|---|---|
| ASP.NET Core Web API | REST API |
| Entity Framework Core | ORM / database access |
| SQL Server | Primary database |
| JWT | Authentication & authorization |
| SMTP | Email confirmation codes |
| External Movie API | Movie metadata (e.g. TMDB) |

### AI Service — `ai-service/`
| Technology | Purpose |
|---|---|
| Python + Django | AI microservice framework |
| OpenAI API | Natural language movie search |

---

##  Features

-  **Authentication** — Register/login with JWT access tokens
-  **Email verification** — Confirmation code sent to email on registration
-  **AI-powered search** — Describe what you want to watch in plain language
-  **Movie data** — Rich metadata pulled from an external movie API
-  **Persistent storage** — All user data stored in a relational database

---

##  Running the Project

### Prerequisites
 
- [Docker Desktop](https://www.docker.com/products/docker-desktop/) (with Docker Engine running)

### Steps

**1. Start Docker Engine** before doing anything else.

**2. Fill in your credentials** in two config files:

- `api/api/secrets.json` — backend secrets (JWT, email, database, movie API key, etc.)
- `ai/aiApi/config.json` — AI service config (OpenAI API key, etc.)

Both files are already present in the repository — just open them and replace the placeholder values with your own.

**3.** In your terminal, navigate to the folder where `docker-compose.yml` is located and run:

```bash
docker compose up
```

> The first launch may take a few minutes while Docker builds all the images.

**4.** Once everything is up, open your browser and go to:

```
http://localhost:80
```

That's it!

---

##  Project Structure

```
flick-guide/
│
├── ai/                          # Python / Django AI microservice
│   ├── aiApi/                   # Django project root
│   ├── Dockerfile
│   ├── requirements.txt
│   └── config.json              # ← AI service credentials (fill before running)
│
├── api/                         # ASP.NET Core Web API
│   ├── api/                     # Main API project
│   │   ├── Controllers/
│   │   ├── Properties/
│   │   ├── appsettings.json
│   │   ├── appsettings.Development.json
│   │   ├── Program.cs
│   │   └── secrets.json         # ← Backend credentials (fill before running)
│   ├── api.Application/
│   ├── api.Domain/
│   ├── api.Infrastructure/
│   ├── api.Persistance/
│   ├── api.sln
│   └── Dockerfile
│
├── ui/movies_service_ui/        # React + TypeScript frontend
│   ├── src/
│   ├── public/
│   ├── nginx.conf
│   ├── package.json
│   ├── tailwind.config.js
│   └── Dockerfile
│
├── run_with_docker/
└── docker-compose.yml
```

