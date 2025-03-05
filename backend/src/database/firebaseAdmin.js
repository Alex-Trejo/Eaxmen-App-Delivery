import admin from 'firebase-admin';
import { createRequire } from 'module';
import { fileURLToPath } from 'url';
import path from 'path';

// Obtener la ruta del directorio actual en ESM
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Cargar el archivo JSON manualmente con createRequire
const require = createRequire(import.meta.url);
const serviceAccount = require(path.join(__dirname, '../../adminCredential.json'));

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
});

export default admin;
