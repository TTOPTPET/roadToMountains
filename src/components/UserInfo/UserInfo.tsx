import { useEffect } from "react";
import {
  ITouristInfo,
  ICreatorInfo,
  UserType,
  CreatorType,
} from "../../models/userModels/IUserInfo";
import {
  Box,
  Typography,
  Avatar as MuiAvatar,
  Button,
  Paper,
} from "@mui/material";
import { darkTurquoiseColor } from "../../config/MUI/color/color";
import userPhoto from "../../media/userPhoto.svg";

import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import UserInfoSkeleton from "./UserInfoSkeleton/UserInfoSkeleton";
import CreatorDocumentsList from "../CreatorDocumentsList/CreatorDocumentsList";

import {
  setModalActive,
  setModalInactive,
} from "../../redux/Modal/ModalReducer";
import ErrorReportModal from "../Modals/ErrorReportModal/ErrorReportModal";
import SuccessMessageSendModal from "../Modals/SuccessMessageSendModal/SuccessMessageSendModal";
import CancelBookingModal from "../Modals/CancelBookingModal/CancelBookingModal";
import SuccessCancellingBookingModal from "../Modals/SuccessCancellingBookingModal/SuccessCancellingBookingModal";
import SuccessBookingModal from "../Modals/SuccessBookingModal/SuccessBookingModal";
import DeleteTourModal from "../Modals/DeleteTourModal/DeleteTourModal";
import SuccessDeleteTourModal from "../Modals/SuccessDeleteTourModal/SuccessDeleteTourModal";
import SuccessPayModal from "../Modals/SuccessPayModal/SuccessPayModal";
import SuccessEditUserInfoModal from "../Modals/SuccessEditUserInfoModal/SuccessEditUserInfoModal";
import EnterMobileCodeModal from "../Modals/EnterMobileCodeModal/EnterMobileCodeModal";
import { useNavigate } from "react-router-dom";
import { setUserInfo } from "../../redux/UserInfo/UserInfoReducer";
import { getUserInfo } from "../../API/commonAPI";
import {
  BAN_STATUS,
  REFRESH_TOKEN,
  TOKEN,
  USER_ROLE,
} from "../../config/types";
import { baseUrl } from "../../config/config";
import { useCookies } from "react-cookie";

type UserInfoProps = {
  fields: JSX.Element;
  submitFuntion?: () => void;
  header: JSX.Element;
  avatarComponent?: JSX.Element;
  documents?: JSX.Element;
};

function UserInfo({ header, fields, submitFuntion }: UserInfoProps) {
  const userInfo: ITouristInfo | ICreatorInfo = useSelector(
    (state: RootState) => state.userInfo.userInfo
  );

  const [cookies, setCookies] = useCookies([
    TOKEN,
    REFRESH_TOKEN,
    USER_ROLE,
    BAN_STATUS,
  ]);

  const navigate = useNavigate();

  const dispatch = useDispatch();

  const { typeUser, dataUser, name, phone, email } = userInfo;

  useEffect(() => {
    getUserInfo((value) => {
      dispatch(setUserInfo(value));
    });
  }, []);

  return (
    <>
      <Box className="userInfo__wrapper">
        {!userInfo.dataUser ? (
          <UserInfoSkeleton />
        ) : (
          <>
            {header}
            <Box className="userInfo__body-wrapper">
              <Box
                className="userInfo__content"
                sx={{
                  mt:
                    userInfo && userInfo?.typeUser === UserType.tourist
                      ? "50px"
                      : "20px",
                  display: "flex",
                }}
              >
                <Box className="userInfo__content-avatar">
                  <Paper variant="avatarBg">
                    {userInfo && userInfo?.photo ? (
                      <MuiAvatar
                        src={baseUrl + "/" + userInfo?.photo}
                        alt="user avatar"
                        sx={{ width: "140px", height: "140px" }}
                      />
                    ) : (
                      <img src={userPhoto} alt="person icon" />
                    )}
                  </Paper>
                </Box>
                <Box sx={{ ml: "30px" }}>
                  <Box>
                    <Box className="userInfo_title">
                      <Typography variant="h5">
                        {typeUser && typeUser === UserType.tourist
                          ? name ?? "Имя пользователя"
                          : typeUser === UserType.creator &&
                            dataUser.creatorType === CreatorType.IP
                          ? `ИП ${name ?? "Имя пользователя"}`
                          : typeUser === UserType.creator &&
                            dataUser.creatorType === CreatorType.OOO
                          ? `ООО ${name ?? "Имя пользователя"}`
                          : `${name ?? "Имя пользователя"}`}
                      </Typography>
                    </Box>
                  </Box>
                  <Box>
                    <Box
                      className="userInfo__commonData"
                      sx={{
                        display: "flex",
                        gap:
                          userInfo.typeUser === UserType.tourist
                            ? "10px"
                            : "50px",
                        mt: "10px",
                      }}
                    >
                      <Box
                        className="userInfo__commonData-titles"
                        sx={{
                          display: "flex",
                          flexDirection: "column",
                          width:
                            userInfo.typeUser === UserType.tourist
                              ? "190px"
                              : "280px",
                          gap: "5px",
                        }}
                      >
                        <Typography variant="h6">Номер телефона:</Typography>
                        <Typography variant="h6">Электронная почта:</Typography>
                      </Box>
                      <Box
                        className="userInfo__commonData-descr"
                        sx={{
                          display: "flex",
                          flexDirection: "column",
                          gap: "3px",
                        }}
                      >
                        <Typography variant="caption">{phone}</Typography>
                        <Typography variant="caption">{email}</Typography>
                      </Box>
                    </Box>
                  </Box>
                  {fields}
                </Box>
              </Box>
            </Box>
          </>
        )}
      </Box>
      {userInfo && userInfo?.typeUser !== UserType.tourist && (
        <CreatorDocumentsList
          files={userInfo.dataUser.documents}
          loadingStatus={!userInfo.dataUser}
          variant="displayInfo"
        />
      )}
      <CancelBookingModal />
      <SuccessCancellingBookingModal />
      <SuccessBookingModal />
      {/* <DeleteTourModal /> */}
      <SuccessDeleteTourModal />
      <SuccessPayModal />
      <SuccessEditUserInfoModal />
      <EnterMobileCodeModal
        successCallback={(resp) => {
          setCookies(TOKEN, resp.accessToken, { path: "/" });
          setCookies(REFRESH_TOKEN, resp.refreshToken, { path: "/" });
          setCookies(USER_ROLE, resp.role, { path: "/" });
          setCookies(BAN_STATUS, resp.status, { path: "/" });
          dispatch(setModalInactive("enterMobileCodeModal"));
          navigate("/tours/all");
        }}
      />
    </>
  );
}

export default UserInfo;
