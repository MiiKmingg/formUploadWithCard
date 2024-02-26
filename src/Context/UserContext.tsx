"use client";
import { ReactNode, createContext, useState } from "react";

export interface UserModel {
  id: string;
  username: string;
  profile: string;
}

// 1. Create Context to Store the State
interface UserContextProps {
  users: UserModel[];
  setUsers: React.Dispatch<React.SetStateAction<UserModel[]>>;
}

const UserContext = createContext<UserContextProps>({
  users: [],
  setUsers: () => {},
});

// 2. Create Provider of the Context
const UserProvider = ({ children }: { children: ReactNode }) => {
  const [users, setUsers] = useState<UserModel[]>([
    {
      id: "1",
      username: "Tan Hangsapho",
      profile: "/manith.png",
    },
  ]);
  console.log(users)
  const handleFormAdd=(f)=>{
    const newId = Math.random().toString(36).substring(2, 8); // return 1f74e
        const newUser = { ...users, id: newId };
        setUsers((prevUsers) => {
          return [...prevUsers, newUser];
        });
  }
  const contextValue = {
    users,
    setUsers,
    handleFormAdd
  };

  return (
    <UserContext.Provider value={contextValue}>{children}</UserContext.Provider>
  );
};

export { UserContext, UserProvider };

// 3. Create hooks for useContext
