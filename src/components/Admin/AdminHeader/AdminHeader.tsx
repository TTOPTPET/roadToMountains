import { Button, Stack, Typography } from "@mui/material";
import { lightTurquoiseColor } from "../../../config/MUI/color/color";

export const AdminHeader = () => {
  return (
    <Stack
      justifyContent={"space-between"}
      direction={"row"}
      paddingX={3}
      bgcolor={lightTurquoiseColor}
    >
      <Typography component="p" mt={1}>
        🍔Admin page🍔
      </Typography>
      <Button>LogOut</Button>
    </Stack>
  );
};
