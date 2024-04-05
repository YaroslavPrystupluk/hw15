import { FC, useState } from "react";
import { Box, TextField, Typography } from "@mui/material";
import { useGoBack } from "../../hooks/useGoBack";

import Button from "../Button";
import { Link } from "react-router-dom";
import { useAddNewUser } from "../../hooks/useAddUser";
import { CustomizedSnackbars } from "../Snackbar";

const RegistrationForm: FC = () => {
  const goBack = useGoBack();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
    const [error, setError] = useState(null);
  const { addNewUsers } = useAddNewUser({ email, password, confirmPassword });

  const handleCreateUser = async() => {
	try {
		await addNewUsers();
		setEmail("");
		setPassword("");
		setConfirmPassword("");
		setError(null);
	} catch (error: any) {
		setError(error.message);
	}
  };

  return (
    <>
      <div>
        <Typography variant="h4" align="center" m={4}>
          Registartion Form
        </Typography>
      </div>
      <Box
        component="form"
        sx={{
          "& .MuiTextField-root": { m: 1, width: "50%" },
        }}
        noValidate
        autoComplete="off"
      >
        <div style={{ display: "flex" }}>
          <TextField
            label="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <TextField
            type="password"
            label="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <TextField
            type="password"
            label="Enter your confirm password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        </div>
      </Box>
      <div style={{ display: "flex", justifyContent: "space-around" }}>
        {/* <Link style={{ textDecoration: "none" }} to={"/"}> */}
          {error ? (
            <CustomizedSnackbars
              onClick={handleCreateUser}
              snackbarText={error}
              severity="error"
				  btnName="Register"
            />
          ) : (
            <CustomizedSnackbars
              onClick={handleCreateUser}
              snackbarText="Register success"
              severity="success"
				  btnName="Register"
            />
          )}
        {/* </Link> */}
        <Link style={{ textDecoration: "none" }} to={"/login"}>
          <Button
            onClick={handleCreateUser}
            buttonText="Log In"
            color="warning"
          />
        </Link>
        <Button onClick={goBack} buttonText="Cancel" color="error" />
      </div>
    </>
  );
};

export default RegistrationForm;
