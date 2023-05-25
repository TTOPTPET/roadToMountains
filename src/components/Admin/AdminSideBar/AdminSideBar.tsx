import { List, ListItem, Stack, Button, Divider } from "@mui/material";
import { NavLink as RouterLink, useLocation } from "react-router-dom";
import { lightTurquoiseColor } from "../../../config/MUI/color/color";

interface ISideBarNavItems {
  display: string;
  to: string;
}

const sideBarNavItems: ISideBarNavItems[] = [
  {
    display: "Управление доступом туристов",
    to: "access-tourist",
  },
  {
    display: "Управление доступом к турам",
    to: "access-tour",
  },
  {
    display: "Управление верификациями туроператоров",
    to: "verify-touroperator",
  },
  {
    display: "Сообщения от пользователей",
    to: "messages",
  },
  {
    display: "Подтверждение регистрации администраторов",
    to: "confirm-admin",
  },
];

export const AdminSideBar = () => {
  const location = useLocation();
  return (
    <Stack direction={"column"} position={"fixed"}>
      <List>
        {sideBarNavItems.map((item, index) => (
          <>
            <ListItem key={index} sx={{ width: 340 }}>
              <Button
                to={item.to}
                component={RouterLink}
                variant={"textButton"}
                sx={{
                  padding: 2,
                  height: "auto",
                  backgroundColor:
                    location.pathname === `/admin/${item.to}`
                      ? lightTurquoiseColor
                      : "",
                  ":hover": {
                    backgroundColor: lightTurquoiseColor,
                  },
                }}
              >
                {item.display}
              </Button>
            </ListItem>
            {index === sideBarNavItems.length - 1 ? <></> : <Divider />}
          </>
        ))}
      </List>
    </Stack>
  );
};
