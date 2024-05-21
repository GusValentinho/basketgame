import React from "react";

function toggleMenu({ isMenuOpen }) {
    return (
      <div className="menu-screen" id="menu-container">
        <h1>Mini Basquete!</h1>
        <p>Arraste a bola para arremessar e fazer cestas.</p>
        <button onClick={isMenuOpen}>Iniciar Jogo</button>
      </div>
    );
  }

  export default toggleMenu