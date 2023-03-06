import { useClock } from "../../hooks/clock.hook";
import { Link, useLocation, useNavigate } from "react-router-dom";
import logo from "../../media/logo.svg";
import user from "../../media/UserPic.png";
import "./Header.css";
import DatePicker from "../DatePicker/DatePicker";
import { useCookies } from "react-cookie";
import { TOKEN, VISITED } from "../../config/types";
import { useEffect } from "react";
import { useMediaQuery } from "react-responsive";
import { mobileWidth } from "../../config/config";

const Header = () => {
  let { date, time } = useClock();
  const [cookies, setCookie, removeCookie] = useCookies();
  const mobile = useMediaQuery({
    maxWidth: mobileWidth,
  });

  const location = useLocation();
  const navigate = useNavigate();

  //HACK: Раскоментить для ограничения роутинга неавторизированного пользователя
  // useEffect(() => {
  //   if (!cookies[VISITED]) {
  //     navigate("/about");
  //   } else if (!cookies[TOKEN]) {
  //     navigate("/auth");
  //   }
  // }, [location.pathname, cookies[TOKEN]]);

  const styleTamplate = new Map([
    [
      "/user",
      {
        header: { justifyContent: "center" },
        header__calendar: { height: 0 },
        header__menu: { height: 0 },
      },
    ],
    ["/about", { header: { display: "none" } }],
    [
      "/auth",
      { header__calendar: { height: 0 }, header: { justifyContent: "center" } },
    ],
  ]);

  return (
    <div
      className="header"
      style={
        (!cookies[TOKEN] && styleTamplate.get(location?.pathname)?.header) || {}
      }
    >
      <div className="container">
        {mobile ? (
          <div
            className="header__calendar"
            style={
              (!cookies[TOKEN] &&
                styleTamplate.get(location?.pathname)?.header__calendar) ||
              {}
            }
          >
            <DatePicker mobileBtn />
          </div>
        ) : (
          <div className="header__today">
            <div className="header__date">{date}</div>
            <div className="header__time">{time}</div>
          </div>
        )}

        <Link className="header__logo" to="/">
          <img src={logo} />
        </Link>

        <div
          className="header__menu"
          style={
            mobile
              ? (!cookies[TOKEN] && { height: 0 }) || {}
              : (!cookies[TOKEN] &&
                  styleTamplate.get(location?.pathname)?.header__menu) ||
                {}
          }
        >
          <Link
            className="header__user"
            to="/user"
            style={{ textDecoration: "none" }}
          >
            <div className="header__user_text">Мой Олег</div>
            <img src={user} />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Header;
