import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { tossNbaFantasyClient } from "../api/tossNbaFantasyClient";
import { Page, PageHeader, PageTitle, EmptyState, LoadingContainer } from "../components/common/Layout";

// Styled Components

const RankingsList = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.sm};
`;

const RankingItem = styled.div`
  display: flex;
  align-items: center;
  background: ${({ theme }) => theme.colors.background};
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  padding: ${({ theme }) => theme.spacing.md};
  box-shadow: ${({ theme }) => theme.shadows.sm};
`;

const RankBadge = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: ${({ theme }) => theme.colors.primary};
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: ${({ theme }) => theme.fontSizes.lg};
  font-weight: ${({ theme }) => theme.fontWeights.bold};
  margin-right: ${({ theme }) => theme.spacing.md};
  flex-shrink: 0;
`;

const RankingInfo = styled.div`
  flex: 1;
`;

const TeamName = styled.div`
  font-size: ${({ theme }) => theme.fontSizes.base};
  font-weight: ${({ theme }) => theme.fontWeights.semibold};
  color: ${({ theme }) => theme.colors.text};
  margin-bottom: 4px;
`;

const UserName = styled.div`
  font-size: ${({ theme }) => theme.fontSizes.sm};
  color: ${({ theme }) => theme.colors.textSecondary};
`;

const RankingScore = styled.div`
  text-align: right;
`;

const ScoreValue = styled.div`
  font-size: ${({ theme }) => theme.fontSizes["2xl"]};
  font-weight: ${({ theme }) => theme.fontWeights.bold};
  color: ${({ theme }) => theme.colors.primary};
`;

const ScoreLabel = styled.div`
  font-size: ${({ theme }) => theme.fontSizes.xs};
  color: ${({ theme }) => theme.colors.textSecondary};
`;

// Component
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
      const data = await tossNbaFantasyClient.getRankings(selectedWeek);
      setRankings(data);
    } catch (error) {
      console.error("랭킹 로드 실패:", error);
      alert("랭킹을 불러오는 중 오류가 발생했습니다.");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <Page>
        <LoadingContainer>랭킹을 불러오는 중...</LoadingContainer>
      </Page>
    );
  }

  return (
    <Page>
      <PageHeader>
        <PageTitle>Rankings</PageTitle>
      </PageHeader>

      {rankings.length === 0 ? (
        <EmptyState>
          <p>아직 랭킹 데이터가 없습니다.</p>
        </EmptyState>
      ) : (
        <RankingsList>
          {rankings.map((entry) => (
            <RankingItem key={entry.rank}>
              <RankBadge>{entry.rank}</RankBadge>
              <RankingInfo>
                <TeamName>{entry.teamName}</TeamName>
                <UserName>{entry.userName}</UserName>
              </RankingInfo>
              <RankingScore>
                <ScoreValue>{entry.cumulative.toFixed(1)}</ScoreValue>
                <ScoreLabel>Total</ScoreLabel>
              </RankingScore>
            </RankingItem>
          ))}
        </RankingsList>
      )}
    </Page>
  );
};

export default RankingsPage;
