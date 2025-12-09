import React, { useState, useEffect } from 'react';
import { fetchMyTeam, fetchPlayers, saveMyTeam } from '../api/tossNbaFantasyClient';
import PositionSlot from '../components/PositionSlot';
import PlayerCard from '../components/PlayerCard';
import './MyTeamPage.css';

const SLOTS = ['G', 'G', 'F', 'F', 'C', 'C', 'UTIL', 'UTIL', 'UTIL', 'UTIL'];

const MyTeamPage = () => {
  const [team, setTeam] = useState(null);
  const [players, setPlayers] = useState([]);
  const [rosters, setRosters] = useState({});
  const [isEditing, setIsEditing] = useState(false);
  const [selectedSlot, setSelectedSlot] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      setLoading(true);
      const [teamRes, playersRes] = await Promise.all([
        fetchMyTeam(),
        fetchPlayers(),
      ]);

      if (teamRes.success && teamRes.data) {
        setTeam(teamRes.data);
        // 로스터를 슬롯별로 매핑
        const rosterMap = {};
        teamRes.data.rosters?.forEach((roster) => {
          rosterMap[roster.slot] = roster.player;
        });
        setRosters(rosterMap);
      }

      if (playersRes.success) {
        setPlayers(playersRes.data);
      }
    } catch (error) {
      console.error('데이터 로드 실패:', error);
      alert('데이터를 불러오는 중 오류가 발생했습니다.');
    } finally {
      setLoading(false);
    }
  };

  const handleSlotClick = (slot) => {
    if (!isEditing) return;
    setSelectedSlot(slot);
  };

  const handlePlayerSelect = (player) => {
    if (!selectedSlot) return;

    setRosters((prev) => ({
      ...prev,
      [selectedSlot]: player,
    }));
    setSelectedSlot(null);
  };

  const handleSave = async () => {
    try {
      setSaving(true);

      // 로스터 배열 생성
      const rosterArray = SLOTS.map((slot, idx) => ({
        slot: `${slot}_${idx}`, // 중복 슬롯 구분을 위해 인덱스 추가
        playerId: rosters[`${slot}_${idx}`]?.id || null,
      })).filter((r) => r.playerId);

      if (rosterArray.length !== 10) {
        alert('10명의 선수를 모두 선택해주세요.');
        return;
      }

      const payload = {
        teamName: team?.name || 'My Team',
        rosters: rosterArray,
      };

      const result = await saveMyTeam(payload);

      if (result.success) {
        alert('팀이 저장되었습니다!');
        setIsEditing(false);
        loadData();
      }
    } catch (error) {
      console.error('팀 저장 실패:', error);
      alert('팀 저장 중 오류가 발생했습니다.');
    } finally {
      setSaving(false);
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
    <div className="page my-team-page">
      <div className="page-header">
        <h1 className="page-title">My Team</h1>
        {!isEditing ? (
          <button className="btn btn-primary" onClick={() => setIsEditing(true)}>
            팀 편집
          </button>
        ) : (
          <div className="header-actions">
            <button className="btn btn-secondary" onClick={() => setIsEditing(false)}>
              취소
            </button>
            <button
              className="btn btn-primary"
              onClick={handleSave}
              disabled={saving}
            >
              {saving ? '저장 중...' : '저장'}
            </button>
          </div>
        )}
      </div>

      <div className="page-content">
        {/* 로스터 그리드 */}
        <div className="roster-grid">
          {SLOTS.map((slot, idx) => {
            const slotKey = `${slot}_${idx}`;
            return (
              <PositionSlot
                key={slotKey}
                slot={slot}
                player={rosters[slotKey]}
                onClick={() => handleSlotClick(slotKey)}
              />
            );
          })}
        </div>

        {/* 선수 선택 모달 */}
        {isEditing && selectedSlot && (
          <div className="player-selection-modal">
            <div className="modal-content">
              <div className="modal-header">
                <h2>선수 선택 ({selectedSlot})</h2>
                <button
                  className="modal-close"
                  onClick={() => setSelectedSlot(null)}
                >
                  ✕
                </button>
              </div>
              <div className="modal-body">
                {players.map((player) => (
                  <PlayerCard
                    key={player.id}
                    player={player}
                    onSelect={handlePlayerSelect}
                  />
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default MyTeamPage;
