import { useState, useEffect, useRef } from 'react';
import './App.css';
import logo from './img/baskethoop.png';
import ball from './img/ball.png';
import MenuScreen from "./pages/menu";

function BasqueteGame() {
  const [isGameStarted, setIsGameStarted] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false); // Verifica se o menu está aberto ou fechado
  const [pontuacao, setPontuacao] = useState(0);
  const [bolaposicao, setBolaposicao] = useState({ x: 45, y: 90 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStartPosition, setDragStartPosition] = useState({ x: 0, y: 0 });
  const [initialBallPosition, setInitialBallPosition] = useState({ x: 45, y: 90 });
  const cestaPosicao = { x: 45, y: 10 }; // Posição fixa da cesta
  const animationFrameId = useRef(null);

  const handleMouseDown = (event) => {
    event.preventDefault();
    setIsDragging(true);
    setDragStartPosition({ x: event.clientX, y: event.clientY });
    setInitialBallPosition(bolaposicao);
  };

  const handleMouseMove = (event) => {
    if (isDragging) {
      event.preventDefault();
      setBolaposicao({
        x: initialBallPosition.x + (event.clientX - dragStartPosition.x) / window.innerWidth * 100,
        y: initialBallPosition.y + (event.clientY - dragStartPosition.y) / window.innerHeight * 100,
      });
    }
  };

  const handleMouseUp = (event) => {
    if (isDragging) {
      setIsDragging(false);
      const dragEndPosition = { x: event.clientX, y: event.clientY };
      handleShoot(dragStartPosition, dragEndPosition);
    }
  };

  const handleTouchStart = (event) => {
    const touch = event.touches[0];
    event.preventDefault();
    setIsDragging(true);
    setDragStartPosition({ x: touch.clientX, y: touch.clientY });
    setInitialBallPosition(bolaposicao);
  };

  const handleTouchMove = (event) => {
    if (isDragging) {
      const touch = event.touches[0];
      event.preventDefault();
      setBolaposicao({
        x: initialBallPosition.x + (touch.clientX - dragStartPosition.x) / window.innerWidth * 100,
        y: initialBallPosition.y + (touch.clientY - dragStartPosition.y) / window.innerHeight * 100,
      });
    }
  };

  const handleTouchEnd = (event) => {
    if (isDragging) {
      setIsDragging(false);
      const touch = event.changedTouches[0];
      const dragEndPosition = { x: touch.clientX, y: touch.clientY };
      handleShoot(dragStartPosition, dragEndPosition);
    }
  };

  const handleShoot = (start, end) => {
    const deltaX = end.x - start.x;
    const deltaY = end.y - start.y;
    const velocityX = deltaX / 50;
    const velocityY = deltaY / 50; // Ajustar velocidade de arremesso

    const updatePosition = (x, y, velX, velY) => {
      setBolaposicao({ x, y });

      // Verifica se a bola acertou a cesta
      if (Math.abs(x - cestaPosicao.x) < 10 && Math.abs(y - cestaPosicao.y) < 10) {
        setPontuacao(prevPontuacao => prevPontuacao + 1);
        cancelAnimationFrame(animationFrameId.current);
        setBolaposicao({ x: 45, y: 90 });
        return;
      }

      // Verifica se a bola saiu dos limites
      if (y > 100 || x < 0 || x > 100 || y < 0) {
        cancelAnimationFrame(animationFrameId.current);
        setBolaposicao({ x: 45, y: 90 });
        setPontuacao(0); // Zera a pontuação caso a bola erre a cesta
        return;
      }

      animationFrameId.current = requestAnimationFrame(() => updatePosition(x + velX, y + velY, velX, velY));
    };

    updatePosition(bolaposicao.x, bolaposicao.y, velocityX, velocityY);
  };

  useEffect(() => {
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', handleMouseUp);
    window.addEventListener('touchmove', handleTouchMove);
    window.addEventListener('touchend', handleTouchEnd);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('touchend', handleTouchEnd);
    };
  }, [isDragging]);

  const resetGame = () => {
    setPontuacao(0);
    setBolaposicao({ x: 45, y: 90 });
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleStartGame = () => {
    setIsGameStarted(true);
    setIsMenuOpen(false);
  };

  return (
    <div id="game-container">
      {isGameStarted ? (
        <>
          {isMenuOpen ? (
            <MenuScreen onStartGame={handleStartGame} />
          ) : (
            <>
              <GameBoard bolaposicao={bolaposicao} cestaPosicao={cestaPosicao} handleMouseDown={handleMouseDown} handleTouchStart={handleTouchStart} />
              <Pontuacao pontuacao={pontuacao} />
              <Controles toggleMenu={toggleMenu} />
            </>
          )}
        </>
      ) : (
        <MenuScreen onStartGame={handleStartGame} />
      )}
    </div>
  );
}

// Renderizando objetos
function GameBoard({ bolaposicao, cestaPosicao, handleMouseDown, handleTouchStart }) {
  return (
    <div style={{ position: 'relative', width: '100%', height: '100%' }}>
      <img  
        src={logo}
        alt="Cesta"
        className="basket" 
        style={{ left: `${cestaPosicao.x}%`, top: `${cestaPosicao.y}%` }}
      />
      <img
        src={ball}
        alt="Bola"
        className="ball"
        style={{ left: `${bolaposicao.x}%`, top: `${bolaposicao.y}%` }}
        onMouseDown={handleMouseDown}
        onTouchStart={handleTouchStart}
      />
    </div>
  );
}

function Pontuacao({ pontuacao }) {
  return <div style={{ position: 'absolute', top: '10px', right: '10px', fontSize: '1.5rem' }}>Pontos: {pontuacao}</div>;
}

function Controles({ toggleMenu }) {
  return (
    <div style={{ position: 'absolute', bottom: '5px', left: '2%', transform: 'translateX(-5%)', borderRadius:'rounded' }}>
      <button onClick={toggleMenu} style={{ padding: '10px 20px', fontSize: '1rem' }}>Abrir Menu</button>
    </div>
  );
}

export default BasqueteGame;
