import React from 'react';
import './PositionSlot.css';

const PositionSlot = ({ slot, player, onClick }) => {
  return (
    <div className="position-slot" onClick={onClick}>
      <div className="slot-label">{slot}</div>
      {player ? (
        <div className="slot-player">
          <div className="slot-player-name">{player.name}</div>
          <div className="slot-player-team">{player.nbaTeam}</div>
        </div>
      ) : (
        <div className="slot-empty">선수 선택</div>
      )}
    </div>
  );
};

export default PositionSlot;
