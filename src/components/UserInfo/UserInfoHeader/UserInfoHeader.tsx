import { Box, Typography, Button } from "@mui/material";
import { DarkStyledTooltip } from "../../../config/MUI/styledComponents/StyledTooltip";

import { Link } from "react-router-dom";

import { useSelector } from "react-redux";
import { RootState } from "../../../redux/store";

import checked from "../../../media/checkedVerify.svg";
import clock from "../../../media/clockVerify.svg";
import alert from "../../../media/alertVerify.svg";

import {
  ITouristInfo,
  ICreatorInfo,
  StatusVerify,
  UserType,
} from "../../../models/userModels/IUserInfo";

type UserInfoHeaderProps = {
  submitFuntion?: () => void;
  title: string;
  linkTo: string;
  userInfo: ITouristInfo | ICreatorInfo;
};

function UserInfoHeader({
  submitFuntion,
  title,
  linkTo,
  userInfo,
}: UserInfoHeaderProps) {
  console.log(title);
  return (
    <Box
      className="userInfo__header-wrapper"
      sx={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      <Box className="userInfo__header-title-wrapper" sx={{ display: "flex" }}>
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
          userInfo?.dataUser?.statusVerify === StatusVerify.sendVerified ? (
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
        ) : userInfo &&
          userInfo?.typeUser !== UserType.tourist &&
          userInfo?.dataUser?.statusVerify === StatusVerify.notVerified ? (
          <DarkStyledTooltip
            title="Аккаунт заблокирован"
            arrow
            placement="bottom"
          >
            <img src={alert} alt="alert icon" style={{ marginLeft: "15px" }} />
          </DarkStyledTooltip>
        ) : null}
      </Box>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-end",
        }}
      >
        {userInfo && userInfo?.typeUser !== UserType.tourist && (
          <Button
            sx={{ mb: "10px" }}
            disabled={
              userInfo?.dataUser?.statusVerify === StatusVerify.notVerified
                ? false
                : true
            }
          >
            Отправить на подтверждение
          </Button>
        )}
        <Button component={Link} to={linkTo}>
          Изменить
        </Button>
      </Box>
    </Box>
  );
}

export default UserInfoHeader;
