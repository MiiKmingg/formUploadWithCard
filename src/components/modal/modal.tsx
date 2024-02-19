import { ReactNode, useState } from "react";
import { motion } from "framer-motion";
import { Button } from "../button";
import FloatingButton from "@/components/button/FloatingButton";
interface ModalProps {
  children?: ReactNode;
  selectCard: string;
}

const Modal: React.FC<ModalProps> = ({ children, selectCard }) => {
  const [isShowModal, setIsShowModal] = useState(false);

  return (
    <>
      <FloatingButton
        onClick={() => setIsShowModal(true)}
        position="bottom-right"
      >
        {selectCard ? "-" : "+"}
      </FloatingButton>
      {isShowModal && (
        <>
          <motion.div
            initial={{ x: "100%" }}
            animate={{
              x: 0,
            }}
            exit={{
              x: "100%",
            }}
            transition={{ type: "spring", bounce: 0, duration: 0.4 }}
            className="fixed bg-gray-100 text-white shadow-lg top-0 right-0 w-full max-w-xl h-screen p-5"
          >
            <button
              onClick={() => setIsShowModal((sideBar) => !sideBar)}
              className="bg-red-400 text-white h-8 w-8 block mb-2 rounded-full"
            >
              &times;
            </button>
            <div>{children}</div>
          </motion.div>
        </>
      )}
    </>
  );
};

export { Modal };
