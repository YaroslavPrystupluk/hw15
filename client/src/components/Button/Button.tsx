import { FC } from "react";

import { Stack, Button } from "@mui/material";
import { BtnProps } from "../../interface/item";


const Btn: FC<BtnProps> = ({
  buttonText,
  color = "success",
  variant = "contained",
  onClick,
}) => {
  return (
    <Stack mt={2} mb={2} direction="row" spacing={2}>
      <Button onClick={onClick} variant={variant} color={color}>
        {buttonText}
      </Button>
    </Stack>
  );
};

export default Btn
