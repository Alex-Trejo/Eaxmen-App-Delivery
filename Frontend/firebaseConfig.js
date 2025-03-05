import { initializeApp } from 'firebase/app';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: "AIzaSyCe1NH-F8J8bxHOef6kUgEf1XQTxfklaFY",
  authDomain: "el-sabor-dorado.firebaseapp.com",
  projectId: "el-sabor-dorado",
  storageBucket: "el-sabor-dorado.firebasestorage.app",
  messagingSenderId: "238844500703",
  appId: "1:238844500703:web:b909c5f5b4db8b2614e76a",
};

const app = initializeApp(firebaseConfig);

const storage = getStorage(app);

export { storage };