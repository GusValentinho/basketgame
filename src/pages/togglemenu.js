import React, { useState, useEffect } from 'react';

function ToggleMenu({ onExit }) {
  const [nickname, setNickname] = useState('');
  const [error, setError] = useState('');
  const [registeredNickname, setRegisteredNickname] = useState('');

  useEffect(() => {
    const savedNickname = localStorage.getItem('nickname');
    if (savedNickname) {
      setRegisteredNickname(savedNickname);
    }
  }, []); // O array vazio assegura que este efeito só será executado uma vez, após a montagem do componente

  // Função para registrar o nickname
  const handleRegister = () => {
    // Verifica se o nickname não está vazio
    if (!nickname) {
      setError('Por favor, insira um nickname');
      return;
    }

    // Salva o nickname no localStorage
    localStorage.setItem('nickname', nickname);

    // Atualiza o estado do nickname registrado
    setRegisteredNickname(nickname);

    // Limpa o campo de nickname
    setNickname('');
    setError('');
  };

  return (
    <div style={{ position: 'absolute', top: '0', left: '0', width: '100%', height: '100%', background: 'rgba(0, 0, 0, 0.8)', display: 'flex', justifyContent: 'center', alignItems: 'center', color: 'white' }}>
      <div style={{ textAlign: 'center' }}>
        <h2>Menu</h2>
        <div>
          <input type="text" placeholder="Nickname" value={nickname} onChange={(e) => setNickname(e.target.value)} />
          <button onClick={handleRegister} style={{ padding: '10px 20px', fontSize: '1rem', marginLeft: '10px' }}>Registrar Nickname</button>
        </div>
        {registeredNickname && <p>Nickname registrado: {registeredNickname}</p>} {/* Exibe o nickname registrado */}
        {error && <p style={{ color: 'red' }}>{error}</p>}
        <button onClick={onExit} style={{ padding: '10px 20px', fontSize: '1rem', marginTop: '20px' }}>Sair do Jogo</button>
        <button onClick={() => window.history.back()} style={{ padding: '10px 20px', fontSize: '1rem', marginTop: '10px' }}>Voltar ao Jogo</button>
      </div>
    </div>
  );
}

export default ToggleMenu;
