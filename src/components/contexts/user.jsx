import { createContext, useContext, useState } from "react";

const UserContext = createContext();

const UserProvider = ({ children }) => {
  const [name, setName] = useState("Marcelo")
  const [user, setUser] = useState("marcelodaros")
  const [password, setPassword] = useState("abc")
  const [picture, setPicture] = useState("asasd23@#%dasfsadfsadg2q3")
  const provisions = { name, setName, user, setUser, password, setPassword, picture, setPicture };

  return (
    <UserContext.Provider value={ provisions }>
      { children }
    </UserContext.Provider>
  );
};

export default UserProvider;
export const useUser = () => useContext(UserContext);