import { createContext, useContext, useState } from "react";

const UserContext = createContext();

const UserProvider = ({ children }) => {
  const [editUserData, setEditUserData] = useState(false)
  const [name, setName] = useState("")
  const [user, setUser] = useState("")
  const [password, setPassword] = useState("")
  const [picture, setPicture] = useState("")
  const [userID, setUserID] = useState("")
  const [token, setToken] = useState("")
  const provisions = { name, setName, user, setUser, password, setPassword, picture, setPicture, userID, setUserID, token, setToken, editUserData,  setEditUserData};

  return (
    <UserContext.Provider value={ provisions }>
      { children }
    </UserContext.Provider>
  );
};

export default UserProvider;
export const useUser = () => useContext(UserContext);