import axios from "axios";
import { refreshToken } from "../../submitFunctions/authAPI/UserAuthAPI/UserAuthAPI";
import { TOKEN } from "../../config/types";
import { Cookies } from "react-cookie";

const cookie = new Cookies();

function AxiosProvider({ children }: { children: JSX.Element }) {
  // axios?.interceptors.response.use(
  //   function (response) {
  //     console.log("res response", response);
  //     return response;
  //   },
  //   async (error) => {
  //     console.log("res error", error);
  //     // if (error.response.status === 401 || 422) {
  //     //   await refreshToken().then(() => {
  //     //     return axios.request(error?.config);
  //     //   });
  //     // }
  //     return Promise.reject(error);
  //   }
  // );
  axios.interceptors.response.use(
    (res) => {
      return res;
    },
    async (err) => {
      const originalConfig = err.config;
      if (err.response) {
        // Access Token was expired
        if (err.response.status === 401 && !originalConfig._retry) {
          originalConfig._retry = true;

          try {
            await refreshToken();
            return axios.create({
              ...originalConfig,
              headers: {
                ...originalConfig.headers,
                Authorization: `Bearer ${cookie.get(TOKEN)}`,
              },
            });
          } catch (_error: any) {
            if (_error.response && _error.response.data) {
              return Promise.reject(_error.response.data);
            }

            return Promise.reject(_error);
          }
        }

        if (err.response.status === 403 && err.response.data) {
          return Promise.reject(err.response.data);
        }
      }

      return Promise.reject(err);
    }
  );
  return <>{children}</>;
}

export default AxiosProvider;
