import { useCookies } from "react-cookie";
import {
  TOKEN,
  REFRESH_TOKEN,
  BAN_STATUS,
  USER_ROLE,
} from "../../config/types";
import { Navigate } from "react-router-dom";

type Props = { children: JSX.Element };

function ProtectedRoute({ children }: Props) {
  const [cookies] = useCookies([TOKEN, REFRESH_TOKEN, BAN_STATUS, USER_ROLE]);

  if (cookies.TOKEN) {
    return <>{children}</>;
  } else {
    return import.meta.env.VITE_APP_ACCESS_TYPE === "DEV" ? (
      <>{children}</>
    ) : (
      <Navigate to="/auth" replace />
    );
  }
}

export default ProtectedRoute;
