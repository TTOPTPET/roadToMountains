import { adminUrl } from "../config/config";
import { Cookies } from "react-cookie";
import axios from "axios";
import { TOKEN } from "../config/types";

let cookie = new Cookies();

export const tourBan = async (
  data: any,
  successCallback: (prop: any) => {},
  errorCallback: () => {}
) => {
  interface I {
    a: string;
  }

  await axios
    .get(adminUrl, {
      params: {},
      data: data,
      headers: {
        Authorization: `Bearer ${cookie.get(TOKEN)}`,
      },
    })
    .then(
      (value) => {
        try {
          let retr: I = value?.data;
          successCallback(retr);
        } catch (e) {
          console.error(e);
          errorCallback();
        }
      },
      (reason) => {
        console.error(reason);
        errorCallback();
      }
    );
};
