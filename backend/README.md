# Proyecto de Backend con Node.js y Axios

Este proyecto es un ejemplo de cómo consumir una API activa en un servidor local creado con Node.js utilizando Axios. La API incluye varias rutas y métodos HTTP (GET, POST, PUT, PATCH, DELETE).

## Instalación

Primero instala las dependencias necesarias:

```bash
npm install
npm install axios
```
Previo a la ejecución del servidor, se debe tener en cuenta que la API a consumir debe estar activa. Para ello, se debe ejecutar el siguiente comando en la terminal:

```bash
npm start
```

En caso de querer ejecutar el servidor en modo desarrollo, se debe ejecutar el siguiente comando:

```bash
npm run dev
```

## Rutas y métodos HTTP

Para consumir la API, se debe utilizar el siguiente endpoint:

```bash
http://localhost:5000/api
```

Se recomienda escribir la dirección IP del servidor en lugar de "localhost" para evitar problemas de conexión. Para realizar esto puede utilizar el siguiente comando en la terminal y usar la dirección IPV4 que se muestra en la salida del comando:

```bash
ipconfig
```

### Rutas

- /users
- /auth
- /lunch

### Métodos HTTP

- GET
- POST
- PUT
- PATCH
- DELETE

## Uso

Para consumir la API, se debe utilizar un cliente HTTP como Postman o usar Thunder Client si utiliza VS Code. A continuación, se muestra un ejemplo de cómo consumir la API con Axios:

Método GET:
```javascript
const axios = require('axios');

axios.get('http://localhost:5000/api/users')
  .then(response => {
    console.log(response.data);
  })
  .catch(error => {
    console.error(error);
  });
```
Método POST:
```javascript
const axios = require('axios');

axios.post('http://localhost:5000/api/auth/login', {
  email,
  password,
});
```

Método PUT:
```javascript
const axios = require('axios');

axios.put('http://localhost:5000/api/users/:id', {
  name,
  email,
  password,
});
```

Método PATCH:
```javascript
const axios = require('axios');

axios.patch('http://localhost:5000/api/users/:id', {
  email,
});
```

Método DELETE:
```javascript
const axios = require('axios');

axios.delete('http://localhost:5000/api/users/:id');
```

## Consumo de la API para almuerzos

Para consumir la API de almuerzos, se debe tener en cuenta que se debe enviar la categoría del almuerzo en la petición. A continuación, se muestra un ejemplo de cómo consumir la API de almuerzos con Axios segun la categoría del almuerzo:

```javascript
const axios = require('axios');

axios.get('http://localhost:5000/api/lunches/category/:category', {
})
  .then(response => {
    console.log(response.data);
  })
  .catch(error => {
    console.error(error);
  });
```

Se debe cambiar ":category" por las categorías de almuerzos disponibles son las siguientes:

- SOPA
- SEGUNDO
- POSTRE

## Autor

- [Alejandro Andrade](https://github.com/MrBowis)