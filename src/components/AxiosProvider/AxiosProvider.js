import axios from "axios";
import { useCookies } from "react-cookie";
import { TOKEN } from "../../config/types";

function AxiosProvider({ children }) {
  const [cookies, setCookie, removeCookie] = useCookies();
  axios?.interceptors.response.use(
    function (response) {
      console.log("res response", response);
      return response;
    },
    function (error) {
      console.log("res error", error);
      if (error.response.status === 401 || 422) {
        removeCookie(TOKEN);
      }
      return Promise.reject(error);
    }
  );
  return <>{children}</>;
}

export default AxiosProvider;
