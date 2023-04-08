import { useEffect, useState } from "react";
import { getUserInfo } from "../../submitFunctions/commonAPI";
import {
  ITouristInfo,
  ICreatorInfo,
  UserType,
  CreatorType,
} from "../../models/userModels/IUserInfo";
import { Box, Typography, Avatar as MuiAvatar, Button } from "@mui/material";
import { darkTurquoiseColor } from "../../config/MUI/color/color";
import userPhoto from "../../media/userPhoto.svg";

import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { setUserInfo } from "../../redux/UserInfo/UserInfoReducer";
import UserInfoSkeleton from "./UserInfoSkeleton/UserInfoSkeleton";
import CreatorDocumentsList from "../CreatorDocumentsList/CreatorDocumentsList";

import {
  isModalActive,
  setModalInactive,
  setModalActive,
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

  const dispatch = useDispatch();

  const { typeUser, dataUser, name, phone, email } = userInfo;

  // useEffect(() => {
  //   setLoadingStatus(true);
  //   getUserInfo(
  //     (value) => {
  //       dispatch(setUserInfo(value));
  //       setLoadingStatus(false);
  //     },
  //     undefined,
  //     true
  //   );
  // }, []);

  return (
    <>
      <Box className="userInfo__wrapper" sx={{ mt: "55px" }}>
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
                    <MuiAvatar
                      src={userInfo?.photo}
                      alt="user avatar"
                      sx={{ width: "140px", height: "140px" }}
                    />
                  ) : (
                    <img src={userPhoto} alt="person icon" />
                  )}
                </Box>
                <Box sx={{ ml: "30px" }}>
                  <Box>
                    <Box className="userInfo_title">
                      <Typography variant="h5">
                        {typeUser && typeUser === UserType.tourist
                          ? name
                          : typeUser === UserType.creator &&
                            dataUser.creatorType === CreatorType.IP
                          ? `ИП ${name}`
                          : typeUser === UserType.creator &&
                            dataUser.creatorType === CreatorType.OOO
                          ? `ООО ${name}`
                          : `${name}`}
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
      <Button onClick={() => dispatch(setModalActive("enterMobileCodeModal"))}>
        Открыть модалку
      </Button>
      <ErrorReportModal />
      <SuccessMessageSendModal />
      <CancelBookingModal />
      <SuccessCancellingBookingModal />
      <SuccessBookingModal />
      <DeleteTourModal />
      <SuccessDeleteTourModal />
      <SuccessPayModal />
      <SuccessEditUserInfoModal />
      <EnterMobileCodeModal />
    </>
  );
}

export default UserInfo;
