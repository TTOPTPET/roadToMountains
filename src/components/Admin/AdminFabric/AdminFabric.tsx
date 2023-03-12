import { FC, useState } from "react";
import { IAdminComponent } from "./AdminFabricTypes/AdminFabricTypes";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Button,
  Stack,
  SvgIcon,
  Typography,
} from "@mui/material";
import { mobileWidth } from "../../../config/config";
import { whiteColor } from "../../../config/MUI/color/color";
import {
  changeMessageStatus,
  tourBan,
  userBan,
  verifyCreator,
} from "../../../submitFunctions/adminAPI";
import { IChangeStatus } from "../../../models/adminModels/IChangeStatus";
import { ReactComponent as DownloadIcon } from "../../../media/download.svg";

export const AdminComponent: FC<IAdminComponent> = (props: IAdminComponent) => {
  const [expanded, setExpanded] = useState<string | false>(false);

  const handleChange =
    (panel: string) => (event: React.SyntheticEvent, isExpanded: boolean) => {
      setExpanded(isExpanded ? panel : false);
    };
  const handlerUserBanClick = (touristId: string) => {
    userBan((value) => value, touristId, undefined, true);
  };

  const handlerTourBanClick = (tourId: string) => {
    tourBan((value) => value, tourId, undefined, true);
  };

  const handlerMessageStatusClick = (status: IChangeStatus) => {
    changeMessageStatus((value) => value, status, undefined, true);
  };

  const handlerVerifyStatusClick = (creatorId: string) => {
    verifyCreator((value) => value, creatorId, undefined, true);
  };

  const handlerDownloadClick = (path: string) => {
    const link = document.createElement("a");
    link.download = path;
    link.href = "./" + path;
    link.click();
  };

  switch (props.type) {
    case "tourist": {
      const { touristId, name, phone, email, banStatus } = props;

      return (
        <Stack
          direction={"row"}
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
      const { userInfo, messageId, statusMessage, typeMessage, dataMessage } =
        props;
      const { phone, email, name } = userInfo;
      const { tourInfo, message } = dataMessage;
      const { tourDate, publicTourId, tourName, creatorName } = tourInfo;
      const { from, to } = tourDate;

      return (
        <Stack bgcolor={whiteColor}>
          <Stack
            direction={"row"}
            minWidth={mobileWidth}
            justifyContent={"space-between"}
            borderRadius={5}
            padding={1}
          >
            <Stack direction={"column"} className="user-info">
              <Typography component={"h1"} mt={2}>
                {name}
              </Typography>
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
            <Stack direction={"column"}>
              <Typography component={"p"} mt={2}>
                {typeMessage}
              </Typography>
              {typeMessage === "проблема с туром" && (
                <>
                  <Typography component={"p"} mt={2}>
                    ⚫ {tourName}, {publicTourId}
                  </Typography>
                  <Typography component={"p"} mt={2}>
                    ⚫ {creatorName}
                  </Typography>
                  <Typography component={"p"} mt={2}>
                    ⚫ {from} - {to}
                  </Typography>
                </>
              )}
            </Stack>
            <Stack
              alignItems={"center"}
              direction={"row"}
              className="ban-button"
            >
              <Button
                color="secondary"
                onClick={() =>
                  handlerMessageStatusClick({ messageId, statusMessage })
                }
              >
                Переключить статус заявки
              </Button>
            </Stack>
          </Stack>
          <Accordion
            expanded={expanded === "panel4"}
            onChange={handleChange("panel4")}
            className="message-panel"
          >
            <AccordionSummary
              aria-controls="panel4bh-content"
              id="panel4bh-header"
            >
              {!expanded ? <>Расскрыть сообщение</> : <>Скрыть сообщение</>}
            </AccordionSummary>
            <AccordionDetails>
              <Typography component={"p"} mt={2}>
                {message}
              </Typography>
            </AccordionDetails>
          </Accordion>
        </Stack>
      );
    }
    case "creator": {
      const { phone, email, name, creatorId, dataUser } = props;
      const {
        regisryId,
        ceratorType,
        statusVerify,
        changeVerifyDate,
        creatorDocuments,
      } = dataUser;
      return (
        <Stack direction={"column"} bgcolor={whiteColor}>
          <Stack
            direction={"row"}
            minWidth={mobileWidth}
            justifyContent={"space-between"}
            borderRadius={5}
            padding={1}
          >
            <Stack direction={"column"} className="creator-info">
              <Typography component={"h1"} mt={2}>
                {name}
              </Typography>
              <Stack direction={"row"} flexWrap={"wrap"} gap={10}>
                <Stack direction={"column"}>
                  <Typography component={"p"} mt={2}>
                    Телефон: {phone}
                  </Typography>
                  <Typography component={"p"} mt={2}>
                    Почта: {email}
                  </Typography>
                </Stack>
                <Stack direction={"column"}>
                  <Typography component={"p"} mt={2}>
                    Номер в реестре: {regisryId}
                  </Typography>
                  <Typography component={"p"} mt={2}>
                    Тип: {ceratorType}
                  </Typography>
                </Stack>
              </Stack>
            </Stack>
            <Stack
              alignItems={"center"}
              direction={"column"}
              className="buttons"
              gap={1}
            >
              <Typography component={"p"} mt={2}>
                {statusVerify}: {changeVerifyDate}
              </Typography>
              <Button
                color="secondary"
                onClick={() => handlerVerifyStatusClick(creatorId)}
              >
                Переключить статус верификации
              </Button>
              <Button
                color="secondary"
                onClick={() => handlerUserBanClick(creatorId)}
              >
                Переключить статус блокировки
              </Button>
            </Stack>
          </Stack>
          {creatorDocuments.map((document, index) => (
            <Stack direction={"row"} key={index}>
              <Button
                variant="text"
                onClick={() => handlerDownloadClick(document.documentPath)}
              >
                <SvgIcon scale={0.1}>
                  <DownloadIcon />
                </SvgIcon>
              </Button>
              <Typography component={"p"} mt={1}>
                {document.documentName}
              </Typography>
            </Stack>
          ))}
        </Stack>
      );
    }
    case "admin": {
      const { phone, email, name, banStatus } = props;
      return (
        <Stack
          direction={"row"}
          minWidth={mobileWidth}
          justifyContent={"space-between"}
          borderRadius={5}
          bgcolor={whiteColor}
          padding={1}
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
          <Stack alignItems={"center"} direction={"row"} className="ban-button">
            <Button color={banStatus ? "secondary" : "error"}>
              В данных не было id, не заметил:/
            </Button>
          </Stack>
        </Stack>
      );
    }

    default:
      return null;
  }
};
