import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { tossNbaFantasyClient } from "../api/tossNbaFantasyClient";
import PositionSlot from "../components/PositionSlot";
import PlayerCard from "../components/PlayerCard";
import { Page, PageHeader, PageTitle, LoadingContainer } from "../components/common/Layout";
import { Button } from "../components/common/Button";

// Styled Components

const HeaderActions = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spacing.xs};
`;

const PageContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.lg};
`;

const RosterGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: ${({ theme }) => theme.spacing.sm};
  margin-bottom: ${({ theme }) => theme.spacing.md};

  @media (max-width: 640px) {
    grid-template-columns: 1fr;
  }
`;

const Modal = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  z-index: 1000;
  display: flex;
  align-items: flex-end;
`;

const ModalContent = styled.div`
  background: white;
  width: 100%;
  max-width: ${({ theme }) => theme.maxWidth};
  margin: 0 auto;
  border-radius: ${({ theme }) => theme.borderRadius.lg}
    ${({ theme }) => theme.borderRadius.lg} 0 0;
  max-height: 80vh;
  display: flex;
  flex-direction: column;
`;

const ModalHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: ${({ theme }) => theme.spacing.md};
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};
`;

const ModalTitle = styled.h2`
  font-size: ${({ theme }) => theme.fontSizes.xl};
  font-weight: ${({ theme }) => theme.fontWeights.bold};
  margin: 0;
`;

const ModalClose = styled.button`
  background: none;
  border: none;
  font-size: 24px;
  cursor: pointer;
  color: ${({ theme }) => theme.colors.textSecondary};
  padding: 0;
  width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;

  &:hover {
    opacity: 0.7;
  }
`;

const ModalBody = styled.div`
  flex: 1;
  overflow-y: auto;
  padding: ${({ theme }) => theme.spacing.md};
`;

// Constants
const SLOTS = ["G", "G", "F", "F", "C", "C", "UTIL", "UTIL", "UTIL", "UTIL"];

// Component
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
      const [teamData, playersData] = await Promise.all([
        tossNbaFantasyClient.getMyTeam(),
        tossNbaFantasyClient.getPlayers(),
      ]);

      if (teamData) {
        setTeam(teamData);
        // 로스터를 슬롯별로 매핑
        const rosterMap = {};
        teamData.rosters?.forEach((roster) => {
          rosterMap[roster.slot] = roster.player;
        });
        setRosters(rosterMap);
      }

      setPlayers(playersData);
    } catch (error) {
      console.error("데이터 로드 실패:", error);
      alert("데이터를 불러오는 중 오류가 발생했습니다.");
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
        slot: `${slot}_${idx}`,
        playerId: rosters[`${slot}_${idx}`]?.id || null,
      })).filter((r) => r.playerId);

      if (rosterArray.length !== 10) {
        alert("10명의 선수를 모두 선택해주세요.");
        return;
      }

      const payload = {
        teamName: team?.name || "My Team",
        rosters: rosterArray,
      };

      await tossNbaFantasyClient.saveMyTeam(payload);
      alert("팀이 저장되었습니다!");
      setIsEditing(false);
      loadData();
    } catch (error) {
      console.error("팀 저장 실패:", error);
      alert("팀 저장 중 오류가 발생했습니다.");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <Page>
        <LoadingContainer>선수 목록을 불러오는 중...</LoadingContainer>
      </Page>
    );
  }

  return (
    <Page>
      <PageHeader>
        <PageTitle>My Team</PageTitle>
        {!isEditing ? (
          <Button $variant="primary" onClick={() => setIsEditing(true)}>
            팀 편집
          </Button>
        ) : (
          <HeaderActions>
            <Button onClick={() => setIsEditing(false)}>취소</Button>
            <Button $variant="primary" onClick={handleSave} disabled={saving}>
              {saving ? "저장 중..." : "저장"}
            </Button>
          </HeaderActions>
        )}
      </PageHeader>

      <PageContent>
        <RosterGrid>
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
        </RosterGrid>

        {isEditing && selectedSlot && (
          <Modal onClick={() => setSelectedSlot(null)}>
            <ModalContent onClick={(e) => e.stopPropagation()}>
              <ModalHeader>
                <ModalTitle>선수 선택 ({selectedSlot})</ModalTitle>
                <ModalClose onClick={() => setSelectedSlot(null)}>
                  ✕
                </ModalClose>
              </ModalHeader>
              <ModalBody>
                {players.map((player) => (
                  <PlayerCard
                    key={player.id}
                    player={player}
                    onClick={() => handlePlayerSelect(player)}
                  />
                ))}
              </ModalBody>
            </ModalContent>
          </Modal>
        )}
      </PageContent>
    </Page>
  );
};

export default MyTeamPage;
