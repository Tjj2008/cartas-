// src/PlayerHand.js
import React from 'react';

const PlayerHand = ({ hand }) => {
  return (
    <div>
      <h2>Tu mano</h2>
      <div>
        {hand.map((card, index) => (
          <span key={index} style={{ marginRight: '10px' }}>
            {card.rango} de {card.palo}
          </span>
        ))}
      </div>
    </div>
  );
};

export default PlayerHand;
