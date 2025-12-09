import React from "react";
import styled from "styled-components";
import { Page, PageHeader, PageTitle, Card } from "../components/common/Layout";

// Styled Components

const SectionTitle = styled.h2`
  font-size: ${({ theme }) => theme.fontSizes.xl};
  font-weight: ${({ theme }) => theme.fontWeights.bold};
  color: ${({ theme }) => theme.colors.text};
  margin-bottom: ${({ theme }) => theme.spacing.md};
`;

const RuleItem = styled.div`
  margin-bottom: ${({ theme }) => theme.spacing.md};

  &:last-child {
    margin-bottom: 0;
  }
`;

const RuleTitle = styled.h3`
  font-size: ${({ theme }) => theme.fontSizes.base};
  font-weight: ${({ theme }) => theme.fontWeights.semibold};
  color: ${({ theme }) => theme.colors.text};
  margin-bottom: ${({ theme }) => theme.spacing.xs};
`;

const RuleDescription = styled.p`
  font-size: ${({ theme }) => theme.fontSizes.sm};
  line-height: 1.6;
  color: ${({ theme }) => theme.colors.textSecondary};
  margin: 0;
`;

const TagList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
`;

const TagListItem = styled.li`
  font-size: ${({ theme }) => theme.fontSizes.sm};
  line-height: 1.8;
  color: ${({ theme }) => theme.colors.textSecondary};
  padding-left: ${({ theme }) => theme.spacing.md};
  position: relative;

  &::before {
    content: "•";
    position: absolute;
    left: 0;
    color: ${({ theme }) => theme.colors.primary};
    font-weight: ${({ theme }) => theme.fontWeights.bold};
  }

  strong {
    color: ${({ theme }) => theme.colors.text};
  }
`;

// Component
const RulesPage = () => {
  return (
    <Page>
      <PageHeader>
        <PageTitle>Rules</PageTitle>
      </PageHeader>

      <Card>
        <SectionTitle>🏀 게임 규칙</SectionTitle>
        <RuleItem>
          <RuleTitle>팀 구성</RuleTitle>
          <RuleDescription>
            각 참가자는 10명의 NBA 선수로 구성된 팀을 만들 수 있습니다. 포지션은
            가드(G), 포워드(F), 센터(C), 유틸리티(UTIL)로 구성됩니다.
          </RuleDescription>
        </RuleItem>

        <RuleItem>
          <RuleTitle>점수 산정</RuleTitle>
          <RuleDescription>
            각 선수의 실제 NBA 경기 성적을 바탕으로 주간 점수가 계산됩니다.
            득점, 리바운드, 어시스트, 스틸, 블록 등의 스탯이 점수에 반영됩니다.
          </RuleDescription>
        </RuleItem>

        <RuleItem>
          <RuleTitle>랭킹 시스템</RuleTitle>
          <RuleDescription>
            주간 점수가 누적되어 시즌 전체 랭킹이 결정됩니다. 최종 랭킹 상위권에
            들면 보상을 받을 수 있습니다.
          </RuleDescription>
        </RuleItem>
      </Card>

      <Card>
        <SectionTitle>⚡ 선수 태그</SectionTitle>
        <RuleItem>
          <TagList>
            <TagListItem>
              <strong>ALL_NBA_1ST:</strong> All-NBA 1st Team 선정 선수
            </TagListItem>
            <TagListItem>
              <strong>DEF_1ST:</strong> All-Defensive 1st Team 선정 선수
            </TagListItem>
            <TagListItem>
              <strong>RISING_STAR:</strong> 라이징 스타 선수
            </TagListItem>
            <TagListItem>
              <strong>VETERAN:</strong> 베테랑 선수
            </TagListItem>
          </TagList>
        </RuleItem>
      </Card>

      <Card>
        <SectionTitle>📅 시즌 일정</SectionTitle>
        <RuleItem>
          <RuleDescription>
            시즌은 NBA 정규 시즌과 동일하게 진행되며, 매주 새로운 게임 주차가
            시작됩니다.
          </RuleDescription>
        </RuleItem>
      </Card>
    </Page>
  );
};

export default RulesPage;
