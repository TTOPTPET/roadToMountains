import { Cookies } from "react-cookie";
import { TOKEN } from "../../config/types";
import { Navigate } from "react-router-dom";

type Props = { children: JSX.Element };

function ProtectedRoute({ children }: Props) {
  const cookie = new Cookies();

  if (cookie.get(TOKEN)) {
    return <>{children}</>;
  } else {
    // HACK: Раскоментить для работы приватных роутеров
    // return <Navigate to="/auth" replace />;
    return <>{children}</>;
  }
}

export default ProtectedRoute;
