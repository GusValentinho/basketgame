import React from "react";

function MenuScreen({ onStartGame }) {
    return (
      <div className="menu-screen" id="menu-container">
        <h1>Mini Basquete!</h1>
        <p>Arraste a bola para arremessar e fazer cestas.</p>
        <button onClick={onStartGame}>Iniciar Jogo</button>
      </div>
    );
  }

  export default MenuScreen