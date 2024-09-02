// src/DealerHand.js
import React from 'react';

const DealerHand = ({ hand, mostrarTodas }) => {
  return (
    <div>
      <h2>Mano del Crupier</h2>
      <div>
        {hand.map((card, index) => (
          <span key={index} style={{ marginRight: '10px' }}>
            {mostrarTodas || index !== 0 ? `${card.rango} de ${card.palo}` : 'Carta Oculta'}
          </span>
        ))}
      </div>
    </div>
  );
};

export default DealerHand;
