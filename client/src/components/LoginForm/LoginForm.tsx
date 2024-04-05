import { FC, useState } from "react";
import { Box, TextField, Typography } from "@mui/material";
import { useGoBack } from "../../hooks/useGoBack";

import Button from "../Button";
import { Link } from "react-router-dom";
import { useLogin } from "../../hooks/useLogin";
import { CustomizedSnackbars } from "../Snackbar";

const LoginForm: FC = () => {
  const goBack = useGoBack();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const { loginUsers } = useLogin({ email, password });

  const handleLoginUser = async () => {
    try {
      await loginUsers();
      setEmail("");
      setPassword("");
      setError(null);
    } catch (error: any) {
      setError(error.message);
    }
  };

  return (
    <>
      {error && <p>{error}</p>}

      <div>
        <Typography variant="h4" align="center" m={4}>
          Login Form
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
        </div>
      </Box>
      <div style={{ display: "flex", justifyContent: "space-around" }}>
        {/* <Link style={{ textDecoration: "none" }} to={"/"}> */}
        {error ? (
          <CustomizedSnackbars
            onClick={handleLoginUser}
            snackbarText={error}
            severity="error"
				btnName="Login"
          />
        ) : (
          <CustomizedSnackbars
            onClick={handleLoginUser}
            snackbarText="Login success"
            severity="success"
				btnName="Login"
          />
        )}
        {/* </Link> */}
        <Link style={{ textDecoration: "none" }} to={"/registartion"}>
          <Button
            onClick={goBack}
            buttonText="Create Account"
            color="warning"
          />
        </Link>
        <Button onClick={goBack} buttonText="Cancel" color="error" />
      </div>
    </>
  );
};

export default LoginForm;
