import React from "react";
const showModal = (props) => {
  return (
    <>
      <div className="absolute top-10 center bg-violet-400 py-2 px-4">
        <button
          className="w-1/2 m-auto border-2 bg-red-600 fix left-0"
          onClick={() => props.setIsModal(false)}
        >
          Close me now
        </button>
      </div>
    </>
  );
};

export default showModal;
