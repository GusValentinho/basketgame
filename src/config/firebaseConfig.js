// Importa as funções necessárias do SDKs que você precisa
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// A configuração do Firebase do seu app web
const firebaseConfig = {
    apiKey: "AIzaSyAb5yJDCmc71J-7mvDZVWsWvQs8Kh3Sp3A",
    authDomain: "basketgameatack.firebaseapp.com",
    projectId: "basketgameatack",
    storageBucket: "basketgameatack.appspot.com",
    messagingSenderId: "341684952376",
    appId: "1:341684952376:web:8e71ee5f796c8da69975cd",
    measurementId: "G-EV9RE09XXF"
};

// Inicialize o Firebase
const app = initializeApp(firebaseConfig);

// Exporte a autenticação do Firebase para usar em outras partes do seu app
const auth = getAuth(app);

export { auth };
export default app;
