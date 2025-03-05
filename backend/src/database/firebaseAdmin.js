import admin from 'firebase-admin'
import path from 'path'

// Ruta correcta al archivo JSON
const serviceAccount = await import(path.resolve(__dirname, '../../adminCredential.json'), {
  assert: { type: 'json' }
})

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount.default)
})

export default admin
