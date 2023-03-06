import "./Footer.css";
import madeInRussia from "../../media/made-in-russia-sign-ru.svg";
import { useLocation, useNavigate } from "react-router-dom";

const Footer = () => {
  let navigate = useNavigate();
  let location = useLocation();
  return (
    <div className="footer">
      {location?.pathname === "/user" ? (
        <div
          className="footer__about-btn"
          onClick={() => {
            navigate("/about");
          }}
        >
          Туториал по ОЛЕГу
        </div>
      ) : null}
      <div className="footer__img">
        <img src={madeInRussia}></img>
      </div>
    </div>
  );
};

export default Footer;
