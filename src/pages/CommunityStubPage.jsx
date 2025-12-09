import React from 'react';
import './CommunityStubPage.css';

const CommunityStubPage = () => {
  return (
    <div className="page community-stub-page">
      <div className="page-header">
        <h1 className="page-title">Community</h1>
      </div>

      <div className="page-content">
        <div className="stub-container">
          <div className="stub-icon">💬</div>
          <h2 className="stub-title">커뮤니티 준비 중</h2>
          <p className="stub-description">
            다른 플레이어들과 소통할 수 있는 커뮤니티 기능이
            곧 추가될 예정입니다.
          </p>
          <div className="stub-features">
            <div className="feature-item">
              <span className="feature-icon">📝</span>
              <span className="feature-text">게시판</span>
            </div>
            <div className="feature-item">
              <span className="feature-icon">💭</span>
              <span className="feature-text">실시간 채팅</span>
            </div>
            <div className="feature-item">
              <span className="feature-icon">🏆</span>
              <span className="feature-text">리그 토론</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CommunityStubPage;
