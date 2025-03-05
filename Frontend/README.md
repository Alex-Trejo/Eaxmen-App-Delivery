# Consumo de variable global para pruebas

## Creación de archivo

Se debe crear un archivo estrictamente llamado ```Host.js``` el cual debe encontrarse en la ruta ```./Frontend```en el cual exista la siguiente información:

```javascript
export const host = 'http://localhost:5000';
```

Se debe cambiar el valor de ```localhost``` por la dirección IP en la que se ejecuta el servidor de backend.

## Importar

Para importar esta variable global se debe llamar al valor host de la siguiente manera:

```javascript
import { host } from 'ruta'

// Guardar dentro de otra variable
let variable = host;

// Cadena de texto
let str = "${host}";
```

La 'ruta' debe ser cambiada con el valor en el que se encuentra el archivo ```Host.js```