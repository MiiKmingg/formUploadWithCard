"use client";
import { ReactNode, createContext, useState } from "react";

export interface UserModel {
  id: string;
  username: string;
  profile: string | null;
}

export interface UserInput {
  username: string;
  profile: string | null;
}

// 1. Create Context to Store the State
interface UserContextProps {
  users: UserModel[];
  selectCard: string;
  setUsers: React.Dispatch<React.SetStateAction<UserModel[]>>;
  setSelectCard: React.Dispatch<React.SetStateAction<string>>;
  addNewUser: (user: UserInput) => void;
  updateUser: (user: UserInput, selectCard: string) => void;
  handleDeleteUser: (id: string) => void;
}

const UserContext = createContext<UserContextProps>({
  users: [],
  selectCard: "",
  setUsers: () => {},
  setSelectCard: () => {},
  addNewUser: () => {},
  updateUser: () => {},
  handleDeleteUser: (id: string) => {},
});

// 2. Create Provider of the Context
const UserProvider = ({ children }: { children: ReactNode }) => {
  const [users, setUsers] = useState<UserModel[]>([]);

  const [selectCard, setSelectCard] = useState(""); // store id of selected Card

  const addNewUser = (user: UserInput) => {
    const uid = Math.random().toString(36).substring(2, 8);
    const newUser = { ...user, id: uid };
    setUsers((prevUsers) => {
      return [...prevUsers, newUser];
    });
  };

  const updateUser = (user: UserInput, selectCard: string) => {
    setUsers((prevUsers) => {
      return prevUsers.map((prevUser) => {
        if (prevUser.id === selectCard) {
          return {
            ...prevUser,
            ...user,
          };
        }
        return prevUser;
      });
    });
  };

  const handleDeleteUser = (id: string) => {
    // get users that's different from we have removed
    const userDelete = users.filter((user) => user.id !== id);

    // if (!userDelete) return;
    // compare old users with delete users
    if (userDelete.length === users.length) return;

    //set new users that's not removed
    setUsers(userDelete);
  };

  const contextValue = {
    users,
    setUsers,
    addNewUser,
    selectCard,
    setSelectCard,
    updateUser,
    handleDeleteUser,
  };

  return (
    <UserContext.Provider value={contextValue}>{children}</UserContext.Provider>
  );
};

export { UserContext, UserProvider };

// 3. Create hooks for useContext
