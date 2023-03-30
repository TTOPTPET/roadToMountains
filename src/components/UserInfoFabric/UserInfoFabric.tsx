import { useEffect, useState } from "react";
import { getUserInfo } from "../../submitFunctions/commonAPI";
import {
  ITouristInfo,
  ICreatorInfo,
  StatusVerify,
  UserType,
} from "../../models/userModels/IUserInfo";
import { Typography, Box, Button, Skeleton } from "@mui/material";
import { Link } from "react-router-dom";
import { darkTurquoiseColor } from "../../config/MUI/color/color";
import userPhoto from "../../media/userPhoto.svg";
import UserInfoData from "./UserInfoData/UserInfoData";

import { DarkStyledTooltip } from "../../config/MUI/styledComponents/StyledTooltip";

import checked from "../../media/checkedVerify.svg";
import clock from "../../media/clockVerify.svg";
import alert from "../../media/alertVerify.svg";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { setUserInfo } from "../../redux/UserInfo/UserInfoReducer";
import UserInfoFabricSkeleton from "./UserInfoFabricSkeleton/UserInfoFabricSkeleton";
import CreatorDocumentsList from "../CreatorDocumentsList/CreatorDocumentsList";

function UserInfoFabric() {
  const userInfo: ITouristInfo | ICreatorInfo = useSelector(
    (state: RootState) => state.userInfo.userInfo
  );
  const dispatch = useDispatch();
  const [loadingStatus, setLoadingStatus] = useState<Boolean>(true);

  console.log(userInfo);

  useEffect(() => {
    setLoadingStatus(true);
    getUserInfo(
      (value) => {
        dispatch(setUserInfo(value));
        setLoadingStatus(false);
      },
      undefined,
      true
    );
  }, []);

  const title =
    userInfo && userInfo?.typeUser === "creator"
      ? "Личный кабинет"
      : "Привет, турист!";

  return (
    <>
      <Box className="userInfo__wrapper" sx={{ mt: "55px" }}>
        {loadingStatus ? (
          <UserInfoFabricSkeleton />
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
                userInfo?.typeUser !== UserType.tourist &&
                userInfo?.dataUser?.statusVerify === StatusVerify.verified ? (
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
                  userInfo?.typeUser !== UserType.tourist &&
                  userInfo?.dataUser?.statusVerify ===
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
                {userInfo && userInfo?.typeUser !== UserType.tourist && (
                  <Button
                    sx={{ mb: "10px" }}
                    disabled={
                      userInfo?.dataUser?.statusVerify ===
                      StatusVerify.notVerified
                        ? false
                        : true
                    }
                  >
                    Отправить на подтверждение
                  </Button>
                )}
                <Button component={Link} to={"/editUserInfo"}>
                  Изменить
                </Button>
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
                  {userInfo && userInfo?.photo ? (
                    <img src={userInfo?.photo} alt="user avatar" />
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
      {userInfo && userInfo?.typeUser !== UserType.tourist && (
        <CreatorDocumentsList
          files={userInfo.dataUser.documents}
          loadingStatus={loadingStatus}
          variant="displayInfo"
        />
      )}
    </>
  );
}

export default UserInfoFabric;
