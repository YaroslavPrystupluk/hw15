import { FC, } from "react";
import { Box, TextField } from "@mui/material";
import { useGoBack } from "../../hooks/useGoBack";

import Button from "../Button";
import { Link, } from "react-router-dom";


interface IProps {
  isEditing?: boolean;
  title: string;
  updateTitle: (str: string) => void;
  text: string;
  updateText: (str: string) => void;
  handleCreateNewspost?: () => void;
  handleEditNewspost?: () => void;
}

const Form: FC<IProps> = ({
  isEditing,
  handleCreateNewspost,
  handleEditNewspost,
  title,
  updateTitle,
  text,
  updateText,
}) => {
  const goBack = useGoBack();


  return (
    <>
      <Box
        component="form"
        sx={{
          "& .MuiTextField-root": { m: 1, width: "100%" },
        }}
        noValidate
        autoComplete="off"
      >
        <div>
          <TextField
            fullWidth
            id="fullWidth"
            label="enter the news headline"
            multiline
            value={title}
            onChange={(e) => updateTitle(e.target.value)}
          />
          <TextField
            fullWidth
            id="fullWidth"
            label="Enter the news text"
            multiline
            rows={4}
            value={text}
            onChange={(e) => updateText(e.target.value)}
          />
        </div>
      </Box>
      <div style={{ display: "flex", justifyContent: "space-around" }}>
        <Link style={{ textDecoration: "none" }} to={"/"}>
          <Button
            onClick={isEditing ? handleEditNewspost : handleCreateNewspost}
            buttonText={isEditing ? "Update" : "Submit"}
          />
        </Link>
        <Button onClick={goBack} buttonText="Cancel" color="error" />
      </div>
    </>
  );
};

export default Form;
