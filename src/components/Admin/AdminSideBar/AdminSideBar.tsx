import { List, ListItem, Stack, Link } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";
import "./AdminSideBar.css";

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
  return (
    <Stack direction={"column"} width={"250px"}>
      <List>
        {sideBarNavItems.map((item, index) => (
          <ListItem key={index}>
            <Link to={item.to} component={RouterLink} variant="body1">
              {item.display}
            </Link>
          </ListItem>
        ))}
      </List>
    </Stack>
  );
};
