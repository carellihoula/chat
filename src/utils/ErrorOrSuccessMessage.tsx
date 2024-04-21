import React, { FC } from "react";

const style: React.CSSProperties = {
  backgroundColor: "white",
  height: "45px",
  width: "80%",
  borderRadius: "5px",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  color: "red",
  fontFamily: "Poppins",
  borderBottom: "5px solid red",
};

type Props = {
  message: string;
};

const ErrorOrSuccessMessage: FC<Props> = ({ message }) => {
  return <div style={style}>{message}</div>;
};

export default ErrorOrSuccessMessage;
