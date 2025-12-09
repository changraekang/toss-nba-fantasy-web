import React, { useState, useEffect } from 'react';
import { fetchRankings } from '../api/tossNbaFantasyClient';
import './RankingsPage.css';

const RankingsPage = () => {
  const [rankings, setRankings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedWeek, setSelectedWeek] = useState(null);

  useEffect(() => {
    loadRankings();
  }, [selectedWeek]);

  const loadRankings = async () => {
    try {
      setLoading(true);
      const result = await fetchRankings(selectedWeek);

      if (result.success) {
        setRankings(result.data);
      }
    } catch (error) {
      console.error('랭킹 로드 실패:', error);
      alert('랭킹을 불러오는 중 오류가 발생했습니다.');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="page">
        <div className="spinner"></div>
      </div>
    );
  }

  return (
    <div className="page rankings-page">
      <div className="page-header">
        <h1 className="page-title">Rankings</h1>
      </div>

      <div className="page-content">
        {rankings.length === 0 ? (
          <div className="empty-state">
            <p>아직 랭킹 데이터가 없습니다.</p>
          </div>
        ) : (
          <div className="rankings-list">
            {rankings.map((entry) => (
              <div key={entry.rank} className="ranking-item">
                <div className="rank-badge">{entry.rank}</div>
                <div className="ranking-info">
                  <div className="team-name">{entry.teamName}</div>
                  <div className="user-name">{entry.userName}</div>
                </div>
                <div className="ranking-score">
                  <div className="score-value">{entry.cumulative.toFixed(1)}</div>
                  <div className="score-label">Total</div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default RankingsPage;
