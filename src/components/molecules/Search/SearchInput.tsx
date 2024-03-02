"use client";
import { useMyContext } from "@/Contexts/MyContext";
import { InputText } from "@/components/atoms";
import React, { ChangeEvent, useState } from "react";
import { Card, CardList } from "../Card";

const SearchInput = () => {
  const { userInfo } = useMyContext();
  const [findUser, setfindUser] = useState("");
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setfindUser(e.target.value);
  };
  const filteredData = userInfo.filter((item) =>
    item.username.toLowerCase().includes(findUser.toLowerCase())
  );

  return (
    <div>
      <div className="max-w-md mx-auto mt-5">
        <div className="relative flex items-center w-full h-12 rounded-lg focus-within:shadow-lg bg-white overflow-hidden border">
          <div className="grid place-items-center h-full w-12 text-gray-300">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </div>
          <InputText
            id="search"
            name="search"
            onchange={handleChange}
            classname="peer h-full w-full outline-none text-sm text-gray-700 pr-2"
            placeholder="Search here..."
          />
        </div>
      </div>
      {findUser.length > 0 ? (
        <div className="flex flex-wrap ml-20 gap-6 mt-5">
          <CardList filterUser={filteredData}></CardList>
        </div>
      ) : (
        <h1 className="text-center mt-5 text-3xl">No User</h1>
      )}
    </div>
  );
};

export default SearchInput;
