import React, { useContext, useEffect, useState } from "react";
import { userSchema } from "@/validations/schema";
import { ErrorsMessages, InputForm, Label } from ".";
import { Input } from ".";
import { UserContext, UserModel } from "@/Context/UserContext";
import { validate } from "@/validations/validations";
// 1. UseEffect = when to use it, what is side effect, use effect with no dependency, with dependencies
// 2. Context API= What is Context API? When to use? How to use it?

interface FormAddProps {
  addNewUser: (user: UserModel) => void;
}

const ValidationForm = () => {
  const { addNewUser } = useContext(UserContext);
  const [user, setUser] = useState({
    username: "",
    profile: null,
  });

  const [errors, setErrors] = useState({
    username: "",
    profile: "",
  });

  const handleOnSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Check if there is an error message for the profile
    if (errors.profile) {
      return;
    }

    try {
      await validate(userSchema, user);
      addNewUser(user);
    } catch (error: any) {
      setErrors(error);
    }
  };

  // Get the value from the input fields:
  const handleOnChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUser((prevUser) => {
      return {
        ...prevUser,
        [name]: value,
      };
    });
    try {
      await validate(userSchema, user);
    } catch (error) {
      setErrors(error);
    }
  };

  const handleOnUploadFile = (
    e: React.ChangeEvent<HTMLInputElement | HTMLFormElement>
  ) => {
    const file = e.target.files[0];

    validateForm(e.target.name, file);
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setUser((prevUser: any) => {
        return {
          ...prevUser,
          profile: imageUrl,
        };
      });
    }
  };

  return (
    <InputForm
      className="px-10 py-5 bg-white flex flex-col gap-2"
      onSubmit={handleOnSubmit}
    >
      <Input
        className="text-gray-300 border rounded-md border-black m-2 focus:ring-2 outline-none px-5 py-2"
        type="text"
        name="username"
        value={user.username}
        placeholder="username"
        onChange={handleOnChange}
        label="username"
        error={errors?.username}
      />

      <Input
        className="text-black"
        type="file"
        name="profile"
        placeholder="profile"
        onChange={handleOnUploadFile}
        label="profile"
        error={errors?.profile}
      />

      <button
        className="px-10 py-1 bg-green-600 rounded-full mt-5"
        type="submit"
      >
        Submit
      </button>
    </InputForm>
  );
};

export { ValidationForm };
