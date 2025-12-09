import React, { useState, useEffect } from "react";
import styled from "styled-components";
import PlayerCard from "../components/PlayerCard";
import { tossNbaFantasyClient } from "../api/tossNbaFantasyClient";
import { Page, PageTitle, LoadingContainer } from "../components/common/Layout";

// Styled Components
const Header = styled.div`
  margin-bottom: ${({ theme }) => theme.spacing.lg};
`;

const HeaderRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: ${({ theme }) => theme.spacing.md};
`;

const Subtitle = styled.p`
  font-size: ${({ theme }) => theme.fontSizes.base};
  color: ${({ theme }) => theme.colors.textSecondary};
`;

const SelectedInfo = styled.div`
  background: ${({ theme, $overCap }) =>
    $overCap ? theme.colors.error : theme.colors.primary};
  color: white;
  padding: ${({ theme }) => theme.spacing.sm} ${({ theme }) => theme.spacing.md};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  font-weight: ${({ theme }) => theme.fontWeights.semibold};
  transition: all 0.2s;
`;

const FilterContainer = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spacing.sm};
  margin-bottom: ${({ theme }) => theme.spacing.lg};
  overflow-x: auto;
  padding-bottom: ${({ theme }) => theme.spacing.xs};

  /* 스크롤바 숨기기 */
  &::-webkit-scrollbar {
    display: none;
  }
  -ms-overflow-style: none;
  scrollbar-width: none;
`;

const FilterButton = styled.button`
  padding: ${({ theme }) => theme.spacing.sm} ${({ theme }) => theme.spacing.md};
  border-radius: ${({ theme }) => theme.borderRadius.full};
  font-size: ${({ theme }) => theme.fontSizes.sm};
  font-weight: ${({ theme }) => theme.fontWeights.medium};
  white-space: nowrap;
  transition: all 0.2s ease;

  ${({ $active, theme }) =>
    $active
      ? `
    background: ${theme.colors.primary};
    color: white;
  `
      : `
    background: ${theme.colors.backgroundDark};
    color: ${theme.colors.text};
  `}

  &:hover {
    opacity: 0.8;
  }
`;

const PlayerGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: ${({ theme }) => theme.spacing.md};

  @media (max-width: 1024px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (max-width: 640px) {
    grid-template-columns: 1fr;
  }
`;

const ErrorText = styled.div`
  text-align: center;
  padding: ${({ theme }) => theme.spacing.xl};
  color: ${({ theme }) => theme.colors.error};
`;

// Constants
const SALARY_CAP = 100; // 기본 샐러리캡

// Component
const PlayersPage = () => {
  const [players, setPlayers] = useState([]);
  const [filteredPlayers, setFilteredPlayers] = useState([]);
  const [selectedPlayers, setSelectedPlayers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedPosition, setSelectedPosition] = useState("ALL");

  const positions = ["ALL", "G", "F", "C"];

  useEffect(() => {
    fetchPlayers();
  }, []);

  useEffect(() => {
    if (selectedPosition === "ALL") {
      setFilteredPlayers(players);
    } else {
      setFilteredPlayers(
        players.filter((p) => p.position === selectedPosition)
      );
    }
  }, [selectedPosition, players]);

  const fetchPlayers = async () => {
    try {
      setLoading(true);
      const data = await tossNbaFantasyClient.getPlayers();
      console.log("📊 선수 데이터:", data);
      console.log("💰 첫 번째 선수 salary:", data[0]?.salary);
      setPlayers(data);
      setFilteredPlayers(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handlePlayerClick = (player) => {
    setSelectedPlayers((prev) => {
      const isSelected = prev.find((p) => p.id === player.id);
      if (isSelected) {
        // 선택 해제
        return prev.filter((p) => p.id !== player.id);
      } else {
        // 샐러리캡 체크
        const currentTotal = prev.reduce((sum, p) => sum + (p.salary || 0), 0);
        const newTotalSalary = currentTotal + (player.salary || 0);

        if (newTotalSalary > SALARY_CAP) {
          alert(
            `샐러리캡을 초과했습니다!\n현재: $${currentTotal}M\n추가하려는 선수: $${player.salary}M\n합계: $${newTotalSalary}M\n샐러리캡: $${SALARY_CAP}M`
          );
          return prev;
        }

        return [...prev, player];
      }
    });
  };

  const isSelected = (playerId) => {
    return selectedPlayers.some((p) => p.id === playerId);
  };

  const totalSalary = selectedPlayers.reduce(
    (sum, p) => sum + (p.salary || 0),
    0
  );

  const remainingSalary = SALARY_CAP - totalSalary;
  const isOverCap = totalSalary > SALARY_CAP;

  if (loading) {
    return (
      <Page>
        <LoadingContainer>선수 목록을 불러오는 중...</LoadingContainer>
      </Page>
    );
  }

  if (error) {
    return (
      <Page>
        <ErrorText>오류: {error}</ErrorText>
      </Page>
    );
  }

  return (
    <Page>
      <Header>
        <PageTitle>선수 선택</PageTitle>
        <HeaderRow>
          <Subtitle>{filteredPlayers.length}명의 선수</Subtitle>
          {selectedPlayers.length > 0 && (
            <SelectedInfo $overCap={isOverCap}>
              {selectedPlayers.length}명 선택 · ${totalSalary}M / $
              {SALARY_CAP}M
              {isOverCap && ` (초과: $${Math.abs(remainingSalary)}M)`}
              {!isOverCap && ` (남음: $${remainingSalary}M)`}
            </SelectedInfo>
          )}
        </HeaderRow>
      </Header>

      <FilterContainer>
        {positions.map((pos) => (
          <FilterButton
            key={pos}
            $active={selectedPosition === pos}
            onClick={() => setSelectedPosition(pos)}
          >
            {pos === "ALL" ? "전체" : pos}
          </FilterButton>
        ))}
      </FilterContainer>

      <PlayerGrid>
        {filteredPlayers.map((player) => (
          <PlayerCard
            key={player.id}
            player={player}
            selected={isSelected(player.id)}
            onClick={() => handlePlayerClick(player)}
          />
        ))}
      </PlayerGrid>
    </Page>
  );
};

export default PlayersPage;
