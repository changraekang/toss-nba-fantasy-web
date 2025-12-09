import styled from "styled-components";

export const Button = styled.button`
  padding: ${({ theme }) => theme.spacing.sm} ${({ theme }) => theme.spacing.md};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  font-size: ${({ theme }) => theme.fontSizes.sm};
  font-weight: ${({ theme }) => theme.fontWeights.medium};
  cursor: pointer;
  transition: all 0.2s;
  border: none;

  ${({ $variant, theme }) =>
    $variant === "primary"
      ? `
    background: ${theme.colors.primary};
    color: white;
    &:hover {
      opacity: 0.9;
    }
  `
      : `
    background: ${theme.colors.backgroundDark};
    color: ${theme.colors.text};
    &:hover {
      opacity: 0.8;
    }
  `}

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;
