import { useCookies } from "react-cookie";
import {
  TOKEN,
  REFRESH_TOKEN,
  BAN_STATUS,
  USER_ROLE,
} from "../../config/types";

type Props = { children: JSX.Element };

function ProtectedRoute({ children }: Props) {
  const [cookies] = useCookies([TOKEN, REFRESH_TOKEN, BAN_STATUS, USER_ROLE]);

  if (cookies.TOKEN) {
    return <>{children}</>;
  } else {
    // HACK: Раскоментить для работы приватных роутеров
    // return <Navigate to="/auth" replace />;
    return <>{children}</>;
  }
}

export default ProtectedRoute;
