import React from 'react';
import './PlayerCard.css';

const PlayerCard = ({ player, onSelect, isSelected }) => {
  const { name, nbaTeam, position, photoUrl, tags } = player;

  const tagList = tags ? tags.split(',') : [];

  return (
    <div
      className={`player-card ${isSelected ? 'selected' : ''}`}
      onClick={() => onSelect && onSelect(player)}
    >
      <div className="player-image">
        {photoUrl ? (
          <img src={photoUrl} alt={name} />
        ) : (
          <div className="player-image-placeholder">
            {name.charAt(0)}
          </div>
        )}
      </div>
      <div className="player-info">
        <div className="player-name">{name}</div>
        <div className="player-meta">
          <span className="player-team">{nbaTeam}</span>
          <span className="player-position">{position}</span>
        </div>
        {tagList.length > 0 && (
          <div className="player-tags">
            {tagList.map((tag, idx) => (
              <span key={idx} className="tag">
                {tag.trim()}
              </span>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default PlayerCard;
