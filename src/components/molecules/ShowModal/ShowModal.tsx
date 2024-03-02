import { Button } from "@/components/atoms";
import React from "react";
import { Form } from "../Form";
interface ModalProps {
  setModalState: (state: boolean) => void;
}
const ShowModal: React.FC<ModalProps> = (props) => {
  return (
    <div>
      <div className="fixed inset-0 opacity-25 bg-black"></div>
      <div className="fixed inset-0 flex justify-center items-center z-10">
        <div className="bg-white w-[450px] h-[700px] text-black p-5 rounded-lg">
          <Button
            classname="bg-white text-gray-800 font-bold rounded border-b-2 border-red-500 hover:border-red-600 hover:bg-red-500 hover:text-white shadow-md py-2 px-2 inline-flex items-center ml-[370px]"
            onclick={() => props.setModalState(false)}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
            >
              <path
                fill="currentcolor"
                d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12 19 6.41z"
              />
            </svg>
          </Button>
          <div>
            <Form></Form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShowModal;
