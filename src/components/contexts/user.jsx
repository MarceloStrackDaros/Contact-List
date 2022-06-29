import { createContext, useContext, useState } from "react";

const UserContext = createContext();

const UserProvider = ({ children }) => {
  const [name, setName] = useState("")
  const [user, setUser] = useState("")
  const [picture, setPicture] = useState("")
  const [userID, setUserID] = useState("")
  const [token, setToken] = useState("")
  const provisions = { name, setName, user, setUser, picture, setPicture, userID, setUserID, token, setToken};

  return (
    <UserContext.Provider value={ provisions }>
      { children }
    </UserContext.Provider>
  );
};

export default UserProvider;
export const useUser = () => useContext(UserContext);