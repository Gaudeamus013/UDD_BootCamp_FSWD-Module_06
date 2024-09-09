![Logo](https://github.com/Gaudeamus013/UDD_BootCamp_FSWD/blob/main/images/banner.png)

# Aplicación de Gestión de Notas

## Descripción

Esta es una aplicación backend de gestión de notas con autenticación de usuarios. Permite a los usuarios registrarse, iniciar sesión, y realizar operaciones CRUD (Crear, Leer, Actualizar, Eliminar) en sus notas personales.

## Características

- Autenticación de usuarios (registro, inicio de sesión, verificación de token)
- Gestión de notas (crear, leer, actualizar, eliminar)
- Protección de rutas con middleware de autenticación
- Conexión a base de datos MongoDB
- Manejo de errores centralizado

## Tecnologías Utilizadas

- Node.js
- Express.js
- MongoDB
- Mongoose
- JSON Web Tokens (JWT)
- bcryptjs

## Estructura del Proyecto

```
PROYECTO_GESTION_NOTAS
├── config
│   └── database.js
├── controllers
│   ├── noteController.js
│   └── userController.js
├── middleware
│   └── authMiddleware.js
├── models
│   ├── noteModel.js
│   └── userModel.js
├── routes
│   ├── noteRoutes.js
│   └── userRoutes.js
├── .env
├── .gitignore
├── package.json
├── README.md
└── server.js
```

## Configuración

1. Clona el repositorio:

```
git clone [https://github.com/Gaudeamus013/UDD_BootCamp_FSWD-Module_06.git](https://github.com/Gaudeamus013/UDD_BootCamp_FSWD-Module_06.git)
cd UDD_BootCamp_FSWD-Module_06
```

2. Instala las dependencias:

```
npm install
```


3. Crea un archivo `.env` en la raíz del proyecto y añade las siguientes variables de entorno:

```
PORT=5000
MONGO_URI=mongodb+srv://gaudeamus013:F3n1x013@cluster0.rfmtc.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0
JWT_SECRET=Machapalapachala
```

4. Asegúrate de tener MongoDB instalado y ejecutándose en tu sistema, o usa MongoDB Atlas para una base de datos en la nube.


## Ejecución

Para iniciar el servidor en modo de desarrollo:

```
npm run dev
```

Para iniciar el servidor en modo de producción:

```
npm start
```


## API Endpoints

### Usuarios

- `POST /api/users/register`: Registrar un nuevo usuario
- `POST /api/users/login`: Iniciar sesión
- `GET /api/users/verify`: Verificar token de usuario
- `PUT /api/users/update`: Actualizar información del usuario
- `GET /api/users`: Obtener todos los usuarios (protegido)

### Notas

- `POST /api/notes`: Crear una nueva nota
- `GET /api/notes`: Obtener todas las notas del usuario
- `GET /api/notes/:id`: Obtener una nota específica
- `PUT /api/notes/:id`: Actualizar una nota
- `DELETE /api/notes/:id`: Eliminar una nota

## Seguridad

- Las contraseñas se hashean antes de almacenarse en la base de datos.
- Las rutas protegidas requieren un token JWT válido.
- Se implementa manejo de errores para prevenir la exposición de información sensible.

## Contribución

Las contribuciones son bienvenidas. Por favor, abre un issue para discutir cambios mayores antes de crear un pull request.

## Licencia

Este proyecto está bajo la Licencia MIT. Ver el archivo `LICENSE` para más detalles.

## Autor

Este proyecto fue creado por [Gaudeamus013](https://github.com/Gaudeamus013).
