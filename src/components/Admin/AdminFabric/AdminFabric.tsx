import { FC, useState } from "react";
import { IAdminComponent } from "./AdminFabricTypes/AdminFabricTypes";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Button,
  Grid,
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
        <Grid
          container
          borderRadius={5}
          gap={4}
          padding={1}
          bgcolor={whiteColor}
          width={mobileWidth}
        >
          <Grid item className="tourist__name">
            <Typography variant={"h4"}>{name}</Typography>
          </Grid>

          <Grid item className="tourist__contacts">
            <Typography variant={"h5"}>Контакты:</Typography>
            <Typography variant={"h5"}>⚫ {phone}</Typography>
            <Typography variant={"h5"}>⚫ {email}</Typography>
          </Grid>

          <Grid item className="tourist__ban">
            <Typography variant={"h5"}>Статус блокировки:</Typography>
            {banStatus ? (
              <Typography variant={"h5"}>Живчик</Typography>
            ) : (
              <Typography variant={"h5"}>Заблокирован</Typography>
            )}
          </Grid>

          <Grid
            item
            textAlign={"center"}
            marginY={"auto"}
            className="user__ban"
          >
            <Button
              color="secondary"
              onClick={() => handlerUserBanClick(touristId)}
            >
              Переключить статус блокировки
            </Button>
          </Grid>
        </Grid>
      );
    }
    case "tour": {
      const { tourId, tourName, creatorInfo } = props;
      const { name, phone, email } = creatorInfo;

      return (
        <Grid
          container
          minWidth={mobileWidth}
          gap={4}
          borderRadius={5}
          padding={1}
          bgcolor={whiteColor}
        >
          <Grid item className="tour__info">
            <Typography variant={"h4"}>{tourName}</Typography>
            <Typography variant={"h5"}>{name}</Typography>
            <Typography variant={"h5"}>Ссылки в апи не было:/</Typography>
          </Grid>
          <Grid item className="creator__info">
            <Typography variant={"h5"}>⚫ {phone}</Typography>
            <Typography variant={"h5"}>⚫ {email}</Typography>
            <Typography variant={"h5"}>⚫ {name}</Typography>
          </Grid>
          <Grid
            item
            textAlign={"center"}
            marginY={"auto"}
            className="user__ban"
          >
            <Button
              color="secondary"
              onClick={() => handlerTourBanClick(tourId)}
            >
              Переключить статус блокировки
            </Button>
          </Grid>
        </Grid>
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
        <Stack
          bgcolor={whiteColor}
          minWidth={mobileWidth}
          maxWidth={"50%"}
          borderRadius={5}
        >
          <Grid container padding={1} gap={4}>
            <Grid item xs={4} className="user__info">
              <Typography variant={"h4"}>{name}</Typography>
              <Typography variant={"h5"}>Контакты:</Typography>
              <Typography variant={"h5"}>⚫ {phone}</Typography>
              <Typography variant={"h5"}>⚫ {email}</Typography>
            </Grid>
            <Grid item xs={3} className="problem__info">
              <Typography variant={"h5"}>Тип: {typeMessage}</Typography>
              {typeMessage === "проблема с туром" && (
                <>
                  <Typography variant={"h5"}>
                    ⚫ {tourName}, {publicTourId}
                  </Typography>
                  <Typography variant={"h5"}>⚫ {creatorName}</Typography>
                  <Typography variant={"h5"}>
                    ⚫ {from} - {to}
                  </Typography>
                </>
              )}
            </Grid>
            <Grid item marginY={"auto"} className="user__ban">
              <Button
                color="secondary"
                onClick={() =>
                  handlerMessageStatusClick({ messageId, statusMessage })
                }
              >
                Переключить статус заявки
              </Button>
            </Grid>
          </Grid>
          <Accordion
            expanded={expanded === "panel4"}
            onChange={handleChange("panel4")}
            className="message__panel"
          >
            <AccordionSummary
              aria-controls="panel4bh-content"
              id="panel4bh-header"
            >
              {!expanded ? <>Расскрыть сообщение</> : <>Скрыть сообщение</>}
            </AccordionSummary>
            <AccordionDetails>
              <Typography variant={"h5"}>{message}</Typography>
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
        <Stack
          direction={"column"}
          bgcolor={whiteColor}
          borderRadius={5}
          minWidth={mobileWidth}
        >
          <Grid container padding={1} gap={4}>
            <Grid item className="creator__info">
              <Typography variant={"h4"}>{name}</Typography>
              <Stack direction={"row"} flexWrap={"wrap"} gap={10}>
                <Stack direction={"column"}>
                  <Typography variant={"h5"}>Телефон: {phone}</Typography>
                  <Typography variant={"h5"}>Почта: {email}</Typography>
                </Stack>
                <Stack direction={"column"}>
                  <Typography variant={"h5"}>
                    Номер в реестре: {regisryId}
                  </Typography>
                  <Typography variant={"h5"}>Тип: {ceratorType}</Typography>
                </Stack>
              </Stack>
            </Grid>
            <Grid
              container
              item
              xs={5}
              gap={1}
              justifyContent={"center"}
              marginY={"auto"}
              className="buttons"
            >
              <Typography variant={"h5"}>
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
            </Grid>
          </Grid>
          {creatorDocuments.map((document, index) => (
            <Stack direction={"row"} key={index}>
              <Button
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
        <Grid
          container
          minWidth={mobileWidth}
          justifyContent={"space-between"}
          borderRadius={5}
          bgcolor={whiteColor}
          padding={1}
        >
          <Typography variant={"h4"}>{name}</Typography>
          <Grid item className="ban__user-info">
            <Typography variant={"h5"}>Контакты:</Typography>
            <Typography variant={"h5"}>⚫ {phone}</Typography>
            <Typography variant={"h5"}>⚫ {email}</Typography>
          </Grid>
          <Grid item marginY={"auto"} className="user__ban">
            <Button color={banStatus ? "secondary" : "error"}>
              В данных не было id, не заметил:/
            </Button>
          </Grid>
        </Grid>
      );
    }

    default:
      return null;
  }
};
