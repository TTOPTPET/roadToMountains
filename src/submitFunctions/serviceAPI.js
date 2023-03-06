import { url, apiKey } from "../../config/config";
import { Cookies } from "react-cookie";
import axios from "axios";
import { TOKEN } from "../../config/types";

let cookie = new Cookies();

export const getServices = async () => {
  const apiUrl = url + "/service";
  let response = await axios.get(apiUrl, {
    headers: {
      "X-API-KEY": apiKey,
      Authorization: `Bearer ${cookie.get(TOKEN)}`,
    },
  });
  return response;
};

export const postNewService = async (newService) => {
  const apiUrl = url + "/service";
  const data = {
    all_adder: [
      {
        name_service: newService.name_service,
        price: Number(newService.price_service),
        duration: newService.duration,
        max_booking: Number(newService.max_booking),
      },
    ],
  };
  let response = await axios.post(apiUrl, data, {
    headers: {
      "X-API-KEY": apiKey,
      Authorization: `Bearer ${cookie.get(TOKEN)}`,
    },
  });
  return response;
};

export const deleteService = async (serviceId) => {
  const apiUrl = url + "/service/one_service";
  let response = await axios.delete(apiUrl, {
    params: { id_service: serviceId },
    headers: {
      "X-API-KEY": apiKey,
      Authorization: `Bearer ${cookie.get(TOKEN)}`,
    },
  });
  return response;
};

export const serviceConfirm = async (hash, type) => {
  const apiUrl = url + "/service/confirmation";
  let response = await axios.delete(apiUrl, {
    params: { hash_del: hash, type_confirm: type },
    headers: {
      "X-API-KEY": apiKey,
      Authorization: `Bearer ${cookie.get(TOKEN)}`,
    },
  });
  return response;
};

export const updateService = async (service) => {
  const apiUrl = url + "/service/one_service";
  const data = {
    name_service: service.name_service,
    max_booking: service.max_booking,
    price: service.price_service,
    duration: service.duration,
  };
  let response = await axios.put(apiUrl, data, {
    params: { id_service: service.id },
    headers: {
      "X-API-KEY": apiKey,
      Authorization: `Bearer ${cookie.get(TOKEN)}`,
    },
  });
  return response;
};
