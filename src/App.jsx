import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import { GlobalStyle } from './styles/GlobalStyle';
import { theme } from './styles/theme';
import PlayersPage from './pages/PlayersPage';
import MyTeamPage from './pages/MyTeamPage';
import RankingsPage from './pages/RankingsPage';
import RulesPage from './pages/RulesPage';
import CommunityStubPage from './pages/CommunityStubPage';
import BottomTabNav from './components/BottomTabNav';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <Router>
        <div className="app">
          <Routes>
            <Route path="/" element={<PlayersPage />} />
            <Route path="/my-team" element={<MyTeamPage />} />
            <Route path="/rankings" element={<RankingsPage />} />
            <Route path="/rules" element={<RulesPage />} />
            <Route path="/community" element={<CommunityStubPage />} />
          </Routes>
          <BottomTabNav />
        </div>
      </Router>
    </ThemeProvider>
  );
}

export default App;
