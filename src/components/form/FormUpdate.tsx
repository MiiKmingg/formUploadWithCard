/* eslint-disable @next/next/no-img-element */
import { User } from "@/app/page";
import React, { Dispatch, SetStateAction, useState } from "react";

interface FormAddProps {
  updateUser: Dispatch<SetStateAction<User[]>>;
  selectedUser: User;
}

const FormUpdate: React.FC<FormAddProps> = ({ selectedUser, updateUser }) => {
  const [user, setUser] = useState({
    username: selectedUser.username,
    profile: selectedUser.profile,
  });

  const handleOnSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    updateUser((prevUsers) => {
      return prevUsers.map((prevUser) => {
        if (prevUser.id === selectedUser.id) {
          return {
            ...prevUser,
            ...user,
          };
        }
        return prevUser;
      });
    });
  };

  // Get the value from the input fields:
  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUser((prevUser) => {
      return {
        ...prevUser,
        [e.target.name]: e.target.value,
      };
    });
  };

  const handleOnUploadFile = (e: React.FormEvent<HTMLInputElement>) => {
    const file = e.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setUser((prevUser) => {
        return {
          ...prevUser,
          profile: imageUrl,
        };
      });
    }
  };

  const handleRemoveFile = () => {
    setUser((prevUser) => {
      return {
        ...prevUser,
        profile: "",
      };
    });
  };

  return (
    <form onSubmit={handleOnSubmit}>
      <label htmlFor="name" className="text-gray-500">
        Name:
      </label>
      <input
        className="text-black border rounded-md border-black m-2 focus:ring-2 outline-none px-2"
        type="text"
        id="name"
        name="username"
        defaultValue={selectedUser.username}
        value={user.username}
        onChange={handleOnChange}
      />
      <br />

      <label htmlFor="image" className="text-gray-500">
        Image:
      </label>
      {selectedUser.profile ? (
        <>
          <div className="relative">
            <img src={selectedUser.profile} alt="profile" />
          </div>
          <button
            className="py-2 px-4 rounded-xl bg-red-500 mt-2"
            onClick={handleRemoveFile}
          >
            Delete image
          </button>
        </>
      ) : (
        <input
          className="border rounded-md border-black m-2"
          type="file"
          accept="image/*"
          name="profile"
          onChange={handleOnUploadFile}
        />
      )}
      <br />

      <div className="flex flex-row gap-2">
        <button className="bg-blue-400 px-4 py-2 rounded-xl mt-4">
          Update
        </button>
      </div>
    </form>
  );
};

export { FormUpdate };
