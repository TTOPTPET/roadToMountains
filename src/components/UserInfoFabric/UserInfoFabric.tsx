import { useEffect, useState } from "react";
import { getUserInfo } from "../../submitFunctions/commonAPI";
import {
  IUserInfo,
  StatusVerify,
  userTypes,
} from "../../models/userModels/IUserInfo";
import { Typography, Box, Button } from "@mui/material";
import { darkTurquoiseColor } from "../../config/MUI/color/color";
import userPhoto from "../../media/userPhoto.svg";
import UserInfoData from "./UserInfoData/UserInfoData";

import { StyledTooltip } from "../../config/MUI/styledComponents/StyledTooltip";

import checked from "../../media/checkedVerify.svg";
import clock from "../../media/clockVerify.svg";
import alert from "../../media/alertVerify.svg";

function UserInfoFabric() {
  const [userInfo, setUserInfo] = useState<IUserInfo>();
  const [loadingStatus, setLoadingStatus] = useState<Boolean>(true);

  useEffect(() => {
    setLoadingStatus(true);
    getUserInfo(
      (value) => {
        setUserInfo(value);
        setLoadingStatus(false);
      },
      undefined,
      true
    );
  }, []);

  const title =
    userInfo && userInfo.typeUser === "creator"
      ? "Личный кабинет"
      : "Привет, турист!";

  return (
    <Box className="userInfo__wrapper">
      <Box
        className="userInfo__header-wrapper"
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Box
          className="userInfo__header-title-wrapper"
          sx={{ display: "flex" }}
        >
          <Typography variant="h3">{title}</Typography>
          {userInfo &&
          userInfo.type !== userTypes.Tourist &&
          userInfo.dataUser.statusVerify === StatusVerify.verified ? (
            <StyledTooltip title="Данные подтверждены" arrow placement="bottom">
              <img
                src={checked}
                alt="checked verify"
                style={{ marginLeft: "15px" }}
              />
            </StyledTooltip>
          ) : userInfo &&
            userInfo.type !== userTypes.Tourist &&
            userInfo.dataUser.statusVerify === StatusVerify.sendVerified ? (
            <StyledTooltip title="Данные на проверке" arrow placement="bottom">
              <img
                src={clock}
                alt="send to check verify"
                style={{ marginLeft: "15px" }}
              />
            </StyledTooltip>
          ) : (
            <StyledTooltip
              title="Аккаунт заблокирован"
              arrow
              placement="bottom"
            >
              <img
                src={alert}
                alt="alert icon"
                style={{ marginLeft: "15px" }}
              />
            </StyledTooltip>
          )}
        </Box>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-end",
            mt: "40px",
          }}
        >
          {userInfo && userInfo.typeUser === "creator" && (
            <Button sx={{ mb: "10px" }}>Отправить на подтверждение</Button>
          )}
          <Button>Изменить</Button>
        </Box>
      </Box>
      <Box className="userInfo__body-wrapper">
        <Box className="userInfo__content" sx={{ mt: "20px", display: "flex" }}>
          <Box
            className="userInfo__content-avatar"
            sx={{
              width: "140px",
              height: "140px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              bgcolor: darkTurquoiseColor,
              borderRadius: "50%",
            }}
          >
            {userInfo && userInfo.photo ? (
              <img src={userInfo.photo} alt="user avatar" />
            ) : (
              <img src={userPhoto} alt="person icon" />
            )}
          </Box>
          <UserInfoData {...userInfo} />
        </Box>
      </Box>
    </Box>
  );
}

export default UserInfoFabric;
