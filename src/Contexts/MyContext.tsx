"use client";
import React, { ReactNode } from "react";
import { useContext, useState, createContext, useEffect } from "react";
import {
  getLocalStorage,
  setLocalStorage,
} from "@/LocalStorage/UseLocalStorage";

// Define the type for user information
interface UserInfo {
  id: string;
  username: string;
  email: string;
  profile: string | null;
}

interface ContextProps {
  userInfo: UserInfo[];
  setuserInfo: React.Dispatch<React.SetStateAction<UserInfo[]>>;

  handleDelete: (id: string) => void;

  selectUser: string;
  setselectUser: React.Dispatch<React.SetStateAction<string>>;

  findUser: UserInfo | undefined;

  updateUser: (id: string, newUpdateUser: UserInfo) => void;
}

interface MyContextProps {
  children: ReactNode;
}

// Create a context with a default value
const MyContext = createContext<ContextProps>({
  userInfo: [],
  setuserInfo: () => {}, // Provide a default value

  handleDelete: () => {}, // Provide a default value

  setselectUser: () => {}, // Provide a default value
  selectUser: "",

  findUser: undefined,

  updateUser: () => {},
});

// create a provider component
export const MyContextProvider: React.FC<MyContextProps> = ({ children }) => {
  // store state
  const [userInfo, setuserInfo] = useState<UserInfo[]>([]);

  const [selectUser, setselectUser] = useState("");

  useEffect(() => {
    const userStorage = getLocalStorage("user") ? getLocalStorage("user") : [];
    setuserInfo(userStorage);
  }, []);

  // handle Delete Card
  const handleDelete = (id: string) => {
    const newUser = userInfo.filter((item) => item.id !== id);
    setLocalStorage("user", newUser);
    setuserInfo(newUser);
    // If the deleted card was selected, clear the selection
    if (selectUser === id) {
      setselectUser("");
    }
  };

  // find selectuser
  const findUser = userInfo.find((item) => item.id === selectUser);

  const updateUser = (id: string, newUpdateUser: UserInfo) => {
    const newUsers = userInfo.map((user) => {
      // If the existed user id === id we want to update
      // Update the info of user
      if (user.id === id) {
        return {
          ...user,
          ...newUpdateUser,
        };
      }
      // Else, return the existed user
      return user;
    });
    setuserInfo(newUsers);
    setLocalStorage("user", newUsers);
    setselectUser("");
  };

  // Provide the shared state and update function to the context
  const contextValue = {
    userInfo,
    setuserInfo,
    handleDelete,
    setselectUser,
    selectUser,
    findUser,
    updateUser,
  };

  return (
    <>
      <MyContext.Provider value={contextValue}>{children}</MyContext.Provider>
    </>
  );
};

// Create a custom hook to consume the context
export const useMyContext = () => useContext(MyContext);
