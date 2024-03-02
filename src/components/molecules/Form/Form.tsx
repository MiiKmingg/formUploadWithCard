"use client";

import {
  Button,
  InputEmail,
  InputFile,
  InputText,
  Typography,
} from "@/components/atoms";
import React, { useState, ChangeEvent, FormEvent, useEffect } from "react";
import { useMyContext } from "@/Contexts/MyContext";
import Image from "next/image";
import { userSchema } from "@/schema/UserSchema";
import { validate } from "@/utils/FormValidation";
import { ErrorsMessages } from "@/components/atoms/ErrorMessage";
import { setLocalStorage } from "@/LocalStorage/UseLocalStorage";

const DEFAULT_FORM_VALUE = {
  username: "",
  email: "",
  profile: null,
};


const Form = () => {
  const { setuserInfo, findUser, selectUser, setselectUser, updateUser } =
    useMyContext();
  const [Userdata, setUserdata] = useState(
    !selectUser ? DEFAULT_FORM_VALUE : findUser
  );

  const [errors, setErrors] = useState({
    email: "",
    username: "",
    profile: "",
  });

  const validateForm = async (name: string, value: string ) => {
    try {
      await userSchema.validateAt(name, { [name]: value });
      setErrors((prev) => ({ ...prev, [name]: "" }));
    } catch (error) {
      console.log("Error", error);
      setErrors((prev) => ({ ...prev, [name]: error.message }));
    }
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    validateForm(name, value);
    setUserdata((prevUser) => {
      return ({
        ...prevUser,
        [name]: value,
      });
    });
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = (e.target as HTMLInputElement).files?.[0];
    validateForm(e.target.name, file);
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setUserdata((prevUser) => {
        return ({
          ...prevUser,
          profile: imageUrl,
        });
      });
    }
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (errors.profile) {
      return;
    }

    try {
      console.log("this is user", Userdata);

      await validate(userSchema, Userdata);

      if (selectUser && findUser) {
        // Update existing user
        updateUser(findUser.id, Userdata);
      } else {
        // Add new user
        const generatedId = handleId();
        const newUser = { ...Userdata, id: generatedId };
        setuserInfo((preUser) => {
          const newAllUsers = [...preUser, newUser];
          setLocalStorage("user", newAllUsers);
          return newAllUsers;
        });
        setUserdata({
          id: "",
          username: "",
          email: "",
          profile: null,
        });
      }
    } catch (error: any) {
      console.log("submit", error);
      setErrors(error);
    }
  };

  const handleId = () => {
    const randomChars = Math.random().toString(36).substring(2, 10);
    return randomChars;
  };
  console.log(errors.profile);
  return (
    <>
      <form className="max-w-md mx-auto" onSubmit={handleSubmit}>
        <div className="mb-6">
          <label htmlFor="username" className="block mb-2">
            <Typography variant="semibold">Username</Typography>
          </label>
          <InputText
            value={Userdata?.username}
            id="username"
            name="username"
            onchange={handleChange}
            placeholder="Enter Username..."
            classname="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
          />
          {errors.username && (
            <ErrorsMessages>{errors.username}</ErrorsMessages>
          )}
        </div>
        <div className="mb-6">
          <label htmlFor="email" className="block mb-2">
            <Typography variant="semibold">Email</Typography>
          </label>
          <InputEmail
            value={Userdata?.email}
            defaultvalue=""
            id="email"
            name="email"
            onchange={handleChange}
            placeholder="Enter Email..."
            classname="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
          />
          {errors.email && <ErrorsMessages>{errors.email}</ErrorsMessages>}
        </div>
        <div className="mb-6">
          <label htmlFor="profile" className="block mb-2">
            <Typography variant="semibold">Profile</Typography>
          </label>
          <div className="flex items-center justify-center w-full">
            <label
              htmlFor="profile"
              className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600"
            >
              <div className="flex flex-col items-center justify-center pt-5 pb-6">
                <svg
                  className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400"
                  aria-hidden="true"
                  xmlns="http:www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 20 16"
                >
                  <path
                    stroke="currentColor"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                  />
                </svg>
                <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                  <span className="font-semibold">Click to upload</span> or drag
                  and drop
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  SVG, PNG, JPG or GIF (MAX. 800x400px)
                </p>
              </div>
              <input
                id="profile"
                type="file"
                className="hidden"
                name="profile"
                onChange={handleFileChange}
              />
            </label>
          </div>
          {errors.profile && <ErrorsMessages>{errors.profile}</ErrorsMessages>}
        </div>
        {selectUser ? (
          <Image
            src={`${Userdata?.profile}`}
            alt="User"
            width={70}
            height={70}
          ></Image>
        ) : (
          ""
        )}

        <Button classname="ml-[40%] relative inline-flex items-center justify-center p-0.5 mb-2 me-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-purple-500 to-pink-500 group-hover:from-purple-500 group-hover:to-pink-500 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-purple-200 dark:focus:ring-purple-800">
          <Typography
            className="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white rounded-md group-hover:bg-opacity-0"
            fontSize="h6"
            variant="semibold"
          >
            Submit
          </Typography>
        </Button>
      </form>
    </>
  );
};

export default Form;
