import { FC } from "react";
import { IAdminComponent } from "./AdminFabricTypes/AdminFabricTypes";
import { Button, Stack, Typography } from "@mui/material";
import { mobileWidth } from "../../../config/config";
import { whiteColor } from "../../../config/MUI/color/color";
import { tourBan, userBan } from "../../../submitFunctions/adminAPI";

export const AdminComponent: FC<IAdminComponent> = (props: IAdminComponent) => {
  const handlerUserBanClick = (touristId: string) => {
    userBan((value) => value, touristId, undefined, true);
  };

  const handlerTourBanClick = (tourId: string) => {
    tourBan((value) => value, tourId, undefined, true);
  };

  switch (props.type) {
    case "tourist": {
      const { touristId, name, phone, email, banStatus } = props;
      return (
        <Stack
          direction={"row"}
          key={touristId}
          minWidth={mobileWidth}
          justifyContent={"space-between"}
          borderRadius={5}
          padding={1}
          bgcolor={whiteColor}
        >
          <Typography component={"h5"} mt={2}>
            {name}
          </Typography>
          <Stack direction={"column"} className="ban-user-info">
            <Typography component={"p"} mt={2}>
              Контакты:
            </Typography>
            <Typography component={"p"} mt={2}>
              ⚫ {phone}
            </Typography>
            <Typography component={"p"} mt={2}>
              ⚫ {email}
            </Typography>
          </Stack>
          <Stack direction={"column"} className="ban-info">
            <Typography component={"p"} mt={2}>
              Статус блокировки:
            </Typography>
            {banStatus ? (
              <Typography component={"p"} mt={2}>
                Живчик
              </Typography>
            ) : (
              <Typography component={"p"} mt={2}>
                Заблокирован
              </Typography>
            )}
          </Stack>
          <Stack alignItems={"center"} direction={"row"} className="ban-button">
            <Button
              color="secondary"
              onClick={() => handlerUserBanClick(touristId)}
            >
              Переключить статус блокировки
            </Button>
          </Stack>
        </Stack>
      );
    }
    case "tour": {
      const { tourId, tourName, creatorInfo } = props;
      const { name, phone, email } = creatorInfo;
      return (
        <Stack
          direction={"row"}
          key={tourId}
          minWidth={mobileWidth}
          justifyContent={"space-between"}
          borderRadius={5}
          padding={1}
          bgcolor={whiteColor}
        >
          <Stack direction={"column"} className="tour-info">
            <Typography component={"h5"} mt={2}>
              {tourName}
            </Typography>
            <Typography component={"p"} mt={2}>
              {name}
            </Typography>
            <Typography component={"p"} mt={2}>
              Ссылки в апи не было:/
            </Typography>
          </Stack>
          <Stack direction={"column"} className="creator-info">
            <Typography component={"p"} mt={2}>
              ⚫ {phone}
            </Typography>
            <Typography component={"p"} mt={2}>
              ⚫ {email}
            </Typography>
            <Typography component={"p"} mt={2}>
              ⚫ {name}
            </Typography>
          </Stack>
          <Stack alignItems={"center"} direction={"row"} className="ban-button">
            <Button
              color="secondary"
              onClick={() => handlerTourBanClick(tourId)}
            >
              Переключить статус блокировки
            </Button>
          </Stack>
        </Stack>
      );
    }
    case "message": {
      return <Stack></Stack>;
    }
    case "creator": {
      return <></>;
    }
    case "admin": {
      return <></>;
    }

    default:
      return null;
  }
};
