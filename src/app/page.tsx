"use client";
import React, { useContext, useState } from "react";
import { CardList } from "@/components";
import { Modal } from "@/components";
import { Card } from "@/components";
import { FormAdd } from "@/components";
import { FormUpdate } from "@/components/form";
import { ValidationForm } from "@/components/form/ValidationForm";
import { SearchInput } from "@/components/form/SearchInput";
import { UserProvider } from "@/Context/UserContext";
import { UserContext } from "@/Context/UserContext";
export default function Home() {
  // const { users, setUsers } = useContext(UserContext);
  // const [selectCard, setSelectCard] = useState("");

  // const selectedUser = users.filter((user) => {
  //   if (user.id === selectCard) {
  //     return user;
  //   }
  // });

  // const handleDeleteCard = (id: string) => {
  //   const deleteItem = users.filter((users) => users.id !== id);
  //   setUsers(deleteItem);
  // };

  return (
    <UserProvider>
      <MyComponent />
    </UserProvider>
  );
}

const MyComponent = () => {
  const { selectCard } = useContext(UserContext);

  return (
    <div className="inline-block items-center justify-center mx-auto w-full">
      <SearchInput></SearchInput>
      <CardList />
      <Modal>{selectCard ? <FormUpdate /> : <ValidationForm />}</Modal>
    </div>
  );
};
