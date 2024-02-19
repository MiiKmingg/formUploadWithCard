"use client";
import React, { useState } from "react";
import { CardList } from "@/components";
import { Modal } from "@/components";
import { Card } from "@/components";
import { FormAdd } from "@/components";
import { FormUpdate } from "@/components/form";
import { ValidationForm } from "@/components/form/ValidationForm";
import { SearchInput } from "@/components/form/SearchInput";
export interface User {
  id: string;
  username: string;
  profile: string;
}

export default function Home() {
  const [users, setUsers] = useState<User[]>([]);
  const [selectCard, setSelectCard] = useState("");
  const selectedUser = users.filter((user) => {
    if (user.id === selectCard) {
      return user;
    }
  });

  const handleDeleteCard = (id: string) => {
    const deleteItem = users.filter((users) => users.id !== id);
    setUsers(deleteItem);
  };

  return (
    <div className="inline-block items-center justify-center mx-auto w-full">
      <SearchInput></SearchInput>
      <CardList
        onDeleteCard={handleDeleteCard}
        items={users}
        selectCard={selectCard}
        onSelectCard={setSelectCard}
      />
      <Modal selectCard={selectCard}>
        {selectedUser.length > 0 ? (
          <>
            <FormUpdate selectedUser={selectedUser[0]} updateUser={setUsers} />
          </>
        ) : (
          <>
            <ValidationForm addNewUser={setUsers} />
          </>
        )}

      </Modal>
    </div>
  );
}
