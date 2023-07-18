const TOKEN_TITLES = {
  TOKEN_KEY: "jwt_token",
  REFRESH_KEY: "jwt_refresh-token",
  EXPIRES_KEY: "jwt_expires",
  USERID_KEY: "user_local-id"
};

export function setTokens({
  refreshToken,
  idToken,
  localId,
  expiresIn = 3600
}) {
  const expiresDate = new Date().getTime() + expiresIn * 1000;
  localStorage.setItem(TOKEN_TITLES.USERID_KEY, localId);
  localStorage.setItem(TOKEN_TITLES.TOKEN_KEY, idToken);
  localStorage.setItem(TOKEN_TITLES.REFRESH_KEY, refreshToken);
  localStorage.setItem(TOKEN_TITLES.EXPIRES_KEY, expiresDate);
}

export function getUserId() {
  return localStorage.getItem(TOKEN_TITLES.USERID_KEY);
}

export function getAccessToken() {
  return localStorage.getItem(TOKEN_TITLES.TOKEN_KEY);
}

export function getRefreshToken() {
  return localStorage.getItem(TOKEN_TITLES.REFRESH_KEY);
}

export function getTokenExpiresDate() {
  return localStorage.getItem(TOKEN_TITLES.EXPIRES_KEY);
}

const localStorageService = {
  setTokens,
  getAccessToken,
  getUserId,
  getRefreshToken,
  getTokenExpiresDate
};

export default localStorageService;
