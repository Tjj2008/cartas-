// src/App.js
import React, { useState, useEffect } from 'react';
import { crearMazo } from './Deck';
import PlayerHand from './PlayerHand';
import DealerHand from './DealerHand';
import './App.css';

function App() {
  const [mazo, setMazo] = useState([]);
  const [manoJugador, setManoJugador] = useState([]);
  const [manoCrupier, setManoCrupier] = useState([]);
  const [puntosJugador, setPuntosJugador] = useState(0);
  const [puntosCrupier, setPuntosCrupier] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [mensaje, setMensaje] = useState('');

  // Inicializar el juego al montar el componente
  useEffect(() => {
    iniciarJuego();
  }, []);

  const iniciarJuego = () => {
    const nuevoMazo = crearMazo();
    const manoJ = [nuevoMazo.pop(), nuevoMazo.pop()];
    const manoC = [nuevoMazo.pop(), nuevoMazo.pop()];
    
    setMazo(nuevoMazo);
    setManoJugador(manoJ);
    setManoCrupier(manoC);
    setPuntosJugador(calcularPuntos(manoJ));
    setPuntosCrupier(calcularPuntos(manoC));
    setGameOver(false);
    setMensaje('');
  };

  const calcularPuntos = (mano) => {
    let total = 0;
    mano.forEach(carta => {
      total += carta.valor;
    });
    return total;
  };

  const pedirCarta = () => {
    if (gameOver) return;

    if (mazo.length === 0) {
      setMensaje('No hay más cartas en el mazo.');
      return;
    }

    const nuevaCarta = mazo.pop();
    const nuevaMano = [...manoJugador, nuevaCarta];
    const nuevosPuntos = calcularPuntos(nuevaMano);
    setManoJugador(nuevaMano);
    setPuntosJugador(nuevosPuntos);
    setMazo([...mazo]);

    if (nuevosPuntos > 7.5) {
      setGameOver(true);
      setMensaje('Te has pasado de 7 y medio. ¡Pierdes!');
    } else if (nuevosPuntos === 7.5) {
      setGameOver(true);
      setMensaje('¡Tienes 7 y medio exactos! ¡Ganaste!');
    }
  };

  const plantarse = () => {
    if (gameOver) return;

    let nuevaManoCrupier = [...manoCrupier];
    let nuevosPuntosCrupier = calcularPuntos(nuevaManoCrupier);

    // El crupier debe pedir hasta tener al menos 5 puntos
    while (nuevosPuntosCrupier < 5) {
      if (mazo.length === 0) break;
      const carta = mazo.pop();
      nuevaManoCrupier.push(carta);
      nuevosPuntosCrupier = calcularPuntos(nuevaManoCrupier);
    }

    setManoCrupier(nuevaManoCrupier);
    setPuntosCrupier(nuevosPuntosCrupier);
    setMazo([...mazo]);
    determinarGanador(nuevosPuntosCrupier);
  };

  const determinarGanador = (puntosC) => {
    const pJ = puntosJugador;
    const pC = puntosC;

    if (pC > 7.5) {
      setMensaje('El crupier se ha pasado de 7 y medio. ¡Ganaste!');
    } else if (pJ > pC) {
      setMensaje('¡Ganaste!');
    } else if (pJ < pC) {
      setMensaje('El crupier gana.');
    } else {
      setMensaje('Empate.');
    }
    setGameOver(true);
  };

  const reiniciarJuego = () => {
    iniciarJuego();
  };

  return (
    <div className="App">
      <h1>Blackjack 7 y Medio</h1>
      <div className="manos">
        <PlayerHand hand={manoJugador} />
        <DealerHand hand={manoCrupier} mostrarTodas={gameOver} />
      </div>
      <div className="puntos">
        <p>Tus puntos: {puntosJugador}</p>
        {gameOver && <p>Puntos del crupier: {puntosCrupier}</p>}
      </div>
      <div className="controles">
        <button onClick={pedirCarta} disabled={gameOver}>Pedir Carta</button>
        <button onClick={plantarse} disabled={gameOver}>Plantarse</button>
        {gameOver && <button onClick={reiniciarJuego}>Reiniciar Juego</button>}
      </div>
      {mensaje && <h2>{mensaje}</h2>}
    </div>
  );
}

export default App;
