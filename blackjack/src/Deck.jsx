// src/Deck.js
export const crearMazo = () => {
    const palos = ['oros', 'copas', 'espadas', 'bastos'];
    const rangos = [1, 2, 3, 4, 5, 6, 7, 'J', 'Q', 'K'];
    
    let mazo = [];
    
    palos.forEach(palo => {
      rangos.forEach(rango => {
        mazo.push({
          palo,
          rango,
          valor: obtenerValor(rango)
        });
      });
    });
    
    return barajarMazo(mazo);
  };
  
  const obtenerValor = (rango) => {
    if (typeof rango === 'number') {
      return rango;
    } else {
      return 0.5;
    }
  };
  
  const barajarMazo = (mazo) => {
    // Algoritmo de barajado de Fisher-Yates
    for (let i = mazo.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [mazo[i], mazo[j]] = [mazo[j], mazo[i]];
    }
    return mazo;
  };
  