import { createGlobalStyle } from 'styled-components';

export const GlobalStyle = createGlobalStyle`
  /* CSS Reset */
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  html, body {
    width: 100%;
    height: 100%;
    overflow-x: hidden;
  }

  body {
    font-family: ${({ theme }) => theme.fonts.primary};
    font-size: ${({ theme }) => theme.fontSizes.base};
    color: ${({ theme }) => theme.colors.text};
    background-color: ${({ theme }) => theme.colors.background};
    line-height: 1.6;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;

    /* 모바일 스크롤 최적화 */
    -webkit-overflow-scrolling: touch;
  }

  #root {
    min-height: 100vh;
    display: flex;
    flex-direction: column;
  }

  /* 링크 스타일 */
  a {
    color: inherit;
    text-decoration: none;
  }

  /* 버튼 기본 스타일 제거 */
  button {
    border: none;
    background: none;
    cursor: pointer;
    font-family: inherit;
  }

  /* 입력 필드 기본 스타일 */
  input, textarea, select {
    font-family: inherit;
    font-size: inherit;
    border: none;
    outline: none;
  }

  /* 리스트 스타일 제거 */
  ul, ol {
    list-style: none;
  }

  /* 이미지 반응형 */
  img {
    max-width: 100%;
    height: auto;
    display: block;
  }

  /* 모바일 탭 하이라이트 제거 */
  * {
    -webkit-tap-highlight-color: transparent;
  }

  /* 스크롤바 스타일 (웹킷 브라우저) */
  ::-webkit-scrollbar {
    width: 6px;
  }

  ::-webkit-scrollbar-track {
    background: ${({ theme }) => theme.colors.backgroundDark};
  }

  ::-webkit-scrollbar-thumb {
    background: ${({ theme }) => theme.colors.border};
    border-radius: ${({ theme }) => theme.borderRadius.full};
  }

  ::-webkit-scrollbar-thumb:hover {
    background: ${({ theme }) => theme.colors.textSecondary};
  }
`;
