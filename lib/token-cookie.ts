const COOKIE_NAME = "access_token";
const MAX_AGE = 60 * 60 * 24 * 30; // 30 days

export const setTokenCookie = (token: string): void => {
  document.cookie = `${COOKIE_NAME}=${token}; path=/; max-age=${MAX_AGE}; SameSite=Lax`;
};

export const removeTokenCookie = (): void => {
  document.cookie = `${COOKIE_NAME}=; path=/; max-age=0; SameSite=Lax`;
};
