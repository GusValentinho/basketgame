import React, { useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth"; // Importe a função de criação de usuário do Firebase Auth
import { auth } from "../config/firebaseConfig";

function Cadastro({ onClose }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [cadastroSucesso, setCadastroSucesso] = useState(false);

  const handleSignUp = async () => {
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      console.log("User created:", user);
      setCadastroSucesso(true); // Define o estado para indicar que o cadastro foi bem-sucedido
      setError(""); // Limpa qualquer mensagem de erro anterior
      setTimeout(onClose, 2000); // Fecha a página de cadastro após 2 segundos
    } catch (error) {
      setError(error.message);
      setCadastroSucesso(false); // Certifica-se de que a mensagem de sucesso não é mostrada em caso de erro
    }
  };

  return (
    <div>
      <h2>Cadastro</h2>
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
      <button onClick={handleSignUp}>Cadastrar</button>
      <button onClick={onClose}>Fechar</button>
      
      {cadastroSucesso && <p style={{ color: 'green' }}>Cadastro realizado com sucesso!</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
  );
}

export default Cadastro;
