import { Container, Box, Paper, Typography, TextField } from "@mui/material";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import logo from "../../media/logo.svg";
import { UserType } from "../../models/userModels/IUserInfo";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { TOKEN } from "../../config/types";
import { useCookies } from "react-cookie";
import accIcon from "../../media/accountLinkIcon.svg";
import calendarIcon from "../../media/calendarIcon.svg";
import { useState } from "react";

const Header = () => {
  const [cookies, setCookie, removeCookie] = useCookies([TOKEN]);
  const [searchData, setSearchData] = useState<string>("");
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
          }}
        >
          <Box
            onClick={() => {
              if (cookies[TOKEN]) {
                navigate("/tours/all");
              }
            }}
            sx={{
              display: "flex",
              alignItems: "center",
              gap: "10px",
              justifyContent: "flex-start",
              cursor: cookies[TOKEN] ? "pointer" : "",
            }}
            className="header__logo"
          >
            <img
              style={{ height: "50px" }}
              src={logo}
              alt="logo"
              className="logo-img"
            />

            <Typography variant={"button"} className="logo-text">
              Путь <br /> в Горы
            </Typography>
          </Box>
          {cookies[TOKEN] && (
            <>
              {userInfo.typeUser === UserType.tourist && (
                <Box sx={{ m: "0 30px", width: "890px" }}>
                  <TextField
                    placeholder="Найти тур"
                    color="secondary"
                    value={searchData}
                    onChange={(e) => setSearchData(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        if (location.state !== "/tours/all") {
                          navigate(`/tours/all?title=${searchData}`);
                        }
                      }
                    }}
                  />
                </Box>
              )}

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
                    <img
                      style={{ height: "30px" }}
                      src={accIcon}
                      alt="accIcon"
                    />
                  </Box>
                ) : (
                  <Box
                    sx={{
                      display: "flex",
                      gap: "22px",
                      alignItems: "center",
                    }}
                  >
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
                      <img
                        style={{ height: "30px" }}
                        src={calendarIcon}
                        alt="calendarIcon"
                      />
                      <Typography variant="caption">Календарь</Typography>
                    </Box>
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
                      <img
                        src={accIcon}
                        alt="accIcon"
                        style={{ height: "30px" }}
                      />
                      <Typography variant="caption" sx={{ mt: "1px" }}>
                        Профиль
                      </Typography>
                    </Box>
                  </Box>
                )}
              </Box>
            </>
          )}
        </Container>
      </Box>
    </Paper>
  );
};

export default Header;
