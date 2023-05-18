import { Box, Typography, Button } from "@mui/material";
import { DarkStyledTooltip } from "../../../config/MUI/styledComponents/StyledTooltip";

import { Link, useNavigate } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../redux/store";

import checked from "../../../media/checkedVerify.svg";
import clock from "../../../media/clockVerify.svg";
import alert from "../../../media/alertVerify.svg";
import banIcon from "../../../media/ban-status-icon.svg";

import {
  ITouristInfo,
  ICreatorInfo,
  StatusVerify,
  UserType,
} from "../../../models/userModels/IUserInfo";
import {
  BAN_STATUS,
  REFRESH_TOKEN,
  TOKEN,
  USER_ROLE,
} from "../../../config/types";
import { sendVerified } from "../../../API/creatorAPI/sendVerified";
import { setUserInfo } from "../../../redux/UserInfo/UserInfoReducer";
import { useCookies } from "react-cookie";

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
  const dispatch = useDispatch();

  const [cookies, setCookies, removeCookies] = useCookies([
    TOKEN,
    REFRESH_TOKEN,
    BAN_STATUS,
    USER_ROLE,
  ]);

  const navigate = useNavigate();

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
          userInfo?.banStatus ? (
          <DarkStyledTooltip
            title="Аккаунт заблокирован"
            arrow
            placement="bottom"
          >
            <img
              src={banIcon}
              alt="alert icon"
              style={{ marginLeft: "15px" }}
            />
          </DarkStyledTooltip>
        ) : userInfo &&
          userInfo?.typeUser !== UserType.tourist &&
          userInfo.dataUser?.statusVerify === StatusVerify.waitVerified ? (
          <DarkStyledTooltip
            title="Отправте данные на проверку"
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
            onClick={() =>
              sendVerified(() =>
                dispatch(
                  setUserInfo({
                    ...userInfo,
                    dataUser: {
                      ...userInfo.dataUser,
                      statusVerify: StatusVerify.sendVerified,
                    },
                  })
                )
              )
            }
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
        <Button
          variant="errorButton"
          sx={{ mt: "10px" }}
          onClick={() => {
            removeCookies(TOKEN, { path: "/" });
            removeCookies(REFRESH_TOKEN, { path: "/" });
            removeCookies(USER_ROLE, { path: "/" });
            removeCookies(BAN_STATUS, { path: "/" });
            navigate("/auth");
          }}
        >
          Выйти
        </Button>
      </Box>
    </Box>
  );
}

export default UserInfoHeader;
