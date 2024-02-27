import { ReactNode, useContext, useState } from "react";
import { motion } from "framer-motion";
import { Button } from "../button";
import FloatingButton from "@/components/button/FloatingButton";
import { UserContext } from "@/Context/UserContext";
interface ModalProps {
  children?: ReactNode;
  selectCard?: string;
}

const Modal: React.FC<ModalProps> = ({ children }) => {
  const [isShowModal, setIsShowModal] = useState(false);
  const { selectCard } = useContext(UserContext);

  return (
    <>
      {/* Floating Button */}
      <FloatingButton
        onClick={() => setIsShowModal(true)}
        position="bottom-right"
      >
        {selectCard ? "Edit" : "Add"}
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
            className="fixed bg-gray-500 text-white shadow-lg top-0 right-0 w-full max-w-xl h-screen p-5"
          >
            <button
              onClick={() => setIsShowModal((sideBar) => !sideBar)}
              className="bg-red-400 text-white h-8 w-8 block mb-2 rounded-full"
            >
              &times;
            </button>
            <div>{children}</div>
          </motion.div>
          {/* <div>
            <Button
              onClick={() => setIsShowModal((sideBar) => !sideBar)}
              className="bg-red-500 text-white h-10 w-10 absolute block mb-2 rounded-full "
            >
              &times;
            </Button>
            {children}
          </div> */}
        </>
      )}
    </>
  );
};

export { Modal };
