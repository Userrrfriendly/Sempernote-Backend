import React from "react";

export default React.createContext({
  token: null,
  userId: null,
  globalState: null,
  login: (token, userId, tokenExpiration) => {},
  logout: () => {},
  fetchGlobalData: () => {}
});
