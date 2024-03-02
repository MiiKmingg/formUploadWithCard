"use client";
import React from "react";
import { useParams } from "next/navigation";
import { useMyContext } from "@/Contexts/MyContext";
import Image from "next/image";
const Page = () => {
  const { userInfo } = useMyContext();
  const route = useParams();
  const User = decodeURIComponent(route.preview);
  const PreviewUser = userInfo.find((item) => item.username === User);
  console.log(userInfo);
  return (
    <div>
      <h1 className="text-5xl">
        this user is {decodeURIComponent(route.preview)}
      </h1>
      <h2>{`${PreviewUser?.email}`}</h2>
    </div>
  );
};

export default Page;
