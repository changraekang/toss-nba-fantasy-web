// NBA Fantasy 테마 설정
export const theme = {
  // 색상
  colors: {
    primary: '#0066FF',      // Toss 블루
    secondary: '#F5F6F8',
    background: '#FFFFFF',
    backgroundDark: '#F5F6F8',
    text: '#191F28',
    textSecondary: '#8B95A1',
    border: '#E5E8EB',
    success: '#00C853',
    warning: '#FF9800',
    error: '#FF3B30',

    // NBA 팀 색상
    teams: {
      'Boston Celtics': '#007A33',
      'Los Angeles Lakers': '#552583',
      'Golden State Warriors': '#1D428A',
      'Milwaukee Bucks': '#00471B',
      'Denver Nuggets': '#0E2240',
      'Phoenix Suns': '#1D1160',
      'Dallas Mavericks': '#00538C',
      'Philadelphia 76ers': '#006BB6',
      'Oklahoma City Thunder': '#007AC1',
      'Minnesota Timberwolves': '#0C2340',
      'New York Knicks': '#006BB6',
      'Cleveland Cavaliers': '#6F263D',
      'Miami Heat': '#98002E',
      'LA Clippers': '#C8102E',
      'Sacramento Kings': '#5A2D81',
      'Memphis Grizzlies': '#5D76A9',
      'Indiana Pacers': '#002D62',
      'Atlanta Hawks': '#E03A3E',
    },
  },

  // 폰트
  fonts: {
    primary: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
    mono: 'SF Mono, Monaco, monospace',
  },

  // 폰트 크기
  fontSizes: {
    xs: '12px',
    sm: '14px',
    base: '16px',
    lg: '18px',
    xl: '20px',
    '2xl': '24px',
    '3xl': '30px',
    '4xl': '36px',
  },

  // 폰트 굵기
  fontWeights: {
    normal: 400,
    medium: 500,
    semibold: 600,
    bold: 700,
  },

  // 간격
  spacing: {
    xs: '4px',
    sm: '8px',
    md: '16px',
    lg: '24px',
    xl: '32px',
    '2xl': '48px',
    '3xl': '64px',
  },

  // Border radius
  borderRadius: {
    sm: '4px',
    md: '8px',
    lg: '12px',
    xl: '16px',
    full: '9999px',
  },

  // Shadow
  shadows: {
    sm: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
    md: '0 2px 8px 0 rgba(0, 0, 0, 0.1)',
    lg: '0 4px 16px 0 rgba(0, 0, 0, 0.12)',
    xl: '0 8px 24px 0 rgba(0, 0, 0, 0.15)',
  },

  // 반응형 브레이크포인트
  breakpoints: {
    mobile: '320px',
    tablet: '768px',
    desktop: '1024px',
  },

  // Z-index
  zIndex: {
    modal: 1000,
    dropdown: 100,
    header: 50,
    base: 1,
  },
};

// 미디어 쿼리 헬퍼
export const media = {
  mobile: `@media (max-width: ${theme.breakpoints.tablet})`,
  tablet: `@media (min-width: ${theme.breakpoints.tablet})`,
  desktop: `@media (min-width: ${theme.breakpoints.desktop})`,
};
