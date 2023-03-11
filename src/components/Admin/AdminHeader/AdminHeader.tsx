import { Button, Stack } from "@mui/material";

export const AdminHeader = () => {
  return (
    <Stack justifyContent={"space-between"} direction={"row"}>
      <p>Logo</p>
      <Button variant="text" color="error">
        LogOut
      </Button>
    </Stack>
  );
};
