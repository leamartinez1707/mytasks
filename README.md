

# Taskbyte | Gestión de proyectos

<p align="center">
  <b>App full stack para gestión de proyectos, tareas y equipos</b><br/>
  <a href="https://taskbyte.vercel.app/landing">Ver landing de la demo</a> ·
  <a href="https://taskbyte.vercel.app/">Probar demo</a> ·
  <a href="https://github.com/leamartinez1707/mytasks-frontend">Código frontend</a> ·
  <a href="https://github.com/leamartinez1707/mytasks">Código backend</a>
</p>

Taskbyte es una aplicación web diseñada para facilitar la gestión de proyectos, tareas y colaboradores. Permite a los usuarios crear y organizar proyectos, asignar tareas a diferentes miembros del equipo y realizar un seguimiento del progreso de cada actividad. Desarrollada con React, TypeScript y Vite en el frontend, y utilizando Tailwind CSS para el diseño, Taskbyte ofrece una interfaz intuitiva y eficiente para optimizar el flujo de trabajo en equipos de cualquier tamaño.



---


## Screenshots


<div align="center">
  <img src="client/public/assets/desktopscreenshot.png" alt="Captura escritorio" width="500" />
  <img src="client/public/assets/tabletscreenshot.png" alt="Captura tablet" width="250" />
  <img src="client/public/assets/phonescreenshot.png" alt="Captura móvil" width="120" />
</div>



## Características principales


- Gestión de proyectos y tareas con drag & drop
- Asignación de colaboradores y roles
- Notificaciones y feedback visual moderno
- Responsive, dark mode y accesibilidad
- Autenticación segura y recuperación de cuenta


## Tecnologías principales


**Frontend:** React, React Query, TypeScript, Tailwind, ChakraUI, HeadlessUI, HeroIcons, DnD Kit

**Backend:** Express, TypeScript, MongoDB, JWT, Bcrypt, Nodemailer


## ¿Cómo correr el proyecto?

- Abre una terminal en tu máquina local.

- Navega al directorio donde deseas clonar el proyecto.

- Debes ejecutar dos comandos, uno para clonar el Frontend, y otro para el Backend

```
git clone https://github.com/leamartinez1707/mytasks-frontend.git

git clone https://github.com/leamartinez1707/mytasks.git

```

- Navegar hacía las carpetas para instalar dependencias, debes hacer lo mismo con ambos stacks:

```
cd mytasks-frontend
cd mytasks

```

Instalar dependencias:

```
npm install
```


Abre dos terminales, una en cada carpeta (client y server):

**Frontend**
```
cd client
npm install
npm run dev
```

**Backend**
```
cd server
npm install
npm run dev
```

**Opcional:**
Para desarrollo sin problemas de CORS, en el backend puedes usar:
```
npm run dev:api
```


---

## Contacto

- **Email:** leandromartinez.dev@gmail.com
- **Whatsapp:** [+59895220063](https://api.whatsapp.com/send?phone=59895220063&text=Hola%20Leandro!%20Me%20contacto%20contigo%20porque..)
