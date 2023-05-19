import { Button, Stack, Typography } from "@mui/material";
import { lightTurquoiseColor } from "../../../config/MUI/color/color";
import { logout } from "../../../API/authAPI/logout";
import { useCookies } from "react-cookie";
import {
  BAN_STATUS,
  REFRESH_TOKEN,
  TOKEN,
  USER_ROLE,
} from "../../../config/types";
import { useNavigate } from "react-router-dom";

export const AdminHeader = () => {
  const [cookies, setCookies, removeCookies] = useCookies([
    TOKEN,
    REFRESH_TOKEN,
    BAN_STATUS,
    USER_ROLE,
  ]);

  const navigate = useNavigate();

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
      <Button
        onClick={() => {
          logout();
          removeCookies(TOKEN, { path: "/" });
          removeCookies(REFRESH_TOKEN, { path: "/" });
          removeCookies(USER_ROLE, { path: "/" });
          removeCookies(BAN_STATUS, { path: "/" });
          navigate("/auth");
        }}
      >
        LogOut
      </Button>
    </Stack>
  );
};
