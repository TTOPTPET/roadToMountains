import axios from "axios";
import { refreshToken } from "../../submitFunctions/authAPI/UserAuthAPI/UserAuthAPI";

function AxiosProvider({ children }: { children: JSX.Element }) {
  axios?.interceptors.response.use(
    function (response) {
      console.log("res response", response);
      return response;
    },
    async (error) => {
      console.log("res error", error);
      // if (error.response.status === 401 || 422) {
      //   await refreshToken().then(() => {
      //     return axios.request(error?.config);
      //   });
      // }
      return Promise.reject(error);
    }
  );
  return <>{children}</>;
}

export default AxiosProvider;
