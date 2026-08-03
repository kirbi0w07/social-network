# 🌐 Social Network — Frontend

Frontend de una red social desarrollada con **Vue 3 + TypeScript**, enfocada en la interacción entre usuarios, publicación de contenido y comunicación en tiempo real.

El proyecto consume una API REST desarrollada con Laravel y utiliza **Laravel Reverb + Laravel Echo** para recibir eventos en tiempo real.

---

## 🚀 Tecnologías

* **Vue 3**
* **TypeScript**
* **Vite**
* **Pinia**
* **Vue Router**
* **Tailwind CSS**
* **Axios**
* **Laravel Echo**
* **Laravel Reverb**
* **Pusher JS**

---

## ✨ Funcionalidades

### 🔐 Autenticación

* Registro de usuarios
* Inicio de sesión
* Cierre de sesión
* Manejo de sesión mediante token
* Protección de rutas
* Persistencia de autenticación

### 👤 Perfiles

* Visualización del perfil propio
* Visualización de perfiles de otros usuarios
* Edición de información del perfil
* Cambio de fotografía de perfil
* Visualización de fotografías del perfil

### 📝 Publicaciones

* Crear publicaciones
* Adjuntar imágenes y videos
* Vista previa de archivos antes de publicar
* Visualización de contenido multimedia
* Modal para visualizar imágenes
* Navegación entre múltiples imágenes
* Reacciones
* Comentarios

### 🤝 Sistema de amistades

* Buscar usuarios
* Enviar solicitudes de amistad
* Aceptar solicitudes
* Rechazar solicitudes
* Mostrar el estado actual de la relación
* Actualización de botones según el estado de amistad

### 🔔 Notificaciones

El frontend cuenta con dos tipos de notificaciones:

**Notificaciones persistentes**

Las notificaciones obtenidas desde la API se almacenan y muestran en la interfaz.

**Notificaciones en tiempo real**

Mediante Laravel Echo y Laravel Reverb, el frontend permanece suscrito a un canal privado del usuario.

Cuando ocurre un evento, Vue recibe la información inmediatamente sin necesidad de recargar la página.

Por ejemplo:

```text
Usuario A
   │
   │ envía solicitud
   ▼
Laravel API
   │
   ├── Guarda solicitud
   ├── Crea notificación
   └── Emite evento
          │
          ▼
      Laravel Reverb
          │
          ▼
      Usuario B
          │
          ▼
     Vue + Echo
          │
          ▼
  Notificación en tiempo real
```

---

## 🧩 Arquitectura

El frontend está organizado separando responsabilidades entre vistas, componentes, stores y servicios.

```text
src/
├── components/
│   ├── layout/
│   └── ui/
│
├── views/
│
├── stores/
│   ├── auth.ts
│   ├── friends.ts
│   ├── notifications.ts
│   └── realtimeNotification.ts
│
├── services/
│   ├── AuthService.ts
│   ├── NotificationService.ts
│   ├── EchoService.ts
│   └── Realtime.ts
│
├── router/
│
└── types/
```

### Stores

**Pinia** se utiliza para manejar el estado global de la aplicación.

Entre otros estados:

* Usuario autenticado
* Token
* Notificaciones
* Solicitudes de amistad
* Notificaciones recibidas en tiempo real

### Services

Los servicios encapsulan las peticiones realizadas contra la API.

Esto permite mantener separada la lógica de comunicación HTTP de los componentes de Vue.

---

## ⚡ Comunicación en tiempo real

La aplicación utiliza:

```text
Vue
 │
 └── Laravel Echo
          │
          ▼
     Laravel Reverb
          │
          ▼
      Laravel API
```

El frontend se suscribe a un canal privado asociado al usuario:

```text
notifications.{userId}
```

Y escucha eventos específicos, por ejemplo:

```text
friend.request.created
friend.request.accepted
```

Esto permite que diferentes funcionalidades puedan reaccionar a eventos emitidos desde Laravel sin necesidad de realizar polling o recargar la página.

---

## 🔗 Backend

Este frontend trabaja junto con una API desarrollada en Laravel.

**Backend:**
`https://github.com/TU-USUARIO/social-network-api`

> Reemplaza el enlace anterior por la URL real de tu repositorio.

---

## ⚙️ Instalación

Clonar el proyecto:

```bash
git clone https://github.com/TU-USUARIO/social-network-frontend.git

cd social-network-frontend
```

Instalar dependencias:

```bash
npm install
```

Crear el archivo `.env`:

```env
VITE_API_URL=http://localhost:8000

VITE_REVERB_APP_KEY=your-key
VITE_REVERB_HOST=localhost
VITE_REVERB_PORT=8080
VITE_REVERB_SCHEME=http
```

Ejecutar el proyecto:

```bash
npm run dev
```

---

## 📌 Estado del proyecto

🚧 **En desarrollo**

Actualmente se encuentran implementadas funcionalidades de autenticación, perfiles, publicaciones, comentarios, reacciones, amistades, notificaciones y comunicación en tiempo real.

Se planea continuar ampliando el proyecto con funcionalidades de mensajería y otras características propias de una red social.

---

## 👨‍💻 Autor

**José Luis Barbosa Cepeda**

Desarrollador Web Full Stack especializado en **Vue.js + Laravel**.

Este proyecto forma parte de mi portafolio profesional y tiene como objetivo demostrar experiencia en desarrollo frontend, consumo de APIs, manejo de estado, autenticación y comunicación en tiempo real.
