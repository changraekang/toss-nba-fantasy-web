import React from "react";
import { Link, useLocation } from "react-router-dom";
import styled from "styled-components";

// Styled Components
const Nav = styled.nav`
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  background: white;
  border-top: 1px solid ${({ theme }) => theme.colors.border};
  z-index: 100;
  box-shadow: 0 -2px 10px rgba(0, 0, 0, 0.05);
`;

const TabContainer = styled.div`
  display: flex;
  justify-content: space-around;
  max-width: ${({ theme }) => theme.maxWidth};
  margin: 0 auto;
  padding: ${({ theme }) => theme.spacing.xs} 0;
`;

const TabItem = styled(Link)`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: ${({ theme }) => theme.spacing.xs} ${({ theme }) => theme.spacing.md};
  text-decoration: none;
  color: ${({ theme, $isActive }) =>
    $isActive ? theme.colors.primary : theme.colors.textSecondary};
  transition: all 0.2s;
  min-width: 70px;

  &:hover {
    color: ${({ theme }) => theme.colors.primary};
  }
`;

const TabIcon = styled.span`
  font-size: 24px;
  margin-bottom: 4px;
`;

const TabLabel = styled.span`
  font-size: ${({ theme }) => theme.fontSizes.xs};
  font-weight: ${({ theme }) => theme.fontWeights.medium};
`;

// Component
const BottomTabNav = () => {
  const location = useLocation();

  const tabs = [
    { path: "/", label: "My Team", icon: "👥" },
    { path: "/players", label: "Players", icon: "🏀" },
    { path: "/rankings", label: "Rankings", icon: "🏆" },
    { path: "/rules", label: "Rules", icon: "📋" },
    { path: "/community", label: "Community", icon: "💬" },
  ];

  return (
    <Nav>
      <TabContainer>
        {tabs.map((tab) => {
          const isActive = location.pathname === tab.path;
          return (
            <TabItem key={tab.path} to={tab.path} $isActive={isActive}>
              <TabIcon>{tab.icon}</TabIcon>
              <TabLabel>{tab.label}</TabLabel>
            </TabItem>
          );
        })}
      </TabContainer>
    </Nav>
  );
};

export default BottomTabNav;
