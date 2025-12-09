import React from "react";
import styled from "styled-components";

// Styled Components
const SlotContainer = styled.div`
  background: ${({ theme }) => theme.colors.background};
  border: 2px dashed ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  padding: ${({ theme }) => theme.spacing.md};
  cursor: pointer;
  transition: all 0.2s;
  min-height: 80px;
  display: flex;
  flex-direction: column;
  justify-content: center;

  &:hover {
    border-color: ${({ theme }) => theme.colors.primary};
    background-color: ${({ theme }) => theme.colors.primary}05;
  }
`;

const SlotLabel = styled.div`
  font-size: ${({ theme }) => theme.fontSizes.xs};
  font-weight: ${({ theme }) => theme.fontWeights.semibold};
  color: ${({ theme }) => theme.colors.textSecondary};
  margin-bottom: ${({ theme }) => theme.spacing.xs};
`;

const SlotPlayer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

const SlotPlayerName = styled.div`
  font-size: ${({ theme }) => theme.fontSizes.base};
  font-weight: ${({ theme }) => theme.fontWeights.semibold};
  color: ${({ theme }) => theme.colors.text};
`;

const SlotPlayerTeam = styled.div`
  font-size: ${({ theme }) => theme.fontSizes.sm};
  color: ${({ theme }) => theme.colors.textSecondary};
`;

const SlotEmpty = styled.div`
  font-size: ${({ theme }) => theme.fontSizes.sm};
  color: ${({ theme }) => theme.colors.textSecondary};
  text-align: center;
  font-style: italic;
`;

// Component
const PositionSlot = ({ slot, player, onClick }) => {
  return (
    <SlotContainer onClick={onClick}>
      <SlotLabel>{slot}</SlotLabel>
      {player ? (
        <SlotPlayer>
          <SlotPlayerName>{player.name}</SlotPlayerName>
          <SlotPlayerTeam>{player.nbaTeam}</SlotPlayerTeam>
        </SlotPlayer>
      ) : (
        <SlotEmpty>선수 선택</SlotEmpty>
      )}
    </SlotContainer>
  );
};

export default PositionSlot;
