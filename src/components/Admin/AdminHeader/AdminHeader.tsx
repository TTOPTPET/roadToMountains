import { Button, Stack } from "@mui/material";
import { FC } from "react";

export const AdminHeader: FC = () => {
  return (
    <Stack justifyContent={"space-between"} direction={"row"}>
      <p>Logo</p>
      <Button variant="text" color="error">
        LogOut
      </Button>
    </Stack>
  );
};
