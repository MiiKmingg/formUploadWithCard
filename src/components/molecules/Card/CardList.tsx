"use client";
import { useMyContext } from "@/Contexts/MyContext";
import React from "react";
import Card from "./Card";

interface UserProp{
  id : string;
  username : string;
  email : string;
  profile: string;
}
interface CardListProps{
  filterUser : UserProp[]
}
const CardList:React.FC<CardListProps> = ({filterUser}) => {
  return (
    <>
      {filterUser.map((item, index) => {
        return (
          <Card
            key={index}
            username={item.username}
            profile={item.profile}
            email={item.email}
            id={item.id}
          ></Card>
        );
      })}
    </>
  );
};

export default CardList;
