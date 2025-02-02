// src/firebaseConfig.js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBfEorI9MzulaIXRYYhtAGgq3AJnUXK6nk", // Chave de API da Web
  authDomain: "ifood-caced.firebaseapp.com", // Domínio de autenticação (geralmente é o ID do projeto + ".firebaseapp.com")
  projectId: "ifood-caced", // Código do projeto
  storageBucket: "ifood-caced.appspot.com", // Bucket de armazenamento (geralmente é o ID do projeto + ".appspot.com")
  messagingSenderId: "SEU_MESSAGING_SENDER_ID", // ID do remetente de mensagens (você precisa encontrar esse valor no Console do Firebase)
  appId: "SEU_APP_ID", // ID do aplicativo (você precisa encontrar esse valor no Console do Firebase)
};


const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
