import { useEffect, useState } from "react";
import { getUserInfo } from "../../submitFunctions/commonAPI";
import {
  IUserInfo,
  StatusVerify,
  userTypes,
} from "../../models/userModels/IUserInfo";
import { Typography, Box, Button, Skeleton } from "@mui/material";
import { darkTurquoiseColor } from "../../config/MUI/color/color";
import userPhoto from "../../media/userPhoto.svg";
import UserInfoData from "./UserInfoData/UserInfoData";

import { DarkStyledTooltip } from "../../config/MUI/styledComponents/StyledTooltip";

import checked from "../../media/checkedVerify.svg";
import clock from "../../media/clockVerify.svg";
import alert from "../../media/alertVerify.svg";
import CreatorDocumentsList from "../CreatorDocuments/CreatorDocumentsList";

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

  const userInfoDocumentsSkeleton = () => {
    return (
      <Box>
        <Typography variant="h5">Документы</Typography>
        <Box sx={{ display: "flex", gap: "10px", mt: "10px" }}>
          <Box>
            <Skeleton
              animation="wave"
              variant="rounded"
              width="100px"
              height="100px"
              sx={{ borderRadius: "30px" }}
            />
            <Skeleton
              animation="wave"
              variant="rounded"
              width="100px"
              height="20px"
              sx={{ mt: "10px" }}
            />
          </Box>
          <Box>
            <Skeleton
              animation="wave"
              variant="rounded"
              width="100px"
              height="100px"
              sx={{ borderRadius: "30px" }}
            />
            <Skeleton
              animation="wave"
              variant="rounded"
              width="100px"
              height="20px"
              sx={{ mt: "10px" }}
            />
          </Box>
          <Box>
            <Skeleton
              animation="wave"
              variant="rounded"
              width="100px"
              height="100px"
              sx={{ borderRadius: "30px" }}
            />
            <Skeleton
              animation="wave"
              variant="rounded"
              width="100px"
              height="20px"
              sx={{ mt: "10px" }}
            />
          </Box>
        </Box>
      </Box>
    );
  };

  const userInfoSkeleton = () => {
    return (
      <Box>
        <Box>
          <Skeleton
            animation="wave"
            variant="rounded"
            width="100%"
            height="50px"
            sx={{ borderRadius: "20px" }}
          />
        </Box>
        <Box className="skeleton-wrapper">
          <Box
            className="skeleton__content"
            sx={{ mt: "50px", display: "flex" }}
          >
            <Skeleton
              animation="wave"
              variant="circular"
              width="140px"
              height="140px"
            />
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                ml: "30px",
              }}
            >
              <Box>
                <Skeleton
                  animation="wave"
                  variant="rounded"
                  width="400px"
                  height="30px"
                />
              </Box>
              <Box
                sx={{
                  mt: "30px",
                  display: "flex",
                  flexDirection: "column",
                  gap: "5px",
                }}
              >
                <Skeleton
                  animation="wave"
                  variant="rounded"
                  width="550px"
                  height="30px"
                />
                <Skeleton
                  animation="wave"
                  variant="rounded"
                  width="550px"
                  height="30px"
                />
                <Skeleton
                  animation="wave"
                  variant="rounded"
                  width="550px"
                  height="30px"
                />
                <Skeleton
                  animation="wave"
                  variant="rounded"
                  width="550px"
                  height="30px"
                />
                <Skeleton
                  animation="wave"
                  variant="rounded"
                  width="550px"
                  height="30px"
                />
              </Box>
            </Box>
          </Box>
        </Box>
      </Box>
    );
  };

  const title =
    userInfo && userInfo.typeUser === "creator"
      ? "Личный кабинет"
      : "Привет, турист!";

  return (
    <>
      <Box className="userInfo__wrapper">
        {loadingStatus ? (
          userInfoSkeleton()
        ) : (
          <>
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
                  <DarkStyledTooltip
                    title="Данные подтверждены"
                    arrow
                    placement="bottom"
                  >
                    <img
                      src={checked}
                      alt="checked verify"
                      style={{ marginLeft: "15px" }}
                    />
                  </DarkStyledTooltip>
                ) : userInfo &&
                  userInfo.type !== userTypes.Tourist &&
                  userInfo.dataUser.statusVerify ===
                    StatusVerify.sendVerified ? (
                  <DarkStyledTooltip
                    title="Данные на проверке"
                    arrow
                    placement="bottom"
                  >
                    <img
                      src={clock}
                      alt="send to check verify"
                      style={{ marginLeft: "15px" }}
                    />
                  </DarkStyledTooltip>
                ) : (
                  <DarkStyledTooltip
                    title="Аккаунт заблокирован"
                    arrow
                    placement="bottom"
                  >
                    <img
                      src={alert}
                      alt="alert icon"
                      style={{ marginLeft: "15px" }}
                    />
                  </DarkStyledTooltip>
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
                {userInfo && userInfo.type !== userTypes.Tourist && (
                  <Button
                    sx={{ mb: "10px" }}
                    disabled={
                      userInfo.dataUser.statusVerify ===
                      StatusVerify.notVerified
                        ? false
                        : true
                    }
                  >
                    Отправить на подтверждение
                  </Button>
                )}
                <Button>Изменить</Button>
              </Box>
            </Box>
            <Box className="userInfo__body-wrapper">
              <Box
                className="userInfo__content"
                sx={{ mt: "20px", display: "flex" }}
              >
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
          </>
        )}
      </Box>
      {userInfo &&
        userInfo.type !== userTypes.Tourist &&
        (loadingStatus ? (
          userInfoDocumentsSkeleton
        ) : (
          <CreatorDocumentsList {...userInfo} />
        ))}
    </>
  );
}

export default UserInfoFabric;
