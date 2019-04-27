import React from "react";

export default React.createContext({
  token: null,
  userId: null,
  globalState: null,
  activeNote: null,
  login: (token, userId, tokenExpiration) => {},
  logout: () => {},
  fetchGlobalData: () => {},
  setActiveNote: () => {}
});
