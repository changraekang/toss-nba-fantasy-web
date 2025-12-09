import React from 'react';
import './RulesPage.css';

const RulesPage = () => {
  return (
    <div className="page rules-page">
      <div className="page-header">
        <h1 className="page-title">Rules</h1>
      </div>

      <div className="page-content">
        <div className="card rules-section">
          <h2 className="section-title">🏀 게임 규칙</h2>
          <div className="rule-item">
            <h3>팀 구성</h3>
            <p>
              각 참가자는 10명의 NBA 선수로 구성된 팀을 만들 수 있습니다.
              포지션은 가드(G), 포워드(F), 센터(C), 유틸리티(UTIL)로 구성됩니다.
            </p>
          </div>

          <div className="rule-item">
            <h3>점수 산정</h3>
            <p>
              각 선수의 실제 NBA 경기 성적을 바탕으로 주간 점수가 계산됩니다.
              득점, 리바운드, 어시스트, 스틸, 블록 등의 스탯이 점수에 반영됩니다.
            </p>
          </div>

          <div className="rule-item">
            <h3>랭킹 시스템</h3>
            <p>
              주간 점수가 누적되어 시즌 전체 랭킹이 결정됩니다.
              최종 랭킹 상위권에 들면 보상을 받을 수 있습니다.
            </p>
          </div>
        </div>

        <div className="card rules-section">
          <h2 className="section-title">⚡ 선수 태그</h2>
          <div className="rule-item">
            <ul className="tag-list">
              <li><strong>ALL_NBA_1ST:</strong> All-NBA 1st Team 선정 선수</li>
              <li><strong>DEF_1ST:</strong> All-Defensive 1st Team 선정 선수</li>
              <li><strong>RISING_STAR:</strong> 라이징 스타 선수</li>
              <li><strong>VETERAN:</strong> 베테랑 선수</li>
            </ul>
          </div>
        </div>

        <div className="card rules-section">
          <h2 className="section-title">📅 시즌 일정</h2>
          <div className="rule-item">
            <p>
              시즌은 NBA 정규 시즌과 동일하게 진행되며,
              매주 새로운 게임 주차가 시작됩니다.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RulesPage;
