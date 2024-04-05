import { FC, useState } from 'react'
import {Snackbar, Alert} from "@mui/material";
import { ISnackBar } from '../../interface/item';
import Btn from '../Button';

const CustomizedSnackbars: FC<ISnackBar> = ({snackbarText, severity, btnName, onClick}) => {
  const [open, setOpen] = useState(false);

  const handleClick = () => {
    setOpen(true);
	 if (onClick) {
		onClick();
	 }
  };

  const handleClose = (
    event?: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };

  return (
    <div>
		<Btn buttonText={btnName} onClick={() => handleClick()} />
      <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
        <Alert
          onClose={handleClose}
          severity={severity}
          variant="filled"
          sx={{ width: "100%" }}
        >
          {snackbarText}
        </Alert>
      </Snackbar>
    </div>
  );
};

export default CustomizedSnackbars;
