import {
  Container,
  Box,
  Paper,
  Typography,
  TextField,
  Button,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import logo from "../../media/logo.svg";
import { UserType } from "../../models/userModels/IUserInfo";
import {
  Link,
  useLocation,
  useNavigate,
  useSearchParams,
} from "react-router-dom";
import {
  BAN_STATUS,
  REFRESH_TOKEN,
  TOKEN,
  USER_ROLE,
} from "../../config/types";
import { useCookies } from "react-cookie";
import accIcon from "../../media/accountLinkIcon.svg";
import adminIcon from "../../media/Icons/headerIcons/adminPanel.svg";
import calendarIcon from "../../media/calendarIcon.svg";
import { useEffect, useState } from "react";

const Header = () => {
  const [searchParamFromUrl] = useSearchParams();

  const [cookies] = useCookies([TOKEN, USER_ROLE, REFRESH_TOKEN, BAN_STATUS]);

  const [searchParam, setSearchParam] = useState<string>(
    searchParamFromUrl.get("title") || ""
  );

  const theme = useTheme();

  const moreThenSmall = useMediaQuery(theme.breakpoints.up("sm"));

  let location = useLocation();

  const userInfo = useSelector((state: RootState) => state.userInfo.userInfo);

  const navigate = useNavigate();

  return (
    <Paper variant="header" sx={{ width: "100%" }}>
      <Box
        className="header__wrapper"
        height={"100%"}
        display={"flex"}
        alignItems={"center"}
      >
        <Container
          className="header__container"
          maxWidth={"lg"}
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            padding: { sm: "0px 16px", xs: "0px" },
          }}
        >
          <Box
            onClick={() => {
              navigate("/tours/all");
            }}
            sx={{
              display: "flex",
              alignItems: "center",
              gap: "10px",
              justifyContent: "flex-start",
              cursor: "pointer",
              height: { sm: "50px", xs: "30px" },
            }}
            className="header__logo"
          >
            <img
              style={{ height: "100%" }}
              src={logo}
              alt="logo"
              className="logo-img"
            />

            {moreThenSmall && (
              <Box sx={{ width: "70px" }}>
                <Typography variant={"button"} className="logo-text">
                  Путь <br /> в Горы
                </Typography>
              </Box>
            )}
          </Box>
          <Box sx={{ m: { sm: "0 30px", xs: "0 10px" }, width: "100%" }}>
            <TextField
              placeholder="Найти тур"
              color="secondary"
              value={searchParam}
              onChange={(e) => setSearchParam(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  navigate(`/tours/all?title=${searchParam}`);
                }
              }}
            />
          </Box>
          {cookies.TOKEN ? (
            <>
              <Box
                className="header__btns"
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: "11px",
                  justifyContent: "flex-end",
                }}
              >
                {userInfo.typeUser === UserType.tourist ? (
                  <Box component={Link} to="/tourist/lk">
                    <Box sx={{ height: { sm: "30px", xs: "20px" } }}>
                      <img
                        style={{ height: "100%" }}
                        src={accIcon}
                        alt="accIcon"
                      />
                    </Box>
                  </Box>
                ) : (
                  <Box
                    sx={{
                      display: "flex",
                      gap: { sx: "22px", xs: "7px" },
                      alignItems: "center",
                    }}
                  >
                    {userInfo.typeUser === UserType.creator ? (
                      <>
                        <Box
                          sx={{
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "center",
                            textDecoration: "none",
                          }}
                          component={Link}
                          to="/creator/calendar"
                        >
                          <Box sx={{ height: { sm: "30px", xs: "20px" } }}>
                            <img
                              style={{ height: "100%" }}
                              src={calendarIcon}
                              alt="calendarIcon"
                            />
                          </Box>
                          <Typography variant="caption">Календарь</Typography>
                        </Box>
                      </>
                    ) : (
                      <>
                        <Box
                          sx={{
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "center",
                            textDecoration: "none",
                          }}
                          component={Link}
                          to="/admin"
                        >
                          <Box sx={{ height: { sm: "30px", xs: "20px" } }}>
                            <img
                              style={{ height: "100%" }}
                              src={adminIcon}
                              alt="adminIcon"
                            />
                          </Box>
                          <Typography variant="caption">Админка</Typography>
                        </Box>
                      </>
                    )}

                    <Box
                      sx={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        textDecoration: "none",
                      }}
                      component={Link}
                      to="/creator/lk"
                    >
                      <Box sx={{ height: { sm: "30px", xs: "20px" } }}>
                        <img
                          style={{ height: "100%" }}
                          src={accIcon}
                          alt="accIcon"
                        />
                      </Box>
                      <Typography variant="caption" sx={{ mt: "1px" }}>
                        Профиль
                      </Typography>
                    </Box>
                  </Box>
                )}
              </Box>
            </>
          ) : (
            <Button component={Link} to={"/auth"} variant="textButton">
              Войти
            </Button>
          )}
        </Container>
      </Box>
    </Paper>
  );
};

export default Header;
