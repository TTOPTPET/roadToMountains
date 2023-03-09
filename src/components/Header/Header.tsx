import { Container } from "@mui/material";
import logo from "../../media/logo.svg";

const Header = () => {
  return (
    <div
      className="header"
      style={{
        position: "absolute",
        width: "100%",
        height: "100px",
      }}
    >
      <Container
        className="header__container"
        maxWidth={"lg"}
        sx={{ display: "flex", justifyContent: "space-between" }}
      >
        <div className="header__logo">
          <img src={logo} alt="logo" className="logo-img" />
          <div className="logo-text">Путь в Горы</div>
        </div>
        <div className="header__searchline"></div>
        <div className="header__btns">Кнопки</div>
      </Container>
    </div>
  );
};

export default Header;
