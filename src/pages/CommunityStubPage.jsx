import React from "react";
import styled from "styled-components";
import { Page, PageHeader, PageTitle } from "../components/common/Layout";

// Styled Components

const StubContainer = styled.div`
  text-align: center;
  padding: 60px ${({ theme }) => theme.spacing.md};
`;

const StubIcon = styled.div`
  font-size: 80px;
  margin-bottom: ${({ theme }) => theme.spacing.lg};
`;

const StubTitle = styled.h2`
  font-size: ${({ theme }) => theme.fontSizes["2xl"]};
  font-weight: ${({ theme }) => theme.fontWeights.bold};
  color: ${({ theme }) => theme.colors.text};
  margin-bottom: ${({ theme }) => theme.spacing.sm};
`;

const StubDescription = styled.p`
  font-size: ${({ theme }) => theme.fontSizes.base};
  line-height: 1.6;
  color: ${({ theme }) => theme.colors.textSecondary};
  margin-bottom: 40px;
`;

const StubFeatures = styled.div`
  display: flex;
  justify-content: center;
  gap: ${({ theme }) => theme.spacing.lg};
  flex-wrap: wrap;
`;

const FeatureItem = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.xs};
  padding: ${({ theme }) => theme.spacing.md};
  background: ${({ theme }) => theme.colors.background};
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  min-width: 100px;
  box-shadow: ${({ theme }) => theme.shadows.sm};
`;

const FeatureIcon = styled.span`
  font-size: 32px;
`;

const FeatureText = styled.span`
  font-size: ${({ theme }) => theme.fontSizes.sm};
  font-weight: ${({ theme }) => theme.fontWeights.medium};
  color: ${({ theme }) => theme.colors.textSecondary};
`;

// Component
const CommunityStubPage = () => {
  return (
    <Page>
      <PageHeader>
        <PageTitle>Community</PageTitle>
      </PageHeader>

      <StubContainer>
        <StubIcon>💬</StubIcon>
        <StubTitle>커뮤니티 준비 중</StubTitle>
        <StubDescription>
          다른 플레이어들과 소통할 수 있는 커뮤니티 기능이 곧 추가될 예정입니다.
        </StubDescription>
        <StubFeatures>
          <FeatureItem>
            <FeatureIcon>📝</FeatureIcon>
            <FeatureText>게시판</FeatureText>
          </FeatureItem>
          <FeatureItem>
            <FeatureIcon>💭</FeatureIcon>
            <FeatureText>실시간 채팅</FeatureText>
          </FeatureItem>
          <FeatureItem>
            <FeatureIcon>🏆</FeatureIcon>
            <FeatureText>리그 토론</FeatureText>
          </FeatureItem>
        </StubFeatures>
      </StubContainer>
    </Page>
  );
};

export default CommunityStubPage;
