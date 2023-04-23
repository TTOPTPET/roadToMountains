import { Container, Box, Paper, Typography, TextField } from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../redux/store";
import logo from "../../media/logo.svg";
import { UserType } from "../../models/userModels/IUserInfo";
import { Link } from "react-router-dom";

import accIcon from "../../media/accountLinkIcon.svg";
import calendarIcon from "../../media/calendarIcon.svg";

const Header = () => {
  const userInfo = useSelector((state: RootState) => state.userInfo.userInfo);
  return (
    <Box className="header__wrapper" sx={{ width: "100%" }}>
      <Paper variant="header">
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
            sx={{
              display: "flex",
              alignItems: "center",
              gap: "10px",
              justifyContent: "flex-start",
            }}
            className="header__logo"
          >
            <img src={logo} alt="logo" className="logo-img" />

            <Typography variant={"button"} className="logo-text">
              Путь <br /> в Горы
            </Typography>
          </Box>
          {userInfo.typeUser === UserType.tourist && (
            <Box sx={{ m: "0 30px", width: "890px" }}>
              <TextField
                placeholder="Найти тур"
                color="secondary"
                // onChange={(e) =>
                //   dispatch(
                //
                //   )
                // }
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
                <img src={accIcon} alt="accIcon" />
              </Box>
            ) : (
              <Box sx={{ display: "flex", gap: "22px", alignItems: "center" }}>
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
                  <img src={calendarIcon} alt="calendarIcon" />
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
                  <img src={accIcon} alt="accIcon" style={{ width: "40px" }} />
                  <Typography variant="caption" sx={{ mt: "1px" }}>
                    Профиль
                  </Typography>
                </Box>
              </Box>
            )}
          </Box>
        </Container>
      </Paper>
    </Box>
  );
};

export default Header;
