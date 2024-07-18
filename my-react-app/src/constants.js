export const ACCESS_TOKEN = "access";
export const REFRESH_TOKEN = "refresh";
export let isAuthenticated = false;

export function updateAuthentication(val) {
    isAuthenticated = val;
}