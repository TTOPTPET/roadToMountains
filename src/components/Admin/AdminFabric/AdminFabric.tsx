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
} from "../../../API/adminAPI";
import { IChangeStatus } from "../../../models/adminModels/IChangeStatus";
import { ReactComponent as DownloadIcon } from "../../../media/download.svg";
import dayjs from "dayjs";

enum messageStatus {
  notRead = "notRead",
  read = "read",
  solved = "solved",
}

enum verifyStatus {
  notVerified = "notVerified",
  verified = "verified",
  sendVerified = "sendVerified",
  waitVerified = "waitVerified",
}

export const AdminComponent: FC<IAdminComponent> = (props: IAdminComponent) => {
  const [expanded, setExpanded] = useState<boolean>(false);

  const handlerUserBanClick = (touristId: string) => {
    userBan((value) => value, touristId, undefined, false);
  };

  const handlerTourBanClick = (tourId: string) => {
    tourBan((value) => value, tourId, undefined, false);
  };

  const handlerMessageStatusClick = (status: IChangeStatus) => {
    changeMessageStatus((value) => value, status, undefined, false);
  };

  const handlerVerifyStatusClick = (creatorId: string) => {
    verifyCreator((value) => value, creatorId, undefined, false);
  };

  const handlerDownloadClick = (path: string) => {
    const link = document.createElement("a");
    link.download = path;
    link.href = "./" + path;
    link.click();
  };

  const getMessageStatus = (status: string): string => {
    switch (status) {
      case messageStatus.notRead:
        return "Не прочитано";
      case messageStatus.read:
        return "Прочитано";
      case messageStatus.solved:
        return "Решено";
      default:
        return "Неизвестный тип";
    }
  };

  const getVerifyStatus = (status: string): string => {
    switch (status) {
      case verifyStatus.notVerified:
        return "Не подтверджен";
      case verifyStatus.verified:
        return "Подтверджен";
      case verifyStatus.sendVerified:
        return "Отправлен на подтверждение";
      case verifyStatus.waitVerified:
        return "Ожидает подтверждения";
      default:
        return "Неизвестный статус";
    }
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
            <Typography variant={"caption"}>{name}</Typography>
          </Grid>

          <Grid item className="tourist__contacts">
            <Typography variant={"caption"}>Контакты:</Typography>
            <Typography variant={"caption"}>⚫ {phone}</Typography>
            <Typography variant={"caption"}>⚫ {email}</Typography>
          </Grid>

          <Grid item className="tourist__ban">
            <Typography variant={"caption"}>Статус блокировки:</Typography>
            {!banStatus ? (
              <Typography variant={"caption"}>Разблокирован</Typography>
            ) : (
              <Typography variant={"caption"}>Заблокирован</Typography>
            )}
          </Grid>

          <Grid
            item
            textAlign={"center"}
            marginY={"auto"}
            className="user__ban"
          >
            <Button
              variant="text"
              onClick={() => handlerUserBanClick(touristId)}
            >
              Переключить статус блокировки
            </Button>
          </Grid>
        </Grid>
      );
    }
    case "tour": {
      const { tourId, tourName, creatorInfo, banStatus } = props;
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
          <Grid item md={3} className="tour__info">
            <Typography variant={"h6"}>{tourName}</Typography>
            <Typography variant={"caption"}>{name}</Typography>
          </Grid>
          <Grid item className="creator__info">
            <Typography variant={"caption"}>⚫ {phone}</Typography>
            <Typography variant={"caption"}>⚫ {email}</Typography>
            <Typography variant={"caption"}>⚫ {name}</Typography>
          </Grid>
          <Grid item className="ban__status">
            <Typography variant={"caption"}>Статус блокировки:</Typography>
            {!banStatus ? (
              <Typography variant={"caption"}>Разблокирован</Typography>
            ) : (
              <Typography variant={"caption"}>Заблокирован</Typography>
            )}
          </Grid>
          <Grid
            item
            textAlign={"center"}
            marginY={"auto"}
            className="user__ban"
          >
            <Button
              variant={"text"}
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
        <div>
          <Accordion
            defaultExpanded
            className="message__panel"
            expanded={expanded}
            square={true}
          >
            <AccordionSummary id="panel4bh-header">
              <Grid
                container
                padding={1}
                gap={4}
                justifyContent={"space-between"}
              >
                <Grid item className="user__info">
                  <Typography variant={"h5"}>{name}</Typography>
                  <Typography variant={"caption"}>Контакты:</Typography>
                  <Typography variant={"caption"}>⚫ {phone}</Typography>
                  <Typography variant={"caption"}>⚫ {email}</Typography>
                </Grid>
                <Grid item className="problem__info">
                  <Typography variant={"h5"}>
                    Тип: {typeMessage} Статус: {getMessageStatus(statusMessage)}
                  </Typography>
                  {typeMessage === "tourProblem" && (
                    <>
                      <Typography variant={"caption"}>⚫ {tourName}</Typography>
                      <Typography variant={"caption"}>
                        ⚫ {creatorName}
                      </Typography>
                      <Typography variant={"caption"}>
                        ⚫ {dayjs(from).format("D MMMM YYYY")} -{" "}
                        {dayjs(to).format("D MMMM YYYY")}
                      </Typography>
                    </>
                  )}
                </Grid>
                <Grid item marginY={"auto"} className="user__ban">
                  <Button
                    variant={"text"}
                    onClick={() =>
                      handlerMessageStatusClick({ messageId, statusMessage })
                    }
                  >
                    Переключить статус заявки
                  </Button>
                </Grid>
                <Grid item xs={10}>
                  <Button onClick={() => setExpanded(!expanded)}>
                    {!expanded ? (
                      <>Расскрыть сообщение</>
                    ) : (
                      <>Скрыть сообщение</>
                    )}
                  </Button>
                </Grid>
              </Grid>
            </AccordionSummary>
            <AccordionDetails>
              <Typography variant={"caption"} padding={2} flexWrap={"wrap"}>
                {message}
              </Typography>
            </AccordionDetails>
          </Accordion>
        </div>
      );
    }
    case "creator": {
      const { phone, email, name, creatorId, dataUser, banStatus } = props;
      const {
        regisryId,
        ceratorType,
        statusVerify,
        changeVerifyDate,
        documents,
      } = dataUser;
      return (
        <Stack
          direction={"column"}
          bgcolor={whiteColor}
          borderRadius={5}
          minWidth={mobileWidth}
          padding={1}
        >
          <Grid container justifyContent={"space-between"}>
            <Grid item xs={5.5} className="creator__info">
              <Typography variant={"h5"}>{name}</Typography>
              <Stack
                direction={"row"}
                flexWrap={"wrap"}
                justifyContent={"space-between"}
              >
                <Stack direction={"column"}>
                  <Typography variant={"caption"}>Телефон: {phone}</Typography>
                  <Typography variant={"caption"}>Почта: {email}</Typography>
                </Stack>
                <Stack direction={"column"}>
                  <Typography variant={"caption"}>
                    Номер в реестре: {regisryId}
                  </Typography>
                  <Typography variant={"caption"}>
                    Тип: {ceratorType}
                  </Typography>
                </Stack>
                <Stack direction={"column"}>
                  <Typography variant={"caption"} mt={1}>
                    Статус блокировки:
                  </Typography>
                  {!banStatus ? (
                    <Typography variant={"caption"} mt={1}>
                      Разблокирован
                    </Typography>
                  ) : (
                    <Typography variant={"caption"} mt={1}>
                      Заблокирован
                    </Typography>
                  )}
                </Stack>
              </Stack>
            </Grid>
            <Grid
              container
              item
              xs={6.5}
              gap={1}
              justifyContent={"center"}
              marginY={"auto"}
              className="buttons"
            >
              <Typography variant={"caption"}>
                {getVerifyStatus(statusVerify)}:{" "}
                {dayjs(changeVerifyDate).format("D MMMM YYYY")}
              </Typography>
              <Button
                variant="text"
                onClick={() => handlerVerifyStatusClick(creatorId)}
              >
                Переключить статус верификации
              </Button>
              <Button
                variant="text"
                onClick={() => handlerUserBanClick(creatorId)}
              >
                Переключить статус блокировки
              </Button>
            </Grid>
          </Grid>
          <Stack direction={"column"} gap={1} mt={2}>
            {documents &&
              documents.map((document, index) => (
                <Stack direction={"row"} key={index} alignItems={"center"}>
                  <Button onClick={() => handlerDownloadClick(document.path)}>
                    <SvgIcon scale={0.1}>
                      <DownloadIcon />
                    </SvgIcon>{" "}
                  </Button>
                  <Typography variant={"caption"}>
                    {document.filename}
                  </Typography>
                </Stack>
              ))}
          </Stack>
        </Stack>
      );
    }
    case "admin": {
      const { adminId, phone, email, name, banStatus } = props;
      return (
        <Grid
          container
          minWidth={mobileWidth}
          justifyContent={"space-between"}
          borderRadius={5}
          bgcolor={whiteColor}
          padding={1}
        >
          <Typography variant={"h5"}>{name}</Typography>
          <Grid item className="ban__user-info">
            <Typography variant={"caption"}>Контакты:</Typography>
            <Typography variant={"caption"}>⚫ {phone}</Typography>
            <Typography variant={"caption"}>⚫ {email}</Typography>
          </Grid>
          <Grid item className="ban__status">
            <Typography variant={"caption"}>Статус блокировки:</Typography>
            {!banStatus ? (
              <Typography variant={"caption"}>Разблокирован</Typography>
            ) : (
              <Typography variant={"caption"}>Заблокирован</Typography>
            )}
          </Grid>
          <Grid item marginY={"auto"} className="user__ban">
            <Button
              variant={"text"}
              onClick={() => handlerUserBanClick(adminId)}
            >
              {" "}
              Переключить статус блокировки
            </Button>
          </Grid>
        </Grid>
      );
    }

    default:
      return null;
  }
};
