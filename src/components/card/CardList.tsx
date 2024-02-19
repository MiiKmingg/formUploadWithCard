import React, { useState } from "react";
import { Card } from "./Card";
import { User } from "@/app/page";

interface CardListProps {
  items: User[];
  selectCard: string;
  onSelectCard: React.Dispatch<React.SetStateAction<string>>;
  onDeleteCard: (id: string) => void;
}

const CardList = ({ items, selectCard, onSelectCard, onDeleteCard }: CardListProps) => {

  return (
    <div>
      {items.map((item, index) => (
        <Card
          id={item.id}
          name={item.username}
          key={item.id || index}
          image={item.profile}
          onSelectCard={onSelectCard}
          selectCard={selectCard}
          onDeleteCard={onDeleteCard}
        >

        </Card>
      ))}
    </div>
  );
};

export { CardList };
