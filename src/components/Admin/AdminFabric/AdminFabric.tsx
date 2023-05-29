import { FC, useState } from "react";
import { IAdminComponent } from "./AdminFabricTypes/AdminFabricTypes";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Autocomplete,
  Button,
  Grid,
  Stack,
  SvgIcon,
  TextField,
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
import { ReactComponent as DownloadIcon } from "../../../media/download.svg";
import dayjs from "dayjs";

enum MessageStatus {
  notRead = "notRead",
  read = "read",
  solved = "solved",
}

enum VerifyStatus {
  notVerified = "notVerified",
  verified = "verified",
  sendVerified = "sendVerified",
  waitVerified = "waitVerified",
}

const verifyTypes = [
  { id: VerifyStatus.notVerified, name: "Не подтверждён" },
  { id: VerifyStatus.verified, name: "Подтверджён" },
  { id: VerifyStatus.sendVerified, name: "Отправлен на подтверждение" },
  { id: VerifyStatus.waitVerified, name: "Ожидает подтверждения" },
];

const messageTypes = [
  { id: MessageStatus.notRead, name: "Не прочитано" },
  { id: MessageStatus.read, name: "Прочитано" },
  { id: MessageStatus.solved, name: "Решено" },
];

export const AdminComponent: FC<IAdminComponent> = (props: IAdminComponent) => {
  const [expanded, setExpanded] = useState<boolean>(false);
  const [statusVerify, setStatusVerify] = useState<string>(
    VerifyStatus.verified
  );
  const [statusMessage, setStatusMessage] = useState<string>(undefined);

  const handlerUserBanClick = (touristId: string) => {
    userBan((value) => value, touristId, undefined, false);
  };

  const handlerTourBanClick = (tourId: string) => {
    tourBan((value) => value, tourId, undefined, false);
  };

  const handlerMessageStatusClick = (messageId: string) => {
    changeMessageStatus(
      (value) => value,
      { messageId: messageId, statusMessage: statusMessage },
      undefined,
      false
    );
  };

  const handlerVerifyStatusClick = (creatorId: string) => {
    verifyCreator(
      (value) => value,
      { messageId: creatorId, statusMessage: statusVerify },
      undefined,
      false
    );
  };

  const handlerDownloadClick = (path: string) => {
    const link = document.createElement("a");
    link.download = path;
    link.href = "./" + path;
    link.click();
  };

  const getMessageStatus = (status: string): string => {
    switch (status) {
      case MessageStatus.notRead:
        return "Не прочитано";
      case MessageStatus.read:
        return "Прочитано";
      case MessageStatus.solved:
        return "Решено";
      default:
        return "Неизвестный тип";
    }
  };

  const getVerifyStatus = (status: string): string => {
    switch (status) {
      case VerifyStatus.notVerified:
        return "Не подтверджён";
      case VerifyStatus.verified:
        return "Подтверджён";
      case VerifyStatus.sendVerified:
        return "Отправлен на подтверждение";
      case VerifyStatus.waitVerified:
        return "Ожидает подтверждения";
      default:
        return "Неизвестный статус";
    }
  };

  const autocompleteChanged = (value: string) => {
    switch (props.type) {
      case "creator":
        setStatusVerify(value);
        break;
      case "message":
        setStatusMessage(value);
        break;
      default:
        break;
    }
  };

  switch (props.type) {
    case "tourist": {
      const { touristId, name, phone, email, banStatus } = props;

      return (
        <Grid
          container
          borderRadius={10}
          gap={4}
          padding={3}
          bgcolor={whiteColor}
          width={mobileWidth}
        >
          <Grid item className="tourist__name">
            <Typography variant={"h6"}>{name}</Typography>
          </Grid>
          <Grid item className="tourist__contacts">
            <Typography variant={"h6"}>Контакты:</Typography>
            <Stack direction={"row"} gap={2}>
              <Stack>
                <Typography variant={"caption"}>Тел.</Typography>
                <Typography variant={"caption"}>Почта</Typography>
              </Stack>
              <Stack>
                <Typography variant={"caption"}>{phone}</Typography>
                <Typography variant={"caption"}>{email}</Typography>
              </Stack>
            </Stack>
          </Grid>
          <Grid item className="tourist__ban">
            <Typography variant={"h6"}>Статус блокировки:</Typography>
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
              sx={{ fontSize: "18px" }}
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
          borderRadius={10}
          padding={3}
          bgcolor={whiteColor}
        >
          <Grid item md={3} className="tour__info">
            <Typography variant={"h6"}>{tourName}</Typography>
            <Typography variant={"caption"} mt={2}>
              {name}
            </Typography>
          </Grid>
          <Grid item className="creator__info">
            <Stack direction={"row"} gap={2}>
              <Stack>
                <Typography variant={"caption"}>Тел.</Typography>
                <Typography variant={"caption"}>Почта</Typography>
                <Typography variant={"caption"}>Имя</Typography>
              </Stack>
              <Stack>
                <Typography variant={"caption"}>{phone}</Typography>
                <Typography variant={"caption"}>{email}</Typography>
                <Typography variant={"caption"}>{name}</Typography>
              </Stack>
            </Stack>
          </Grid>
          <Grid item className="ban__status">
            <Typography variant={"h6"}>Статус блокировки:</Typography>
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
              sx={{ fontSize: "18px" }}
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
      const { tourDate, tourName, creatorName } = tourInfo;
      const { from, to } = tourDate;
      if (statusMessage === undefined) {
        setStatusMessage(statusMessage);
      }
      return (
        <div>
          <Accordion
            defaultExpanded
            className="message__panel"
            expanded={expanded}
            square={true}
          >
            <AccordionSummary id="panel4bh-header">
              <Grid container padding={2} gap={4}>
                <Grid item xs={5} className="user__info">
                  <Typography variant={"h6"}>{name}</Typography>
                  <Typography variant={"h6"}>Контакты:</Typography>
                  <Stack direction={"row"} gap={2}>
                    <Stack>
                      <Typography variant={"caption"}>Тел.</Typography>
                      <Typography variant={"caption"}>Почта</Typography>
                    </Stack>
                    <Stack>
                      <Typography variant={"caption"}>{phone}</Typography>
                      <Typography variant={"caption"}>{email}</Typography>
                    </Stack>
                  </Stack>
                </Grid>
                <Grid item xs={6} className="problem__info">
                  <Stack direction={"row"} gap={2}>
                    <Stack>
                      <Typography variant={"h6"}>Тип:</Typography>
                      <Typography variant={"h6"}>Статус:</Typography>
                    </Stack>
                    <Stack>
                      <Typography variant={"h6"}>{typeMessage}</Typography>
                      <Typography variant={"h6"}>
                        {getMessageStatus(statusMessage)}
                      </Typography>
                    </Stack>
                  </Stack>
                  {typeMessage === "tourProblem" && (
                    <>
                      <Typography variant={"caption"}> {tourName}</Typography>
                      <Typography variant={"caption"}>{creatorName}</Typography>
                      <Typography variant={"caption"}>
                        {dayjs(from).format("D MMMM YYYY")} -{" "}
                        {dayjs(to).format("D MMMM YYYY")}
                      </Typography>
                    </>
                  )}
                </Grid>
                <Grid item xs={7} className="user__ban">
                  <Stack gap={2}>
                    <Autocomplete
                      id="statusPicker"
                      onChange={(e, value) => autocompleteChanged(value?.id)}
                      options={messageTypes}
                      getOptionLabel={(option) => option.name}
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          placeholder="Выбор статуса"
                          color="secondary"
                        />
                      )}
                    />
                    <Button
                      variant={"text"}
                      sx={{ width: "100%", fontSize: "18px" }}
                      onClick={() => handlerMessageStatusClick(messageId)}
                    >
                      Переключить статус заявки
                    </Button>
                    <Button
                      sx={{ width: "100%", fontSize: "18px" }}
                      onClick={() => setExpanded(!expanded)}
                    >
                      {!expanded ? (
                        <>Расскрыть сообщение</>
                      ) : (
                        <>Скрыть сообщение</>
                      )}
                    </Button>
                  </Stack>
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
          borderRadius={10}
          minWidth={mobileWidth}
          padding={3}
        >
          <Grid container justifyContent={"space-between"}>
            <Grid item xs={5.5} className="creator__info">
              <Typography variant={"h6"}>{name}</Typography>
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
                <Stack direction={"row"} mt={4}>
                  <Typography variant={"h6"}>Статус блокировки:</Typography>
                  <Typography variant={"caption"} ml={2}>
                    {!banStatus ? "Разблокирован" : "Заблокирован"}
                  </Typography>
                </Stack>
              </Stack>
            </Grid>
            <Grid
              container
              item
              xs={6.2}
              gap={1}
              justifyContent={"center"}
              marginY={"auto"}
              className="buttons"
              mt={4}
            >
              <Typography variant={"caption"}>
                {getVerifyStatus(statusVerify)}:{" "}
                {dayjs(changeVerifyDate).format("D MMMM YYYY")}
              </Typography>
              <Autocomplete
                id="statusPicker"
                onChange={(e, value) => autocompleteChanged(value?.id)}
                options={verifyTypes}
                getOptionLabel={(option) => option.name}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    placeholder="Выбор статуса"
                    color="secondary"
                  />
                )}
              />
              <Button
                sx={{ width: "100%", fontSize: "18px" }}
                onClick={() => handlerVerifyStatusClick(creatorId)}
              >
                Переключить статус верификации
              </Button>
              <Button
                sx={{ width: "100%", fontSize: "18px" }}
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
                  <Button
                    variant="fileInput"
                    sx={{ width: 30, fontSize: "18px" }}
                    onClick={() => handlerDownloadClick(document.path)}
                  >
                    <SvgIcon scale={0.1}>
                      <DownloadIcon />
                    </SvgIcon>{" "}
                  </Button>
                  <Typography variant={"caption"} ml={1}>
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
          borderRadius={10}
          bgcolor={whiteColor}
          padding={3}
        >
          <Grid item xs={4} className="ban__user_name">
            <Typography variant={"h6"}>{name}</Typography>
          </Grid>
          <Grid item xs={4} className="ban__user_info">
            <Typography variant={"h6"}>Контакты:</Typography>
            <Stack direction={"row"} gap={2}>
              <Stack>
                <Typography variant={"caption"}>Тел.</Typography>
                <Typography variant={"caption"}>Почта</Typography>
              </Stack>
              <Stack>
                <Typography variant={"caption"}>{phone}</Typography>
                <Typography variant={"caption"}>{email}</Typography>
              </Stack>
            </Stack>
          </Grid>
          <Grid item xs={4} className="ban__status">
            <Typography variant={"h6"}>Статус блокировки:</Typography>
            {!banStatus ? (
              <Typography variant={"caption"}>Разблокирован</Typography>
            ) : (
              <Typography variant={"caption"}>Заблокирован</Typography>
            )}
          </Grid>
          <Grid item xs={6} marginY={"auto"} className="user__ban" mt={2}>
            <Button
              variant={"text"}
              sx={{ width: "100%", fontSize: "18px" }}
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
