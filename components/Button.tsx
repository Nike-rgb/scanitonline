import { Button } from "@mui/material";
import React from "react";

interface ButtonProps {
  children: React.ReactNode;
  icon: React.ReactNode;
  onClick: Function;
  variant?: "text" | "contained" | "outlined";
}

const MyButton = (props: ButtonProps) => {
  return (
    <Button
      className="my_button"
      sx={{
        borderRadius: "15px",
        textTransform: "none",
      }}
      endIcon={props.icon}
      variant={props.variant ?? "contained"}
      onClick={() => props.onClick()}>
      {props.children}
    </Button>
  );
};

export default MyButton;
