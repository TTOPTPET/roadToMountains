import { url, apiKey, urlUser } from "../../config/config";
import { Cookies } from "react-cookie";
import axios from "axios";
import { TOKEN } from "../../config/types";

let cookie = new Cookies();

export const pushEvent = async (event) => {
  const apiUrl = url + "/event";
  const data = {
    name_event: event.name,
    dt_start: event.start,
    dt_end: event.end,
    day_end_repeat: event.repeatEnd || "",
    service_this_day: event.selection.map((service) => service.id),
    weekdays: event.repeatWeek,
    status_repeat_day: event.repeatWeek.length > 0,
  };
  let response = await axios.post(apiUrl, data, {
    headers: {
      "X-API-KEY": apiKey,
      Authorization: `Bearer ${cookie.get(TOKEN)}`,
    },
  });
  return response;
};

export const updateEvent = async (event) => {
  const apiUrl = url + `/event/update_rapid/`;
  const data = {
    name: event.name,
    start: event.start,
    end: event.end,
    day_end_repeat: event.repeatEnd || "",
    service_this_day: event.selection.map((service) => service.id),
    weekday_list: event.repeatWeek,
    status_repeat_day: event.repeatWeek.length > 0,
  };
  let response = await axios.put(apiUrl, data, {
    params: { event_global_id: event.global_id, event_id: event.id },
    headers: {
      "X-API-KEY": apiKey,
      Authorization: `Bearer ${cookie.get(TOKEN)}`,
    },
  });
  return response;
};

export const submitUpdate = async (event, hash) => {
  const apiUrl = url + `/event/update_rapid`;
  const data = {
    day_return: event.dateStart,
  };
  await axios.delete(apiUrl, {
    params: { hash_del: hash },
    headers: {
      "X-API-KEY": apiKey,
      Authorization: `Bearer ${cookie.get(TOKEN)}`,
    },
    data: data,
  });
};

export const deleteEvent = async (eventId) => {
  const apiUrl = url + "/event/event_day";
  let response = axios.delete(apiUrl, {
    params: { event_day_id: eventId },
    headers: {
      "X-API-KEY": apiKey,
      Authorization: `Bearer ${cookie.get(TOKEN)}`,
    },
  });
  return response;
};
