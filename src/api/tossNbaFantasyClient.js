// API 클라이언트
const BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:4000";
const API_PREFIX = "/tossnbafantasy"; // API 경로 prefix

/**
 * Authorization 헤더 생성
 * TODO: Toss SSO 토큰을 localStorage 또는 쿠키에서 가져오는 로직 구현 필요
 */
function getAuthHeaders() {
  // TODO: 실제 구현 시 Toss SSO 토큰 획득 로직으로 교체
  const token = localStorage.getItem("toss_access_token");

  if (!token) {
    console.warn("[API Client] 토큰이 없습니다. 로그인이 필요합니다.");
    return {};
  }

  return {
    Authorization: `Bearer ${token}`,
  };
}

/**
 * 공통 fetch 래퍼
 */
async function fetchAPI(endpoint, options = {}) {
  const url = `${BASE_URL}${API_PREFIX}${endpoint}`;
  const headers = {
    "Content-Type": "application/json",
    ...getAuthHeaders(),
    ...options.headers,
  };

  try {
    const response = await fetch(url, {
      ...options,
      headers,
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || `HTTP error! status: ${response.status}`);
    }

    const result = await response.json();

    // API 응답 구조: { success: true, data: [...] }
    if (result.success && result.data !== undefined) {
      return result.data;
    }

    return result;
  } catch (error) {
    console.error(`[API Client] ${endpoint} 오류:`, error);
    throw error;
  }
}

/**
 * 선수 풀 목록 조회
 * GET /tossnbafantasy/players
 */
export async function fetchPlayers() {
  return fetchAPI("/players");
}

/**
 * 내 팀 조회
 * GET /tossnbafantasy/team/me
 */
export async function fetchMyTeam() {
  return fetchAPI("/team/me");
}

/**
 * 팀 저장/업데이트
 * POST /tossnbafantasy/team
 * @param {Object} payload - { teamName, favoriteTeam?, rosters: [{ playerId, slot }, ...] }
 */
export async function saveMyTeam(payload) {
  return fetchAPI("/team", {
    method: "POST",
    body: JSON.stringify(payload),
  });
}

/**
 * 랭킹 조회
 * GET /tossnbafantasy/rankings?gameWeek={gameWeek}
 * @param {number} [gameWeek] - 선택적 주차
 */
export async function fetchRankings(gameWeek) {
  const query = gameWeek ? `?gameWeek=${gameWeek}` : "";
  return fetchAPI(`/rankings${query}`);
}

/**
 * 내 점수 조회
 * GET /tossnbafantasy/score/me?gameWeek={gameWeek}
 * @param {number} [gameWeek] - 선택적 주차
 */
export async function fetchMyScore(gameWeek) {
  const query = gameWeek ? `?gameWeek=${gameWeek}` : "";
  return fetchAPI(`/score/me${query}`);
}

/**
 * 팀 보너스 목록 조회
 * GET /tossnbafantasy/team-bonuses
 */
export async function fetchTeamBonuses() {
  return fetchAPI("/team-bonuses");
}

// 객체 형태로도 export
export const tossNbaFantasyClient = {
  getPlayers: fetchPlayers,
  getMyTeam: fetchMyTeam,
  saveTeam: saveMyTeam,
  getRankings: fetchRankings,
  getMyScore: fetchMyScore,
  getTeamBonuses: fetchTeamBonuses,
};
