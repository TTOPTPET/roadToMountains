import {
  Box,
  Typography,
  Button,
  useTheme,
  useMediaQuery,
  Stack,
} from "@mui/material";
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
import { logout } from "../../../API/authAPI/logout";

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

  const theme = useTheme();

  const lessThenSmall = useMediaQuery(theme.breakpoints.down("sm"));
  const lessThenMid = useMediaQuery(theme.breakpoints.down("md"));

  const navigate = useNavigate();

  return (
    <Box
      className="userInfo__header-wrapper"
      sx={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "flex-start",
        position: "relative",
      }}
    >
      <Box className="userInfo__header-title-wrapper" sx={{ display: "flex" }}>
        <Stack>
          <Typography
            variant={lessThenSmall ? "h4" : "h3"}
            sx={{ display: "flex", alignItems: "center" }}
          >
            {title}
          </Typography>
          <Typography variant={"caption"} color={"red"}>
            {userInfo?.typeUser !== UserType.tourist &&
            userInfo?.dataUser?.statusVerify === StatusVerify.notVerified
              ? "Для публикации туров отправьте данные на проверку"
              : ""}
          </Typography>
        </Stack>
        {userInfo &&
        userInfo?.typeUser !== UserType.tourist &&
        userInfo?.dataUser?.statusVerify === StatusVerify.verified ? (
          <DarkStyledTooltip
            title="Данные подтверждены"
            arrow
            placement="bottom"
          >
            <Box
              sx={{
                marginLeft: { lg: "15px", md: "15px", sm: "30px", xs: "30px" },
                width: { lg: "50px", md: "40px", sm: "40px", xs: "24px" },
                height: { lg: "50px", md: "40px", sm: "40px", xs: "24px" },
              }}
            >
              <img
                src={checked}
                alt="checked verify"
                style={{ objectFit: "contain", width: "100%", height: "100%" }}
              />
            </Box>
          </DarkStyledTooltip>
        ) : userInfo &&
          userInfo?.typeUser !== UserType.tourist &&
          userInfo?.dataUser?.statusVerify === StatusVerify.sendVerified ? (
          <DarkStyledTooltip
            title="Данные на проверке"
            arrow
            placement="bottom"
          >
            <Box
              sx={{
                marginLeft: { lg: "15px", md: "15px", sm: "30px", xs: "30px" },
                width: { lg: "50px", md: "40px", sm: "40px", xs: "24px" },
                height: { lg: "50px", md: "40px", sm: "40px", xs: "24px" },
              }}
            >
              <img
                src={clock}
                alt="send to check verify"
                style={{ objectFit: "contain", width: "100%", height: "100%" }}
              />
            </Box>
          </DarkStyledTooltip>
        ) : userInfo &&
          userInfo?.typeUser !== UserType.tourist &&
          userInfo?.banStatus ? (
          <DarkStyledTooltip
            title="Аккаунт заблокирован"
            arrow
            placement="bottom"
          >
            <Box
              sx={{
                marginLeft: { lg: "15px", md: "15px", sm: "30px", xs: "30px" },
                width: { lg: "50px", md: "40px", sm: "40px", xs: "24px" },
                height: { lg: "50px", md: "40px", sm: "40px", xs: "24px" },
              }}
            >
              <img
                src={banIcon}
                alt="alert icon"
                style={{ objectFit: "contain", width: "100%", height: "100%" }}
              />
            </Box>
          </DarkStyledTooltip>
        ) : userInfo &&
          userInfo?.typeUser !== UserType.tourist &&
          userInfo.dataUser?.statusVerify === StatusVerify.waitVerified ? (
          <DarkStyledTooltip
            title="Отправте данные на проверку"
            arrow
            placement="bottom"
          >
            <Box
              sx={{
                marginLeft: { lg: "15px", md: "15px", sm: "30px", xs: "30px" },
                width: { lg: "50px", md: "40px", sm: "40px", xs: "24px" },
                height: { lg: "50px", md: "40px", sm: "40px", xs: "24px" },
              }}
            >
              <img
                src={alert}
                alt="alert icon"
                style={{ objectFit: "contain", width: "100%", height: "100%" }}
              />
            </Box>
          </DarkStyledTooltip>
        ) : null}
      </Box>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-end",
          position: lessThenMid ? "absolute" : "",
          top: lessThenMid ? "45px" : null,
          right: lessThenMid ? "0px" : null,
        }}
      >
        {userInfo && userInfo?.typeUser !== UserType.tourist && (
          <Button
            sx={{ mb: { lg: "10px", md: "5px", sm: "5px", xs: "5px" } }}
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
              userInfo?.dataUser?.statusVerify === StatusVerify.notVerified ||
              userInfo?.dataUser?.statusVerify === StatusVerify.waitVerified
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
          sx={{ mt: { lg: "10px", md: "5px", sm: "5px", xs: "5px" } }}
          onClick={() => {
            logout();
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
