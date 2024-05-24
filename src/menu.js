import React, { useState } from "react";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import app from "./config/firebaseConfig"; // Importa configuração do Firebase
import Cadastro from "./pages/cadastro";
import { Link } from 'react-router-dom';
import App from "./pages/App";

function MenuScreen({ onStartGame }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [mostrarCadastro, setMostrarCadastro] = useState(false);
  const [fazerLogin, setFazerLogin] = useState(true);

  const auth = getAuth(app);

  const handleSignUp = async () => {
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      console.log("User created:", user);
      setMostrarCadastro(false); // Fecha a página de cadastro após cadastro bem-sucedido
      setError(""); // Limpa qualquer mensagem de erro anterior
    } catch (error) {
      setError(error.message);
    }
  };

  const handleSignIn = async () => {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.password;
      console.log("SingIn:", user);
      onStartGame(); // Inicia o jogo após a autenticação bem-sucedida
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div className="menu-screen" id="menu-container">
      <h1>Mini Basquete!</h1>
      <p>Arraste a bola para arremessar e fazer cestas.</p>

      {/* Email and Password Input */}
      <form>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Senha"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </form>

      {/* Button for Sign In */}
      <button onClick={handleSignIn}>Entrar</button>

      {/* Button to start the game */}
      <button onClick={onStartGame}>Iniciar Jogo</button>

      {/* Button to navigate to Cadastro */}
      <div>
        {mostrarCadastro ? (
          <Cadastro onClose={() => setMostrarCadastro(false)} />
        ) : (
          <button onClick={() => setMostrarCadastro(true)}>Cadastro</button>
        )}
      </div>

      {/* Error Message */}
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
  );
}

export default MenuScreen;
