import { List, ListItem, Stack } from "@mui/material";
import { FC } from "react";
import { NavLink } from "react-router-dom";
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

export const AdminSideBar: FC = () => {
  return (
    <Stack direction={"column"} width={"250px"}>
      <List>
        {sideBarNavItems.map((item, index) => (
          <ListItem key={index}>
            <NavLink
              to={item.to}
              className={({ isActive }) =>
                isActive ? "admin-sidebar__link--active" : "admin-sidebar__link"
              }
            >
              {item.display}
            </NavLink>
          </ListItem>
        ))}
      </List>
    </Stack>
  );
};
