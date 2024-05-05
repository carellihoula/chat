import React, { FC } from "react";
import { IoMdClose } from "react-icons/io";
import styles from "./toast.module.css";

type Props = {
  message: string;
  hasError: boolean;
  onClose: () => void;
};

const ToastComponent: FC<Props> = ({ message, hasError, onClose }) => {
  const style: React.CSSProperties = {
    position: "relative",
    backgroundColor: hasError ? "#D65745" : "#55B938",
    minHeight: "63px",
    maxHeight: "auto",
    width: "80%",
    borderRadius: "4px",
    display: "flex",
    padding: "8px",
    alignItems: "center",
    textAlign: "center",
    justifyContent: "center",
    color: "white",
    fontFamily: "Poppins",
    borderBottom: "5px solid white",
  };
  const handleClose = () => {
    onClose();
  };
  return (
    <div style={style}>
      {message}
      <div onClick={handleClose} className={styles.close__icon}>
        <IoMdClose size={20} />
      </div>
    </div>
  );
};

export default ToastComponent;
