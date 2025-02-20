# MrAppy: Backend

[![Node.js](https://img.shields.io/badge/Backend-Node.js-green)](https://nodejs.org/) [![Express](https://img.shields.io/badge/Framework-Express-yellow)](https://expressjs.com/) [![Sequelize](https://img.shields.io/badge/ORM-Sequelize-blue)](https://sequelize.org/) [![Status](https://img.shields.io/badge/Status-Development-orange)]()

## Descripción General
El backend de MrAppy proporciona la lógica del lado del servidor, manejando autenticación, gestión de equipos, reseñas y otros servicios esenciales para la funcionalidad de la aplicación.

---

## Tecnologías Utilizadas

### **Backend**
- **[Node.js](https://nodejs.org/):** Entorno de ejecución de JavaScript.
- **[Express](https://expressjs.com/):** Framework minimalista para servidores web.
- **[Sequelize](https://sequelize.org/):** ORM para gestionar la base de datos relacional.
- **[JWT](https://jwt.io/):** Manejo de tokens para autenticación segura.
- **[Nodemailer](https://nodemailer.com/):** Envío de correos electrónicos.

### **Base de Datos**
- MySQL: Base de datos relacional para almacenar información de usuarios, equipos, reseñas, entre otros.

---

## Estructura del Proyecto

```plaintext
src/
├── controllers/
│   ├── authController.js
│   ├── reviewController.js
│   ├── teamController.js
│   ├── testController.js
│   ├── userController.js
├── middlewares/
│   ├── authenticateToken.js
│   ├── upload.js
├── models/
│   ├── recoveryTokenModel.js
│   ├── reviewModel.js
│   ├── teamModel.js
│   ├── userModel.js
├── routes/
│   ├── authRoutes.js
│   ├── reviewRoutes.js
│   ├── teamRoutes.js
│   ├── testRoutes.js
│   ├── userRoutes.js
├── utils/
│   ├── sendEmail.js
│   ├── utils.js
├── validations/
│   ├── auth.Validation.js
│   ├── generic.Validation.js
├── db.js
├── index.js
```

---

## Funcionalidades Principales
- **Autenticación:**
  - Registro, inicio de sesión, cierre de sesión y recuperación de contraseñas.
  - Middleware para validación de tokens y control de acceso basado en roles.
- **Gestión de Equipos:**
  - Creación y gestión de equipos.
  - Manejo de invitaciones y asignación de roles.
- **Reseñas del Equipo:**
  - Creación y visualización de reseñas.
  - Integración con estados de ánimo y visibilidad para gerentes.
- **Subida de Archivos:**
  - Gestión de fotos de perfil y validaciones de tamaño/formato.

---

## Rutas Clave

### **Autenticación**
| Método | Endpoint            | Descripción                           |
|--------|---------------------|---------------------------------------|
| POST   | `/auth/register`    | Registro de nuevos usuarios           |
| POST   | `/auth/login`       | Inicio de sesión                      |
| POST   | `/auth/logout`      | Cierre de sesión                      |
| POST   | `/auth/forgot-password` | Solicitud de cambio de contraseña    |
| POST   | `/auth/change-password` | Cambio de contraseña                |

### **Equipos**
| Método | Endpoint            | Descripción                           |
|--------|---------------------|---------------------------------------|
| GET    | `/team/`            | Obtener detalles del equipo actual    |
| GET    | `/team/users`       | Obtener miembros del equipo actual    |
| GET    | `/team/:id_team`    | Obtener detalles de un equipo por ID  |

### **Reseñas**
| Método | Endpoint            | Descripción                           |
|--------|---------------------|---------------------------------------|
| GET    | `/review/`          | Obtener reseñas del usuario actual    |
| POST   | `/review/`          | Crear una nueva reseña                |

### **Usuarios**
| Método | Endpoint            | Descripción                           |
|--------|---------------------|---------------------------------------|
| GET    | `/user/`            | Obtener detalles del usuario actual   |
| POST   | `/user/upload-photo`| Subir foto de perfil                  |

---

## Instalación y Uso

### **Requisitos Previos**
- Node.js >= 14.x
- npm o yarn
- Base de datos MySQL

### **Pasos para Instalar**
1. Clonar el repositorio:
   ```bash
   git clone https://github.com/JordiLara/Backend-Mr-Appy.git
   ```
2. Instalar dependencias:
   ```bash
   npm install
   # o
   yarn install
   ```
3. Configurar variables de entorno:
   Crear un archivo `.env` basado en el ejemplo `.env.example` y completar con los datos necesarios (credenciales de base de datos, JWT_SECRET, etc.).

4. Inicializar la base de datos:
   ```bash
   npm run db:sync
   ```

5. Ejecutar el servidor:
   ```bash
   npm run start
   ```
6. El servidor estará disponible en:
   ```
   http://localhost:3000
   ```

---

## Contribución

Si quieres contribuir a este proyecto, por favor sigue estos pasos:

1. Haz un fork del repositorio.
2. Crea una nueva rama (`git checkout -b feature/nueva-funcionalidad`).
3. Haz tus cambios y haz un commit (`git commit -m "Agregué una nueva funcionalidad"`).
4. Envía tus cambios al repositorio remoto (`git push origin feature/nueva-funcionalidad`).
5. Crea un pull request para que tus cambios sean revisados.

---

Si tienes preguntas o comentarios, ¡no dudes en contactarnos! 😊


