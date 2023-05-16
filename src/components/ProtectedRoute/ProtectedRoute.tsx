import { useCookies } from "react-cookie";
import { TOKEN } from "../../config/types";

type Props = { children: JSX.Element };

function ProtectedRoute({ children }: Props) {
  const [cookies] = useCookies([TOKEN]);

  if (cookies[TOKEN]) {
    return <>{children}</>;
  } else {
    // HACK: Раскоментить для работы приватных роутеров
    // return <Navigate to="/auth" replace />;
    return <>{children}</>;
  }
}

export default ProtectedRoute;
