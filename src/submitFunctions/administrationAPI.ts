import { adminUrl } from "../config/config";
import { Cookies } from "react-cookie";
import axios from "axios";
import { TOKEN } from "../config/types";

let cookie = new Cookies();

export const tourBan = async (
  params?: any,
  successCallback?: (prop: any) => void,
  errorCallback?: () => void
) => {
  interface Iinterface {
    tourId: string;
    tourName: string;
    category: string;
    complexity: string;
    price: {
      from: number;
      to: number;
    };
    region: string;
    tourDate: {
      from: string;
      to: string;
    };
    personsNumber: number;
  }

  await axios
    .get(adminUrl + "/tourBan", {
      params: params,
      headers: {
        Authorization: `Bearer ${cookie.get(TOKEN)}`,
      },
    })
    .then(
      (value) => {
        try {
          let retr: [Iinterface] = value?.data;
          successCallback && successCallback(retr);
        } catch (e) {
          console.error(e);
          errorCallback && errorCallback();
        }
      },
      (reason) => {
        console.error(reason);
        errorCallback && errorCallback();
      }
    );
};
