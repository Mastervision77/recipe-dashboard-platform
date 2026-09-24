import Cookies from "js-cookie";

const TOKEN_KEY = "access_token";
const TOKEN_DAYS = 7;

const options: Cookies.CookieAttributes = {
    expires: TOKEN_DAYS,
    sameSite: "strict",
    secure: window.location.protocol === "https:",
    path: "/",
};

export const getToken = () => Cookies.get(TOKEN_KEY);

export const setToken = (token: string) =>
    Cookies.set(TOKEN_KEY, token, options);

export const removeToken = () => Cookies.remove(TOKEN_KEY, { path: "/" });
