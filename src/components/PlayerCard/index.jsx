import React from 'react';
import styled from 'styled-components';

// Styled Components

const Card = styled.div`
  background: ${({ theme }) => theme.colors.background};
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  padding: ${({ theme }) => theme.spacing.md};
  box-shadow: ${({ theme }) => theme.shadows.md};
  border-left: 4px solid ${({ $nbaTeam, theme }) => theme.colors.teams?.[$nbaTeam] || theme.colors.primary};
  cursor: pointer;
  transition: all 0.2s ease;
  position: relative;

  ${({ $selected, theme }) => $selected && `
    border: 2px solid ${theme.colors.primary};
    background: ${theme.colors.primary}10;
  `}

  &:hover {
    box-shadow: ${({ theme }) => theme.shadows.lg};
    transform: translateY(-2px);
  }

  &:active {
    transform: translateY(0);
  }
`;

const SelectBadge = styled.div`
  position: absolute;
  top: 8px;
  right: 8px;
  width: 24px;
  height: 24px;
  border-radius: 50%;
  background: ${({ theme }) => theme.colors.primary};
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: ${({ theme }) => theme.fontSizes.xs};
  font-weight: ${({ theme }) => theme.fontWeights.bold};
`;

const PlayerInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.sm};
`;

const PlayerName = styled.h3`
  font-size: ${({ theme }) => theme.fontSizes.lg};
  font-weight: ${({ theme }) => theme.fontWeights.semibold};
  color: ${({ theme }) => theme.colors.text};
  margin: 0;
  padding-right: 32px; /* SelectBadge 공간 확보 */
`;

const PlayerMeta = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.sm};
  font-size: ${({ theme }) => theme.fontSizes.sm};
  flex-wrap: wrap;
`;

const TeamBadge = styled.span`
  padding: 4px 8px;
  background: ${({ $nbaTeam, theme }) => (theme.colors.teams?.[$nbaTeam] || theme.colors.primary)}15;
  color: ${({ $nbaTeam, theme }) => theme.colors.teams?.[$nbaTeam] || theme.colors.primary};
  border-radius: ${({ theme }) => theme.borderRadius.sm};
  font-weight: ${({ theme }) => theme.fontWeights.medium};
  font-size: ${({ theme }) => theme.fontSizes.xs};
`;

const PositionBadge = styled.span`
  padding: 4px 8px;
  background: ${({ theme }) => theme.colors.backgroundDark};
  color: ${({ theme }) => theme.colors.text};
  border-radius: ${({ theme }) => theme.borderRadius.sm};
  font-weight: ${({ theme }) => theme.fontWeights.medium};
  font-size: ${({ theme }) => theme.fontSizes.xs};
`;

const SalaryBadge = styled.span`
  padding: 4px 8px;
  background: ${({ theme }) => theme.colors.success}15;
  color: ${({ theme }) => theme.colors.success};
  border-radius: ${({ theme }) => theme.borderRadius.sm};
  font-weight: ${({ theme }) => theme.fontWeights.bold};
  font-size: ${({ theme }) => theme.fontSizes.xs};
`;

const TagsContainer = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spacing.xs};
  flex-wrap: wrap;
`;

const Tag = styled.span`
  padding: 2px 6px;
  font-size: 10px;
  background: ${({ theme }) => theme.colors.primary}15;
  color: ${({ theme }) => theme.colors.primary};
  border-radius: ${({ theme }) => theme.borderRadius.sm};
  font-weight: ${({ theme }) => theme.fontWeights.medium};
`;

// Component
const PlayerCard = ({ player, selected = false, onClick }) => {
  const { name, nbaTeam, position, tags, salary } = player;

  console.log('🏀 PlayerCard 렌더링:', name, 'salary:', salary);

  // 태그 배열로 변환
  const tagsList = tags ? tags.split(',').map(t => t.trim()) : [];

  return (
    <Card
      $nbaTeam={nbaTeam}
      $selected={selected}
      onClick={onClick}
    >
      {selected && <SelectBadge>✓</SelectBadge>}

      <PlayerInfo>
        <PlayerName>{name}</PlayerName>

        <PlayerMeta>
          <TeamBadge $nbaTeam={nbaTeam}>
            {nbaTeam}
          </TeamBadge>
          <PositionBadge>{position}</PositionBadge>
          <SalaryBadge>${salary}M</SalaryBadge>
        </PlayerMeta>

        {tagsList.length > 0 && (
          <TagsContainer>
            {tagsList.map((tag, index) => (
              <Tag key={index}>{tag}</Tag>
            ))}
          </TagsContainer>
        )}
      </PlayerInfo>
    </Card>
  );
};

export default PlayerCard;
