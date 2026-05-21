

# Taskbyte | Gestion de proyectos y tareas

Taskbyte es una app full stack para gestionar proyectos, tareas y equipos en un solo lugar.

- Landing: https://taskbyte.vercel.app/landing
- Demo: https://taskbyte.vercel.app/
- Frontend repo: https://github.com/leamartinez1707/mytasks-frontend
- Backend repo: https://github.com/leamartinez1707/mytasks

## Nota importante (cold start)

El backend esta desplegado en un servidor gratuito.
La primera peticion puede demorar entre 40 y 50 segundos.
Si tarda en responder, espera unos segundos y vuelve a intentar.

## Que incluye el proyecto

- Gestion de proyectos (crear, editar y eliminar)
- Tablero de tareas por estado (drag and drop)
- Gestion de equipo por proyecto
- Autenticacion con JWT
- Confirmacion de cuenta y recuperacion de password por email
- UI responsive

## Stack

- Frontend: React, TypeScript, Vite, Tailwind, React Query, React Hook Form
- Backend: Node.js, Express, TypeScript, MongoDB (Mongoose), JWT, Nodemailer

## Estructura general

- `mytasks` -> repo backend (API en `server/`)
- `mytasks-frontend` -> repo frontend

## Instalacion local (paso a paso)

1. Clonar ambos repositorios:

```bash
git clone https://github.com/leamartinez1707/mytasks.git
git clone https://github.com/leamartinez1707/mytasks-frontend.git
```

2. Instalar dependencias:

```bash
# Backend
cd mytasks/server
npm install

# Frontend
cd ../../mytasks-frontend
npm install
```

3. Configurar variables de entorno.

Backend (`mytasks/server/.env`):

```env
PORT=3000
DB_URL=mongodb+srv://...
FRONTEND_URL=http://localhost:5173
JWT_SECRET=tu_clave_secreta
MAIL_USER=tu_email@gmail.com
MAIL_PASSWORD=tu_password_o_app_password
```

Frontend (`mytasks-frontend/.env`):

```env
VITE_API_URL=http://localhost:3000/api
```

4. Ejecutar en desarrollo (dos terminales):

```bash
# Terminal 1 (backend)
cd mytasks/server
npm run dev

# Terminal 2 (frontend)
cd mytasks-frontend
npm run dev
```

5. Abrir en navegador:

- Frontend: http://localhost:5173
- API base: http://localhost:3000/api

## Scripts utiles

Backend (`mytasks/server`):

- `npm run dev` -> modo desarrollo
- `npm run dev:api` -> permite pruebas de CORS en desarrollo
- `npm run build` -> compila TypeScript
- `npm start` -> ejecuta build en `dist`

Frontend (`mytasks-frontend`):

- `npm run dev` -> modo desarrollo
- `npm run build` -> build de produccion
- `npm run preview` -> previsualizar build
- `npm run lint` -> lint del proyecto

## Contacto

- [Email - leandromartinez.dev@gmail.com](leandromartinez.dev@gmail.com)
- [Whatsapp - 095220063](https://api.whatsapp.com/send?phone=59895220063&text=Hola%20Leandro!%20Me%20contacto%20contigo%20porque..)