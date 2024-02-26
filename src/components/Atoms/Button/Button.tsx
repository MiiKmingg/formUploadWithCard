"use client";
import React from "react";

//diferent color
//diferent size
//diferent variant

type ButtonColor = "Primary" | "Secondary";
type ButtonSize = "sm" | "md" | "lg";
type ButtonVariant = "filled" | "outline";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  size?:ButtonSize;
  colorScheme?:ButtonColor;
  variant?:ButtonVariant;
}
const Button1 = () => {
  return <div></div>;
};

export { Button1 };
