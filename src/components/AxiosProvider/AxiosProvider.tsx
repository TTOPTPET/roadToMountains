import axios from "axios";
import { refreshToken } from "../../API/authAPI/UserAuthAPI/UserAuthAPI";
import { REFRESH_TOKEN, TOKEN } from "../../config/types";
import { useCookies } from "react-cookie";

function AxiosProvider({ children }: { children: JSX.Element }) {
  const [cookies, setCookies, removeCookies] = useCookies([
    TOKEN,
    REFRESH_TOKEN,
  ]);
  axios.interceptors.request.use(
    (config) => {
      if (cookies[TOKEN])
        config.headers.Authorization = `Bearer ${cookies[TOKEN]}`;
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

  axios.interceptors.response.use(
    (res) => {
      return res;
    },
    async (err) => {
      const originalConfig = err.config;
      if (err.response) {
        // Access Token was expired
        if (
          err.response.status === 422 &&
          !originalConfig._retry &&
          cookies[REFRESH_TOKEN]
        ) {
          originalConfig._retry = true;

          try {
            await refreshToken((resp) => {
              removeCookies(TOKEN);
              setCookies(TOKEN, resp?.accessToken, { path: "/" });
            });
            return axios.request({
              ...originalConfig,
              headers: {
                ...originalConfig.headers,
                Authorization: `Bearer ${cookies[TOKEN]}`,
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
