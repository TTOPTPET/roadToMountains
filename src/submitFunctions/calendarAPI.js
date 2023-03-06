import { url, apiKey } from "../config/config";
import { Cookies } from "react-cookie";
import axios from "axios";
import { TOKEN } from "../config/types";
import dayjs from "dayjs";

let cookie = new Cookies();

export const sendSelectedDate = async (selectDate) => {
  const apiUrl = url + "/event/calendar";
  // let cookie = getCookie();
  let response = await axios.get(apiUrl, {
    params: { cal_date: dayjs(selectDate).toISOString() },
    headers: {
      "X-API-KEY": apiKey,
      Authorization: `Bearer ${cookie.get(TOKEN)}`,
    },
  });
  return response;
};
