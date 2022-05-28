import { createContext, useContext, useState } from "react";

const UserContext = createContext()

export default function UserProvider() {
  const [currentUser, setCurrentUser] = useState("")

  const provisions = currentUser

  return (
    <UserContext.Provider
      value={ provisions }
    >
    </UserContext.Provider>
  )
}

export const useUser = () => useContext(UserContext)